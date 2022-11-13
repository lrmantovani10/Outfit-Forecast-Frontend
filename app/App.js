import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import environmentalData from './functions/EnvironmentalData';
import wardrobeGallery from './functions/wardrobeGallery'
import tempRanges from './functions/tempRanges'
import ImagePickerFunction from './functions/PictureFunctions';
import User from './functions/User';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBV58C4jXRoly73vzSV_ZofgUycqCDsEAo",
  authDomain: "outfit-forecast.firebaseapp.com",
  projectId: "outfit-forecast",
  storageBucket: "outfit-forecast.appspot.com",
  messagingSenderId: "7778456220",
  appId: "1:7778456220:web:1776026426a9bcdda85359",
  measurementId: "G-45F0GJK4J0"
};

if(!firebase.apps.length) {firebase.initializeApp(firebaseConfig)};


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* Weather Component */}
      <environmentalData/>

      {/* Recommended Clothing Component */}
      <User/>

      {/* NAVIGATION */}
      <Button
        title="Wardrobe"
        onPress={() =>
          navigation.navigate('Wardrobe')
        }
      />
    </View>
  );
}

function WardrobeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* Wardrobe Display Component */}
      <wardrobeGallery/>
      {/* Gallery component displaying images of clothes */}
        {/* On click, full size overlay of clothes with temp range/sensitity info */}

      {/* NAVIGATION */}
      <Button
        title="Add Items"
        onPress={() =>
          navigation.navigate('Camera')
        }
      />

      <Button
        title="Set Preferences"
        onPress={() =>
          navigation.navigate('Preferences')
        }
      />

    </View>
  );
}

function CameraScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Display Image Functionality */}
      {ImagePickerFunction()}
    </View>
  );
}

function Preferences({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* Add New Temp Ranges */}
      <Button
        title="Add New Temp Ranges"
        onPress={() =>
          <tempRanges newItem={true}/>
        }
      />

      {/* Update Temp Ranges */}
      <Button
        title="Update Current Temp Ranges"
        onPress={() =>
          <tempRanges newItem={false}/>
        }
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }}/>
        <Stack.Screen name="Wardrobe" component={WardrobeScreen} options={{ title: 'Wardrobe' }}/>
        <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Set Preferences' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  export default App;