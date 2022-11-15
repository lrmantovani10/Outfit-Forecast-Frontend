import React, { useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from "./style"

export default function User(props) {
    const dailyRecommender = async (weather) => {
        let recommenderEndpoint = `https://outfit-forecast.herokuapp.com/dailyRecommender/${props.username}/`
        weather.forEach((element, index) => {
            let additive;
            if (index < 3) {
                additive = element.toFixed().toString()
            }
            else {
                additive = element
            }
            recommenderEndpoint += `${additive}/`
        })
        recommenderEndpoint = recommenderEndpoint.slice(0, recommenderEndpoint.length - 1)
        await axios.get(recommenderEndpoint).then((outcome) => {
           props.setOutfit(outcome.data)
        }).catch((error) => {
            props.setOutfit(["Error", error])
        })
    }

    useEffect(() => {
        if (props.weather.length == 4) {
            dailyRecommender(props.weather)
        }   
        else {
            props.setOutfit(["Waiting for weather to load before showing outfit recommendation..."])
        }
    }, [,props.weather])

    if (props.outfit.length <= 1) {
        return (
                <Text style={styles.userTextLower}>
                    {props.outfit.toString()}
                </Text>
        )
    }
    return (
        <ScrollView>
        <Text style={styles.userTitle}>Today's Outfit</Text>
            {
                props.outfit.map((element, index) => {
                    return (
                        <View style={styles.userCard} key={"clothingCard" + index.toString()}>
                            <Text style={styles.userText}>
                                {element.objectName[0].toUpperCase() + element.objectName.substring(1)}
                            </Text>
                            <Image
                                style={styles.userImage}
                                source={{ uri: element.imgURL }}
                            />
                        </View>
                    )
                })
            }
        </ScrollView>
    );
}