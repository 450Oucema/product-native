import React from "react"
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import Settings from "./Settings";
import Login from "../security/Login";
import Register from "../security/Register";

const Stack = createStackNavigator();

export default function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                )}
            } name="Login" component={Login} />
            <Stack.Screen options={{
                headerLeft: (props) => (
                    <HeaderBackButton {...props} truncatedLabel={""} tintColor={'#FF453A'}/>
                )}
            } name="Register" component={Register} />
        </Stack.Navigator>
    )
}
