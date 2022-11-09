import React, { useState, useEffect } from 'react';
import environmentalData from './functions/EnvironmentalData';
import ImagePickerFunction from './functions/PictureFunctions';

export default function mainApp() {
  return environmentalData(41.795949748662835, -87.59187911021162);
}