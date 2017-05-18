import React, { Component } from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    Button
 } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';

import Header from './components/Header';
import Footer from './components/Footer';
import Hotspots from './components/Hotspots';
import Info from './components/Info';

// export default class Main extends Component {
    
// }





const styles = StyleSheet.create({
    main: {
        flex: 1
    }
})


class MainScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    
    render() {
        const { navigate } = this.props.navigation;

        return(
            <ScrollView style={styles.main}>
                <Header />
                <Hotspots />
                <Footer />
                <Button
                    onPress={() => navigate('Info')}
                    title="Info"
                />
            </ScrollView>
        )

    }
}

const Main = StackNavigator({
    Main: { screen: MainScreen },
    Info: { screen: Info }
})


/*class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Welcome'
    }
    render() {
        const { navigate } = this.props.navigation;

        return(
            <View>
                <Text>Hello, Navigation!</Text>
                <Button 
                    onPress={() => navigate('Chat', {user: 'Pötkö'})}
                    title="Chat with someone"
                />
            </View>
        ) 
    }
}


class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`
    })
    render() {
        // The screen's current route is passed in to `props.navigation.state`
        const { params } = this.props.navigation.state;
        return(
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        )
    }
}

class RecentScreen extends Component {
    render() {
        return <Text>Recent</Text>
    }
}

class AllScreen extends Component {
    render() {
        return <Text>All</Text>
    }
}



const Main = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen }
})*/

export default Main;