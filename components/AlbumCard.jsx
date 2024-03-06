import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";

const AlbumCard = ({ albums, navigation, deleteAlbum }) => {
  const confirmDeleteAlbum = (index) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete the album?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteAlbum(index),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <FlatList
      style={styles.list}
      data={albums}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AlbumDetail", { album: item });
          }}
        >
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.photoUrl }} style={styles.albumImage} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  confirmDeleteAlbum(index);
                }}
              >
                {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
                <Ionicons name="trash-outline" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    marginBottom: 55,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  albumImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderBottomLeftRadius: 15,
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  artist: {
    fontSize: 16,
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "darkred",
    padding: 8,
    borderRadius: 5,
    marginTop: 15,
    marginLeft: 135,
    width: 40,
    alignItems: "center",
  },
  // deleteButtonText: {
  //   color: "gray",
  //   textAlign: "center",
  // },
});

export default AlbumCard;
