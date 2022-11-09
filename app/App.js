import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import environmentalData from './functions/EnvironmentalData';
import ImagePickerFunction from './functions/PictureFunctions';
import User from './functions/User';
import createRootNavigator from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Camera Functionality</Text> */}
      <Button
        title="Go to Weather Functionality"
        onPress={() => navigation.navigate('Weather')}
      />
      <Button
        title="Go to User Functionality"
        onPress={() => navigation.navigate('User')}
      />
      <Button
        title="Go to Camera Functionality"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Fetching Weather Functionality</Text> */}
      {environmentalData(41.795949748662835, -87.59187911021162)}
    </View>
  );
}

function WardrobeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>User Wardrobe Functionality</Text> */}
      {User("leo")}
    </View>
  );
}

function CameraScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>User Wardrobe Functionality</Text> */}
      {ImagePickerFunction()}
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
        <Stack.Screen name="Weather" component={DetailsScreen} options={{ title: 'Weather' }}/>
        <Stack.Screen name="User" component={WardrobeScreen} options={{ title: 'User' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;