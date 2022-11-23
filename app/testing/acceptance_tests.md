# Acceptance Tests 

## Test Template
#### Functionality Name

##### Steps to Execute:
1. 
2. 
3. 

##### Expected Result for Each Step:
1. 
2.
3. 

##### Desired End Outcome:

## Tests

## Screen Views

#### Home Page View
##### Steps to Execute:
1. Open app to Home Screen
2. Enable location

##### Desired End Outcome:
* See weather display component with min/max, feels like, and atmosphere with 
corresponding image

#### Daily Recommender (First Time User)
##### Steps to Execute:
1. Open app to Home Screen
2. Enable location
3. Go to "Wardrobe"
4. Click "Add Items"
5. Add 6-10 clothing items by taking a photo or choosing from gallery
6. Navigate back to home page

##### Expected Result for Each Step:
3. Takes you to Wardrobe View
4. Takes you to Camera View
5. Populates the Wardrobe View gallery with the pictures you uploaded
6. Takes you to Home Page View

##### Desired End Outcome:
You should see a temperature appropriate outfit recommended.

#### Daily Recommender (Returning User)
##### Steps to Execute:
1. Open app to Home Screen
2. Enable location

##### Desired End Outcome:
Result should be same as Home Page View but with the addition of Daily Recommender 
component displaying weather appropriate outfit.

#### Wardrobe View
##### Steps to Execute:
1. Open app to Home Screen
2. Click "Go to Wardrobe"

##### Expected Result for Each Step:
2. Takes you to wardrobe view

##### Desired End Outcome:
* See buttons to "Add Items" for wardrobe
* See display of clothing items in wardrobe view
* See back button for Home

#### Camera View
Steps to Execute:
1. Open app to Home Screen
2. Click "Go to Wardrobe"
3. Click "Add Items"

##### Expected Result for Each Step:
2. Takes you to Wardrobe View
3. Takes you to Camera View 

##### Desired End Outcome:
* See buttons for adding clothing by "Take Photo" or "Choose from Gallery"
* See back button for Wardrobe

## Functionality Tests

#### Request Outfit
##### Steps to Execute:
1. Open app to Home Screen
2. Accept outfit

##### Expected Result for Each Step:
1. Should see "Home Page View" and initial suggested outfit.
2. Outfit should display as accepted.

##### Desired End Outcome:
* Recommended outfit should be a temperature appropriate outfit using clothes from your wardrobe

#### Request Additional Outfit
##### Steps to Execute:
1. Open app to Home Screen
2. Decline the outfit

##### Expected Result for Each Step:
1. Should see "Home Page View" and initial suggested outfit.
2. Outfit component should update

##### Desired End Outcome:
* Updated outfit is temperature appropriate and different from the outfit generated in step 1

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

#### Choose from Gallery--->
##### Steps to Execute:
1. Open app to Home Screen
2. Click "Go to Wardrobe"
3. Click "Add Items"
4. Click "Choose from Gallery"
5. Enable gallery access
6. Choose a photo
7. Click "Save"
8. Set temperature range

##### Expected Result for Each Step:
2. Opens Wardrobe View 
3. Opens Camera View 
4. Popup asks for gallery permissions
5. Phone gallery opens 
6. An image is selected
7. The image is saved to your wardobe
8. TempRange popup appears and asks you to set a min and max temp for the clothes

##### Desired End Outcome:
* When a photo is taken, the image should be added to the gallery in Wardrobe View

#### Execute Add New Temp Ranges
##### Steps to Execute:
1. Open app to Home Screen
2. Click "Go to Wardrobe"
3. Click a clothing image from the clothing displayed
4. In the popup, select the temperature range for that clothing
5. Click save

##### Expected Result for Each Step:
2. Wardrobe view opens 
3. A popup prompting the user to set the temperature range for the item appears
4. The slider updates the min/max for that item
5. The temperature range is saved for the item

##### Desired End Outcome:
* The clothing item has an updated temperature range