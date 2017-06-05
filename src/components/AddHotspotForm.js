import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage,
    Image,
    TouchableHighlight
} from 'react-native';




const STORAGE_KEY = '@TreBus:Hotspots';


export default class AddHotspotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotspots: null,
            addressFetchInProgress: false
        }
    }

    windowHeight = null;

    async componentDidMount() {

        try {
            let value = await AsyncStorage.getItem(STORAGE_KEY);
            this.setState({
                hotspots: JSON.parse(value)
            })
        } catch (error) {
            alert('tapahtui virhe :D')
            console.log(error);
            
        }
    }

    async addNewHotspot() {
        if (!this.refs.address._lastNativeText ||
            !this.refs.name._lastNativeText || 
            this.refs.address._lastNativeText.length < 3 ||
            this.refs.name._lastNativeText.length < 3) {
                
                alert('Hotspot name and address must be at least 3 letters long.');

            } else {

                const name = this.refs.name._lastNativeText.trim();
                const address = this.refs.address._lastNativeText.trim();

                try {
                    await this.setState({ 
                        addressFetchInProgress: true
                    })

                    const coords = await this.fetchCoordinatesForHotspot(address);

                    if (!coords) {
                    
                        alert('Address must exist in Tampere!');
                        await this.setState({
                            addressFetchInProgress: false
                        })

                    } else {
                        
                        const newHotspot = {
                            name: name,
                            address: address,
                            coords: coords
                        }

                        if (!this.hotspotExists(name)) {
                            this.props.navigation.state.params.added(newHotspot);
                        
                            this.refs.name.clear();
                            this.refs.address.clear();

                            await this.setState({
                                addressFetchInProgress: false
                            })


                            this.props.navigation.goBack();
                        
                        } else {
                            alert(`There's already a hotspot named ${name}!`)
                        }
                    }


                } catch (error) {
                    alert('joku async error in addNewHotspot()');
                    console.log(error);
                }

            }
        
    }

    // returns true if a hotspot with similar name already exists, false otherwise
    hotspotExists(newName) {
        let alreadyExists = false;
        
        this.state.hotspots.forEach(hotspot => {
            if (hotspot.name === newName) { alreadyExists = true }
        })
        
        return alreadyExists;
    }


    async fetchCoordinatesForHotspot(address) {
        const formattedAddress = encodeURIComponent(address);
        const url = `http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=geocode&cities=tampere&format=json&key=${formattedAddress}&epsg_out=wgs84`;

        try {
            const response = await fetch(url);
            const responseJSON = await response.json();
            const coords = responseJSON[0].coords;
            return coords;
        } catch (error) {
            // address not found
            return null;
        }

    }


    cancel() {
        this.refs.name.clear();
        this.refs.address.clear();
        this.props.navigation.goBack();
    }

    validatingAddress() {
        if (this.state.addressFetchInProgress) {
            return (
                <Text style={{
                    fontSize: 17, 
                    color: '#FF3',
                    flex: 1,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: {width:0, height:1},
                    textShadowRadius: 6,
                    backgroundColor: 'rgba(0,0,0,0)'
                }}>
                    Validating address...
                </Text>
            )
        } else {
            return null;
        }
    }


    render() {

        return(
            <Image source={require('../public/buswindow.png')} style={styles.backgroundImage}>
                <View style={styles.container}>

                    <Text style={styles.heading}>Add a Hotspot</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        ref="name"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        maxLength={50}
                        returnKeyType="next"
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />

                    <TextInput
                        style={styles.textInput}
                        placeholder="Address"
                        ref="address"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        maxLength={50}
                        returnKeyType="next"
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />

                    <View style={styles.buttonContainer}>

                        <TouchableHighlight
                            style={styles.button}
                            underlayColor="rgba(255,255,255,0.9)"
                            onPress={() => this.cancel()}>
                            <Text>Cancel</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={styles.button}
                            underlayColor="rgba(255,255,255,0.9)"
                            onPress={() => this.addNewHotspot()}>
                            <Text>Add</Text>
                        </TouchableHighlight>

                    </View>

                    {this.validatingAddress()}

                </View>
            </Image>
        )
    }
}


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    heading: {
        fontSize: 30,
        fontWeight: '600',
        marginBottom: 20,
        marginTop: 30,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#FF3',
        textShadowColor: 'black',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 7
    },
    textInput: {
        padding: 10,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FFF'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20
    },
    button: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 80,
        backgroundColor: 'white',
        borderRadius: 5,
    }
})