import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet,
    AsyncStorage
} from 'react-native';




const STORAGE_KEY = '@TreBus:Hotspots';


export default class AddHotspotForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotspots: null
        }
    }

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
        const name = this.refs.name._lastNativeText.trim();
        const address = this.refs.address._lastNativeText.trim();

        try {
            const coords = await this.fetchCoordinatesForHotspot(address);

            const newHotspot = {
                name: name,
                address: address,
                coords: coords
            }

            // FIXME: maybe map hotspots from asyncstorage to state here in order to compare to existing hotspots
            // to avoid adding duplicates

            if (!this.hotspotExists(name)) {
                this.props.navigation.state.params.added(newHotspot);
            
                this.refs.name.clear();
                this.refs.address.clear();

                this.props.navigation.goBack();
            
            } else {
                alert(`There's already a hotspot named ${name}!`)
            }

        } catch (error) {
            alert('joku async error in addNewHotspot()');
            console.log(error);
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
            alert('Ei kelpaa! :DD');
        }

    }


    cancel() {
        this.refs.name.clear();
        this.refs.address.clear();
        this.props.navigation.goBack();
    }

    render() {
        
        return(
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
                    <View style={styles.button}>
                        <Button 
                            title="Add"
                            onPress={() => this.addNewHotspot()} 
                        />
                    </View>

                    <View style={styles.button}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.cancel()} 
                        />
                    </View>
                </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 30,
        textAlign: 'center'
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
        margin: 10
    }
})