import React from "react"
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Cart from "./Cart";
import Product from "../Product";
import Order from "./Order";

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
        </Stack.Navigator>
    )
}
