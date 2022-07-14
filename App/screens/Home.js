import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ConversionInput } from "../components/ConversionInput";
import { SafeAreaView } from "react-native-safe-area-context";

import colors from "../constants/colors";
import { format } from "date-fns";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { Entypo } from "@expo/vector-icons";
import { ConversionContext } from "../util/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    // justifyContent: "center",
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoBackground: {
    // justifyContent: "center",
    // alignItems: "center",
    width: screen.width * 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 10,
  },
  header: {
    alignItems: "flex-end",
    marginHorizontal: 20,
  },
});

export default ({ navigation }) => {
  const { baseCurrency, quoteCurrency, swapCurrency, date, rates, isLoading } =
    useContext(ConversionContext);

  const [value, setValue] = useState("100");
  const conversionRate = rates[quoteCurrency];

  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.blue} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <SafeAreaView style={styles.header}>
          <TouchableOpacity onPress={() => navigation.push("Options")}>
            <Entypo name="cog" size={32} color={colors.white} />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/background.png")}
              style={styles.logoBackground}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}>Currency Converter</Text>
          {isLoading ? (
            <ActivityIndicator color={colors.white} size="large" />
          ) : (
            <>
              <View style={styles.inputContainer}>
                <ConversionInput
                  text={baseCurrency}
                  value={value}
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Base Currency",
                      isBaseCurrency: true,
                    })
                  }
                  keyboardType="numeric"
                  onChangeText={(e) => setValue(e)}
                />
                <ConversionInput
                  text={quoteCurrency}
                  value={
                    value &&
                    `${(parseFloat(value) * conversionRate).toFixed(2)}`
                  }
                  onButtonPress={() =>
                    navigation.push("CurrencyList", {
                      title: "Quote Currency",
                      isBaseCurrency: false,
                    })
                  }
                  keyboardType="numeric"
                  editable={false}
                  onChangeText={(e) => console.log(e)}
                />
              </View>
              <Text style={styles.text}>
                {`1 ${baseCurrency}= ${conversionRate} ${quoteCurrency} as of ${
                  date && format(new Date(date), "MMM do, yyyy")
                }`}
              </Text>
              <Button
                text="Reverse Currencies"
                onPress={() => swapCurrency()}
              />
            </>
          )}

          <KeyboardSpacer onToggle={(visible) => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};
