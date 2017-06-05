import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';


export default class Location extends Component {
    render() {
        if (this.props.address && (!this.props.latitude || !this.props.longitude)) {
            return <Text>Locating...</Text>
        }
        
        if (!this.props.address || !this.props.latitude || !this.props.longitude) {
            return <Text>Waiting for location -></Text>
        }
        
        return(
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{this.props.address}</Text>
                <Text>Lat: {this.props.latitude}</Text>
                <Text>Long: {this.props.longitude}</Text>
            </View>
        )
    }
}