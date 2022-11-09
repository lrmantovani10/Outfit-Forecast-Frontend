import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

const weather_key = "aff5f1c31e4c8c1873622a552db58d7c"
export default function environmentalData(lat, lon) {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.toString()}&lon=${lon.toString()}&appid=${weather_key}`
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
            setWeather([])
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