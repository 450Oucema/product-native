import React from 'react';
import {StyleSheet, View, Alert, Text, StatusBar, Image, Dimensions, TouchableOpacity} from 'react-native';
import {ProductList} from "./components/ProductList";
import Header from "./components/Header";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 25,
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
        fontWeight: "bold",
        textAlign: 'center',
        width: '75%',
    },
});

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "Hello everybody, welcome to my superstore",
            bodyText: "To purchase something, don't forget to log in.",
            isSearching: true
        }
        this.handleTap = this.handleTap.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
    }

    handleTap() {
        let searching = this.state.isSearching;
        this.setState({isSearching: !searching})
    }

    handleNavigate(id) {
        this.props.navigation.navigate('Product', {id: id})
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.handleTap}>
                    <Header/>
                </TouchableOpacity>
                <ProductList handleNavigate={this.handleNavigate} isSearching={this.state.isSearching}/>
        </View>
        )
    }

}
