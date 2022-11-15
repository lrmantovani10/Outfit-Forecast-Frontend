import { StyleSheet } from 'react-native';
import { withOrientation } from 'react-navigation';

export default StyleSheet.create({

    // Overall Styling
    title: {
        fontSize: 28, 
        fontWeight: "bold",
        color: "black", 
        fontFamily: 'Verdana'
    },
    h1: {
        fontSize: 20, 
        fontWeight: "bold",
        color: "black", 
        fontFamily: 'Verdana'
    },
    paragraph: {
        fontSize: 14, 
        color: "black", 
        fontFamily: 'Verdana'
    },
    background_color: {
        color: "#D6DDE0",
    },

    // App.js
    screenContainer: {
        flex: 1,
        color: "#D6DDE0",
        // justifyContent: "center",
        margin: 20
    },

    fifteen_separator: {
        height: 15
    },

    five_separator: {
        height: 5
    },

    // EnvironmentalData
    weatherComponent: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 5,
        marginBottom: 15
    },
    weatherInfo: {
        justifyContent: 'center'
    },
    weatherImageComponent: {
        width: "35%",
        height: "30%",
        marginLeft: "5%"
    },
    weatherImage: {
        height: 100
    }
});