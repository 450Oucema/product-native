import React from 'react';
import {StyleSheet, View, Alert, Text, TouchableOpacity, Animated, Dimensions} from 'react-native';
import { Menu } from 'react-native-paper'
import {Ionicons} from "@expo/vector-icons";
const styles = StyleSheet.create({
    container: {
    },
    cover: {
        zIndex: 100,
        position: 'absolute',
        bottom: 0,
        height: '100%'
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        height: "100%",
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 100,
        bottom: 0,
    },
    popup: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        minHeight: 80,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        bottom: 0,
        width: '100%',
        position: 'absolute',
        flex: 1,
        textAlign: 'center'
    },
    select: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        backgroundColor: 'white',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        margin: 20,
        textAlign: 'center'
    },
    icon: {
        margin: 50
    }
});

const choices = [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' },
];

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
            choices: props.choices
        }
    }

    handleOpen = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };
    handleClose = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    handleSelect = (value) => {
        this.setState({selected: value})
        this.props.handleSelect(value)
    }

    render() {
        const screenHeight = Dimensions.get("window").height;

        const backdrop = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: this.state.animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp",
            }),
        };

        const slideUp = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, -1 * screenHeight],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };

        return (
            <React.Fragment>
                <TouchableOpacity onPress={this.handleOpen}>
                    <Text style={styles.select}>
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
                <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                    <View style={styles.sheet} >
                        <Animated.View style={[styles.popup, slideUp]}>
                            {this.state.choices.map((choice, index) =>
                                <Menu.Item icon={this.state.selected === choice.value ? "check" : ""}
                                           key={index}
                                           onPress={() => this.handleSelect(choice.value)}
                                           title={choice.label}
                                           style={{textAlign: 'center'}}
                                />
                            )}
                            <Menu.Item style={{backgroundColor: "#ffa9a9", borderRadius: 10}} icon="close" onPress={() => this.handleClose()} title={"Close"} />
                        </Animated.View>
                    </View>
                </Animated.View>
            </React.Fragment>
        )
    }

}
