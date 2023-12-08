import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/views/navigation/AppNavigator';
export default function App() {
  return (
    <NavigationContainer>
    <AppNavigator/>
    </NavigationContainer>
  );
}