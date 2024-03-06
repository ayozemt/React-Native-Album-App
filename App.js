import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/Navigator";
import { AlbumProvider } from "./context/album.context"

const App = () => {
  return (
    <AlbumProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </AlbumProvider>
  );
};

export default App;
