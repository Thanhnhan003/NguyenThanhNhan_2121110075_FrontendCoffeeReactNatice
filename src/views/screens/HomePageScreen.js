import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";

const WelcomeScreen = ({ navigation }) => {
  const goToMenuNav = () => {
    navigation.navigate("Welcome");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ece0d1" }}>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image source={require("../../assets/images/mark.png")}></Image>
        </View>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={{ flex: 3, flexDirection: "column", margin: 50 }}>
            <Text
              style={{
                flex: 1,
                marginTop: 20,
                fontWeight: "bold",
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Stay Focused
            </Text>
            <Text style={{ flex: 4, fontSize: 14, textAlign: "center" }}>
              Get the cup filled of your choice to stay focused and awake.
              Diffrent type of coffee menu, hot lottee cappucino
            </Text>
          </View>
          <TouchableOpacity
            onPress={goToMenuNav}
            style={{ flex: 2, alignItems: "center" }}
          >
            <Image source={require("../../assets/images/welcome.png")}></Image>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;
