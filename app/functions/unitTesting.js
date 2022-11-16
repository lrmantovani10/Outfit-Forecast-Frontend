
import styles from './style';
import { Text, View } from 'react-native';
import environmentalData from './EnvironmentalData';
import { WEATHER_KEY } from "@env"
import { useState, useEffect } from 'react';
import * as Location from "expo-location"
import axios from 'axios';

import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as firebase from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function unitTesting() {

    // States used for testing
    const [weatherResult, setWeatherResult] = useState(["Running test 1...", "Running test 2...", "Running test 3..."])
    const [locationTest, setLocationTest] = useState(["Running test ..."])

    // Unit Testing getWeather
    const getWeather = async (lat, lon, index) => {
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            let location = outcome.data.name + ", " + outcome.data.sys.country
            let icon = outcome.data.weather[0].icon
            
            let weatherCopy = [...weatherResult]
            weatherCopy[index] = weatherTests(interestingParameters, location, icon)
            setWeatherResult(weatherCopy)
            
        }).catch((error) => {
            let weatherCopy = [...weatherResult]
            let message
            if (index == 2) {
                message = "[PASS]"
            }
            else {
                message = "Error fetching the weather from the API: " + error
            }
            weatherCopy[index] = message
            console.log(weatherCopy[index])
            setWeatherResult(weatherCopy)
        })
    }

    // Checking if API response meets exepceted requirements of length,
    // data type, and format
    const weatherTests = function (weather, location, icon) {
        let message = "Testing getWeather..."
        if (weather.length == 0) {
            return message
        }
        else {
            message = "[PASS]"
        }
        if (weather.length != 4) {
            message = "[FAIL] getWeather's response is not of the right size"
        }
        else {
            if (icon.length == 0) {
                return "[FAIL] Weather icon was not found"
            }
            if (location.length == 0) {
                return "[FAIL] Location was not detected by weather API"
            }
            weather.forEach((element, index) => {
                if (index < 3 && typeof (element) != "number") {
                   return "[FAIL] getWeather's response with wrong data type for " + element.toString()
                }
            });
        }
        return message
    }




  
    //Unit Testing Image Upload
    const [picture, update_image] = useState(null);

    const takePicture = async () => {
        console.log("Successfully opened.");
        //  Asking the user for permission to use their camera
        UploadTests();
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
          console.log(result.fileSize);
          const filename = "clothing/" + result.fileSize + ".jpeg";
          uploadImage(result.uri, filename)
              .then(() => {
                  console.log("Image Uploaded");
              })
              .catch((error) => {
                  console.log("Image NOT Uploaded");
                  console.log(error);
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
        setUploadResult("Upload in progress...");
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          setUploadResult("[PASS]");
        })
        .catch((error) => {
          console.log("blob or file NOT Uploaded");
          console.log(error);
        });
        console.log("past this part");
    }

    const [uploadResult, setUploadResult] = useState(null)

    const UploadTests = function () {
        let uplMsg = "Testing Upload Pictures..."
        if (picture == null) {
            setUploadResult(uplMsg)
            return
        }
        else {
            setUploadResult("[PASS]");
        }
    }


    useEffect((async () => {
        // Testing camera
        takePicture()
        // Inputs to getWeather
        // Two positive coordinates
        await getWeather(20, 30, 0)
        // One of the coordinates is negative but valid
        await getWeather(-10, 20, 1)
        // Invalid coordinates -- should fail
        await getWeather(-450, 100, 2)

        // Location test
        // User accepts can accept or deny location access, but coordinates must 
        // remain as numbers
        await getLocation(0)
    

    }), [])

    return (
        <View>
            {
                weatherResult.map((element, index) => {
                    return(
                        <Text style={styles.unitText}>Weather Test { index + 1}: {
                        element}
                    </Text>       
                    )
                })
            }
            {
                locationTest.map((element, index) => {
                    return(
                        <Text style={styles.unitText}>Location Test { index + 1}: {
                        element}
                    </Text>       
                    )
                })
            }
            
            <Text style={styles.unitText}>Weather Test: {
            weatherResult}
            <Text style={styles.unitText}>Upload Test: {
            uploadResult}
            </Text>
        </Text>  
        </View>
    )

}