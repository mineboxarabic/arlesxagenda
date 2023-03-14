

import CalenderView from "./CalenderView";
import { useState} from "react";
import styled from "styled-components";
import { Header } from "./HeaderAndFooter.js";
import { EventObject } from "../Objects/EventObject.js";
import { EventGrid } from "../Objects/EventGrid.js";
import { DetailPopup } from "../Objects/DetailPopup.js";
import { DataContext , CurrentDate , CurrentLanguage} from '../Data/Context';
import { useContext } from 'react';
//############################### The styles for the Calender view or Month view of the app ##############################
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
//=============================== End of styles ========================================================================
function MonthView(){
    //#################################### The states and the context ############################################
    const Data = useContext(DataContext);
    const {language, setLanguage} = useContext(CurrentLanguage);
    const {currentDate , setCurrentDate} = useContext(CurrentDate);
    console.log(setCurrentDate);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    //=================================== End of states and context ==================================================
    /**
     * This function is called when the date is changed in the calender view
     */
    function onChangeDate(){
        let EventsIndexes = [];
        EventsIndexes = Data.getEventsByDate(currentDate.day, currentDate.month, currentDate.year); // Get the events by the date
        let Events = [];
        EventsIndexes.forEach((event, i) => {
            Events.push(Data.getEventsByIndex(event)); // Get the events by the index and push them to the events array
        }
        );
        setSelectedEvents(Events); // Set the selected events to the events that are in the selected date
    }

    return (
        <>
            <AppContainer>
            <DetailPopup onClickClose={()=>{setShowDetail(false);}} event={currentEvent} isShow={showDetail} />
                <Header isActive={false} language={language} setLanguage={setLanguage} />
                
                <CalenderView setDate={currentDate} getDate={currentDate} 
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