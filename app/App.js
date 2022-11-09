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
      {/* <Text>Home Screen</Text> */}
      <Button
        title="Go to Weather Functionality"
        onPress={() => navigation.navigate('Weather')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Details Screen</Text> */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
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
        <Stack.Screen name="Weather" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


// export default function mainApp() {

//   // <NavigationContainer>
//   //   return createRootNavigator();
//   // </NavigationContainer>
//   // return environmentalData(41.795949748662835, -87.59187911021162);
//   // return ImagePickerFunction();
//   // return User("leo");
// }