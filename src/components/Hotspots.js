import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    Button
} from 'react-native';

import Hotspot from './Hotspot';
import AddHotspot from './AddHotspot';
import MyLocation from './MyLocation';


const STORAGE_KEY = '@TreBus:Hotspots';


export default class Hotspots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotspots: null
        }
    }

    async componentDidMount() {
        try {
            let value = await AsyncStorage.getItem(STORAGE_KEY);
            if (!value) {
                await AsyncStorage.setItem(STORAGE_KEY, '[]');
                console.log('ei ollut, mutta nyt on');
                value = await AsyncStorage.getItem(STORAGE_KEY);
            }
            this.setState({
                hotspots: JSON.parse(value)
            })
            // alert('nyt on ' + JSON.stringify(this.state.hotspots))
        } catch (error) {
            alert('kammottava virhe!');
        }
    }

    addStuff() {
        let ans = 'mitä laitetaan? :D';
        let hotspots = this.state.hotspots;
        hotspots.push(ans);
        alert(JSON.stringify(hotspots));
    }


    render() {
        if (!this.props.address) {
            return(
                <View style={styles.hotspots}>
                    <Button
                        title="laitetaan jotain"
                        onPress={() => this.addStuff()}
                    />
                    {spots.map((s, i) => {
                        return (
                            <Hotspot 
                                key={i} 
                                thereIn="Waiting for location..." 
                                name={s.name}
                            />
                        )
                    })}
                    <AddHotspot {...this.props} />
                </View>
            )
        }

        return (
            <View style={styles.hotspots}>
                {spots.map((s, i) => {
                    return (
                        <Hotspot 
                            key={i} 
                            {...s}
                            address={this.props.address}
                        />
                    )
                })}
                <AddHotspot {...this.props} />
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
