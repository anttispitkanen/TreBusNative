import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import Utils from '../utils/Utils';

export default class Hotspot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thereIn: null,
            departureTime: null,
            busNumber: null,
            departAddress: null,
            arrivalTime: null,
            distance: null
        }
    }

    componentDidMount() {
        this.fetchRoute();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchRoute();
        }
    }


    async fetchRoute() {
        const startCoords = this.props.startCoords;
        if (startCoords) {
            const destCoords = this.props.destCoords;
            const url = `http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=route&from=${startCoords}&to=${destCoords}&show=1&Detail=limited&epsg_in=wgs84`;
        
            try {
                const response = await fetch(url);
                const responseJSON = await response.json();
                const routeData = responseJSON[0][0];
                // console.log(routeData);

                this.setState({
                    thereIn: Utils.parseMinsToArrival(routeData),
                    departureTime: Utils.parseDeparture(routeData),
                    busNumber: Utils.parseLineNum(routeData),
                    departAddress: Utils.parseStartingPoint(routeData),
                    arrivalTime: Utils.parseArrival(routeData),
                    distance: Utils.parseDistance(routeData)
                })

                console.log(this.state);
                

            } catch (error) {
                alert('joku meni vikaan kun haettiin reittiä');
                console.log(error);
                
            }
        }
        
    }


    render() {

        const { navigate } = this.props.navigation;

        if(this.props.waitingForLocation) {
            return(
                <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props } )}>
                    <View style={styles.hotspot}>
                    
                        <Image source={require('../public/trebus.png')} style={styles.busIcon} />

                        <View style={styles.hotspotTextContainer}>
                            <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                            <Text>{this.props.waitingForLocation}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }

        if(
            this.state.thereIn === null ||
            this.state.departureTime === null ||
            this.state.busNumber === null ||
            this.state.departAddress === null ||
            this.state.arrivalTime === null ||
            this.state.distance === null
        ) {
            return(
                <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props } )}>
                    <View style={styles.hotspot}>
                    
                        <Image source={require('../public/trebus.png')} style={styles.busIcon} />

                        <View style={styles.hotspotTextContainer}>
                            <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                            <Text>Fetching route...</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        }

        const hnum = this.state.thereIn.hoursNum;
        const h = this.state.thereIn.hoursText;
        const mnum = this.state.thereIn.minsNum;
        const m = this.state.thereIn.minsText;

        return(
            <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props } )}>
                <View style={styles.hotspot}>

                    <Image source={require('../public/trebus.png')} style={styles.busIcon} />

                    <View style={styles.hotspotTextContainer}>
                        <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                        <Text>{hnum}{h}{mnum}{m}</Text>
                        <Text>{this.state.departureTime}</Text>
                        <Text>{this.state.busNumber}</Text>
                        {(!this.state.departAddress.departStop || this.state.departAddress.departStop === '') ? null : <Text>{this.state.departAddress.departStop}</Text>}
                        <Text>{this.state.arrivalTime}</Text>
                        <Text>{this.state.distance}</Text>
                    </View>
                    
                </View>
            </TouchableHighlight>
        )
    }
}


const styles = StyleSheet.create({
    hotspot: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        // marginTop: 5,
        // marginBottom: 5,
        // shadowColor: 'black',
        // shadowRadius: 1,
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: .7,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    busIcon: {
        height: 50,
        width: 50,
        margin: 20
    },
    hotspotTextContainer: {

    },
    hotspotTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})