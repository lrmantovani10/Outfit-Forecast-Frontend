import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

export default function User(props) {
    const dailyRecommender = async (weather) => {
        let recommenderEndpoint = `https://outfit-forecast.herokuapp.com/dailyRecommender/${props.username}/`
        weather.forEach((element) => {
            recommenderEndpoint += `${element.toString()}/`
        })
        console.log(recommenderEndpoint)
        await axios.get(recommenderEndpoint).then((outcome) => {
           props.setWardrobe(outcome)
        }).catch((error) => {
            props.setWardrobe(["Error", error])
        })
    }

    useEffect(() => {
        if (props.weather.length == 4) {
            dailyRecommender(props.weather)
        }   
        else {
            props.setWardrobe(["Please reload the weather to get a recommendation"])
        }
    }, [,props.weather])

    if (props.wardrobe.length <= 1) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 10 } }>
                Wardrobe: {props.wardrobe.toString()}
                </Text>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10 } } >
                Wardrobe: {props.wardrobe.toString()}
            </Text>
        </View>
    );
}