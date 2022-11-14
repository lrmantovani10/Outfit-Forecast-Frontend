import React, { useState} from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as firebase from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";


/*import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import * as firebase2 from "firebase/storage"
*/

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
        update_image(result.uri)
        uploadImage(result.uri, "some-child")
            .then(() => {
                console.log("Image Uploaded");
                //Alert.alert("Uploaded");
            })
            .catch((error) => {
                console.log("Image NOT Uploaded");
                console.log(error);
                //Alert.alert(error);
            });
      }
      console.log("after upload selection");
    };

    const takePicture = async () => {
      console.log("Successfully opened.");
      //  Asking the user for permission to use their camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      //  Exiting if they don't grant permission
      if (permissionResult.granted === false) {
        return;
      }
      
      //  Waiting to see if user successfully takes picture. If they do, save it.
      const result = await ImagePicker.launchCameraAsync();
      console.log("Successfully took picture");
      if (!result.cancelled) {
      //upload to Firebase
        console.log("User didn't cancel");
        update_image(result.uri)
        console.log("Image updated");
        //const filename = "clothing/" + String(piture) + ".jpeg";
        //console.log(result.uri)
        uploadImage(result.uri, "image.jpeg")
            .then(() => {
                console.log("Image Uploaded");
                //Alert.alert("Uploaded");
            })
            .catch((error) => {
                console.log("Image NOT Uploaded");
                console.log(error);
                //Alert.alert(error);
            });
      }
    }

    const uploadImage = async (uri, filename) => {
      
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, filename);

        // 'file' comes from the Blob or File API
        console.log("before UPLOAD")
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        console.log("past this part");
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Take Photo" onPress={takePicture} />
        <Button title="Choose from Gallery" onPress={choosePicture} />
      </View>
    );
    // You can access the currently chosen image at anytime by using the variable 'picture'.
    // You can view the image using: {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
    //<Button title="Do Survey" onPress={doSurvey} />
  }