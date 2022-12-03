import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Image, ScrollView, Button, Pressable, Share } from 'react-native';
import styles from "./style"
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

export default function User(props) {
    const [recent_image, update_recent_image] = useState(null);

    const generateRandomString = (stringLength) => {
        let outputString = ""
        for (let i = 0; i < stringLength; i++){
            outputString += ((Math.floor(Math.random() * 10)).toString())
        }
        return outputString
    }

    const authenticate = async () => {
        let deviceName = Device.deviceName
        let stringLength = 10
        let uniqueId
        deviceName = deviceName.toLowerCase().replace(/[^a-z]/g, "").replace("’", "")
        deviceName = deviceName.slice(0, (30 - stringLength))
        let credentials = await SecureStore.getItemAsync(deviceName);
        if (credentials) {
            uniqueId = credentials
        }
        else {
            uniqueId = generateRandomString(stringLength)
            await SecureStore.setItemAsync(deviceName, uniqueId)
        }
        const identifier = deviceName + uniqueId;
        //console.log("User.js username: ", identifier);
        global.username_global = identifier;
        // const identifier = "leo"
        const accountEndpoint = `https://outfit-forecast.herokuapp.com/createUser/${identifier}`;
        await axios.get(accountEndpoint).then((outcome) => {
            const response = outcome.data
            if (response.includes("taken") || response.includes("created")) {
                props.setUsername(identifier)
                dailyRecommender(props.weather, identifier, "new")   
            }
            else {
                props.setOutfit(["Error authenticating: " + response])
            }
        }).catch((error) => {
            props.setOutfit(["Error authenticating: " + error])
        })   
    }

    const dailyRecommender = async (weather, identifier, callStatus) => {
        let recommenderEndpoint = `https://outfit-forecast.herokuapp.com/dailyRecommender/${identifier}/`
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
        recommenderEndpoint += callStatus
        await axios.get(recommenderEndpoint).then((outcome) => {
            const result = outcome.data
            let finalList = []
            //console.log("dailyRecommender results: ", result)
            if (result) {
                result.forEach((element, index) => {
                    if (element) {
                        update_recent_image(element.imgURL);
                        //console.log("recent_image", recent_image);
                        finalList.push(element);
                    }
                })
                if (finalList.length > 0) {
                    props.setOutfit(finalList)     
                } 
            }
            if (!result || finalList.length == 0) {
                props.setOutfit(["No clothes are currently available for this user. Add more through the app!"])
            }
        }).catch((error) => {
            props.setOutfit(["Error fetching daily recommendation: " + error])
        })
    }

    const shareData = async () => {
        try {
            let shareMessage = "Check out my outfit for the day: "
            props.outfit.forEach((clothing) => {
                if (clothing) {
                    shareMessage += (clothing.objectName + ", ")   
                }
            })
            shareMessage = shareMessage.slice(0, -2)
            await Share.share({
                message:
                    shareMessage,
            });
        } catch (error) {
            props.setOutfit(["An error has occured while trying to share the outfit."])
        }
    };

    useEffect(() => {
        if (props.weather.length == 4) {
            authenticate()
        }   
        else {
            props.setOutfit(["Waiting for the weather to load before showing outfit recommendation..."])
        }
    }, [, props.weather])

    if (props.outfit.length < 1 || typeof props.outfit[0] == "string") {
        return (
            <View style={styles.userTextLower}>
            <Text>{props.outfit.toString()}</Text>
            </View>
        )
    }

    return (
        <View style={styles.outfitComponent}>
            <Text style={styles.userh1}>Today's Outfit</Text>    
            <View style={styles.twoAcrossButton}>
                <Pressable
                    style={styles.button}
                    onPress={shareData}
                >
                    <Text style={styles.buttonText}>Share</Text>
                </Pressable>

                <View style={{width: 10}}></View>

                <Pressable 
                    style={styles.button}
                    onPress={() => {
                            props.setOutfit(["Fetching new outfit..."])
                            dailyRecommender(props.weather, props.username, "reject")
                        }}
                >
                    <Text style={styles.buttonText}>Refresh</Text>
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