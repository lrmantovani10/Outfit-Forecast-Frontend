import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as firebase from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { TempRanges, TempRangesTest } from './tempRanges';


/*import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import * as firebase2 from "firebase/storage"
*/

export default function ImagePickerFunction(test) {
    console.log("ImagePickerFunction username: ", global.username_global)
    const username = global.username_global;
    const [picture, update_image] = useState(null);
    const [allImages, setImages] = useState([]);
    const [url, update_url] = useState(null);

    const choosePicture = async () => {
      //  Launches the image gallery. We allow cropping/other editing
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      //  Save the picture if they successfully choose one
      if (!result.cancelled) {
        console.log("User didn't cancel");
        update_image(result.uri);
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
        console.log(result.fileSize);
        const filename = username + "/" + result.fileSize + ".jpeg";
        uploadImage(result.uri, filename)
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
        //console.log("response is", response)
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, filename);

        // 'file' comes from the Blob or File API
        console.log("before UPLOAD")
        uploadBytes(storageRef, blob).then((snapshot) => {
          //console.log("snapshot is", snapshot)
          console.log('Uploaded a blob or file!');
          getDownloadURL(ref(storage, filename))
          .then((url_test) => {
            console.log("url_test", url_test)
            update_url(url_test);
          }).catch((error) => {
            console.log("getDownloadURLError", error)
          })
          console.log(filename);
          console.log("past this part");
          setImages([...allImages, filename]);
          console.log(allImages);
        })
        .catch((error) => {
          console.log("blob or file NOT Uploaded");
          console.log(error);
        });
    }

    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {!test && <Button title="Take Photo" onPress={takePicture} />}
        {!test && <Button title="Choose from Gallery" onPress={choosePicture} />}
        {test && <Button title="Test Choose from Gallery" onPress={choosePicture} />}
        {picture && !test && url && <TempRanges uriInput={picture} url={url}/>} 
        {picture && test && <TempRangesTest uriInput={picture}/>} 
        
      </View>
    );
    // You can access the currently chosen image at anytime by using the variable 'picture'.
    // You can view the image using: {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
    //<Button title="Do Survey" onPress={doSurvey} />
  }