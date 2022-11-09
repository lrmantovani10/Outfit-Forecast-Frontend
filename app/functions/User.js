import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text } from 'react-native';

export default function User(username) {
    const [wardrobe, setWardrobe] = useState([])
    const dailyRecommender = async (tempMin, tempMax, sensation, atmosphere) => {
        const recommenderEndpoint = `https://outfit-forecast.herokuapp.com/dailyRecommender/${username}/${tempMin.toString()}/${tempMax.toString()}/${sensation.toString()}/${atmosphere}`
        await axios.get(recommenderEndpoint).then((outcome) => {
            let clothingArray = []
            outcome.data.forEach(element => {
                clothingArray.push(element.objectName)
            });

           setWardrobe(clothingArray)
        }).catch((error) => {
            console.log("Error", error)
            setWardrobe(["Error"])
        })
    }

    useEffect(() => {
        dailyRecommender(60, 65, 63, "rain")
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 10 } } >
                Wardrobe: {wardrobe.toString()}
            </Text>
        </View>
    );
}