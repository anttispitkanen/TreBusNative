import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Linking,
    Button,
    Alert
} from 'react-native';


export default class HotspotView extends Component {



    deleteHotspot() {
        
        const properties = this.props.navigation.state.params.props;
        Alert.alert(
            `Delete ${properties.name}?`,
            null,
            [
                {
                    text: 'Cancel', 
                    onPress: () => null
                }, {
                    text: 'Delete',
                    onPress: () => {
                        properties.delete(properties.name);
                        properties.navigation.goBack(null);
                    }
                }
            ]
        )
    }
    
    render() {
        
        const properties = this.props.navigation.state.params.props;
        const state = this.props.navigation.state.params.state;

        console.log(properties);
        console.log(state);
        

        return(
            <View style={styles.container}>
                <Text style={styles.heading}>{properties.name}</Text>
                <Text style={styles.address}>{properties.address}</Text>
                
                <HotspotInfoTexts info={state} />
                
                

                <View style={styles.buttonContainer}>
                    <Button 
                        title={`Delete ${properties.name}`}
                        onPress={() => this.deleteHotspot()}
                    />
                </View>
            </View>
        )
    }
}


class HotspotInfoTexts extends Component {
    render() {
        if (!this.props.info.arrivalTime) {
            return (
                <View style={styles.infoText}>
                    <Text>Location needed for routing...</Text>
                </View>
            );
        }

        const info = this.props.info;

        return(
            <View style={styles.infoText}>
                <Text>{info.arrivalTime}</Text>
                <Text>{info.busNumber}</Text>
                <Text>{info.departureTime}</Text>
                <Text>{info.distance}</Text>

                <HotspotStopInfo info={info.departAddress} />
            </View>
        )
    }
}

class HotspotStopInfo extends Component {
    render() {
        const info = this.props.info;

        if (info.justWalk) {
            return null;
        }

        return (
            <View style={styles.buttonContainer}>
                <Button 
                    title={info.departStop}
                    onPress={() => Linking.openURL(info.linkToLissu) }
                />
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
        fontSize: 20,
    },
    address: {
        marginBottom: 40,
        marginTop: 3
    },
    infoText: {
        margin: 20
    },
    buttonContainer: {
        margin: 40
    }
})