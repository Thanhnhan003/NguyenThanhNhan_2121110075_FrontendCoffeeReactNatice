import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import colors from "../../config/colors";
import SPACING from "../../config/SPACING";
import { Ionicons } from "@expo/vector-icons";

const SearchField = () => {
  return (
    <View
      style={{

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 8,
          borderRadius: SPACING * 1.5,
          overflow: "hidden",
          height:50,
          borderWidth: 1, // Thêm đường viền với độ rộng là 1
          borderColor: colors["white-smoke"], // Màu đường viền là đen
        }}
      >
        <BlurView
          intensity={30}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={{
              width: "100%",
              color: colors.white,
              fontSize: SPACING * 1.7,
              padding: SPACING,
              paddingLeft: SPACING * 3.5,
            }}
            placeholder="Find Your Coffee..."
            placeholderTextColor={colors["white-smoke"]}
          />
          <Image
            source={require("../../assets/images/search.png")} // Thay đường dẫn ảnh ở đây
            style={{
              position: "absolute",
              left: SPACING,
              width: 20, // Đặt kích thước chiều rộng của hình ảnh
              height: 20,
            }}
          />
        </BlurView>
      </View>
      <View
        style={{
          marginLeft: 9,
          alignSelf: "center",
          flex: 1,
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/Group21.png")}
            style={{
              width: SPACING * 4,
              height: SPACING * 4,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({});
