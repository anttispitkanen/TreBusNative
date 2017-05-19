import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Hotspot extends Component {
    
    render() {
        if (!this.props.thereIn || !this.props.departure) {
            return(
                <View style={styles.hotspot}>
                    <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                    <Text>Waiting for location...</Text>
                </View>
            )
        }

        return(
            <View style={styles.hotspot}>
                <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                <Text>{this.props.thereIn}</Text>
                <Text>{this.props.departure}</Text>
                <Text>{this.props.address}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    hotspot: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: .7
    },
    hotspotTitle: {
        fontSize: 20
    }
})