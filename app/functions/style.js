import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    // Overall Styling
    title: {
        fontSize: 28, 
        fontWeight: "bold",
        color: "black"
    },
    h1: {
        fontSize: 20, 
        fontWeight: "bold",
        color: "black"
    },
    h2: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black"
    },
    h3: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black"
    },
    paragraph: {
        fontSize: 14, 
        color: "black"
    },
    background_color: {
        color: "#D6DDE0",
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#365E6F',
        // margin: 10
    },
    buttonText: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        flexDirection: 'row'
    },
    activeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#D6DDE0',
    },

    // App.js
    screenContainer: {
        flex: 1,
        color: "#D6DDE0",
        // justifyContent: "center",
        margin: 20
    },

    screenContainer2: {
        color: "#D6DDE0",
        // justifyContent: "center",
        padding: 20
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
        marginBottom: 15,
        borderRadius: 10
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
    },

    // Unit Testing
    unitTesting: {
        flex: 1,
        flexDirection: "column",
        textAlign: "left",
        alignContent: "flex-start",
    },
    unitText: {
        fontSize:15
    },

    // User
    outfitComponent: {
        width: "100%",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10
    },
    userh1: {
        textAlign: "center",
        fontSize: 20, 
        fontWeight: "bold",
        color: "black",
        marginBottom: 10,
    },
    userCard: {
        textAlign: "center",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        paddingBottom:"10%"
    },  
    userImage: {
        width: "60%",
        height: 200
    },
    userTextLower: {
        fontSize: 10
    },
    acceptance_button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 4,
        // backgroundColor: 'white',
        borderStyle: "solid",
        borderColor: '#365E6F',
        borderWidth: "2",
        // margin: 10
      },
    twoAcrossButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    userButtonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "black"
    },

    // picgrid
    gridBackground: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    }
});