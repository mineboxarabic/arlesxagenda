
import React, { createContext, useContext, useState } from 'react';

import Events from '../Objects/Events.js';
import { DateTime } from 'luxon';

let events = new Events();
export const DataContext = createContext(events);
export const CurrentDate = createContext({
  day: DateTime.local().day,
  month: DateTime.local().month,
  year: DateTime.local().year,
});
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
export const TranslatedTextList = {
    fr : {
        "Next Date is :" : "La prochaine date est :",
        "Search Page" : "La Page de Recherche",
        "Month View" : "Vue du Mois",
        "Tourism in" : "Tourisme à",
        "Language" : "Langue",
        "When?" : "Quand?",
        "What?" : "Quoi?",
        "Tools" : "Outils",
        "Search" : "Recherche",
        "Show All" : "Tout Afficher",
        "Search for a keyword" : "Recherchez un mot-clé",
        "Search for a keyword or a phrase" : "Recherchez un mot-clé ou une phrase",
        "Search for a keyword or a phrase in the text" : "Recherchez un mot-clé ou une phrase dans le texte",
        "What Are You Looking For?" : "Que cherchez-vous?",
        "Add a new keyword" : "Ajouter un nouveau mot-clé",
        "January" : "Janvier",
        "February" : "Février",
        "March" : "Mars",
        "April" : "Avril",
        "May" : "Mai",
        "June" : "Juin",
        "July" : "Juillet",
        "August" : "Août",
        "September" : "Septembre",
        "October" : "Octobre",
        "November" : "Novembre",
        "December" : "Décembre",
        "Monday" : "Lundi",
        "Tuesday" : "Mardi",
        "Wednesday" : "Mercredi",
        "Thursday" : "Jeudi",
        "Friday" : "Vendredi",
        "Saturday" : "Samedi",
        "Sunday" : "Dimanche",
        "Selected Date" : "Date Sélectionnée",
        "Selected Event" : "Événement Sélectionné",
        "No Event" : "Pas d'Événement",
        "No Event on this day" : "Pas d'Événement ce jour-là",
        "Sun" : "Dim",
        "Mon" : "Lun",
        "Tue" : "Mar",
        "Wed" : "Mer",
        "Thu" : "Jeu",
        "Fri" : "Ven",
        "Sat" : "Sam",

    },
    en : {
      "Next Date is :" : "Next Date is :",
        "Search Page" : "Search Page",
        "Month View" : "Month View",
        "Tourism in" : "Tourism in",
        "Language" : "Language",
        "When?" : "When?",
        "What?" : "What?",
        "Tools" : "Tools",
        "Search" : "Search",
        "Show All" : "Show All",
        "Search for a keyword" : "Search for a keyword",
        "Search for a keyword or a phrase" : "Search for a keyword or a phrase",
        "Search for a keyword or a phrase in the text" : "Search for a keyword or a phrase in the text",
        "What Are You Looking For?" : "What Are You Looking For?",
        "Add a new keyword" : "Add a new keyword",
        "January" : "January",
        "February" : "February",
        "March" : "March",
        "April" : "April",
        "May" : "May",
        "June" : "June",
        "July" : "July",

        "August" : "August",
        "September" : "September",
        "October" : "October",
        "November" : "November",
        "December" : "December",
        "Monday" : "Monday",
        "Tuesday" : "Tuesday",
        "Wednesday" : "Wednesday",
        "Thursday" : "Thursday",
        "Friday" : "Friday",
        "Saturday" : "Saturday",
        "Sunday" : "Sunday",
        "Selected Date" : "Selected Date",
        "Selected Event" : "Selected Event",
        "No Event" : "No Event",
        "No Event on this day" : "No Event on this day",
        "Sun" : "Sun",
        "Mon" : "Mon",
        "Tue" : "Tue",

        "Wed" : "Wed",
        "Thu" : "Thu",
        "Fri" : "Fri",
        "Sat" : "Sat",
        
    },
};



export const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

export default DataContext;