import React from "react";
import colors from "../constants/colors";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { RowList, Separator } from "../components/RowList";

const openLink = (url) => {
  Linking.openURL(url).catch(() =>
    Alert.alert("Sorry,something went wrong.", "Please try again later.")
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    flex: 1,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});

export default () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView>
        <RowList
          text="Theme"
          icon={<Entypo name="chevron-right" size={20} color={colors.blue} />}
          onPress={() => alert("themes")}
        />
        <Separator />
        <RowList
          text="Basics"
          icon={<Entypo name="export" size={20} color={colors.blue} />}
          onPress={() => openLink("https://reactnative.dev/")}
        />
        <Separator />
        <RowList
          text="Advanced"
          icon={<Entypo name="export" size={20} color={colors.blue} />}
          onPress={() =>
            openLink("https://reactnative.dev/architecture/overview")
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
