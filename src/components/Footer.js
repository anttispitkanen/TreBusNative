import React, { Component } from 'react';
import { Text, Linking, StyleSheet } from 'react-native';

const Footer = () => (
    <Text
        style={styles.footer} 
        onPress={() => {Linking.openURL('https://github.com/anttispitkanen')}}>
        © Antti Pitkänen 2017
    </Text>
)

const styles = StyleSheet.create({
    footer: {
        
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
})

export default Footer;

