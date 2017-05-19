import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableHighlight,
    Button
} from 'react-native';

export default class Info extends Component {
    
    static navigationOptions = {
        title: 'About TreBus'
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.headline}>Welcome to TreBus!</Text>

                <Text style={styles.p}>TreBus is an app to help you navigate your bus schedules in the city of Tampere</Text>
                <Text style={styles.p}>The point is to add Hotspots: places you often visit, like your home, workplace, school...</Text>
                <Text style={styles.p}>
                    TreBus uses geolocation to locate you (when possible) and tells you how fast and how to get to
                    those hotspots from your current location.
                </Text>
                <Text style={styles.p}>
                     If you want you can check out the source code on GitHub:
                </Text>

                <Button 
                    title="See source"
                    onPress={() => Linking.openURL('https://github.com/anttispitkanen')}
                />
                
                <Text style={styles.p}>-Antti Pitkänen</Text>
                <Text style={styles.p}>(This app is a personal project of mine and not intended for mass use.)</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FBFEF9',
        flex: 1
    },
    headline: {
        fontSize: 20,
        color: '#A31621',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    p: {
        color: '#A31621',
        textAlign: 'justify',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    }
})

{/*<TouchableHighlight 
                    onPress={Linking.openURL('https://github.com/anttispitkanen')}>
                    GitHub
                </TouchableHighlight>*/}