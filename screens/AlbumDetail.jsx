import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Button,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import AlbumEdit from "../components/AlbumEdit";
import { AlbumContext } from "../context/album.context";

const AlbumDetail = ({ navigation, route }) => {
  const { album } = route.params;
  const [albumData, setAlbumData] = useState(album);
  const { albums, setAlbums } = useContext(AlbumContext);
  const [showForm, setShowForm] = useState(false);

  const editAlbum = (editedAlbum) => {
    const updatedAlbums = albums.map((albumItem) =>
      albumItem.id === editedAlbum.id ? editedAlbum : albumItem
    );
    setAlbums(updatedAlbums);
    setAlbumData(editedAlbum);
    toggleShowForm();
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.jpeg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {showForm && <AlbumEdit editAlbum={editAlbum} album={albumData} />}
          <Button
            title={!showForm ? "Click here to edit this album" : "Hide Form"}
            onPress={toggleShowForm}
          />
          <View style={styles.information}>
            <Image
              source={{ uri: albumData.photoUrl }}
              style={styles.albumImage}
            />
            <Text style={styles.title}>{albumData.title}</Text>
            <Text style={styles.artist}>{albumData.artist}</Text>
            <Text style={styles.year}>{albumData.year}</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  information: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  albumImage: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  artist: {
    fontSize: 24,
    textAlign: "center",
    padding: 10,
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  year: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,
    color: "white",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default AlbumDetail;
