import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';


export default class AddHotspotButton extends Component {
    render() {

        const { navigate } = this.props.navigation;

        return(
            <View style={styles.buttonContainer}>
                <Button 
                    title="Add hotspot"
                    onPress={() => navigate('AddHotspotForm', { added: (newHotspot) => this.props.hotspotAdded(newHotspot) })}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 40,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    }
})