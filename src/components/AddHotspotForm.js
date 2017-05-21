import React, { Component } from 'react';
import {
    Button,
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';


export default class AddHotspotForm extends Component {

    addNewHotspot() {
        alert(`added hotspot\n name: ${this.refs.name._lastNativeText}\n address: ${this.refs.address._lastNativeText}`);
        this.props.navigation.goBack();
    }

    cancel() {
        this.refs.name.clear();
        this.refs.address.clear();
        this.props.navigation.goBack();
    }

    render() {
        
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>Add a Hotspot</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    ref="name"
                />

                <TextInput
                    style={styles.textInput}
                    placeholder="Address"
                    ref="address"
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="Add"
                            onPress={() => this.addNewHotspot()} 
                        />
                    </View>

                    <View style={styles.button}>
                        <Button 
                            title="Cancel"
                            onPress={() => this.cancel()} 
                        />
                    </View>
                </View>
           </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 30
        // flex: 1
    },
    textInput: {
        padding: 10,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FBFEF9'

    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    button: {
        margin: 10
    }
})