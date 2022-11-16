
import styles from './style';
import { Text, View } from 'react-native';
import environmentalData from './EnvironmentalData';
import { WEATHER_KEY } from "@env"
import { useState, useEffect } from 'react';
import * as Location from "expo-location"
import axios from 'axios';

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

    // Unit Testing getLocation
    const getLocation = async (index) => {
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
            
        let locationCopy = [...locationTest]
        locationCopy[index] = message
        setLocationTest(locationCopy);
    }

    // Unit Testing dailyRecommender


    useEffect((async () => {
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
        </View>
    )

}