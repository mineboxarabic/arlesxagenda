import '../Styles/App.scss';
import { useState } from 'react';
import { Header, Footer } from './HeaderAndFooter';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { DataContext , CurrentLanguage ,CurrentDate} from '../Data/Context';
import { useContext } from 'react';
/**
 * This view has the search page of the app,
 * It has the search bar and the search for locations
 * It also has the tools sub menu witch has( date picker, keywords picker)
 * It also has the event grid witch has the events
 * @returns 
 */
function SearchPage() {
  //#################################### The states and the context ############################################
  const Data = useContext(DataContext); // Get the data from the context

  const [currentEvent , setCurrentEvent] = useState({}); // The current event that is selected

  const {currentLanguage , setCurrentLanguage} = useContext(CurrentLanguage); // The current language that is takend from the context and set to the context

  const [showDetail, setShowDetail] = useState(false); // The state that shows the detail popup witch contains the details of the event
  
  const [selectedLocation , setSelectedLocation] = useState(""); // The selected location that is selected from the search bar
  
  const [currentEvents , setCurrentEvents] = useState(Data.events); // The current events that are shown in the event grid
  
  const [Tkeywords , setTKeywords] = useState([]); // The keywords that are selected from the keywords picker (The T stands for temp)
  
  const {currentDate , setCurrentDate} = useContext(CurrentDate); // The current date that is selected from the date picker and set to the context
  console.log(setCurrentDate);
  const [ShowAll , setShowAll] = useState(false); // The state that shows all the events in the event grid
  
  const [filtersAndResults , setFiltersAndResults] = useState({
  "date": {},
  "keywords": [],
  "location": "",
  "results": 0
  }); // The filters and the results that are shown in the tools sub menu

  //=================================== End of states and context ==================================================

  /**
   * This function is called when the button submit is clicked
   * I checked if the date, the keywords and the location are selected with if statments beacuse there is only 3 cases
   * with different conditions like this (000, 001, 010, 011, 100, 101, 110, 111) and I checked them all with if statments
   */
  function onClickSeachButton()
  {
    let Temp = [];

    // Get the events by the date and the keywords and the location 
    let dateEvents = Data.getEventsAfterDate(currentDate.day , currentDate.month , currentDate.year);
    let keywordsEvents = Data.getEventsByKeywords(Tkeywords);
    let locationEvents = Data.getEventsByLocation(selectedLocation);


    // Check if the date, the keywords and the location are selected
    let isDateChecked = currentDate.day !== undefined && currentDate.month !== undefined && currentDate.year !== undefined;
    let isKeywordChecked = Tkeywords.length > 0;
    let isLocationChecked = selectedLocation !== "";

    if(!ShowAll){
      // Check if the date, the keywords and the location are selected
      if(isDateChecked && isKeywordChecked && isLocationChecked){
        //loop through the date events and check if the event is in the keywords events and the location events
        dateEvents.forEach((event,i)=>{
          if(keywordsEvents.has(event) && locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      // Check if the date, the keywords and the location are selected
      else if(isDateChecked && isKeywordChecked){
        //loop through the date events and check if the event is in the keywords events
        dateEvents.forEach((event,i)=>{
          if(keywordsEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      // Check if the date, the keywords and the location are selected
      else if(isDateChecked && isLocationChecked){
        //loop through the date events and check if the event is in the location events
        dateEvents.forEach((event,i)=>{
          if(locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      // Check if the date, the keywords and the location are selected
      else if(isKeywordChecked && isLocationChecked){
        //loop through the keywords events and check if the event is in the location events
        keywordsEvents.forEach((event,i)=>{
          if(locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      // Check if the date, the keywords and the location are selected
      else if(isDateChecked){
        Temp = dateEvents;
      }
      else if(isKeywordChecked){
        Temp = keywordsEvents;
      }
      else if(isLocationChecked){
        Temp = locationEvents;
      }
      else{
        Temp = Data.getAllEventsIndexes();
      }

    }
    else{
      // Get all the events
      Temp = Data.getAllEventsIndexes();
    }
    //at this point we have the events indexes and filtered in the Temp array
    let events = [];
      Temp.forEach((event,i)=>{
        events.push(Data.getEventsByIndex(event)); // Get the events by the indexes that are in the Temp array
      });


    setFiltersAndResults({
      "date": currentDate,
      "keywords": Tkeywords,
      "location": selectedLocation,
      "results": events.length
      }); // Set the filters and the results that are shown in the grid

    setCurrentEvents(events); // Set the current events that are shown in the event grid



  }

  return (
    <>
      <Header isActive={true} getLanguage={(lang)=>{setCurrentLanguage(lang)}} />
      <ToolsSubMenu setLocationSelected={(val)=>(setSelectedLocation(val))} setKeywords={setTKeywords} getKeywords = {Tkeywords}>
        <form className='ShowAllForm'>
          <input type='checkbox' onChange={()=>{setShowAll(!ShowAll);}} className='Show-all'/>
          <label className='Show-all-label' >Show All</label>
        </form>
        <button onClick={onClickSeachButton} className='Submit-Search'>Search</button>
       </ToolsSubMenu>
      <DetailPopup onClickClose={()=>{setShowDetail(false);}} event={currentEvent} isShow={showDetail} />
      { <EventGrid isMonthView={false} setFiltersAndResults={setFiltersAndResults} filtersAndResults={filtersAndResults} language={currentLanguage}>
        {
          currentEvents.length > 0 ? currentEvents.map((event,i)=>
          {
            return <EventObject key={i} EventData={event} language={currentLanguage} onClickEvent={()=>{setCurrentEvent(event); setShowDetail(true)}}  />
          })
          : <div>Non</div>
        }
      </EventGrid>}

      
  <Footer />
    </>
  );
}

export default SearchPage;
