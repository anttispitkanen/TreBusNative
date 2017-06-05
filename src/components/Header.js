import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image
} from 'react-native';


const Header = () => (
    <Image source={require('../public/bussi.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
          <Text style={styles.h1}>Tre</Text>
          <Text style={styles.h1}>Bus</Text>
      </View>
    </Image>
)


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  container: {
    height: 140,
    justifyContent: 'center',
    // backgroundColor: '#A31621',
  },
  h1: {
    color: '#FF5',
    fontSize: 35,
    fontWeight: 'bold',
    lineHeight: 35,
    marginLeft: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    textShadowColor: 'black',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4
  },
  h2: {
    color: '#FBFEF9',
    fontStyle: 'italic',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2
  }

});

export default Header;