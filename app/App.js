import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomButton from './functions/button';
import EnvironmentalData from './functions/EnvironmentalData';
import WardrobeGallery from './functions/wardrobeGallery'
import {TempRanges} from './functions/tempRanges'
import ImagePickerFunction from './functions/PictureFunctions';
import User from './functions/User';
import styles from './functions/style';

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
  const [weather, setWeather] = useState(["Loading weather..."])
  const [location, setLocation] = useState([""])
  const [weatherIcon, setWeatherIcon] = useState([""])
  const [outfit, setOutfit] = useState(["Loading recommendation..."])
  return (
    <SafeAreaView style={styles.screenContainer}>

      <CustomButton 
        title="Go to Wardrobe" 
        icon = "truck"
        onPress={() =>
          navigation.navigate('Wardrobe')
        }
      />
      <View style={styles.fifteen_separator}></View>
      
      <ScrollView>
        <View style={styles.weatherComponent}>
          <EnvironmentalData
            weather={weather}
            setWeather={setWeather}
            location={location}
            setLocation={setLocation}
            weatherIcon={weatherIcon}
            setWeatherIcon={setWeatherIcon} />
        </View>

        <View style={styles.userView}>
          <User
            username="leo"
            weather={weather}
            outfit={outfit}
            setOutfit={setOutfit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function WardrobeScreen({ navigation }) {
  return (
    <View style={styles.screenContainer}>

      {/* Wardrobe Display Component */}
      {/* <WardrobeGallery/> */}

      {/* NAVIGATION */}
      <CustomButton
        title="Add Items"
        onPress={() =>
          navigation.navigate('Camera')
        }
      />

      <View style={styles.fifteen_separator}></View>

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
    <View>
      <TempRanges/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "#D6DDE0" },
          headerStyle: { backgroundColor: 'black' }
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }}/>
        <Stack.Screen name="Wardrobe" component={WardrobeScreen} options={{ title: 'Wardrobe' }}/>
        <Stack.Screen name="Preferences" component={Preferences} options={{ title: 'Set Preferences' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

  export default App;