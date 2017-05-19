import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


const Header = () => (
    <View style={styles.container}>
        <Text style={styles.h1}>TreBus</Text>
        <Text style={styles.h2}>The fastest bus app in Tampere</Text>
    </View>
)


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 110,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#A31621',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: .8
  },
  h1: {
    color: '#FBFEF9',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5
  },
  h2: {
    color: '#FBFEF9',
    fontStyle: 'italic',
    textAlign: 'center'
  }

});

export default Header;