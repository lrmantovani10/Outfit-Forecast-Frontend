# Outfit-Forecast

An app to generate outfit predictions based on one's wardrobe and current weather.

Current class diagram
![Class Diagram](class-diagrams/updatedClassDiagram5.png)

Acceptance tests file: testing/acceptance_tests.txt
Unit testing file (run through app): app/functions/unitTesting.js

How to run code:
- npm install (for dependencies)
- npx expo start

How to run the test cases:
- The majority of our testing is designed to be executed via acceptance testing. In the acceptance_tests.txt file, there are acceptance tests written for the features we have implemented in the frontend.
- The rest of the unit testing occurs via the "Testing" button on the home screen. The tests will run when the page is loaded, and the output from the tests will be displayed on the testing screen.

When testing, note that:
- DailyRecommender was moved to the backend to remove redundancy and will be used there instead. All tests have been removed from the frontend.
- Some tests may have been changed since our last iteration and are no longer there, or appear in a different form. This is because, as we implemented our project, we changed around how certain functionalities would work and how certain classes and functions would be implemented.
- Some tests, like takePicture, uploadPicture, and tempInput require human input, and will need a user to take actions upon running the unit tests. We put in a lot of time and effort to find ways to automate these tests but unfortunately believe they cannot be done even with the mocking tools we see are available.
- We are not using a standard unit testing framework because react native exports modules instead of isolated functions, meaning that it doesn't lend itself well to any framework that we know of.

Code Directory Structure:
 * All of our code resides within /app. Within /app, App.js has the bulk of the code for navigation and overall app styling, and /functions contains the various components we have written to be displayed across the different pages.

Implementation Description:
 * EnvironmentalData fetches the current weather and renders the view on the Home screen.
 * ApiKeys.demo.js -- testing the frontend's integration with Firebase (for image storage)
 * PictureFunctions encompasses all functions related to image processing, such as taking a picture and choosing one from the gallery. 
 * User contains the getRecommender function, which sends a request to the backend for an outfit prediction based on sensitivity and the user's wardrobe.
 * tempRanges provides the functionality for the user to set a temperature range in which they are comfortable wearing the item of clothing from their wardrobe.
 * wardrobeGallery provides a view of all the items of clothing in a user's wardrobe, through a gallery format with image thumbnails. 

Milestone 4.A:

For the second iteration, the main functionality we plan on implementing encompasses having a more comprehensive navigation UI that enables a user to navigate throughout the main functionality of the app (seeing recommended outfit, adding temp preferences for wardrobe, and uploading new clothes to the wardrobe). Within this, we will continue to refine the functionality, namely by building out the functionality to add temperature preferences for clothing, provide a view to see the clothing items of the user, and have functionality for a user to request and decline an outfit. To build off of functionality implemented in the first iteration, we will also restructure our functions to output views which we can render on the various screens of our app.
For this milestone, what we originally had planned which we are no longer planning on implementing are adding logo and artwork, and when a user declines an outfit, recommending it less in the future. 
 
Work Distribution for 4.A:
* Lucas: EnvironmentalData and User functions, writing unit tests
* Luke Contreras: uploadPicture in PictureFunctions and Firebase testing, writing unit tests
* Allie: general navigation, HTML + CSS, UI direction, writing acceptance tests
* Luke Knutson: tempRanges functionality, writing unit tests

