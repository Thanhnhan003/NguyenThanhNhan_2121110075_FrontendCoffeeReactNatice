import React from "react";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

const PayScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={{ bottom: 160, right: 180 }}>
            {/* <Image
              source={require("../../assets/images/Arrow---Left-2.png")}/> */}
          </View>
        </TouchableOpacity>
        <View>
          <Image
            style={{ bottom: 20 }}
            source={require("../../assets/Animation1700113526652.gif")}
          ></Image>
         
        </View>
        <View style={{ top: 80 }}>
          <Text style={{ bottom: 50, fontSize: 18, fontWeight: "200" }}>
            Alex, your order has been successfully placed.
          </Text>
          <Text
            style={{ bottom: 20, left: 70, fontSize: 18, fontWeight: "400" }}
          >
            The order will be ready today
          </Text>
          <Text
            style={{ bottom: 20, left: 95, fontSize: 18, fontWeight: "400" }}
          >
            to 18:10 at the address
          </Text>
          <Text
            style={{ bottom: 19, left: 115, fontSize: 18, fontWeight: "400" }}
          >
            Bradford BD1 1PR.
          </Text>
          <Text style={{ top: 10, left: 65, fontSize: 18, fontWeight: "200" }}>
            Submit your personal QR code
          </Text>
          <Text style={{ top: 10, left: 50, fontSize: 18, fontWeight: "200" }}>
            at a coffee shop to receive an order.
          </Text>
          <Text
            onPress={() => navigation.navigate("MenuNav")}
            style={{ top: 50, left: 140, fontSize: 20, fontWeight: "500" }}
          >
            Back home
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default PayScreen;
