import React,{useEffect,useState} from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import HomePageScreen from "../screens/HomePageScreen";
import WelcomeScreen from "../screens//WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MenuNavScreen from "../components/MenuNavScreen";
// MenuNavScreen
import HomeScreen from "../screens//HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ProductDetail from "../screens/ProductDetail";
import ProductScreen from "../components/ProductScreen";
// Screens
import PayScreen from "../screens/PayScreen";
const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuNav"
        component={MenuNavScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      {/* MenuNav */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      {/* end Menu Nav */}
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      {/* PayMen */}
      <Stack.Screen
        name="PayScreen"
        component={PayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
