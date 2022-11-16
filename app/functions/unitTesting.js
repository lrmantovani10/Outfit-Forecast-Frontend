import styles from './style';
import { Text } from 'react-native';
import environmentalData from './EnvironmentalData';
import { WEATHER_KEY } from "@env"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TempRangesTest } from './tempRanges';


export default function unitTesting() {

    // Unit Testing getWeather
    const [weatherTest, setWeatherTest] = useState([])
    const [testLocation, setLocationTest] = useState("")
    const [testIcon, setTestIcon] = useState("")
    const [weatherResult, setWeatherResult] = useState("Testing getWeather...")
    const getWeather = async (lat, lon) => {
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            console.log(interestingParameters)
            setWeatherTest(interestingParameters)
            setLocationTest(outcome.data.name + ", " + outcome.data.sys.country)
            setTestIcon(outcome.data.weather[0].icon)
            weatherTests(weatherTest, testLocation, testIcon)
            
        }).catch((error) => {
            setWeatherTest(["Error fetching the weather from the API:", error])
            return ([weather, "", ""])
        })
    }

    const weatherTests = function (weather, location, icon) {
        let message = "Testing getWeather..."
        if (weather.length == 0) {
            setWeatherResult(message)
            return
        }
        else {
            message = "[PASS]"
        }
        if (weather.length != 4) {
            message = "[FAIL] getWeather's response is not of the right size"
        }
        else {
            if (icon.length == 0) {
                setWeatherResult("[FAIL] Weather icon was not found")
                return
            }
            if (location.length == 0) {
                setWeatherResult("[FAIL] Location was not detected by weather API")
                return
            }
            weather.forEach((element, index) => {
                if (index < 3 && typeof (element) != "number") {
                   setWeatherResult("[FAIL] getWeather's response with wrong data type for " + element.toString())
                   return
                }
            });
        }
        setWeatherResult(message)
    }

    useEffect((() => {
        getWeather(20, 30)   
    }), [])


    // Unit Testing getLocation
    
    return (
        <Text style={styles.unitText}>Weather Test: {
            weatherResult}
        {/* Unit Testing makePopupVisible and tempInput, both which require user interaction */}
        <Text>{"\n"}{"\n"}Tap the button below to test our TempRanges class (this serves as a test for the
         makePopupVisible and tempInput functions) Set the lower range to 10°F and the higher range to 90°F.
         Once you do this, you should see Testing tempInput... [PASS] appear.{"\n"}{"\n"}</Text>
        <TempRangesTest/>
        </Text>
    )

}