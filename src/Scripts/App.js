
import CalenderView from "./CalenderView";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { Header } from "./HeaderAndFooter.js";
import Data from "../Data/events-arles-small.json"
import { EventObject } from "../Objects/EventObject.js";
const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    align-items: center;
    align-content: center;
    justify-content: center;
`;


const DetailsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

function App(){
    const [language, setLanguage] = useState("en");
    const [selectedDate, setSelectedDate] = useState({
        year: DateTime.local().year,
        month: DateTime.local().month,
        day: DateTime.local().day
    });
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    console.log(selectedEvents);
    console.log("current selected date: " + selectedDate.year + " " + selectedDate.month + " " + selectedDate.day + "")
    return (
        <>
            <AppContainer>
                <Header language={language} setLanguage={setLanguage} />
                
                <CalenderView setDate={setSelectedDate} getDate={selectedDate} 
                isSelectedDate={isSelectedDate} setIsSelectedDate={setIsSelectedDate} 
                language={language}
                selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents}
                />
                <DetailsContainer>
                    <h1>Selected Date</h1>
                    <h2>{selectedDate.year} {selectedDate.month} {selectedDate.day}</h2>

                </DetailsContainer>
            </AppContainer>
        </>
    )
}

export default App;