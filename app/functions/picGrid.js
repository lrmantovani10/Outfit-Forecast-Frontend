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
import { getStorage, ref, getDownloadURL, connectStorageEmulator, listAll } from "firebase/storage";
import ImagePickerFunction from  "./PictureFunctions";

var imageNames = [];
var urls = [];
export default function PicGrid(test) {

    // Create a reference under which you want to list
    console.log("BEFORE");
    const storage = getStorage();


    // Create a reference under which you want to list
    const listRef = ref(storage, '/LC');
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          console.log(folderRef.fullPath);
        });
        res.items.forEach((itemRef) => {
          console.log(itemRef.fullPath);
          if(!(imageNames.includes(itemRef.fullPath)))
          {
            imageNames.push(itemRef.fullPath);
          }
        });
      }).catch((error) => {
        console.log(error)
      });

    // Find all the prefixes and items.
   
    const[url, setUrl] = useState();

    useEffect(() => {
      const getImgURL = async (filename) => {
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
          if(!(urls.includes(x)))
          {
            urls.push(x);
          }
        })
      }
    console.log("OVER");
    
    for(var i = 0; i < imageNames.length; i++)
    {
      getImgURL(imageNames[i]);
    }
    
    }, []);
    console.log("LAST ONE");
    console.log(imageNames);
          
    return (
        <View style={!test && styles.gridBackground}>
            {!test && <Text style={styles.title}> Wardobe Pictures </Text>}
            {test && <Text style={styles.title}> Test Wardobe Pictures </Text>}
            <GridImageView data={urls} />
        </View>
    );
}