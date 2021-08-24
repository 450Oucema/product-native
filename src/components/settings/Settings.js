import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from "react-native-paper";
import UserContext from "../../contexts/UserContext";
import AuthenticatedSettings from "../security/settings/AuthenticatedSettings";
import UnauthenticatedSettings from "../security/settings/UnauthenticatedSettings";

const styles = StyleSheet.create({
    jumbotron: {
        width: null,
        marginBottom: 10
    },
});

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        console.log('Settings Props', props)
        this.state = {
            titleText: "Settings !",
            bodyText: "To purchase something, don't forget to log in.",
            imageUrl: 'https://cdn.wallpapersafari.com/88/48/By67a4.jpg',
            imgWidth: 0,
            imgHeight: 0
        }
        this.handleNavigate = this.handleNavigate.bind(this)
    }

    handleNavigate(route) {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <UserContext.Consumer>
                {context => context.user ? <AuthenticatedSettings handleNavigate={this.handleNavigate}/> : <UnauthenticatedSettings handleNavigate={this.handleNavigate}/>}
            </UserContext.Consumer>
        )
    }

}
