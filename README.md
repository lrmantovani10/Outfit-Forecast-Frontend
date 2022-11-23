# Outfit Forecast

Outfit Forecast is an app designed to make choosing weather appropriate outfits easy. Using the user's location and images of their wardrobe, our app recommends outfits with the weather in mind.  

## Running Outfit Forecast

Install dependencies locally with the command

```bash
npm install
```

Start the server with the command 

```bash
npx expo start
```

Upon startup, if you haven't used the app before there will be no clothes associated with user ID. Take or upload some pictures of your clothes to build your wardrobe and get predictions!

## Class Diagram

The folder containing all iterations of class diagrams for Outfit Forecast can be found at ```./class-diagrams```. The current class diagram in use can be found [here](class-diagrams/updatedClassDiagram6.png).

## Folder Structure and Functionality

* ```./app``` contains the code written for and implemented by the Outfit Forecast frontend team. 
* ```./app/App.js``` contains the screen views for Outfit Forecast and the navigation connecting various pages throughout the app. 
* ```./app/functions``` holds the components utilized in Outfit Forecast, the stylesheet, and the file for running unit tests. More on each individual function can be found below.
* ```./app/testing``` contains the acceptance tests written for Outfit Forecast frontend.

### Functions
* ```button.js``` is the universal button used throughout the app to maintain uniformity in styling.
* ```EnvironmentalData.js``` uses the location permission granted from the user to fetch the current weather and suggest an outfit from the user's wardrobe based on the weather.
* ```FirebaseInitialize.js``` initializes the necessary configurations to utilize Firebase for storing user wardrobe images.
* ```picGrid.js``` displays the clothing items that a user has uploaded to their Outfit Forecast wardrobe by fetching image URLs from Firebase.
* ```PictureFunctions.js``` encompasses the app functionality relating to image processing, such as taking a photo, choosing one from the user's photo gallery, and uploading this image to Firebase.
* ```style.js``` is the stylesheet for the app, defining app-wide text styling, color palette, and component styling.
* ```tempRanges.js``` provides functionality for setting a temperature range for an item of clothing when uploaded to the user's app wardrobe.
* ```unitTesting.js``` more on this can be found in the testing section below.
* ```User.js``` encompasses functionality pertaining to user authentication and outfit recommendation. Authentication is performed by appending a randomly generated ten digit integer to the user's phone name to serve as a unique identifier when requesting user data from the backend. 

## Testing
### Running Tests
Frontend testing is divided between two types, acceptance testing and unit testing. Depending on the output of various components, we have written some combination of acceptance tests and unit tests. Acceptance tests can be found in ```./app/testing/acceptance_tests.txt``` and unit tests can be run in the Outfit Forecast app via a button titled "Unit Testing" on the home page. Further instructions for running unit tests can be found on this page. 
 
### Notes on Tests
Although running tests through a screen in the app is an unconventional method, we have arrived at this solution for unit testing after exploring several other routes.
* For functions which only have visual renderings or require human input to function (ie navigation, picGrid, takePicture), we have written acceptance tests to outline expected functionality.
* We are not using a standard unit testing framework because due to the way React Native exports modules as opposed to isolated functions, traditional frameworks don't lend themselves well to this structure.
* DailyRecommender tests were moved to the backend to streamline the testing process. As such, tests for this function are no longer included in the frontend tests. 

## Milestone 4.B
From the planning phase of this milestone to completion, there have been several additions to features implemented, as well as completion of planned features. 
### New Features
#### Planned for Completion in Iteration 2
* ```EnvironmentalData.js``` function to get the weather at the user's location.
* ```dailyRecommeder()``` within ```User.js``` to recommend outfits to the user.
* ```uploadPicture()``` and associated picture functions to store and access images stored in Firebase.
* Adding a stylesheet to created a unified feel across the app. 
 
#### Unplanned but Completed in Iteration 2
* Added an authenticate method to ```User.js``` to fetch data related to a specific user from the database
* Implemented ```picGrid``` which displays the gallery of clothes a user has uploaded and expands the image when clicked.
* Added functionality to the accept and reject outfit buttons. 
* Tests for ```RandomString()```, ```authenticate()```, wardrobe, ```getDownloadURL()```
* Creating a testing page within the app for unit testing
#### Planned but Not Completed in Iteration 2
* Logo for Outfit Forecast
* Recommending an outfit less in the future when a user declines the outfit.
* Enabling the user to edit the temperature range for a clothing item after it is initially set in upload. 

### Work Distribution
* Lucas: adding user authentication and backend requests associated with a unique user, writing associated tests
* Luke C: pulling the wardrobe images associated with a user from Firebase, adding functionality to outfit accept and reject buttons, writing associated tests
* Luke K: adapting image upload functions to have the user set tempRanges after upload
* Allie: add wardrobe view (picGrid), writing acceptance tests for all functionality, general styling smoothing, updating ReadMe
