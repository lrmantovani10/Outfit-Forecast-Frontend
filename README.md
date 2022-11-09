# Outfit-Forecast

An app to generate outfit predictions based on one's wardrobe and current weather.

Current class diagram
![Class Diagram](class-diagrams/updatedClassDiagram4.png)

Test suite used: Jest (https://jestjs.io/)

Testing file: functions/frontend_functions_tests.js

How to compile: No need to compile!

How to run code:
npm install (for dependencies)
npx expo start

How to run the unit test cases:

Notes on testing:

 * sendSurveyResponses was incorporated into classifyNew(), so it is no longer a separate function
 * The output of getWeather changed. It no longer outpouts a JSON object, but an array
 * "dailyRecommender" no longer passes the user's wardrobe as an argument. Tyhe wardrobe info will be stored in the backend.
 * Furthermore, we changed how we are importing certain classes / functions because of React Native's syntax 

Implementation Description:

Work Distribution:

