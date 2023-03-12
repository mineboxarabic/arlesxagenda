import { createContext } from 'react';

import Events from '../Objects/Events.js';
let events = new Events();
export const DataContext = createContext(events);
export const CurrentLanguage = createContext("fr");
export const ColorPalette = {
    darkest : "#1B1A17",
    inBetweenDarkAndDark : "#3D3B36",
    dark : "#A35709",
    inBetweenDarkAndMedium : "#D68C0F",
    medium : "#FF8303",
    inBetweenMediumAndLight : "#F2B179",
    light : "#F0E3CA",
    inBetweenLightAndLightest : "#F7F7F7",
    lightest : "#F8F8F8",
    eyeCatch : "rgb(235 114 9)",
};
export default DataContext;