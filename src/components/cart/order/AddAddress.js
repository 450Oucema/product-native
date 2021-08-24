import React from "react";
import {View} from "react-native";
import NewAddressForm from "../../forms/address/NewAddressForm";

export default function AddAddress(props) {
    const handleSubmit = () => {
        props.navigation.navigate('Order')
    }
    return (
        <View style={{flex: 1}}>
            <NewAddressForm handleSubmit={handleSubmit}/>
        </View>
    )
}
