import React from 'react';
import axios from 'axios';
const weather_key = ""
export default function environmentalData(lat, lon) {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}`
    const getWeather = async () => {
        await axios.get(weatherEndpoint).then((outcome) => {
            const jsonResponse = outcome.json()
            const mainParameters = jsonResponse.main

            return [
                mainParameters.temp_min, mainParameters.temp_max,
                mainParameters.feels_like, jsonResponse.weather.main
            ]
            
        }).catch((error) => {
            return [error]
        })
    }

    const currentWeather = getWeather()
    return (
        <div>
            Current weather: 
            {currentWeather.forEach(element => {
                <p>
                    {element}
                </p>
            })}
            <p>

            </p>
        </div>
    );
}