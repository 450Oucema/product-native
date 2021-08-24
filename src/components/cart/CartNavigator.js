import React from "react"
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Cart from "./Cart";
import Product from "../Product";
import Order from "./Order";
import EditAddress from "./order/EditAddress";
import AddAddress from "./order/AddAddress";

const Stack = createStackNavigator();

export default function CartNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                )}
            } name="ProductView" component={Product} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                )}
            } name="Order" component={Order} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                ),
                title: 'New address'
                }
            } name="AddAddress" component={AddAddress} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                ),
                title: 'Edit address'
                }
            } name="EditAddress" component={EditAddress} />
        </Stack.Navigator>
    )
}
