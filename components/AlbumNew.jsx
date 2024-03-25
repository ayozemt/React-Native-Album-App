import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import uuid from "react-native-uuid";

const defaultPhotoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg";

const AlbumNew = ({ addNewAlbum }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleTitleInput = (text) => setTitle(text);
  const handleArtistInput = (text) => setArtist(text);
  const handleYearInput = (text) => setYear(text);
  const handlePhotoUrl = (text) => setPhotoUrl(text);

  const handleSubmit = () => {
    if (!title || !artist || !year) {
      alert("Please complete all fields.");
      return;
    }
    const albumPhotoUrl = photoUrl ? photoUrl : defaultPhotoUrl;

    const albumId = uuid.v4();

    const newAlbum = {
      id: albumId,
      title,
      artist,
      year,
      photoUrl: albumPhotoUrl,
    };
    addNewAlbum(newAlbum);

    setTitle("");
    setArtist("");
    setYear("");
    setPhotoUrl("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Create a new album</Text>
      <TextInput
        style={[styles.input, styles.largeFont]}
        value={title}
        onChangeText={handleTitleInput}
        placeholder="Album title *"
        placeholderTextColor="gray"
      />
      <TextInput
        style={[styles.input, styles.largeFont]}
        value={artist}
        onChangeText={handleArtistInput}
        placeholder="Artist *"
        placeholderTextColor="gray"
      />
      <TextInput
        style={[styles.input, styles.largeFont]}
        value={year}
        onChangeText={handleYearInput}
        placeholder="Album year *"
        keyboardType="numeric"
        placeholderTextColor="gray"
      />
      <TextInput
        style={[styles.input, styles.largeFont]}
        value={photoUrl}
        onChangeText={handlePhotoUrl}
        placeholder="Cover URL"
        placeholderTextColor="gray"
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  h1: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
  },
  largeFont: {
    fontSize: 18,
  },
  submitButton: {
    color: "white",
    backgroundColor: "#a57c00",
    padding: 8,
    borderRadius: 5,
    width: 80,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default AlbumNew;
