// Goal: Visualize the user's clothing images

// Input: Clothing objects

// Functionality: Visualize images of clothing objects (maybe in a grid, carousel, etc)
// Stretch Functionality: Also visualize the associated temp range/classification/etc of the clothing item
    // Few ways to do this could be (1) enlarging image on click and overlaying text
    // (2) Have text be constantly overlaid over image

// Output: Gallery view of user's clothing 

import React, { Component, useState, useEffect } from 'react';
import {View, StyleSheet, Text, Image, ImageEditor} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer'; // https://www.npmjs.com/package/react-native-grid-image-viewer
import { TempRanges } from './tempRanges';
import styles from "./style"
import "./FirebaseInitialize";
import { getStorage, ref, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import ImagePickerFunction from  "./PictureFunctions";

export default function PicGrid(test, username) {
    console.log("PicGrid username: ", username)
    const[url, setUrl] = useState([]);

    useEffect(() => {
      const getImgURL = async (filename) => {
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
            setUrl([...url, x]);
        })
      }

      getImgURL('clothing/225469.jpeg');
    }, []);
          
    return (
        <View style={!test && styles.gridBackground}>
            {!test && <Text style={styles.title}> Wardobe Pictures </Text>}
            {test && <Text style={styles.title}> Test Wardobe Pictures </Text>}

            <Image
            style = {!test && {width: '30%', height: '30%'} || test && {width: '50%', height: '40%'} }
            source = {{uri : url[0]}}
            />
        </View>
    );
}