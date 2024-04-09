import React from "react";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import AlbumCard from "../components/AlbumCard";
import AlbumNew from "../components/AlbumNew";
import { useState, useContext, useEffect } from "react";
import { AlbumContext } from "../context/album.context";
import Toolbar from "../components/Toolbar";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const AlbumList = ({ navigation }) => {
  const { albums, setAlbums } = useContext(AlbumContext);
  const [showForm, setShowForm] = useState(false);
  const [filteredAlbums, setFilteredAlbums] = useState(albums);

  useEffect(() => {
    setFilteredAlbums(albums);
  }, [albums]);

  const addNewAlbum = (newAlbum) => {
    const updatedAlbums = [newAlbum, ...filteredAlbums];
    setAlbums(updatedAlbums);
    toggleShowForm();
  };

  const deleteAlbum = (index) => {
    const updatedAlbums = [...filteredAlbums];
    updatedAlbums.splice(index, 1);
    setAlbums(updatedAlbums);
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSortAscending = () => {
    const sortedAlbums = [...filteredAlbums].sort((a, b) => a.year - b.year);
    setFilteredAlbums(sortedAlbums);
  };

  const handleSortDescending = () => {
    const sortedAlbums = [...filteredAlbums].sort((a, b) => b.year - a.year);
    setFilteredAlbums(sortedAlbums);
  };

  const handleSearch = (searchQuery) => {
    const filteredAlbums = albums.filter(
      (album) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.year.toString().includes(searchQuery.toLowerCase())
    );
    setFilteredAlbums(filteredAlbums);
  };

  const exportAlbums = async () => {
    try {
      const jsonAlbums = JSON.stringify(filteredAlbums);
      const path = FileSystem.documentDirectory + "albums.json";
      await FileSystem.writeAsStringAsync(path, jsonAlbums);
      await Sharing.shareAsync(path);
    } catch (error) {
      console.error("Error exporting albums:", error);
      alert("Error exporting albums. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpeg")}
      style={styles.backgroundImage}
    >
      <Toolbar
        onNewAlbum={toggleShowForm}
        onSortAscending={handleSortAscending}
        onSortDescending={handleSortDescending}
        onSearch={handleSearch}
        showForm={showForm}
        onExportAlbums={exportAlbums}
      />
      <View style={styles.container}>
        {showForm && <AlbumNew addNewAlbum={addNewAlbum} />}
        <AlbumCard
          albums={filteredAlbums}
          navigation={navigation}
          deleteAlbum={deleteAlbum}
        />
        {/* <StatusBar style="light" backgroundColor="grey" /> */}
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
