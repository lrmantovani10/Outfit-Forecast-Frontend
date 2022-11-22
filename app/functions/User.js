import React, { useEffect } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView, Button, Pressable } from 'react-native';
import styles from "./style"
import Icon from 'react-native-vector-icons/FontAwesome';

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
        recommenderEndpoint += "new"
        await axios.get(recommenderEndpoint).then((outcome) => {
           props.setOutfit(outcome.data)
        }).catch((error) => {
            props.setOutfit(["Error", error])
        })
    }

    const classifyNew = async (lower, upper) => {
        const img_URL = "https://firebasestorage.googleapis.com/v0/b/outfit-forecast.appspot.com/o/clothing%2F325193.jpeg?alt=media&token=138e9b62-d27f-44e9-9888-171b84c9b6bf";
        let classifyEndpoint = `https://outfit-forecast.herokuapp.com/classifyNew/${props.username}/${img_URL}/${lower}/${upper}`
        await axios.post(classifyEndpoint).then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        if (props.weather.length == 4) {
            dailyRecommender(props.weather)
        }   
        else {
            props.setOutfit(["Waiting for the weather to load before showing outfit recommendation..."])
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
        <View style={styles.outfitComponent}>
            <Text style={styles.userh1}>Today's Outfit</Text>    
            <View style={styles.twoAcrossButton}>
                <Pressable
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#D6DDE0' : '#white',

                        },
                        styles.acceptance_button,
                        ]}
                >
                    <Text style={styles.userButtonText}>Accept</Text>
                </Pressable>

                <View style={{width: 10}}></View>

                <Pressable 
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#D6DDE0' : '#white',

                        },
                        styles.acceptance_button,
                        ]}
                        onPress={() => dailyRecommender(props.weather)}
                >

                    <Text style={styles.userButtonText}>Refresh</Text>
                </Pressable>
            </View>  
            <View style={styles.fifteen_separator}></View>    
            {
                props.outfit.map((element, index) => {
                    return (
                        <View style={styles.userCard} key={"clothingCard" + index.toString()}>
                            <Text style={styles.paragraph}>
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
        </View>
    );
}