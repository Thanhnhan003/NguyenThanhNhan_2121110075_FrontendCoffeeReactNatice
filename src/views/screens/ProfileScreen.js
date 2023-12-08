import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#f7f8fa",
          borderBottomWidth: 2,
          borderColor: "#f3f5f7",
        }}
      >
        <SafeAreaView
          style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity style={{ marginLeft: 10, flex: 1 }}>
            <Image
              source={require("../../assets/avatar.jpg")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              flex: 3,
              fontSize: 20,
              marginHorizontal: 30,
              fontWeight: "bold",
            }}
          >
            Nguyễn Thành Nhân
          </Text>
        </SafeAreaView>
      </View>
      <View style={{ flex: 3, backgroundColor: "#ffffff" }}>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="ticket" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>My Promo Code</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="credit-card" size={26} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>
              Payment Methods
            </Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="cog" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Settings</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="language" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Language</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="question-circle" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Help Center</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15, // Change the padding size to 15
            }}
          >
            <Icon name="info-circle" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>About Us</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
              borderRightWidth: 2,
              borderColor: "#333",
            }}
          >
            <Icon name="sign-out" size={30} color="#333" />
            <Text style={{ marginLeft: 20, fontSize: 20 }}>Đăng xuất</Text>
            <Icon
              name="chevron-right" // Biểu tượng ">"
              size={20} // Kích thước của biểu tượng
              color="#bfbec4" // Màu sắc của biểu tượng
              style={{ marginLeft: "auto" }} // Đặt biểu tượng ở phía bên phải
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ProfileScreen;
