import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    Animated,
    Easing,
    Alert
} from 'react-native';

import Swipeable from 'react-native-swipeable';

import Utils from '../utils/Utils';

import HotspotArrowButtons from './HotspotArrowButtons';


export default class Hotspot extends Component {
    constructor(props) {
        super(props);
        
        this.spinValue = new Animated.Value(0);
        
        this.state = {
            thereIn: null,
            departureTime: null,
            busNumber: null,
            departAddress: null,
            arrivalTime: null,
            distance: null,
            routingInProgress: false
        };
        
    }

    componentDidMount() {
        // this.fetchRoute();
        
    }

    spin() {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear
            }
        ).start(() => {
            if (this.state.routingInProgress) { 
                this.spin();
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps !== this.props) {
        //     this.fetchRoute();
        // }
    }


    async fetchRoute() {
        const startCoords = this.props.startCoords;
        if (startCoords) {
            const destCoords = this.props.destCoords;
            const url = `http://api.publictransport.tampere.fi/prod/?user=anttispitkanen&pass=nysse123&request=route&from=${startCoords}&to=${destCoords}&show=1&Detail=limited&epsg_in=wgs84`;

            this.spin();

            this.setState({
                routingInProgress: true
            })
        
            try {
                const response = await fetch(url);
                const responseJSON = await response.json();
                const routeData = responseJSON[0][0];

                this.setState({
                    thereIn: Utils.parseMinsToArrival(routeData),
                    departureTime: Utils.parseDeparture(routeData),
                    busNumber: Utils.parseLineNum(routeData),
                    departAddress: Utils.parseStartingPoint(routeData),
                    arrivalTime: Utils.parseArrival(routeData),
                    distance: Utils.parseDistance(routeData)
                })

                // console.log(this.state);
                

            } catch (error) {
                alert('joku meni vikaan kun haettiin reittiä');
                console.log(error);
                
            }

            this.setState({
                routingInProgress: false
            })
        }
        
    }

    
    moveUp() {
        this.props.moveUp(this.props.index);
    }


    delete() {
        Alert.alert(
            `Delete ${this.props.name}?`,
            null,
            [
                {
                    text: 'Cancel', 
                    onPress: () => null
                }, {
                    text: 'Delete',
                    onPress: () => {
                        this.props.delete(this.props.index);
                    }
                }
            ]
        )
    }

    swipeable = null;


    render() {

        console.log('rendering ' + this.props.name);
        
        // let swipeable = null;

        const { navigate } = this.props.navigation;

        const rightContent = [
            <TouchableHighlight style={styles.arrowContainer} onPress={() => {
                // this.props.moveUp(this.props.index)
                this.delete()
                this.swipeable.recenter()}}>
                <Image source={require('../public/delete.png')} style={styles.arrowUp}/>
            </TouchableHighlight>, 

            // <TouchableHighlight style={styles.arrowContainer} onPress={() => {
            //     this.props.moveDown(this.props.index)
            //     this.swipeable.recenter()}}>
            //     <Image source={require('../public/arrowup.png')} style={styles.arrowDown}/>
            // </TouchableHighlight>
        ]

        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        if(this.props.waitingForLocation) {
            return(
                <Swipeable onRef={ref => this.swipeable = ref}
                            leftActionActivationDistance={50} 
                            onLeftActionRelease={() => {
                                alert('Location needed for routing')
                            }}
                            leftContent={<Text>Release to fetch route</Text>}
                            rightButtons={rightContent}>

                    <View style={styles.hotspot}>
                    
                        <Animated.Image 
                            source={require('../public/trebus.png')} 
                            style={{
                                height: 50,
                                width: 50,
                                margin: 20,
                                transform: [{rotate: spin}]
                            }} />

                        <View style={styles.hotspotTextContainer}>
                            <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props, state: this.state } )}>
                                <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                            </TouchableHighlight>
                            <Text>{this.props.waitingForLocation}</Text>
                        </View>

                        <HotspotArrowButtons 
                            index={this.props.index}
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown}
                        />

                    </View>
                </Swipeable>
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
                <Swipeable onRef={ref => this.swipeable = ref} 
                            leftContent={<Text>Release to fetch route</Text>}
                            leftActionActivationDistance={50}
                            onLeftActionRelease={() => {
                                this.fetchRoute()
                            }}
                            rightButtons={rightContent}>
                    <View style={styles.hotspot}>
                    
                        <Animated.Image 
                            source={require('../public/trebus.png')} 
                            style={{
                                height: 50,
                                width: 50,
                                margin: 20,
                                transform: [{rotate: spin}]
                            }} />

                        <View style={styles.hotspotTextContainer}>
                            <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props, state: this.state } )}>
                                <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                            </TouchableHighlight>
                            <Text>Swipe to fetch route -></Text>
                        </View>

                        <HotspotArrowButtons 
                            index={this.props.index}
                            moveUp={this.props.moveUp}
                            moveDown={this.props.moveDown}
                        />

                    </View>
                </Swipeable>
            )
        }

        const hnum = this.state.thereIn.hoursNum;
        const h = this.state.thereIn.hoursText;
        const mnum = this.state.thereIn.minsNum;
        const m = this.state.thereIn.minsText;

        return(
            <Swipeable onRef={ref => this.swipeable = ref} 
                        leftContent={<Text>Release to fetch route</Text>}
                        leftActionActivationDistance={50}
                        onLeftActionRelease={() => {
                            this.fetchRoute()
                        }}
                        rightButtons={rightContent}>
            
                <View style={styles.hotspot}>

                    <Animated.Image 
                            source={require('../public/trebus.png')} 
                            style={{
                                height: 50,
                                width: 50,
                                margin: 20,
                                transform: [{rotate: spin}]
                            }} />

                    <View style={styles.hotspotTextContainer}>
                        <TouchableHighlight onPress={() => navigate('HotspotView', { props: this.props, state: this.state } )}>
                            <Text style={styles.hotspotTitle}>{this.props.name}</Text>
                        </TouchableHighlight>

                        <Text>{hnum}{h}{mnum}{m}</Text>
                        <Text>{this.state.departureTime}</Text>
                        <Text>{this.state.busNumber}</Text>
                        {(!this.state.departAddress.departStop || this.state.departAddress.departStop === '') ? null : <Text>{this.state.departAddress.departStop}</Text>}
                        <Text>{this.state.arrivalTime}</Text>
                        <Text>{this.state.distance}</Text>
                    </View>
                    
                    <HotspotArrowButtons 
                        index={this.props.index}
                        moveUp={this.props.moveUp}
                        moveDown={this.props.moveDown}
                    />
                    
                </View>
            
            </Swipeable>
        )
    }
}


/*const ButtonUp = (props) => {
    <TouchableHighlight onPress={() => {
        this.props.moveUp()
    }}>
        <Text>^</Text>
    </TouchableHighlight>
}*/


const styles = StyleSheet.create({
    hotspot: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1,
    },
    busIcon: {
        height: 50,
        width: 50,
        margin: 20,
    },
    hotspotTextContainer: {
        marginRight: 10
    },
    hotspotTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    arrowContainer: {
        // backgroundColor: 'yellow',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1
    }, 
    arrowUp: {
        height: 33,
        width: 33
    },
    arrowDown: {
        height: 33,
        width: 33,
        transform: [{rotate: '180deg'}]
    }
})