import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { POST_LOGIN} from "../../model/apiService";
import * as Crypto from 'expo-crypto'; 

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      const userData = {
        email,
        password: hashedPassword,
      };

      POST_LOGIN("users/login", userData)
        .then((response) => {
          console.log("User authenticated successfully:", response.data);
          navigation.navigate("MenuNav");
        })
        .catch((error) => {
          Alert.alert(
            "Đăng nhập thất bại",
            "Email hoặc mật khẩu không chính xác"
          );
        });
    } catch (error) {
      console.error("Error hashing password:", error);
      Alert.alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  
 
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1, backgroundColor: "#877dfa" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "#fbcb16",
                padding: 10,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                marginLeft: 12,
              }}
            >
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../../assets/images/login.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </SafeAreaView>
        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            flex: 2,
            backgroundColor: "white",
            paddingHorizontal: 20,
            paddingTop: 30,
          }}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: "gray", marginLeft: 4, paddingBottom: 8 }}>
              Email Address
            </Text>
            <TextInput
              style={{
                padding: 15,
                backgroundColor: "#f5f4f8",
                color: "gray",
                borderRadius: 20,
                fontWeight:"bold",
                borderWidth: 1,
                marginBottom: 3,
              }}
              onChangeText={(text) => setEmail(text)}
              placeholder="Nhập địa chỉ email của bạn"
            />
            <Text
              style={{
                color: "gray",
                marginLeft: 4,
                paddingBottom: 8,
                paddingTop: 8,
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                padding: 15,
                backgroundColor: "#f5f4f8",
                color: "gray",
                borderWidth: 1,
                fontWeight:"bold",
                borderRadius: 20,
                marginBottom: 3,
              }}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              placeholder="Nhập mật khẩu của bạn"
            />
            <TouchableOpacity style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "gray", marginBottom: 25, marginTop: 10 }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignIn}
              style={{
                paddingVertical: 15,
                backgroundColor: "#fbcb16",
                borderRadius: 20,
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
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 5,
            }}
          >
            Or
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginVertical: 28,
            }}
          >
            <TouchableOpacity style={{ padding: 2, borderRadius: 20 }}>
              <Image
                source={require("../../assets/icons/google.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 2, borderRadius: 20 }}>
              <Image
                source={require("../../assets/icons/apple.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 2, borderRadius: 20 }}>
              <Image
                source={require("../../assets/icons/facebook.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 14,
            }}
          >
            <Text style={{ color: "gray", fontWeight: "bold" }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={{ fontWeight: "bold", color: "#fbcb16" }}>
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
