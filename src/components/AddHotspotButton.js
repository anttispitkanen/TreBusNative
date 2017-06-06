import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';


export default class AddHotspotButton extends Component {
    render() {

        const { navigate } = this.props.navigation;

        return(
            <View style={styles.buttonContainer}>

                <TouchableHighlight
                    onPress={() => navigate('AddHotspotForm', 
                                    { added: (newHotspot) => this.props.hotspotAdded(newHotspot)})}
                    underlayColor="rgba(0,0,0,0)">
                    <Text style={styles.addHotspotButton}>Add hotspot</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 40,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    addHotspotButton: {
        color: 'rgb(26,73,243)',
        fontSize: 18
    }
})