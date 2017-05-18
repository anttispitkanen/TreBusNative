import React, { Component } from 'react';
import { 
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';


const Header = () => (
    <View style={styles.container}>
        <TouchableHighlight style={styles.info}
              onPress={() => alert('jaa infoa kaipaisit? :D')}
        >
          <Text>?</Text>
        </TouchableHighlight>
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
  },
  info: {
    // flex: 0,
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 9,
    marginTop: 20,
    marginRight: 10,
    backgroundColor: '#FBFEF9',
    borderRadius: 100
  }

});

export default Header;