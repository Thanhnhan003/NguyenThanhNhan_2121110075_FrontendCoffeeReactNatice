import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#877dfa" }}>
      <View style={{ flex: 1, justifyContent: "space-around", marginTop: 4 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 32,
            textAlign: "center",
          }}
        >
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../assets/images/banner.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={{ margin: 8, flexDirection:"column" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={{
              paddingVertical: 16,
              backgroundColor: "#fbcb16",
              marginHorizontal: 16,
              marginVertical:16,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "gray",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginHorizontal: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "bold", color: "yellow" }}>

                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
