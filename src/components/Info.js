import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    TouchableHighlight,
    Button,
    Image
} from 'react-native';

export default class Info extends Component {
    
    static navigationOptions = {
        title: 'About TreBus'
    }

    render() {
        return(
            <Image source={require('../public/blurbus.png')} style={styles.backgroundImage}>
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

                    <View style={styles.buttonContainer}>
                        {/*<Button 
                            title="See source"
                            onPress={() => Linking.openURL('https://github.com/anttispitkanen')}
                        />*/}

                        <TouchableHighlight
                            onPress={() => Linking.openURL('https://github.com/anttispitkanen')}
                            underlayColor="rgba(0,0,0,0)">
                            
                            <Text style={styles.seeSource}>See source</Text>

                        </TouchableHighlight>
                    </View>

                    <Text style={styles.p}>-Antti Pitkänen</Text>
                    <Text style={styles.p}>(This app is a personal project of mine and not intended for mass use.)</Text>
                </View>
            </Image>
        )
    }
}



const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        height: null,
        width: null,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center'
    },
    headline: {
        fontSize: 20,
        color: 'white',
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center'
    },
    p: {
        color: 'white',
        textAlign: 'justify',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5
    },
    seeSource: {
        margin: 10
    }
})

{/*<TouchableHighlight 
                    onPress={Linking.openURL('https://github.com/anttispitkanen')}>
                    GitHub
                </TouchableHighlight>*/}