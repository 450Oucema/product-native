import React from "react"
import {createStackNavigator} from "@react-navigation/stack";
import Cart from "./Cart";

const Stack = createStackNavigator();

export default function CartNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
    )
}
