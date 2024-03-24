import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Toolbar = ({
  onNewAlbum,
  onSortAscending,
  onSortDescending,
  onSearch,
  showForm,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={onNewAlbum}>
        <Ionicons
          name={showForm ? "remove" : "add"}
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSortAscending}>
        <Ionicons name="arrow-up" size={24} color="white" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onSortDescending}>
        <Ionicons
          name="arrow-down"
          size={24}
          color="white"
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={24}
          color="white"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor="white"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
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
    paddingTop: 30,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "white",
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    width: 230,
  },
  searchIcon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: "white",
    paddingVertical: 7,
  },
});

export default Toolbar;
