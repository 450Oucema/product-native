import React from "react";
import {
    Button,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableWithoutFeedback,
    View
} from "react-native";
import UserContext from "../../../contexts/UserContext";

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
        paddingBottom: 50,
    },
    formControl: {
        height: 40,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        color: '#495057',

    },
    formGroup: {
        margin: 10
    },
    label: {
        marginBottom: 5
    }
})
export default function NewAddressForm() {

    const [street, onChangeStreet] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [additionalAddress, onChangeAdditionalAddress] = React.useState('');
    const [zipCode, onChangeZipCode] = React.useState('');
    const [city, onChangeCity] = React.useState('');
    const [state, onChangeState] = React.useState('');
    const [country, onChangeCountry] = React.useState('');

    const handleSubmit = (context) => {
        const address = {number, street, zipCode, additionalAddress, city, state, country};
        context.addAddress(address)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.inner}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Number</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeNumber(text)}
                            keyboardType="number-pad"
                            value={number}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Street name</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeStreet(text)}
                            value={street}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Zip Code</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeZipCode(text)}
                            value={zipCode}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>City</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeCity(text)}
                            value={city}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Additional informations..</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeAdditionalAddress(text)}
                            value={additionalAddress}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>State</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeState(text)}
                            value={state}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Country</Text>
                        <TextInput
                            style={styles.formControl}
                            onChangeText={text => onChangeCountry(text)}
                            value={country}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <UserContext.Consumer>
                            {context => (
                                <Button
                                    title="Submit"
                                    onPress={() => handleSubmit(context)}
                                />
                            )}
                        </UserContext.Consumer>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
