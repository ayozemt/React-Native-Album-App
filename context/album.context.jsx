import React, { createContext, useState, useEffect } from "react";
import exampleAlbums from "../album-collection.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AlbumContext = createContext();

export const AlbumProvider = ({ children }) => {
  const [albums, setAlbums] = useState([]);

  const loadAlbumsFromStorage = async () => {
    try {
      const jsonAlbums = await AsyncStorage.getItem("albums");
      if (jsonAlbums) {
        setAlbums(JSON.parse(jsonAlbums));
      } else {
        setAlbums(exampleAlbums);
      }
    } catch (error) {
      console.error("Error loading albums from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadAlbumsFromStorage();
  }, []);

  const saveAlbumsToStorage = async () => {
    try {
      const jsonAlbums = JSON.stringify(albums);
      await AsyncStorage.setItem("albums", jsonAlbums);
    } catch (error) {
      console.error("Error saving albums to AsyncStorage:", error);
    }
  };

  useEffect(() => {
    saveAlbumsToStorage();
  }, [albums]);

  return (
    <AlbumContext.Provider value={{ albums, setAlbums }}>
      {children}
    </AlbumContext.Provider>
  );
};
