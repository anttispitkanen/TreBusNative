import React, { Component } from 'react';
import { 
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    View 
} from 'react-native';


export default class ManualLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressValidationInProgress: false
        }
    }

    properties = this.props.navigation.state.params.props;

    async fetchWithAddress() {

        const address = this.refs.address._lastNativeText;
        if (address && address.length > 3) {

            this.setState({
                addressValidationInProgress: true
            })

            try {
                const coords = await this.fetchCoords(address);

                if (!coords) {
                    alert('Invalid address (or network error). Try again.');
                    this.setState({
                        addressValidationInProgress: false
                    })
                
                } else {
                    let longLat = coords.split(',');
                    const longitude = longLat[0];
                    const latitude = longLat[1];

                    this.properties.updateLocation({
                        address: address,
                        latitude: latitude,
                        longitude: longitude,
                        coords: coords
                    })

                    this.properties.navigation.goBack(null);
                    
                }

            } catch (error) {
                alert('Invalid address (or network error). Try again.');
                console.log(error);
            }
            

        } else {
            alert('The address has to be longer than 3 letters')
        }

    }


    async fetchCoords(address) {
        const formattedAddress = encodeURIComponent(address);
        const url = `http://api.publictransport.tampere.fi/prod/?user=${'anttispitkanen'}&pass=${'nysse123'}&request=geocode&cities=tampere&format=json&key=${formattedAddress}&epsg_out=wgs84`;

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

    validatingAddress() {
        if (this.state.addressValidationInProgress) {
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


    cancel() {
        this.properties.navigation.goBack(null);
    }
    

    render() {

        return(
            <Image source={require('../public/map.png')} style={styles.backgroundImage}>
                <View style={styles.container}>

                    <Text style={styles.heading}>Where are you?</Text>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Where are you?"
                        ref="address"
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        maxLength={50}
                        returnKeyType="done"
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
                            onPress={() => this.fetchWithAddress()}>
                            <Text>Ok</Text>
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
        borderRadius: 5
    }
})