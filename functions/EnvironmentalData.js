import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';
import { WEATHER_KEY } from "@env"

export default function environmentalData(lat, lon) {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
    const [weather, setWeather] = useState([])

    const getWeather = async () => {
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            setWeather(interestingParameters)
            console.log(interestingParameters)
            
        }).catch((error) => {
            console.log("Error", error)
            setWeather(["Error fetching the weather from the API"])
        })
    }

    useEffect(() => {
        getWeather()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10 } } >
                Weather: {weather.toString()}
            </Text>
        </View>
    );
}