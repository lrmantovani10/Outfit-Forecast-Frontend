# Outfit-Forecast

An app to generate outfit predictions based on one's wardrobe and current weather.

Current class diagram
![Class Diagram](class-diagrams/updatedClassDiagram4.png)

Test suite used: Jest (https://jestjs.io/)

Testing file: frontend_functions_tests.js


Notes on testing:

 - sendSurveyResponses was incorporated into classifyNew(), so it is no longer a separate function
 - The output of getWeather changed. It no longer outpouts a JSON object, but an array
