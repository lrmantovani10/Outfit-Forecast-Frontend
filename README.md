# Outfit Forecast

Outfit Forecast is an app designed to make choosing weather appropriate outfits easy. Using the user's location and images of their wardrobe, our app recommends outfits with the weather in mind.  

## Running Outfit Forecast

1. Clone the repo locally

```git clone https://github.com/LukeKnutson9/Outfit-Forecast-Frontend.git ```

2. Download ***Expo Go*** on your mobile device.
3. In the root folder ```Outfit-Forecast-Frontend``` run:
* ```npm install``` to install dependencies
* ```npx expo start``` to start the server
4. You can either scan the QR code that appears in the terminal window, or open Expo Go and select ```Outfit-Forecast-Frontend```
5. With Expo Go running Outfit Forecast, you can start using the app. If you haven't used the app before, there will be no clothes associated with your userID. Take or upload some pictures of your clothes to build your wardrobe and get predictions!

## Functionality

At its core, Outfit Forecast is designed to take the guesswork out of what you should wear every day. Using the weather at your location and images of your wardrobe, Outfit Forecast will recommend temperature appropriate outfits for you to wear.
 
To begin using the app, go to your Wardrobe and take pictures of a variety of clothes from your wardrobe. Try to use pictures taken against a blank background with good lighting. We recommend uploading 8-10 articles of clothing to start—if you decline an outfit, the app will recommend a completely new outfit, so it's good to have multiples of clothing types (ie three shirts, two jackets, 3 pairs of pants, etc). From there, you can set temperature ranges for the clothes you have uploaded, and get recommendations! 

## Example Features
Below are a few acceptance tests from our test suite to get started with. To see the rest of the features with acceptance tests, go to our [testing](/app/testing/acceptance_tests.md) file.

#### Take Photo
##### Steps to Execute:
1. Open app to Home Screen
2. Click "Go to Wardrobe"
3. Click "Add Items"
4. Click "Take Photo"
5. Enable camera access
6. Take a photo
7. Click "Save"
8. Set temperature range

##### Expected Result for Each Step:
2. Opens Wardrobe View 
3. Opens Camera View 
4. Popup asks for camera permissions (if the popup doesn't appear, you may need to go to your 
phone Settings and enable camera access)
5. Phone camera opens 
6. An image is captured
7. The image is saved to your wardrobe
8. TempRange popup appears and asks you to set a min and max temp for the clothes

##### Desired End Outcome:
* When a photo is taken, the image should be added to the gallery in Wardrobe View
#
#### Share Outfit
##### Steps to Execute:
1. After adding clothing to the wardrobe, navigate to the HomeScreen
2. Share outfit

##### Expected Result for Each Step:
1. Should see "Home Page View" and suggested outfit.
2. Popup to share outfit should appear

##### Desired End Outcome:
* Recommended outfit should be a temperature appropriate outfit using clothes from your wardrobe

## Support
If you run into any issues, feel free to message any of us on Messenger, or send an email!

### Team 
Lucas Mantovani\
Perene Wang\
Luke Knutson\
Leo Shestakov\
Gautam Kapoor\
Luke Contreras\
Allie Chu\
Daniel Gilbert