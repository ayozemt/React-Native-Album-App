import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AlbumList from "../screens/AlbumList";
import AlbumDetail from "../screens/AlbumDetail";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Albums" component={AlbumList} />
      <Stack.Screen
        name="AlbumDetail"
        component={AlbumDetail}
        options={{ title: "Album Detail" }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
