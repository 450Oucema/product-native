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
export default function EditAddressForm(props) {

    const id = props.address.id;
    const [street, onChangeStreet] = React.useState(props.address.street);
    const [number, onChangeNumber] = React.useState(props.address.number);
    const [additionalAddress, onChangeAdditionalAddress] = React.useState(props.address.additionalAddress);
    const [zipCode, onChangeZipCode] = React.useState(props.address.zipCode);
    const [city, onChangeCity] = React.useState(props.address.city);
    const [state, onChangeState] = React.useState(props.address.state);
    const [country, onChangeCountry] = React.useState(props.address.country);

    const handleSubmit = (context) => {
        const address = {id, number, street, zipCode, additionalAddress, city, state, country};
        context.editAddress(address)
        props.handleSubmit()
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
