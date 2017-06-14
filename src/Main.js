import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    Button
 } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Header from './components/Header';
import Footer from './components/Footer';
import Hotspots from './components/Hotspots';
import Info from './components/Info';
import InfoButton from './components/InfoButton';
import LocationAndHotspotsContainer from './components/LocationAndHotspotsContainer';
import AddHotspotForm from './components/AddHotspotForm';
import HotspotView from './components/HotspotView';
import ManualLocation from './components/ManualLocation';


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FBFEF9'
    }
})


class MainScreen extends Component {
    static navigationOptions = {
        title: null,
        header: null
    }
    
    render() {

        return(
            <ScrollView style={styles.main}>
                <Header />
                <LocationAndHotspotsContainer navigation={this.props.navigation} />
                <InfoButton {...this.props} />
                <Footer />
            </ScrollView>
        )

    }
}

const Main = StackNavigator({
    Main: { screen: MainScreen },
    Info: { screen: Info },
    AddHotspotForm: { screen: AddHotspotForm },
    HotspotView: { screen: HotspotView },
    ManualLocation: { screen: ManualLocation }
})

console.ignoredYellowBox = ['Warning: BackAndroid'];

export default Main;
