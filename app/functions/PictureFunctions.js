import React, { useState} from 'react';
import { Button,  View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase'

export default function ImagePickerFunction() {
    const [picture, update_image] = useState(null);

    const choosePicture = async () => {
      //  Launches the image gallery. We allow cropping/other editing
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      //  Save the picture if they successfully choose one
      if (!result.cancelled) {
            //upload to Firebase
              uploadImage(result.uri, "IMAGE")
                  .then(() => {
                      Alert.alert("Uploaded");
                  })
                  .catch((error) => {
                      Alert.alert("error");
                  });
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
      //upload to Firebase
        uploadImage(result.uri, "IMAGE")
            .then(() => {
                Alert.alert("Uploaded");
            })
            .catch((error) => {
                Alert.alert("Failed");
            });
      }
    }

    const uploadImage = async (uri, filename) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + filename);
        return ref.put(blob);
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