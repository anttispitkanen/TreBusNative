import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';


export default class HotspotView extends Component {
    
    render() {
        
        const properties = this.props.navigation.state.params.props;

        return(
            <View style={styles.container}>
                <Text style={styles.heading}>{properties.name}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FBFEF9'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    }
})