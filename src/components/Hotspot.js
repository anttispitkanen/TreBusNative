import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class Hotspot extends Component {
    
    render() {
        return(
            <View style={styles.hotspot}>
                <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                <Text>{this.props.thereIn}</Text>
                <Text>{this.props.departure}</Text>
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
        margin: 5,
        shadowColor: 'black',
        shadowRadius: 1,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .8
    },
    hotspotTitle: {
        fontSize: 20
    }
})