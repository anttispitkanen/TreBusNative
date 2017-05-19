import React, { Component } from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';


export default class InfoButton extends Component {
    

    render() {
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.infoButton}>
                <Button
                    onPress={() => navigate('Info')}
                    title="What's TreBus?"
                    accessibilityLabel="Information on TreBus"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    infoButton: {
        margin: 30,
        flex: 0
    }
})