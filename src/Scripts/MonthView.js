
import CalenderView from "./CalenderView";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { Header } from "./HeaderAndFooter.js";
import { EventObject } from "../Objects/EventObject.js";
import { EventGrid } from "../Objects/EventGrid.js";
import { DetailPopup } from "../Objects/DetailPopup.js";

import { DataContext } from '../Data/Context';
import { useContext } from 'react';
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
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    .EventGrid{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;


    }
`;

function MonthView(){
    let Data = useContext(DataContext);
    const [language, setLanguage] = useState("en");
    const [selectedDate, setSelectedDate] = useState({
        year: DateTime.local().year,
        month: DateTime.local().month,
        day: DateTime.local().day
    });
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);


    const [currentEvent, setCurrentEvent] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [filtersAndResults , setFiltersAndResults] = useState({
        "date": {},
        "keywords": [],
        "location": "",
        "results": 0
       });
    function onChangeDate(){
        let EventsIndexes = [];
        EventsIndexes = Data.getEventsByDate(selectedDate.day, selectedDate.month, selectedDate.year);
        let Events = [];
        EventsIndexes.forEach((event, i) => {
            Events.push(Data.getEventsByIndex(event));
        }
        );
        setSelectedEvents(Events);
    }
    console.log(selectedEvents);
    console.log("current selected date: " + selectedDate.year + " " + selectedDate.month + " " + selectedDate.day + "")
    return (
        <>
            <AppContainer>
            <DetailPopup onClickClose={()=>{setShowDetail(false);}} event={currentEvent} isShow={showDetail} />
                <Header isActive={false} language={language} setLanguage={setLanguage} />
                
                <CalenderView setDate={setSelectedDate} getDate={selectedDate} 
                isSelectedDate={isSelectedDate} setIsSelectedDate={setIsSelectedDate}
                language={language}
                onChangeDate={onChangeDate}
                />
                <DetailsContainer>
                    <h1>Selected Events</h1>
                    { selectedEvents.length > 0 ? <EventGrid isMonthView={true} language={language} >
                        {selectedEvents.map((eventUid, i) => {
                            let event = eventUid;
                            return <EventObject key={i} EventData={event} language={language} onClickEvent={()=>
                                {
                                setCurrentEvent(event);
                                 setShowDetail(true);
                                }} />
                        })}
                    </EventGrid> : <h2>No Events</h2>
                    }
                </DetailsContainer>
            </AppContainer>
        </>
    )
}

export default MonthView;