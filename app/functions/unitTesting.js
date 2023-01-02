
import styles from './style';
import { Text, View, Button, Image, Platform, ScrollView } from 'react-native';
import { WEATHER_KEY } from "@env"
import { useState, useEffect } from 'react';
import * as Location from "expo-location"
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { TempRangesTest } from './tempRanges';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import PicGrid from './picGrid';
import ImagePickerFunction from './PictureFunctions';

import * as firebase from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";

export default function unitTesting() {

    // States used for testing
    const [weatherResult1, setWeatherResult1] = useState("Running test 1...")
    const [weatherResult2, setWeatherResult2] = useState("Running test 2...")
    const [weatherResult3, setWeatherResult3] = useState("Running test 3...")
    const [locationTest, setLocationTest] = useState("Running location test ...")
    const [randomNumberTest, setRandomNumberTest] = useState("Running random string test ...")
    const [authenticateTest, setAuthenticateTest] = useState("Running authenticate test ...")

    // Unit Testing getWeather

    // Checking if API response meets exepceted requirements of length,
    // data type, and format
    const weatherTests = function (weather, location, icon) {
        let message = "[PASS]"
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

    // Function to test getWeather
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
            let weatherTest = weatherTests(interestingParameters, location, icon)
            
            if (index == 0) {
                setWeatherResult1(weatherTest)
            }
            else if (index == 1) {
                setWeatherResult2(weatherTest)
            }
            else {
                setWeatherResult3(weatherTest)
            }
            return weatherTest
            
        }).catch((error) => {
            if (index == 2) {
                setWeatherResult3("[PASS]")
            }
            else {
                if (index == 0) {
                   setWeatherResult1("Error fetching the weather from the API: " + error)
                }
                else {
                    setWeatherResult2("Error fetching the weather from the API: " + error)
                }
            }
        })
    }


    // Unit Testing getLocation
    const getLocation = async () => {
        let message = "[PASS]"
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            message = "[PASS]: Permission to access the device's location was denied."
        }
        else {
            let location = await Location.getCurrentPositionAsync({});
            try {
                location = [location.coords.latitude, location.coords.longitude]     
                if (typeof (location[0]) != "number" || typeof (location[1]) != "number") {
                    message = "[FAIL]: Wrong type for at least one of the coordinates"
                }
            }
            catch (error) {
                message = "[FAIL]: " + error.toString()   
            }
        }
        setLocationTest(message)
    }

    // Unit Testing Image Upload
    const [picture, update_image] = useState(null);

    const takePicture = async () => {
        //  Asking the user for permission to use their camera
        UploadTests();
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
        //  Exiting if they don't grant permission
        if (permissionResult.granted === false) {
          return;
        }
        
        //  Waiting to see if user successfully takes picture. If they do, save it.
        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
        //upload to Firebase
          update_image(result.uri)
          console.log(result.fileSize);
          const filename = "clothing/" + result.fileSize + ".jpeg";
          uploadImage(result.uri, filename)
              .then(() => {
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
        setUploadResult("Upload in progress...");
        uploadBytes(storageRef, blob).then((snapshot) => {
          setUploadResult("[PASS]");
        })
        .catch((error) => {
          console.log("blob or file NOT Uploaded");
          console.log(error);
        }); 
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

    // Test to generate random string
    const generateRandomString = (stringLength) => {
        let outputString = ""
        for (let i = 0; i < stringLength; i++){
            outputString += ((Math.floor(Math.random() * 10)).toString())
        }
        return outputString
    }

    function randomNumberTesting(){
        let stringLength = 10
        if (generateRandomString(stringLength) == generateRandomString(stringLength)) {
            setRandomNumberTest("[FAIL]: Both random strings are the same")
        }
        else {
            setRandomNumberTest("[PASS]")
        }
    }

    // Authenticate test
    const authenticate = async () => {
        let deviceName = Device.deviceName
        let stringLength = 10
        deviceName = deviceName.toLowerCase().replace(/[^a-z]/g, "").replace("’", "")
        deviceName = deviceName.slice(0, (30 - stringLength))
        let credentials = await SecureStore.getItemAsync(deviceName);
        if (!credentials) {
            setAuthenticateTest("[FAIL]: Unable to determine user credentials")
        }
        else {
            const identifier = deviceName + credentials
            const accountEndpoint = `https://outfit-forecast.herokuapp.com/createUser/${identifier}`
            await axios.get(accountEndpoint).then((outcome) => {
                const response = outcome.data
                if (!response.includes("taken") & !response.includes("created")) {
                    setAuthenticateTest(["[FAILED]: " + response])
                }
                else {
                    setAuthenticateTest("[PASS]")
                }
            }).catch((error) => {
                setAuthenticateTest["[FAILED]: " + error]
            })   
        }
    }

    // Running tests when page loads
    useEffect((() => {
        // Testing camera
        takePicture()

        // Inputs to getWeather
        // Two positive coordinates
        getWeather(20, 30, 0)
        // One of the coordinates is negative but valid
        getWeather(-10, 20, 1)
        // Invalid coordinates -- should fail
        getWeather(-450, 100, 2)

        // Location test
        // User accepts can accept or deny location access, but coordinates must 
        // remain as numbers
        getLocation()

        // Random string test
        // Check if both strigs generated are different. The odds of 
        // them being equal is infinitesimally small, so we can consider
        // equal values as a test failure
        randomNumberTesting()

        // Authenticate test
        // check if we are able to retrieve the user's username, which should
        // already be created, since the User function has been called
        authenticate()
    }), [])

    return (
        <ScrollView style={styles.screenContainer2}>
            <Text style={styles.unitText}>Weather Test 1: {weatherResult1.toString()}</Text>
            <Text style={styles.unitText}>Weather Test 2: {weatherResult2.toString()}</Text>
            <Text style={styles.unitText}>Weather Test 3: {weatherResult3.toString()}</Text>
            <Text style={styles.unitText}>Location Test: { locationTest.toString()} </Text>       
            <Text style={styles.unitText}>Authenticate Test: { authenticateTest.toString()} </Text>       
            <Text style={styles.unitText}>Generate Random String Test: {randomNumberTest.toString()} </Text>
            <Text style={styles.unitText}>Upload Test: {
            uploadResult}
            </Text> 
            <Text>{"\n"}Tap the button below to test our picture functions and TempRanges class (this serves as a test for the
            makePopupVisible and tempInput functions as well as the functionality for choosing photos and setting temperature
            ranges as a whole). Since take photo was just tested upon launch, we will test this by choosing from the gallery.{"\n"}
            After you take or choose your picture, set the lower range to 10°F and the higher range to 90°F.{"\n"}
            Once you do this, you should see Testing tempInput... [PASS] appear.{"\n"}</Text>
            {/* Test Image Functionality */}
            {ImagePickerFunction(true)}
            {PicGrid(true)}
        </ScrollView>
    )

}
