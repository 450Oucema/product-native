import Feed from "../Feed";
import React from "react"
import {createStackNavigator} from "@react-navigation/stack";
import Product from "./Product";

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator headerShown={false} headerMode={'none'}>
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
    )
}