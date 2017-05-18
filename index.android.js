/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Linking,
  TouchableHighlight
} from 'react-native';

// TESTING
import Header from './src/components/Header';

export default class TreBusNative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPic: true,
      whoToGreet: [],
      wikipediaArticle: null
    }
  
    // setInterval(() => {
    //   this.setState({showPic: !this.state.showPic})
    // }, 1000)
  }

  addGreetedPeople(event) {

    let people = this.state.whoToGreet;
    people.push(event.nativeEvent.text);
    this.setState({
      whoToGreet: people
    })
    this.refs.greeter.clear();
  }
  
  greetedPeople() {
    return this.state.whoToGreet.map((person, i) => {
      return(<Greeting key={i} style={{color: 'red'}} name={person}/>)
    })
  }



  // async randomWikipediaArticles() {
  //   let mockArr = [null, null, null, null, null]
  //   return mockArr.map(async (article, i) => {
  //     return(<Text>{await fetchRandomWikipediaArticle()}</Text>);
  //   })
  // }

  render() {


    const opac = this.state.showPic ? 1 : 0;

    const picStyles = {
      width: 300,
      height: 300,
      opacity: opac
    }

    const pic = {
      uri: 'https://instagram.fhel1-1.fna.fbcdn.net/t51.2885-15/e35/18444727_775998689231100_5635741341464920064_n.jpg'
    }

    return(
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>

        <Header />
        

        <TouchableHighlight 
            onPress={() => alert('MIAU!! :DD')}
            onLongPress={() => alert('MIIIIIAAAAAAUUUUUUU! :DDD')}
        >
          <Image source={pic} style={picStyles} />
        </TouchableHighlight>
        
        
      
        <Wikipedia title={this.state.wikipediaArticle} />
        
      </View>
    );
  }
}

class Wikipedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'title': null,
      'link': null
    }
  }

  async fetchRandomWikipediaArticle() {
    const randomWikipedia = 'https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnlimit=1&rnnamespace=0';
    
    try {
      let response = await fetch(randomWikipedia);
      let responseJSON = await response.json();
      console.log(responseJSON.query.random[0].title);

      this.setState({
        title: responseJSON.query.random[0].title,
        link: 'https://en.wikipedia.org'
      })
      

    } catch (error) {
      console.error(error);
    }
    
  }

  componentDidMount() {
    this.fetchRandomWikipediaArticle();
  }


  render() {

    if(!this.state.title || !this.state.link) {
      return(<Text>Loading...</Text>)
    }

    return(
      <TouchableHighlight
        onPress={() => { Linking.openURL(this.state.link) }}
      >
        <Text style={{marginLeft: 30, marginRight: 30, textAlign: 'center'}}>Randomly from Wikipedia: {this.state.title}</Text>
      </TouchableHighlight>
    )
  }
}



class Greeting extends Component {
  render() {
    return(
      <Text style={this.props.style}>Hellou {this.props.name}! :DD</Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('TreBusNative', () => TreBusNative);

{/*<Greeting style={{color: 'red'}} name='Pötkö' />
<Greeting style={{color: 'green'}} name='Pömpylä' />
<Greeting style={{color: 'blue'}} name='Pöllö-Vaari' />*/}

// style={styles.container}

// {this.greetedPeople()}

{/*<TextInput
          style={{height: 40}}
          placeholder="Who do we greet? :D"
          ref="greeter"
          onSubmitEditing={(event) => this.addGreetedPeople(event)}
        />*/}