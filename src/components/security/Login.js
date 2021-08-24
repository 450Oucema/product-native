import React from "react";
import {Text, TextInput, View} from "react-native";
import UserContext from "../../contexts/UserContext";
import {Button} from "react-native-paper";
import firebase from "firebase";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            plainPassword: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleEmailChange(text) {
        this.setState({email: text.toLowerCase()})
    }

    handlePasswordChange(text) {
        this.setState({plainPassword: text})
    }

    handleSubmit(context) {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.plainPassword).then((userCredentials) => {
            context.setUser(userCredentials.user)
            this.props.navigation.navigate('Settings')
        }).catch((error) => {
            console.log('error', error);
        })
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.handleEmailChange(text)}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry={true}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.handlePasswordChange(text)}
                    value={this.state.plainPassword}
                />
                <UserContext.Consumer>
                    {context => (
                        <Button icon="account-check-outline" mode="contained" onPress={() => this.handleSubmit(context)}>
                            Login
                        </Button>
                    )}
                </UserContext.Consumer>
            </View>
        );
    }

}
