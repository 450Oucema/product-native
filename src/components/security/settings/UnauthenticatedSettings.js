import React from "react";
import {StyleSheet, Text, View} from "react-native";
import UserContext from "../../../contexts/UserContext";
import {Button} from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default function UnauthenticatedSettings(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Hello</Text>
            <Text numberOfLines={5}>Please sign in or register</Text>
            <Button onPress={() => props.handleNavigate('Login')}>Login</Button>
            <Button onPress={() => props.handleNavigate('Register')}>Register</Button>
        </View>
    )
}
