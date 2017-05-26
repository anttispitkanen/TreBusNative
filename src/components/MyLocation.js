import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
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
        // this.props.updateLocation({
        //     address: 'Visiokatu 1',
        //     latitude: 'lalala',
        //     longitude: 'lololo',
        //     coords: longitude + ',' + latitude
        // });

        

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
                // alert(this.state.coords);

                // const url = 'http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=geocode&format=json&cities=tampere&epsg_out=wgs84&key=sarvijaakonkatu+18';
                const url = `http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=reverse_geocode&coordinate=${this.state.coords}&limit=1&epsg_in=wgs84&format=json`;

                try {
                    let response = await fetch(url);
                    let responseJSON = await response.json();
                    const streetname = responseJSON[0].name;
                    const num = responseJSON[0].details.houseNumber;
                    // alert(JSON.stringify(responseJSON));
                    
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
                    alert(error);
                }

            },
            error => {
                alert(JSON.stringify(error));
            }
        )

    }


    render() {
        return(
            <View style={styles.container}>
                <Location 
                    address={this.props.address}
                    latitude={this.props.latitude}
                    longitude={this.props.longitude} 
                />
                
                <Button 
                    title="Locate me"
                    onPress={() => this.locateMe()}
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    address: {
        margin: 20
    }
})
