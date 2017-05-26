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
        this.setState({
            address: newLocation.address,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
            coords: newLocation.coords
        })
    }

    render() {
        return(
            <View>
                <MyLocation 
                    updateLocation={(newLoc) => this.updateLocation(newLoc)} 
                    address={this.state.address}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                />

                <Hotspots 
                    startCoords={this.state.coords}
                />
                
            </View>
        )
    }
}


// const HotspotTabNavigator = StackNavigator({
//     Hotspots: { screen: Hotspots },
//     AddHotspotForm: { screen: AddHotspotForm }
// })

{/*<HotspotTabNavigator />*/}

// const HotspotTabNavigator = TabNavigator({
//     Hotspots: { screen: Hotspots },
//     AddHotspotForm: { screen: AddHotspotForm }
// })

{/*<Hotspots 
    startCoords={this.state.coords}
    {...this.props} 
/>*/}

// startCoords={this.state.startCoords}