import React, { Component } from 'react';
import {
    View
} from 'react-native';

import MyLocation from './MyLocation';
import Hotspots from './Hotspots';

export default class LocationAndHotspotsContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            address: null,
            latitude: null,
            longitude: null
        }
    }

    updateLocation(newLocation) {
        this.setState({
            address: newLocation.address,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude
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
                <Hotspots address={this.state.address} {...this.props} />
            </View>
        )
    }


}