import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Button,
  Dimensions,
} from "react-native";

import AlbumCard from "../components/AlbumCard";
import AlbumNew from "../components/AlbumNew";
import { useState, useContext } from "react";
import { AlbumContext } from "../context/album.context";

const AlbumList = ({ navigation }) => {
  const { albums, setAlbums } = useContext(AlbumContext);
  const [showForm, setShowForm] = useState(false);

  const addNewAlbum = (newAlbum) => {
    const updatedAlbums = [newAlbum, ...albums];
    setAlbums(updatedAlbums);
    toggleShowForm();
  };

  const deleteAlbum = (index) => {
    const updatedAlbums = [...albums];
    updatedAlbums.splice(index, 1);
    setAlbums(updatedAlbums);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {showForm && <AlbumNew addNewAlbum={addNewAlbum} />}
        <Button
          title={!showForm ? "Click here to add a new album" : "Hide Form"}
          onPress={toggleShowForm}
        />
        <AlbumCard
          albums={albums}
          navigation={navigation}
          deleteAlbum={deleteAlbum}
        />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default AlbumList;
