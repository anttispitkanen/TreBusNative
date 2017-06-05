import React, { Component } from 'react';
import {
    View
} from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

import MyLocation from './MyLocation';
import Hotspots from './Hotspots';
import AddHotspotForm from './AddHotspotForm';

export default class LocationAndHotspotsContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: null,
            latitude: null,
            longitude: null,
            coords: null
        }
    }

    updateLocation(newLocation) {
        this.setState(() => {
            return {
                address: null,
                latitude: null,
                longitude: null,
                coords: null
            }
        }, () => this.setState({
            address: newLocation.address,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
            coords: newLocation.coords
        }))
        // this.setState({
        //     address: newLocation.address,
        //     latitude: newLocation.latitude,
        //     longitude: newLocation.longitude,
        //     coords: newLocation.coords
        // })
    }

    render() {
        return(
            <View>
                <MyLocation 
                    updateLocation={(newLoc) => this.updateLocation(newLoc)} 
                    address={this.state.address}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    navigation={this.props.navigation}
                />

                <Hotspots 
                    startCoords={this.state.coords}
                    navigation={this.props.navigation}
                />
                
            </View>
        )
    }
}
