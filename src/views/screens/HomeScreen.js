import {
  Image,
  SafeAreaView,
  ScrollView,
  Easing,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import SPACING from "../../config/SPACING";
import { BlurView } from "expo-blur";
import colors from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";
import SearchField from "../components/SearchField";
import ProductScreen from "../components/ProductScreen";
import { NavigationContainer } from "@react-navigation/native";
const avatar = require("../../assets/avatar.jpg");
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import coffees from "../../config/coffees";

function HomeScreen({ navigation }) {

  const [fadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    const startAnimationTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 500);
    return () => clearTimeout(startAnimationTimeout);
  }, []);
  const productWithId1 = coffees.find((coffee) => coffee.id === 1);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  return (
    <Animated.View
      style={[
        {
          backgroundColor: "#fafafa",
          flex: 1,
        },
        { opacity: fadeAnim },
      ]}
    >
      <SafeAreaView
        style={{ flex: 1, flexDirection: "column", marginHorizontal: 20 }}
      >
        {/* Nua tren */}
        <View
          style={{
            flex: 2.4,

            flexDirection: "column",
          }}
        >
          <View style={{ flex: 4 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                // onPress={() => navigation.toggleDrawer()}
                style={{
                  borderRadius: SPACING,
                  overflow: "hidden",
                  width: SPACING * 4,
                  height: SPACING * 4,
                }}
              >
                <BlurView
                  style={{
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/images/Vector.png")} // Thay đường dẫn ảnh ở đây
                    style={{
                      width: SPACING * 2.5,
                      height: SPACING * 2.5,
                    }}
                  />
                </BlurView>
              </TouchableOpacity>

              <View
                style={{
                  width: SPACING * 4,
                  height: SPACING * 4,
                  overflow: "hidden",
                  borderRadius: SPACING,
                }}
              >
                <BlurView
                  style={{
                    height: "100%",
                    padding: SPACING / 2,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: SPACING * 2,
                    }}
                    source={avatar}
                  />
                </BlurView>
              </View>
            </View>
            <View
              style={{
                width: "80%",
                marginVertical: SPACING * 3,
              }}
            >
              <Text
                style={{
                  color: colors.black,
                  fontSize: SPACING * 2.5,
                  fontWeight: "600",
                }}
              >
                Find the best {"\n"}Coffee to your taste
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <SearchField />
          </View>
        </View>
        {/* Nua duoi */}
        <View style={{ flex: 6 }}>
          <ProductScreen navigation={navigation} />
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
