import React, { useState, useEffect } from 'react';
import environmentalData from './functions/EnvironmentalData';
import ImagePickerFunction from './functions/PictureFunctions';
import createRootNavigator from './navigation';
import { NavigationContainer } from '@react-navigation/native';


export default function mainApp() {
  <NavigationContainer>
    return createRootNavigator();
  </NavigationContainer>
  // return environmentalData(41.795949748662835, -87.59187911021162);
  // return ImagePickerFunction();
}
