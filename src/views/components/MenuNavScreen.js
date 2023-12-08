import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const MenuNavScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconStyle = {
            alignItems: "center", // Căn giữa theo chiều dọc
            justifyContent: "center", // Căn giữa theo chiều ngang
          };

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Tùy chỉnh hiệu ứng khi chọn tab (phóng to khi chọn)
          if (focused) {
            iconStyle.transform = [{ scale: 1.2 }];
            iconStyle.color = "#967259"; // Đặt màu khi tab được chọn
          } else {
            iconStyle.color = color; // Sử dụng màu mặc định khi tab không được chọn
          }

          return (
            <Ionicons
              name={iconName}
              color={iconStyle.color}
              size={size}
              style={iconStyle}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home", // Đặt tên dưới biểu tượng
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuNavScreen;
