import React from "react"
import CartContext from "../../contexts/CartContext";
import {Card, IconButton, List} from "react-native-paper";
import UserContext from "../../contexts/UserContext";
import DropDownPicker from "react-native-dropdown-picker";
import {Ionicons} from "@expo/vector-icons";
import {View} from "react-native";

const paymentMethods = [
    {
        id: 1,
        name: 'Paypal',
        iconName: 'logo-paypal'
    },
    {
        id: 2,
        name: 'Credit Card',
        iconName: 'card-outline'
    }
]

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.getSelectableAddresses = this.getSelectableAddresses.bind(this)
        this.getSelectablePaymentMethods = this.getSelectablePaymentMethods.bind(this)
    }

    getSelectableAddresses(addresses) {
        let selectableAddresses= [];
        addresses.forEach(address => selectableAddresses.push(
            {label: `${address.number} ${address.street} - ${address.city} (${address.zipCode})`, value: address.id})
        )

        return selectableAddresses;
    }

    getSelectablePaymentMethods() {
        let selectableMethods = [];
        paymentMethods.forEach(method => selectableMethods.push({
            label: method.name, value: method.id, icon: () => <Ionicons name={method.iconName}/>
        }))

        return selectableMethods;
    }

    render() {
        return (
            <UserContext.Consumer>
                {userContext => (
                    <CartContext.Consumer>
                        {cartContext => (
                            <Card>
                                <Card.Cover source={require("../../assets/delivery.jpg")} />
                                <Card.Title title={`You have ${cartContext.cartItems.length} product in your cart`} subtitle={`Please specify your delivery address`}/>
                                <Card.Content>
                                    <List.Section>
                                        <List.Subheader>Your address</List.Subheader>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{width: '90%', height: 50}}>
                                                <DropDownPicker
                                                    items={this.getSelectableAddresses(userContext.deliveryAddresses)}
                                                    defaultValue={userContext.favoriteAddress}
                                                    containerStyle={{height: 40, zIndex: 50}}
                                                    style={{backgroundColor: '#fafafa'}}
                                                    labelStyle={{
                                                        fontSize: 10,
                                                        textAlign: 'center',
                                                        color: '#000',
                                                        fontWeight: 'bold'
                                                    }}
                                                    placeholder={"Select your delivery address"}
                                                    itemStyle={{
                                                        justifyContent: 'center'
                                                    }}
                                                    dropDownStyle={{backgroundColor: '#fafafa', zIndex: 50}}
                                                    onChangeItem={item => console.log(item)}
                                                />
                                            </View>
                                            <View style={{width: '20%', height: 40}}>
                                                <IconButton
                                                    icon="playlist-edit"
                                                    color="red"
                                                    size={20}
                                                    onPress={() => this.props.navigation.navigate('AddressEdit')}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <DropDownPicker
                                                items={this.getSelectablePaymentMethods()}
                                                defaultValue={1}
                                                containerStyle={{height: 40}}
                                                style={{backgroundColor: '#fafafa'}}

                                                labelStyle={{
                                                    fontSize: 12,
                                                    textAlign: 'center',
                                                    color: '#000',
                                                    fontWeight: 'bold'
                                                }}
                                                placeholder={"Select your payment method"}
                                                itemStyle={{
                                                    justifyContent: 'center'
                                                }}
                                                dropDownStyle={{backgroundColor: '#fafafa', zIndex: 50}}
                                                onChangeItem={item => console.log(item)}
                                            />
                                        </View>
                                    </List.Section>
                                </Card.Content>
                            </Card>
                        )}
                    </CartContext.Consumer>
                )}

            </UserContext.Consumer>
        )
    }
}
