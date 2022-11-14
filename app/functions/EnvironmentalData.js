import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { WEATHER_KEY } from "@env"
import * as Location from "expo-location"

export default function environmentalData(props) {
    const getWeather = async (lat, lon) => {
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            console.log("Weather", interestingParameters)
            props.setWeather(interestingParameters)
            props.setLocation(outcome.data.name + ", " + outcome.data.sys.country)
            
        }).catch((error) => {
            props.setWeather(["Error fetching the weather from the API:", error])
        })
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("Location status", status)
        if (status !== 'granted') {
            props.setWeather(["Permission to access the device's location was denied. Check your location settings for Expo."]);
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log("Location coordinates:", location)
        await getWeather(location.coords.latitude, location.coords.longitude)
    }

    useEffect(() => {
        getLocation()
    }, [])

    const weatherKeys = ["Minimum Temperature", "Maximum Temperature",
        "Felt Temperature", "Atmosphere"]
    
    if (props.weather.length < 2) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10 } } >
                    Weather: {props.weather.toString()}
                </Text>
            </View>
        );
    }
    else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    <Text style={{ fontSize: 10 } }>
                        Weather: {props.weather.toString()}
                    </Text>
                }

                {
                    props.weather.map((value, index) => {
                        <Text style={{ fontSize: 10, color: "black" } } >
                            {weatherKeys[index]}: {value.toString()}
                        </Text>
                    })
                }
            </View>
        )
    }
}