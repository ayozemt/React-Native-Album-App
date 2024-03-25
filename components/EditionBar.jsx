import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const EditionBar = ({ navigation, onEditAlbum, showForm }) => {
  const [showBar, setShowBar] = useState(false);
  const toggleShowBar = () => {
    setShowBar(!showBar);
  };

  return (
    <View style={styles.toolbar}>
      <StatusBar style="light" backgroundColor="grey" hidden={showBar} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Albums");
        }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleShowBar}>
        <Ionicons
          name={showBar ? "chevron-down" : "chevron-up"}
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEditAlbum}>
        <Ionicons
          name={showForm ? "remove" : "create-outline"}
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 80,
    paddingTop: 30,
  },
  icon: {
    fontSize: 32,
  },
});

export default EditionBar;
