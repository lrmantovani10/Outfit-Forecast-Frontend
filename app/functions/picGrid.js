// Goal: Visualize the user's clothing images

// Input: Clothing objects

// Functionality: Visualize images of clothing objects (maybe in a grid, carousel, etc)
// Stretch Functionality: Also visualize the associated temp range/classification/etc of the clothing item
    // Few ways to do this could be (1) enlarging image on click and overlaying text
    // (2) Have text be constantly overlaid over image

// Output: Gallery view of user's clothing 

import React, { Component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import GridImageView from 'react-native-grid-image-viewer'; // https://www.npmjs.com/package/react-native-grid-image-viewer
import { TempRanges } from './tempRanges';
import styles from "./style"

export default function PicGrid() {
    return (
        <View style={styles.gridBackground}>
            <Text style={styles.title}> Wardobe Pictures </Text>
            <Text style={styles.h2}>
                Click on an image to set wearable temperature range
            </Text>
            <GridImageView data={['https://loremflickr.com/360/360', 'https://loremflickr.com/640/360', 'https://loremflickr.com/640/360']}/>
        </View>
    );
}