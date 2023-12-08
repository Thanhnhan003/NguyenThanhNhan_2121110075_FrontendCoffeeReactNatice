import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeInRight,
} from "react-native-reanimated";
import { GET_IMG, POST_ADD, PUT_EDIT, GET_ID } from "../../model/apiService"; // Import GET_IMG function from apiService
const { width, height } = Dimensions.get("window");

const size = ["S", "M", "L"];
const choice = ["White Chocolate", "Milk Chocolate", "Dark Chocolate"];
function ProductDetail({ route, navigation }) {
  const [activeSize, setActiveSize] = useState(null);
  const [activeChoice, setActiveChoice] = useState(null);
  const { cof } = route.params;

  const [quantity, setQuantity] = useState(1);

  // Step 2: Function to increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const totalPrice = (quantity * cof.price).toFixed(2);
  const handleBuyNow = () => {
    if (activeSize === null || activeChoice === null) {
      // Nếu người dùng chưa chọn size hoặc chocolate, hiển thị thông báo
      alert("Vui lòng chọn size và chocolate trước khi mua sản phẩm.");
    } else {
      const selectedChocolate = choice[activeChoice];
      const selectedSize = size[activeChoice];
      // Create an object representing the order product
      const orderProduct = {
        id: cof.id, // You can set this ID as needed
        product: {
          id: cof.id, // Product ID
          name: cof.name,
          included: cof.included,
          description: cof.description,
          photo: cof.photo,
          price: cof.price,
          category: cof.category,
        },
        quantity: quantity,
        chocolate: selectedChocolate,
        size: selectedSize,
        name: cof.name, // Set a name as needed
        totalPrice: totalPrice, // Set the total price based on your logic
        photo: cof.photo, // Set the photo value as needed
      };

      // Call the POST_ADD function to add the order product
      POST_ADD("orderproducts", orderProduct)
        .then((response) => {
          if (response && response.data) {
            // Successfully added to cart
            alert("Sản phẩm của bạn đã được thêm vào giỏ hàng!");
            // You can navigate to the cart or perform any other action here
          } else {
            alert("Failed to add product to cart.");
          }
        })
        .catch((error) => {
          console.error("Error adding product to cart:", error);
          alert("Failed to add product to cart.");
        });
    }
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <SafeAreaView>
          <ImageBackground
            source={{
              uri: GET_IMG("products", cof.photo),
            }}
            resizeMode="cover"
            style={{
              height: height / 2 + 10 * 2,
              marginHorizontal: 10,
              backgroundColor: "#cccccc",
              borderRadius: 10 * 4,

              justifyContent: "space-between",
            }}
            imageStyle={{
              borderRadius: 10 * 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10 * 2,
              }}
            >
              <Animated.View entering={FadeInLeft.delay(200).duration(400)}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10 * 2,
                  }}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" color="black" size={10 * 2} />
                </TouchableOpacity>
              </Animated.View>
              <Animated.View entering={FadeInRight.delay(200).duration(400)}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 10 * 2,
                  }}
                >
                  <Ionicons name="heart" size={10 * 2} color="red" />
                </TouchableOpacity>
              </Animated.View>
            </View>
            {/* Frame */}
            <View
              style={{
                borderRadius: 10 * 4,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={80}
                tint="default"
                style={{
                  padding: 10 * 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Animated.Text
                    entering={FadeInLeft.delay(200).duration(500)}
                    style={{
                      fontSize: 10 * 2,
                      color: "white",
                      fontWeight: "600",
                      marginBottom: 10,
                    }}
                  >
                    {cof.name}
                  </Animated.Text>
                  <Animated.Text
                    entering={FadeInLeft.delay(300).duration(500)}
                    style={{
                      fontSize: 10 * 1.3,
                      color: "#beb7b0",
                      fontWeight: "500",
                      marginBottom: 10,
                    }}
                  >
                    {cof.included}
                  </Animated.Text>

                  <Animated.View
                    style={{ flexDirection: "row", marginTop: 10 }}
                    entering={FadeInLeft.delay(400).duration(400)}
                  >
                    <Ionicons name="star" color="#d17842" size={10 * 1.5} />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                        fontWeight: "bold",
                      }}
                    >
                      4.5
                    </Text>
                  </Animated.View>
                </View>
                <View
                  style={{
                    width: "35%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Animated.View
                      entering={FadeInRight.delay(200).duration(400)}
                      style={{
                        padding: 10 / 2,
                        borderRadius: 10,
                        width: 10 * 5,
                        height: 10 * 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="cafe" size={10 * 3} color="white" />
                      <Text
                        style={{
                          color: "white",
                          fontSize: 10,
                        }}
                      >
                        coffee
                      </Text>
                    </Animated.View>

                    <Animated.View
                      entering={FadeInRight.delay(300).duration(400)}
                      style={{
                        padding: 10 / 2,
                        width: 10 * 5,
                        borderRadius: 10,
                        height: 10 * 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="water" size={10 * 3} color="white" />

                      <Text
                        style={{
                          color: "white",
                          fontSize: 10,
                        }}
                      >
                        Milk
                      </Text>
                    </Animated.View>
                  </View>

                  <Animated.View
                    entering={FadeInRight.delay(300).duration(400)}
                    style={{
                      padding: 10 / 2,
                      borderRadius: 10 / 2,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10 * 1.3,
                        fontWeight: "bold",
                      }}
                    >
                      Medium roasted
                    </Text>
                  </Animated.View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>

          <View
            style={{
              padding: 10,
            }}
          >
            <View>
              <Animated.Text
                entering={FadeInLeft.delay(100).duration(500)}
                style={{
                  fontSize: 10 * 1.7,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Description
              </Animated.Text>
              <Animated.Text
                entering={FadeInLeft.delay(200).duration(500)}
                style={{
                  color: "#beb7b0",
                }}
                numberOfLines={3}
              >
                {cof.description}
              </Animated.Text>
            </View>
            {/* click choice of chocolate */}
            <View
              style={{
                marginVertical: 10 * 2,
              }}
            >
              <Animated.Text
                entering={FadeInLeft.delay(100).duration(500)}
                style={{
                  fontSize: 10 * 1.7,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                Choice of Chocolate
              </Animated.Text>
              <Animated.View entering={FadeInLeft.delay(200).duration(500)}>
                <FlatList
                  data={choice}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false} // Tắt thanh cuộn
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => setActiveChoice(index)}
                      key={index}
                      style={[
                        {
                          borderWidth: 1,
                          borderColor: "#967259",
                          paddingHorizontal: 10 * 2, // Thêm padding ngang
                          paddingVertical: 10 / 2,
                          marginHorizontal: 5,
                          borderRadius: 10 * 10,
                          backgroundColor: "white",
                          flex: 1, // Sử dụng flex để tự động điều chỉnh kích thước
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        activeChoice === index && {
                          borderColor: "#967259",
                          backgroundColor: "#967259",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: "#beb7b0",
                            fontSize: 10 * 1.9,
                          },
                          activeChoice === index && {
                            color: "white",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </Animated.View>
            </View>
            {/* Click size */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Animated.View
                style={{
                  flex: 1,
                  marginVertical: 10 * 1,
                }}
                entering={FadeInLeft.delay(200).duration(500)}
              >
                <Text
                  style={{
                    fontSize: 10 * 1.7,
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Size
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {size.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => setActiveSize(index)}
                      key={index}
                      style={[
                        {
                          borderRadius: 0.5 * (width / 3 - 10 * 4),
                          backgroundColor: "#beb7b0",
                          marginHorizontal: 5,
                          alignItems: "center", // Căn giữa theo chiều ngang
                          justifyContent: "center", // Căn giữa theo chiều dọc
                          minWidth: 50, // Đặt kích thước tối thiểu cho ô vuông
                          minHeight: 50, // Đặt kích thước tối thiểu cho ô vuông
                        },
                        activeSize === index && {
                          borderColor: "#967259",
                          backgroundColor: "#967259",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            color: "#777777",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: 14, // Đặt kích thước chữ theo ý muốn
                          },
                          activeSize === index && {
                            color: "white",
                            fontWeight: "bold",
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
              <Animated.View
                entering={FadeInRight.delay(200).duration(500)}
                style={{ flex: 1, alignItems: "center" }}
              >
                <Text
                  style={{
                    flex: 1,

                    fontSize: 10 * 1.7,
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Quantity
                </Text>
                <View
                  style={{
                    flex: 2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity onPress={decreaseQuantity}>
                    <Image source={require("../../assets/images/minu.png")} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 28,
                      marginHorizontal: 20,
                    }}
                  >
                    {quantity}
                  </Text>
                  <TouchableOpacity onPress={increaseQuantity}>
                    <Image
                      source={require("../../assets/images/plus.png")}
                      style={{}}
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <SafeAreaView
        style={{
          backgroundColor: "white",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Animated.View
          entering={FadeInLeft.delay(500).duration(500)}
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 10 * 3,
          }}
        >
          <Text style={{ color: "#beb7b0", fontSize: 10 * 1.5 }}>Price</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#967259",
                fontSize: 10 * 2.5,
                fontWeight: "bold",
              }}
            >
              $
            </Text>
            <Text
              style={{
                fontSize: 10 * 2.4,
                fontWeight: "bold",
                marginLeft: 10 / 2,
              }}
            >
              {totalPrice}
            </Text>
          </View>
        </Animated.View>
        <Animated.View
          entering={FadeInRight.delay(500).duration(500)}
          style={{
            backgroundColor: "#967259",
            width: width / 2 + 10 * 3,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10 * 4,
          }}
        >
          <TouchableOpacity onPress={handleBuyNow}>
            <Text
              style={{
                color: "white",
                fontSize: 10 * 2,
                fontWeight: "700",
              }}
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

export default ProductDetail;
