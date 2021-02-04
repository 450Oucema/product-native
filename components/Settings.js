import React from 'react';
import {StyleSheet, View, Alert, Text} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    jumbotron: {
        width: null,
        marginBottom: 10
    },
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "Settings !",
            bodyText: "To purchase something, don't forget to log in.",
            imageUrl: 'https://cdn.wallpapersafari.com/88/48/By67a4.jpg',
            imgWidth: 0,
            imgHeight: 0
        }
        this.onPressTitle = this.onPressTitle.bind(this);
    }

    onPressTitle () {
        Alert.alert("Vous avez cliqué sur le titre", "Merci d'être ici", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel pressed"),
                style: "cancel"
            },
            {
                text: "Ok",
                onPress: () => console.log("Ok pressed")
            },
        ])
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.titleText} onPress={this.onPressTitle}>{this.state.titleText}</Text>
            <Text numberOfLines={5}>{this.state.bodyText}</Text>
        </View>
        )
    }

}
