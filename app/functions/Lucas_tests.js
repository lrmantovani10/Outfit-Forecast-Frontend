import axios from 'axios';

//getWeather
const getWeather = async (lat, lon) => {
    let weather, location, weatherIcon
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat.toString()}&lon=${lon.toString()}&appid=${WEATHER_KEY}`
    await axios.get(weatherEndpoint).then((outcome) => {
        const mainParameters = outcome.data.main
        const interestingParameters = [
            mainParameters.temp_min, mainParameters.temp_max,
            mainParameters.feels_like, outcome.data.weather[0].main
        ]

        weather = interestingParameters
        location = outcome.data.name + ", " + outcome.data.sys.country
        weatherIcon = outcome.data.weather[0].icon
        
    }).catch((error) => {
        weather = ["Error fetching the weather from the API:", error]
    })

    return([weather, location, weatherIcon])
}


//dailyRecommender
const dailyRecommender = async (username, weather) => {
    let recommenderEndpoint = `https://outfit-forecast.herokuapp.com/dailyRecommender/${username}/`
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

//getLocation

const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        props.setWeather(["Permission to access the device's location was denied. Check your location settings for Expo."]);
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    await getWeather(location.coords.latitude, location.coords.longitude)
}