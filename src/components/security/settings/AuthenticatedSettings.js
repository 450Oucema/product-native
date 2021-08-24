import React from "react";
import {Text, View, StyleSheet} from "react-native";
import UserContext from "../../../contexts/UserContext";
import {Button} from "react-native-paper";
import firebase from "firebase";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default function AuthenticatedSettings() {
    const logout = (context) => {
        firebase.auth().signOut().then(() => context.setUser(null))
    }

    return (
        <UserContext.Consumer>
            {context => (
                <View style={styles.container}>
                    <Text>Hello, {context.user.email}</Text>
                    <Button icon="camera" mode="contained" onPress={() => logout(context)}>
                        Sign out
                    </Button>
                </View>
            )}
        </UserContext.Consumer>
    )
}
