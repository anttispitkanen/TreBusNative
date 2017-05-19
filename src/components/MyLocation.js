import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';

import Location from './Location';

export default class MyLocation extends Component {

    locateMe() {
        this.props.updateLocation({
            address: 'Visiokatu 1',
            latitude: 'lalala',
            longitude: 'lololo'
        });

        

        // THIS WORKS FOR GETTING THE POSITION
        // navigator.geolocation.getCurrentPosition(
        //     position => {
        //         alert(JSON.stringify(position));
        //     },
        //     error => {
        //         alert(JSON.stringify(error));
        //     }
        // )

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
