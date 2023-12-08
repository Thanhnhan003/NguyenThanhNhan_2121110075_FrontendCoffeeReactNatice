import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { GET_ALL, GET_IMG, DELETE_ID } from "../../model/apiService";
import PayScreen from "./PayScreen";
function CartScreen({ navigation }) {
  const [orderProductsData, setOrderProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [itemCheckedState, setItemCheckedState] = useState({}); // Store item checked state
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const isFocused = useIsFocused();

  const toggleCheckbox = (itemId) => {
    if (selectedItems.includes(itemId)) {
      // If the item is already selected, remove it from the array
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      // Update the checkbox color to the default color
      setItemCheckedState({
        ...itemCheckedState,
        [itemId]: false,
      });
      // Subtract the price of the item from the total price
      setTotalPrice(
        totalPrice -
          orderProductsData.find((item) => item.id === itemId).totalPrice
      );
    } else {
      // If the item is not selected, add it to the array
      setSelectedItems([...selectedItems, itemId]);
      // Update the checkbox color to the selected color
      setItemCheckedState({
        ...itemCheckedState,
        [itemId]: true,
      });
      // Add the price of the item to the total price
      setTotalPrice(
        totalPrice +
          orderProductsData.find((item) => item.id === itemId).totalPrice
      );
    }
  };

  const fetchData = useCallback(() => {
    // Sử dụng hàm GET_ALL để tải dữ liệu từ API của bạn
    GET_ALL("orderproducts")
      .then((response) => {
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.content)) {
          setOrderProductsData(responseData.content); // Cập nhật trạng thái với mảng "content"
        } else {
          console.error(
            "Dữ liệu nhận được từ API không có định dạng được hỗ trợ."
          );
        }
        setIsLoading(false);
        setRefreshing(false); // Đặt refreshing thành false khi dữ liệu được tải
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu: ", error);
        setIsLoading(false);
        setRefreshing(false); // Đặt refreshing thành false trong trường hợp có lỗi
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    if (isFocused) {
      fetchData();
    }
  };

  // Define a function to update the total price
  // Inside your functions that update the total price

  const updateTotalPrice = (itemId, isAdd) => {
    if (isFocused) {
      const item = orderProductsData.find((item) => item.id === itemId);
      if (item) {
        const itemPrice = item.totalPrice;
        if (isAdd) {
          setTotalPrice((prevTotalPrice) => prevTotalPrice + itemPrice);
        } else {
          setTotalPrice((prevTotalPrice) =>
            prevTotalPrice - Math.min(prevTotalPrice, itemPrice)
          );
        }
      }
    }
  };
  

  // Modify your handleDeleteItem function to update the total price when an item is deleted
  const handleDeleteItem = (itemId) => {
    DELETE_ID("orderproducts/" + itemId)
      .then((response) => {
        if (response.status === 200) {
          // Remove the item from the local state
          const updatedData = orderProductsData.filter(
            (item) => item.id !== itemId
          );
          setOrderProductsData(updatedData);
        } else {
          console.error("Failed to delete item on the server.");
        }
      })
      .then(() => {
        // Use a separate then block to ensure state is updated before updating total price
        updateTotalPrice(itemId, false);
      })
      .catch((error) => {
        console.error("Error while deleting item: ", error);
      });
  };
  

  // In your handleDeleteSelectedItems function, call the updateTotalPrice function for each selected item
  const handleDeleteSelectedItems = () => {
    Promise.all(
      selectedItems.map((itemId) => DELETE_ID("orderproducts/" + itemId))
    )
      .then((responses) => {
        if (responses.every((response) => response.status === 200)) {
          // Remove the selected items from the local state
          const updatedData = orderProductsData.filter(
            (item) => !selectedItems.includes(item.id)
          );
          setOrderProductsData(updatedData);
          // Clear the selected items array
          setSelectedItems([]);
          // Update the total price for each deleted item
          selectedItems.forEach((itemId) => {
            updateTotalPrice(itemId, false);
          });
        } else {
          console.error("Failed to delete selected items on the server.");
        }
      })
      .catch((error) => {
        console.error("Error while deleting selected items: ", error);
      });
  };

  const renderRightActions = (progress, dragX, itemId) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f37e33",
            width: 50,
            borderRadius: 15,
            justifyContent: "center",
            marginLeft: 10,
            height: 119,
            alignItems: "center",
          }}
          onPress={() => handleDeleteItem(itemId)}
        >
          <Image
            style={{}}
            source={require("../../assets/images/Delete.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 10,

          flexDirection: "column",
          marginHorizontal: 23,
        }}
      >
        {/* MenuNav + so luong item */}
        <View style={{ flex: 2 }}>
          {/* MenuNav */}
          <View
            style={{
              flex: 1,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ width: 50, alignItems: "center" }}
            >
              <Ionicons name="arrow-back" color="#2f3548" size={30} />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Cart
            </Text>
            <TouchableOpacity
              style={{
                width: 50,
                alignItems: "center",
              }}
              onPress={() => handleDeleteSelectedItems()}
            >
              <Image
                style={{}}
                source={require("../../assets/images/trash.png")}
              />
            </TouchableOpacity>
          </View>
          {/* So luong item */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>Items (20)</Text>
          </View>
        </View>
        <View style={{ flex: 8 }}>
          <FlatList
            data={orderProductsData}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({ item }) => (
              <View key={item.id} style={{}}>
                <Swipeable
                  renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, item.id)
                  }
                >
                  <View
                    style={{
                      flex: 1,
                      shadowOpacity: 0.08,
                      shadowOffset: { height: 5, width: 0 },
                      shadowRadius: 10,
                      elevation: 5,
                      height: 119,
                      marginBottom: 15,
                      backgroundColor: "white",
                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,

                        margin: 10,
                        flexDirection: "row",
                      }}
                    >
                      {/* chia 2 checkbox image and name price */}
                      <View
                        style={{
                          flex: 1.7,

                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              width: 25,
                              height: 25,
                              borderRadius: 15,
                              borderWidth: 1.5,
                              borderColor: itemCheckedState[item.id]
                                ? "#967259"
                                : "#967259",
                              backgroundColor: itemCheckedState[item.id]
                                ? "#967259"
                                : "white",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onPress={() => toggleCheckbox(item.id)}
                          >
                            {itemCheckedState[item.id] && (
                              <Icon name="check" size={14} color="white" />
                            )}
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          style={{
                            width: 80,
                            height: 80,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                        >
                          <Image
                            source={{
                              uri: GET_IMG("orderproducts", item.photo),
                            }}
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 10,
                              marginRight: 10,
                            }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      </View>
                      {/* name price so luong */}
                      <View
                        style={{
                          flex: 3,

                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            flex: 3,
                            flexDirection: "column",
                          }}
                        >
                          <Text style={{ fontSize: 18, flex: 3 }}>
                            {item.name} {item.product.included}
                          </Text>
                          <Text
                            style={{
                              fontWeight: "bold",
                              flex: 1,
                              fontSize: 16,
                            }}
                          >
                            US {`$${item.totalPrice}`}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              flex: 1.5,

                              justifyContent: "flex-end",
                            }}
                          >
                            <Text style={{ color: "#f48640", fontSize: 12 }}>
                              Delivery fee US $3
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <TouchableOpacity
                            // onPress={() => removeFromCart(product)}
                            >
                              <Image
                                source={require("../../assets/images/remove.png")}
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                marginHorizontal: 10,
                              }}
                            >
                              {item.quantity}
                            </Text>
                            <TouchableOpacity
                            // onPress={() => addToCart(product)}
                            >
                              <Image
                                source={require("../../assets/images/add.png")}
                                style={{}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Swipeable>
              </View>
            )}
            ListEmptyComponent={<Text>Please buy the product...</Text>}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ flex: 0.8, backgroundColor: "white", flexDirection: "row" }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            flexDirection: "row",
            marginHorizontal: 23,
          }}
        >
          <View style={{ flex: 1.3 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  marginTop: 5,
                  alignItems: "center",
                  textAlign: "center",
                  color: "#beb7b0",
                  fontSize: 12 * 1.5,
                }}
              >
                Price
              </Text>
            </View>
            <Text
              style={{
                flex: 1,
                fontSize: 10 * 2.4,
                fontWeight: "bold",
                marginLeft: 10 / 2,
              }}
            >
              <Text
                style={{
                  color: "#967259",
                  fontSize: 10 * 2.5,
                  fontWeight: "bold",
                }}
              >
                ${" "}
              </Text>
              {totalPrice.toFixed(2)} {/*totalPrice*/}
            </Text>
          </View>
          <View style={{ flex: 2, direction: "rtl" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("PayScreen")}
              style={{
                backgroundColor: "#967259",
                width: 190,
                height: "100%",

                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10 * 4,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 10 * 2,
                  fontWeight: "700",
                }}
              >
                PAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  // Định nghĩa các kiểu dáng ở đây
});

export default CartScreen;
