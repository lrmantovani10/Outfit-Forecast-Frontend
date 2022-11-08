import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [picture, update_image] = useState(null);

  const doSurvey = async () => {
    console.log("This is a placeholder for the survey, which will be launched via\
    a button in a similar manner. This function will likely be part of a seperate\
    class or default function so don't expect to find it here in the final version.")
  };

  const choosePicture = async () => {
    //  Launches the image gallery. We allow cropping/other editing
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    //  Save the picture if they successfully choose one
    if (!result.cancelled) {
      update_image(result.uri);
    }
  };

  const takePicture = async () => {
    //  Asking the user for permission to use their camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    //  Exiting if they don't grant permission
    if (permissionResult.granted === false) {
      return;
    }
    
    //  Waiting to see if user successfully takes picture. If they do, save it.
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      update_image(result.uri);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Do Survey" onPress={doSurvey} />
      <Button title="Take Photo" onPress={takePicture} />
      <Button title="Choose from Gallery" onPress={choosePicture} />
    </View>
  );
  // You can access the currently chosen image at anytime by using the variable 'picture'.
  // You can view the image using: {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
}