import React from "react"
import {createStackNavigator} from "@react-navigation/stack";
import Product from "./Product";
import Home from "./Home";

const Stack = createStackNavigator();
export default function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    );
}
