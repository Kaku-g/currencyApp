import React, { useContext } from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import currencies from "../data/currencies.json";
import { RowList, Separator } from "../components/RowList";
import colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { ConversionContext } from "../util/ConversionContext";

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
});

export default ({ navigation, route = {} }) => {
  const insets = useSafeAreaInsets();
  const { baseCurrency, quoteCurrency, setBaseCurrency, setQuoteCurrency } =
    useContext(ConversionContext);
  const params = route.params || {};
  const { isBaseCurrency } = params;
  return (
    <View
      style={{ flex: 1, backgroundColor: colors.white, color: colors.blue }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <FlatList
        data={currencies}
        renderItem={({ item }) => {
          let selected = false;
          if (isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!isBaseCurrency && item === quoteCurrency) {
            selected = true;
          }
          return (
            <RowList
              text={item}
              onPress={() => {
                if (isBaseCurrency) {
                  setBaseCurrency(item);
                } else {
                  setQuoteCurrency(item);
                }
                navigation.pop();
              }}
              icon={
                selected && (
                  <View style={styles.icon}>
                    <Entypo name="check" size={20} color={colors.white} />
                  </View>
                )
              }
            />
          );
        }}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <Separator />}
        ListFooterComponent={() => (
          <View style={{ paddingBottom: insets.bottom }} />
        )}
      />
    </View>
  );
};
