import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { GET_ALL, GET_IMG } from "../../model/apiService";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import SPACING from "../../config/SPACING";

function ProductScreen({ navigation }) {
  const [coffeeData, setCoffeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(() => {
    // Use the GET_ALL function to fetch data from your API
    GET_ALL("products")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setCoffeeData(responseData.content); // Update the state with the "content" array
        } else {
          console.error(
            "Data received from the API is not in a supported format."
          );
        }
        setIsLoading(false);
        setRefreshing(false); // Set refreshing to false when data is loaded
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
        setRefreshing(false); // Set refreshing to false in case of an error
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(); // Trigger data fetching when refreshing
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ marginBottom: "auto" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            coffeeData.map((coffee, index) => (
              <View
                style={{
                  width: 160,
                  height: 220,
                  marginVertical: 20,
                  flexDirection: "column",
                  borderRadius: 25,
                  backgroundColor: "white",
                  overflow: "hidden",
                }}
                key={index}
              >
                {/* Image product */}
                <View style={{ margin: 10 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProductDetail", { cof: coffee })
                    }
                  >
                    <Image
                      style={{ width: 140, height: 123, borderRadius: 25 }}
                      source={{
                        uri: GET_IMG("products", coffee.photo),
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        borderBottomStartRadius: 30,
                        borderTopEndRadius: 20,
                        overflow: "hidden",
                      }}
                    >
                      <BlurView
                        tint="dark"
                        intensity={70}
                        style={{
                          flexDirection: "row",
                          width: 73,
                          height: 26,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          style={{}}
                          name="star"
                          color="#d17842"
                          size={17}
                        />
                        <Text
                          style={{
                            color: "white",
                            marginLeft: 5,
                            fontWeight: "bold",
                          }}
                        >
                          4.5
                        </Text>
                      </BlurView>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* name, price, add */}
                <View
                  style={{
                    flex: 1,
                    marginLeft: 15,
                    flexDirection: "row",
                  }}
                >
                  <View style={{ flex: 1.5, flexDirection: "column" }}>
                    <View style={{ flex: 2.5 }}>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {coffee.name}
                      </Text>
                      <Text style={{ fontSize: 10, color: "#919191" }}>
                        {coffee.included}
                      </Text>
                    </View>
                    {/* price */}
                    <View style={{ flex: 1.3, flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "#937058",
                          fontWeight: "bold",
                          marginRight: 1,
                          fontSize: 14,
                        }}
                      >
                        $
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        {coffee.price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: 52,
                        height: 53,
                        borderTopLeftRadius: 25,
                        borderBottomEndRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#967259",
                      }}
                    >
                      <Ionicons name="add" color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Define your styles here
});

export default ProductScreen;
