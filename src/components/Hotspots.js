import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native';

import Hotspot from './Hotspot';


export default class Hotspots extends Component {
    render() {
        return (
            <View style={styles.hotspots}>
                {spots.map((s, i) => {
                    return (
                        <Hotspot
                            key={i}
                            {...s}
                        />
                    )
                })}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    hotspots: {
        // flex: 1,
        // alignItems: 'center',
        // backgroundColor: 'yellow'
    },
    text: {
        flex: 1,
        height: 40,
        backgroundColor: 'green',
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 2,
        shadowOpacity: .8
    }
})


const spots = [
    {
        name: 'Koti',
        thereIn: '10 minutes',
        departure: '10.00'
    },
    {
        name: 'Vincit',
        thereIn: '31 minutes',
        departure: '8.06'
    },
    {
        name: 'Rautatieasema',
        thereIn: '23 minutes',
        departure: '13.56'
    },
    {
        name: 'Rautatieasema',
        thereIn: '23 minutes',
        departure: '13.56'
    },
    {
        name: 'Rautatieasema',
        thereIn: '23 minutes',
        departure: '13.56'
    }
]