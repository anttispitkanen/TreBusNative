import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    Button
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { SortableListView } from 'react-native-sortable-listview'


import Hotspot from './Hotspot';
import AddHotspotForm from './AddHotspotForm';
import MyLocation from './MyLocation';
import AddHotspotButton from './AddHotspotButton';


const STORAGE_KEY = '@TreBus:Hotspots';


export default class Hotspots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hotspots: null
        }
    }

    async componentWillMount() {
        try {
            let value = await AsyncStorage.getItem(STORAGE_KEY);
            // value = null; // UNCOMMENT THIS TO RESET ASYNCSTORAGE UPON REFRESH
            if (!value) {
                await AsyncStorage.setItem(STORAGE_KEY, '[]');
                console.log('ei ollut, mutta nyt on');
                value = await AsyncStorage.getItem(STORAGE_KEY);
            }
            this.setState({
                hotspots: JSON.parse(value)
            })
            
        } catch (error) {
            alert('kammottava virhe Hotspotsissa!');
        }
    }

    async watchaGot() {
        try {
            let hotspots = await AsyncStorage.getItem(STORAGE_KEY);
            alert(hotspots);
        } catch (error) {
            alert('tapahtui virhe Hotspotsissa!!!');
        }
        
    }

    async fetchHotspots() {
        try {
            let hotspots = await AsyncStorage.getItem(STORAGE_KEY);
            this.setState({
                hotspots: hotspots
            })    
        } catch (error) {
            alert('error in fetchHotspots()');
            console.log(error);
        }
        
    }


    hotspotAdded(newHotspot) {
        let hotspots = this.state.hotspots;
        hotspots.push(newHotspot);
        this.setState({
            hotspots: hotspots
        })
        this.saveHotspotsToStorage();
    }

    async saveHotspotsToStorage() {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.hotspots));
        } catch (error) {
            alert('error in saveHotspotsToStorage()');
            console.log(error);
        }
    }


    hotspotDeleted(deletedHotspotName) {

        let indexToDelete = null;
        let hotspots = this.state.hotspots;
        
        hotspots.forEach((hotspot, i) => {
            if (hotspot.name === deletedHotspotName) {
                indexToDelete = i;
            }
        })
        
        let removed = hotspots.splice(indexToDelete, 1);

        // this is the asynchronous callback syntax
        this.setState(() => {
            return { hotspots: hotspots }
        }, () => this.saveHotspotsToStorage())
    }


    render() {
        let hotspots = this.state.hotspots;

        if(!hotspots) {return <Text style={{textAlign: 'center'}}>Waiting...</Text>};

        if (!this.props.startCoords) {
            return(
                <View style={styles.hotspots}>
                    {hotspots.map((hs, i) => {
                        return(
                            <Hotspot 
                                key={i}
                                name={hs.name}
                                address={hs.address}
                                destCoords={hs.coords}
                                waitingForLocation="Waiting for location..." 
                                navigation={this.props.navigation}
                                delete={(deletedHotspotName) => this.hotspotDeleted(deletedHotspotName)}
                            />
                        )
                    })}
                    
                    <AddHotspotButton
                        navigation={this.props.navigation}
                        hotspotAdded={(newHotspot) => this.hotspotAdded(newHotspot)}
                    />
                    
                </View>
            )
        }

        return (
            <View style={styles.hotspots}>
                {hotspots.map((hs, i) => {
                    return(
                        <Hotspot 
                            key={i}
                            name={hs.name}
                            address={hs.address}
                            startCoords={this.props.startCoords}
                            destCoords={hs.coords}
                            navigation={this.props.navigation}
                            delete={(deletedHotspotName) => this.hotspotDeleted(deletedHotspotName)}
                        />
                    )
                })}

                <AddHotspotButton 
                    navigation={this.props.navigation}
                    hotspotAdded={(newHotspot) => this.hotspotAdded(newHotspot)}
                />
                
            </View>
            
        )
    }
}





const styles = StyleSheet.create({
    hotspots: {

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
