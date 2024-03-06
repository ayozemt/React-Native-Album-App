import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const defaultPhotoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/12in-Vinyl-LP-Record-Angle.jpg/800px-12in-Vinyl-LP-Record-Angle.jpg";

const AlbumEdit = ({ editAlbum, album }) => {
  const [title, setTitle] = useState(`${album.title}`);
  const [artist, setArtist] = useState(`${album.artist}`);
  const [year, setYear] = useState(`${album.year}`);
  const [photoUrl, setPhotoUrl] = useState(`${album.photoUrl}`);

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

    const editedAlbum = {
      id: album.id,  //No tener aquí el id era lo que hacía que no funcionara la edición
      title,
      artist,
      year,
      photoUrl: albumPhotoUrl,
    };
    editAlbum(editedAlbum);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Edit this album</Text>
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
        <Text style={styles.submitButtonText}>Save</Text>
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
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingBottom: 50,
  },
  h1: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
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
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default AlbumEdit;
