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

export default function PicGrid(test) {
  const [url_list, setUrls] = useState([])

  // Find all the prefixes and items.
    
  const getImgURL = async (filename, urls) => {
    const storage = getStorage();
    const reference = ref(storage, filename);
    let newUrl = await getDownloadURL(reference).then((x) => {
      return x
    })
    return newUrl
  }

  const getImageUrls = async (imageNames) => {
    let finalUrls = []
    let newUrl
    for(var i = 0; i < imageNames.length; i++)
      {
      newUrl = await getImgURL(imageNames[i]).then((newUrl) => {
        finalUrls.push(newUrl)
      })
        .catch((error) => {
          console.log("getImage Error", error)
        });
    }
    setUrls(finalUrls)
  }

  useEffect(() => {
    let imageNames = [];
    const username = global.username_global; 
    // Create a reference under which you want to list
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "/" + username);
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
        });
        res.items.forEach((itemRef) => {
          if(!(imageNames.includes(itemRef.fullPath)))
          {
            imageNames.push(itemRef.fullPath);
          }
        });
        getImageUrls(imageNames)
      }).catch((error) => {
        console.log(error)
      });
    
    }, []);
          
    return (
        <View style={!test && styles.gridBackground}>
            {!test && <Text style={styles.title}> Wardobe Pictures </Text>}
            {test && <Text style={styles.title}> Test Wardobe Pictures </Text>}
            <GridImageView data={url_list} />
        </View>
    );
}