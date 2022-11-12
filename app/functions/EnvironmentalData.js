import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { WEATHER_KEY } from "@env"
import * as Location from "expo-location";

export default function environmentalData() {
    const [weather, setWeather] = useState(["Loading weather..."])
    const getWeather = async (lat, lon) => {
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            setWeather(interestingParameters)
            
        }).catch((error) => {
            console.log("Error", error)
            setWeather(["Error fetching the weather from the API"])
        })
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setWeather(['Permission to access location was denied']);
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        await getWeather(location.Latitude, location.Longitude)
    }

    useEffect(() => {
        getLocation()
    }, [])

    const weatherKeys = ["Minimum Temperature", "Maximum Temperature",
        "Felt Temperature", "Atmosphere"]
    
    if (weather.length < 2) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10 } } >
                    Weather: {weather.toString()}
                </Text>
            </View>
        );
    }
    else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                {
                    weather.map((value, index) => {
                        <Text style={{ fontSize: 10 } } >
                            {weatherKeys[index]}: {value.toString()}
                        </Text>
                    })
                }
            </View>
        )
    }
}