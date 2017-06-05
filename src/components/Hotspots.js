import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    AsyncStorage,
    Button,
    TouchableHighlight
} from 'react-native';

import { StackNavigator } from 'react-navigation';

const SortableListView = require('react-native-sortable-listview');


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
            console.log(error);
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



    hotspotDeleted(index) {

        if (index >= 0 && index < this.state.hotspots.length) {
            let hotspots = this.state.hotspots;

            hotspots.splice(index, 1);

            this.setState(() => {
                return {
                    hotspots: hotspots
                }
            },() => { this.saveHotspotsToStorage() })
        }
    }


    moveHotspotUp(index) {
        if (index !== null && index > 0) {
            this.moveHotspot(index, index-1);
        }
    }

    moveHotspotDown(index) {
        if (index !== null && index < this.state.hotspots.length - 1) {
            this.moveHotspot(index, index+1);
        }
    }


    moveHotspot(oldPos, newPos) {
        let hotspots = this.state.hotspots;
        let hotspotToMove = hotspots.splice(oldPos, 1)[0];
        hotspots.splice(newPos, 0, hotspotToMove);
        this.setState(() => {
            return { hotspots: hotspots }
        }, () => this.saveHotspotsToStorage())
    }



    render() {
        let hotspots = this.state.hotspots;

        if(!hotspots) { return <Text style={{textAlign: 'center'}}>Waiting...</Text> };

        if (!this.props.startCoords) {
            return(
                <View style={styles.hotspots}>
                    {hotspots.map((hs, i) => {
                        return(
                            <Hotspot 
                                key={hs.name}
                                index={i}
                                name={hs.name}
                                address={hs.address}
                                destCoords={hs.coords}
                                waitingForLocation="Waiting for location..." 
                                navigation={this.props.navigation}
                                delete={(index) => this.hotspotDeleted(index)}
                                moveUp={(index) => this.moveHotspotUp(index)}
                                moveDown={(index) => this.moveHotspotDown(index)}
                            />
                        )
                    })}
                    
                    <AddHotspotButton
                        navigation={this.props.navigation}
                        hotspotAdded={(newHotspot) => this.hotspotAdded(newHotspot)}
                        hotspotsFull={this.state.hotspots.length > 7}
                    />
                    
                </View>
            )

        }

        return (
            <View style={styles.hotspots}>
                {hotspots.map((hs, i) => {
                    return(
                        <Hotspot 
                            key={hs.name}
                            index={i}
                            name={hs.name}
                            address={hs.address}
                            startCoords={this.props.startCoords}
                            destCoords={hs.coords}
                            navigation={this.props.navigation}
                            delete={(index) => this.hotspotDeleted(index)}
                            moveUp={(index) => this.moveHotspotUp(index)}
                            moveDown={(index) => this.moveHotspotDown(index)}
                        />
                    )
                })}

                <AddHotspotButton 
                    navigation={this.props.navigation}
                    hotspotAdded={(newHotspot) => this.hotspotAdded(newHotspot)}
                    hotspotsFull={this.state.hotspots.length > 7}
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
