import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useContext } from "react";
import AlbumEdit from "../components/AlbumEdit";
import { AlbumContext } from "../context/album.context";
import EditionBar from "../components/EditionBar";

const AlbumDetail = ({ navigation, route }) => {
  const { albumId } = route.params;
  const { albums, setAlbums } = useContext(AlbumContext);
  const album = albums.find((album) => album.id === albumId);
  const [albumData, setAlbumData] = useState(album);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(albumData.rating);

  const editAlbum = (editedAlbum) => {
    const updatedAlbums = albums.map((albumItem) =>
      albumItem.id === editedAlbum.id ? editedAlbum : albumItem
    );
    setAlbums(updatedAlbums);
    setAlbumData(editedAlbum);
    toggleShowForm();
  };

  const handleRating = (newRating) => {
    setRating(newRating);
    // Update album rating in the context
    const updatedAlbums = albums.map((albumItem) =>
      albumItem.id === albumData.id
        ? { ...albumItem, rating: newRating }
        : albumItem
    );
    setAlbums(updatedAlbums);
    setAlbumData({ ...albumData, rating: newRating });
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
        <EditionBar
          onEditAlbum={toggleShowForm}
          showForm={showForm}
          navigation={navigation}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {showForm && <AlbumEdit editAlbum={editAlbum} album={albumData} />}
          <View style={styles.information}>
            <Image
              source={{ uri: albumData.photoUrl }}
              style={styles.albumImage}
            />
            <Text style={styles.title}>{albumData.title}</Text>
            <Text style={styles.artist}>{albumData.artist}</Text>
            <Text style={styles.year}>{albumData.year}</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={[styles.starIcon, star <= rating && styles.filledStar]}
                  onPress={() => handleRating(star)}
                >
                  ★
                </Text>
              ))}
            </View>
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
  },
  information: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    paddingTop: 50,
  },
  albumImage: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 40,
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
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 5,
  },
  starIcon: {
    fontSize: 50,
    color: "#ccc",
    marginRight: 5,
  },
  filledStar: {
    color: "#ffd700",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default AlbumDetail;
