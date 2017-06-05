import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

import Location from './Location';

export default class MyLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: null,
            latitude: null,
            longitude: null,
            coords: null
        }
    }

    async locateMe() {
        
        this.props.updateLocation({
            address: 'Locating...'
        })

        // THIS WORKS FOR GETTING THE POSITION
        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({
                    latitude: latitude,
                    longitude: longitude,
                    coords: longitude + ',' + latitude
                })

                const url = `http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=reverse_geocode&coordinate=${this.state.coords}&limit=1&epsg_in=wgs84&format=json`;
                

                try {
                    let response = await fetch(url);
                    let responseJSON = await response.json();

                    if (responseJSON[0].city !== 'Tampere') {
                        alert(`You seem to be in ${responseJSON[0].city}. TreBus only works in Tampere. ¯\\_(ツ)_/¯`);
                        throw new Error(`You seem to be in ${responseJSON[0].city}. TreBus only works in Tampere. ¯\\_(ツ)_/¯`);
                    }

                    const streetname = responseJSON[0].name;
                    const num = responseJSON[0].details.houseNumber;
                    
                    this.setState({
                        address: streetname + ' ' + num
                    })

                    this.props.updateLocation({
                        address: this.state.address,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        coords: this.state.coords
                    })

                } catch (error) {
                    alert('It seems you are not in Tampere ¯\\_(ツ)_/¯');
                    console.log(error);
                    
                    this.props.updateLocation({
                        address: null,
                        latitude: null,
                        longitude: null
                    })   
                }

            },
            error => {
                alert(JSON.stringify(error));
            }
        )

    }


    render() {

        const { navigate } = this.props.navigation;

        return(
            <View style={styles.container}>
                <Location 
                    address={this.props.address}
                    latitude={this.props.latitude}
                    longitude={this.props.longitude} 
                />
                
                <TouchableHighlight 
                    onPress={() => this.locateMe()}
                    
                    onLongPress={() => {
                        navigate('ManualLocation', { props: this.props })
                    }}
                    
                    underlayColor="rgba(0,0,0,0)">
                    
                    <Text style={styles.locateMe}>Locate me</Text>

                </TouchableHighlight>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#DDD',
        borderBottomWidth: 1
    },
    address: {
        margin: 20
    },
    locateMe: {
        // backgroundColor: 'yellow',
        paddingTop: 10,
        paddingBottom: 10,
        color: 'rgb(26,73,243)',
        fontSize: 18
    }
})
