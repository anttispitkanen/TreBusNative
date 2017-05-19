import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';

export default class AddHotspot extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Button
                    title="Add Hotspot"
                    onPress={() => alert('added :DD')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
    }
})