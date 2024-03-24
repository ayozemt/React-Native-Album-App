import React from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EditionBar = ({ navigation, onEditAlbum, showForm }) => {
  return (
    <View style={styles.toolbar}>
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
    height: 54,
  },
  icon: {
    marginRight: 10,
  },
});

export default EditionBar;
