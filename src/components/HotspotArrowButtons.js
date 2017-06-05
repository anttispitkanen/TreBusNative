import React, { Component } from 'react';
import {
    TouchableHighlight,
    View,
    Image,
    StyleSheet
} from 'react-native';



export default class HotspotArrowButtons extends Component {
    
    

    render() {
        // threre could be some conditional that removes up arrow from first element and down arrow from last element
        return(
            <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => this.props.moveUp(this.props.index)} style={styles.buttonUpContainer}>
                    <Image source={require('../public/triup.png') } style={styles.buttonUp} />
                </TouchableHighlight>
                
                <TouchableHighlight onPress={() => this.props.moveDown(this.props.index)} style={styles.buttonDownContainer}>
                    <Image source={require('../public/triup.png') } style={styles.buttonDown} />
                </TouchableHighlight>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        // right: 20,
        // backgroundColor: 'yellow',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        // minHeight: 160
    },
    buttonUpContainer: {

    },
    buttonUp: {
        height: 30,
        width: 30
    },
    buttonDownContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonDown: {
        height: 30,
        width: 30,
        transform: [{rotate: '180deg'}]
    }
})