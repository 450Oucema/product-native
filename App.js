import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from "./components/Home";
import {Ionicons} from "@expo/vector-icons";
import Settings from "./components/Settings";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Cart from "./components/Cart";
import CartProvider from "./providers/CartProvider";
import CartNavigator from "./components/CartNavigator";

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255,255,255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  return (
      <CartProvider>
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'cog' : 'cog-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        }
                        return <Ionicons name={iconName} size={20} color={'rgb(255,69,58)'} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Cart" component={CartNavigator} />
                <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
  );
}
