import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet
 } from 'react-native';

import Header from './components/Header';
import Footer from './components/Footer';
import Hotspots from './components/Hotspots';

export default class Main extends Component {
    render() {
        return(
            <ScrollView style={styles.main}>
                <Header />
                <Hotspots />
                <Footer />
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})