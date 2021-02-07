import Feed from "../Feed";
import React from "react"
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Product from "./Product";
import Category from "./Category";

const Stack = createStackNavigator();


export default function Home() {
    return (
        <Stack.Navigator mode={"card"} headerMode={"screen"}>
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                )}
            } name="Product" component={Product} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} tintColor={'#FF453A'}/>
                )}} name="Category" component={Category} />
        </Stack.Navigator>
    )
}
