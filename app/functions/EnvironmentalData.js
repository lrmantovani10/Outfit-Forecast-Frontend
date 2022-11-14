import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Image } from 'react-native';
import { WEATHER_KEY } from "@env"
import * as Location from "expo-location"
import styles from './style';
import style from './style';

export default function environmentalData(props) {
    const getWeather = async (lat, lon) => {
        const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
        await axios.get(weatherEndpoint).then((outcome) => {
            const mainParameters = outcome.data.main
            const interestingParameters = [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, outcome.data.weather[0].main
            ]
            props.setWeather(interestingParameters)
            props.setLocation(outcome.data.name + ", " + outcome.data.sys.country)
            props.setWeatherIcon(outcome.data.weather[0].icon)
            
        }).catch((error) => {
            props.setWeather(["Error fetching the weather from the API:", error])
        })
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            props.setWeather(["Permission to access the device's location was denied. Check your location settings for Expo."]);
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        await getWeather(location.coords.latitude, location.coords.longitude)
    }

    useEffect(() => {
        getLocation()
    }, [])

    const weatherKeys = ["Min Temp (F)", "Max Temp (F)",
        "Feels Like (F)", "Atmosphere"]
    
    if (props.weather.length < 4) {
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
            <View style={styles.weatherComponent}>
                <View style={styles.weatherIcon}>
                    <Text style={styles.h1}>{props.location}</Text>
                    <View style={styles.five_separator}></View>
                    {
                        props.weather.map((value, index) => {
                            return(
                                <Text key={"weatherText" + index.toString()} style={styles.paragraph}>
                                {weatherKeys[index]}: {value.toString()}
                            </Text>
                            )
                        })
                    }
                </View>
                
                <View style={styles.weatherImage}>
                    {
                        <Image source={{ uri: "http://openweathermap.org/img/w/" + props.weatherIcon + ".png" }}
                            style={{height: 60} } />
                    }
                </View>
            </View>
        )
    }
}