import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomButton from './functions/button';
import EnvironmentalData from './functions/EnvironmentalData';
import WardrobeGallery from './functions/wardrobeGallery'
import TempRanges from './functions/tempRanges'
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
    <View style={styles.screenContainer}>

      {/* Weather Component */}
      {/* <EnvironmentalData/> */}

      {/* NAVIGATION */}
      <CustomButton 
        title="Go to Wardrobe" 
        icon = "truck"
        onPress={() =>
          navigation.navigate('Wardrobe')
        }
      />

      {/* Recommended Clothing Component */}
      <User/>

    </View>
  );
}

function WardrobeScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>

      {/* Wardrobe Display Component */}
      {/* <WardrobeGallery/> */}
      {/* Gallery component displaying images of clothes */}
        {/* On click, full size overlay of clothes with temp range/sensitity info */}

      {/* NAVIGATION */}
      <CustomButton
        title="Add Items"
        onPress={() =>
          navigation.navigate('Camera')
        }
      />

      <View style={styles.separator}></View>

      <CustomButton
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
    <View style={styles.screenContainer}>
      {/* Display Image Functionality */}
      {ImagePickerFunction()}
    </View>
  );
}

function Preferences({ navigation }) {
  return (
    <View style={styles.screenContainer}>

      {/* Add New Temp Ranges */}
      <CustomButton
        title="Add New Temp Ranges"
        onPress={() =>
          <TempRanges newItem={true}/>
        }
      />

      {/* Update Temp Ranges */}
      {/* <Button
        title="Update Current Temp Ranges"
        onPress={() =>
          <tempRanges newItem={false}/>
        }
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  separator: {
    height: 15
  }
});


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