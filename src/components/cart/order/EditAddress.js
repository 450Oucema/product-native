import React from "react";
import {View} from "react-native";
import UserContext from "../../../contexts/UserContext";
import EditAddressForm from "../../forms/address/EditAddressForm";

export default function EditAddress(props) {
    const id = props.route.params.address;

    const handleSubmit = () => {
        props.navigation.navigate('Order')
    }

    return (
        <UserContext.Consumer>
            {context => (
                <View style={{flex: 1}}>
                    <EditAddressForm address={context.deliveryAddresses.find(address => address.id === id)} handleSubmit={handleSubmit}/>
                </View>
            )}
        </UserContext.Consumer>
    )
}
