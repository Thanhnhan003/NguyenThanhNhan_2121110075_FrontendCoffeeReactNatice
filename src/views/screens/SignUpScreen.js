import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
// import auth from '@react-native-firebase/auth';
import { POST_ADD } from "../../model/apiService";
import * as Crypto from 'expo-crypto'; 
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    // Validation checks
    if (!fullname || !email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
  
    if (!email.includes("@gmail.com")) {
      Alert.alert("Thông báo", "Địa chỉ email không hợp lệ.");
      return;
    }
  
    if (password.length < 8) {
      Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
  
    try {
      // Hash the password using Expo Crypto
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
  
      // If all validation passes, proceed with the API call
      const userData = {
        fullname,
        email,
        password: hashedPassword, // Use the hashed password
      };
  
      POST_ADD("users", userData)
        .then((response) => {
          console.log("User created successfully:", response.data);
          Alert.alert("Chúc mừng", "Bạn đã đăng ký tài khoản thành công");
          // You can also navigate to another screen or perform other actions here
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          Alert.alert(
            "Thông báo",
            "Đã có lỗi xảy ra. Vui lòng thử lại sau."
          );
          // You can handle other types of errors or show specific error messages
        });
    } catch (error) {
      console.error("Error hashing password:", error);
      Alert.alert("Thông báo", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };
  return (
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
            source={require("../../assets/images/signup.png")}
            style={{ width: 165, height: 110 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 3,
          backgroundColor: "white",
          paddingHorizontal: 20,
          paddingTop: 30,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <View style={{ marginBottom: 2 }}>
          <Text style={{ color: "gray", marginLeft: 4, paddingBottom: 8 }}>
            Full Name
          </Text>
          <TextInput
            style={{
              padding: 15,
              backgroundColor: "#f5f4f8",
              color: "gray",
              borderRadius: 20,
              borderWidth: 1,
              fontWeight:"bold",
              marginBottom: 3,
            }}
            onChangeText={(text) => setFullname(text)}
            placeholder="Nhập tên của bạn"
          />
        </View>
        <View style={{ marginBottom: 2 }}>
          <Text
            style={{
              color: "gray",
              marginLeft: 4,
              paddingBottom: 8,
              paddingTop: 8,
            }}
          >
            Email Address
          </Text>
          <TextInput
            style={{
              padding: 15,
              backgroundColor: "#f5f4f8",
              color: "gray",
              borderRadius: 20,
              borderWidth: 1,
              marginBottom: 3,
              fontWeight:"bold",
              
            }}
            placeholder="Nhập địa chỉ email của bạn"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
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
              borderRadius: 20,
              borderWidth: 1,
              fontWeight:"bold",

              marginBottom: 3,
            }}
            secureTextEntry
            placeholder="Nhập mật khẩu của bạn"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            padding: 15,
            backgroundColor: "#fbcb16",
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "gray",
              textAlign: "center",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "bold",
            textAlign: "center",
            paddingVertical: 15,
          }}
        >
          Or
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
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
            marginTop: 12,
          }}
        >
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontWeight: "900", color: "#fbcb16" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
