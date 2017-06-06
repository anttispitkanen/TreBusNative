import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';


export default class InfoButton extends Component {
    

    render() {
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.container}>
                <TouchableHighlight
                    onPress={() => navigate('Info')}
                    underlayColor="rgba(0,0,0,0)">

                    <Text style={styles.infoButton}>What's TreBus?</Text>

                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    infoButton: {
        fontSize: 18,
        color: 'rgb(26,73,243)'
    }
})