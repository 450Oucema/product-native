import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Ionicons} from "@expo/vector-icons";
import Settings from "./src/components/settings/Settings";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Cart from "./src/components/cart/Cart";
import CartNavigator from "./src/components/cart/CartNavigator";
import SettingsNavigator from "./src/components/settings/SettingsNavigator";
import firebase from "firebase"
import Explore from "./src/components/explore/Explore";
import UserProvider from "./src/providers/UserProvider";
import CartProvider from "./src/providers/CartProvider";
import environment from "./src/environment/environment";

const MyTheme = {
    dark: false,
    colors: {
        primary: 'rgb(255,255,255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255,69,58)',
    },
};

const Tab = createMaterialBottomTabNavigator();
firebase.initializeApp(environment.firebaseConfig)
export default function App() {

    const [user, setUser] = useState();
    const onAuthStateChanged =(user) => {
        setUser(user);
    }

    useEffect(() => {
        return firebase.auth().onAuthStateChanged(onAuthStateChanged)
    }, [])

  return (
      <UserProvider user={user}>
          <CartProvider>
              <NavigationContainer theme={MyTheme}>
                  <Tab.Navigator
                      screenOptions={({ route }) => ({
                          tabBarIcon: ({ focused, color, size }) => {
                              let iconName;
                              if (route.name === 'Explore') {
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
                      <Tab.Screen name="Explore" component={Explore} />
                      <Tab.Screen name="Cart" component={CartNavigator} />
                      <Tab.Screen name="Settings" component={SettingsNavigator} />
                  </Tab.Navigator>
              </NavigationContainer>
          </CartProvider>
      </UserProvider>
  );
}
