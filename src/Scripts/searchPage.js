import '../Styles/App.scss';
import { useEffect, useState } from 'react';
import { Header, Footer } from './HeaderAndFooter';
import loadingImage from '../Images/kOnzy.gif';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { DateTime } from "luxon";
import { DataContext , CurrentLanguage } from '../Data/Context';
import { useContext } from 'react';
function SearchPage() {
  let Data = useContext(DataContext);
  const [currentEvent , setCurrentEvent] = useState({});
  const [currentLanguage , setCurrentLanguage] = useState("en");
  console.log(currentLanguage);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedLocation , setSelectedLocation] = useState("");
  const [isDateSelected , setIsDateSelected] = useState(false);
  const [isKeywordSelected , setIsKeywordSelected] = useState(false);
  const [currentEvents , setCurrentEvents] = useState(Data.events);
  //================Date Variables================
  let date = {
    "day": DateTime.local().day,
    "month": DateTime.local().month,
    "year": DateTime.local().year
  }
  //================Temp Variables================
  const [Tkeywords , setTKeywords] = useState([]);
  const [Tdate , setTDate] = useState({"day": DateTime.local().day , 
  "month": DateTime.local().month ,
   "year": DateTime.local().year});
   const [ShowAll , setShowAll] = useState(false);
   const [filtersAndResults , setFiltersAndResults] = useState({
    "date": {},
    "keywords": [],
    "location": "",
    "results": 0
   });
  //================Filters================


  const [Filters , setFilters] = useState({
    "date": [],
    "keywords": []});


  function onClickSeachButton()
  {
    let Temp = [];

    let dateEvents = Data.getEventsAfterDate(Tdate.day , Tdate.month , Tdate.year);


    console.log('dateEvents' , Data.getEventsAfterDate(Tdate.day , Tdate.month , Tdate.year));
    let keywordsEvents = Data.getEventsByKeywords(Tkeywords);
    let locationEvents = Data.getEventsByLocation(selectedLocation);

    //get all events from a certain date
    
    console.log('keywordsEvents' , keywordsEvents.size);

    let isDateChecked = Tdate.day !== undefined && Tdate.month !== undefined && Tdate.year !== undefined;
    let isKeywordChecked = Tkeywords.length > 0;
    let isLocationChecked = selectedLocation !== "";
    if(!ShowAll){
      if(isDateChecked && isKeywordChecked && isLocationChecked){
        dateEvents.forEach((event,i)=>{
          if(keywordsEvents.has(event) && locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      else if(isDateChecked && isKeywordChecked){
        dateEvents.forEach((event,i)=>{
          if(keywordsEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      else if(isDateChecked && isLocationChecked){
        dateEvents.forEach((event,i)=>{
          if(locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
      else if(isKeywordChecked && isLocationChecked){
        keywordsEvents.forEach((event,i)=>{
          if(locationEvents.has(event)){
            Temp.push(event);
          }
        });
      }
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
      Temp = Data.getAllEventsIndexes();
    }


    let events = [];


      Temp.forEach((event,i)=>{
        events.push(Data.getEventsByIndex(event));
      });
    console.log('events' , events);
    

    setFiltersAndResults({
      "date": Tdate,
      "keywords": Tkeywords,
      "location": selectedLocation,
      "results": events.length
      });
    setCurrentEvents(events);



  }
  console.log('location' , selectedLocation);
  return (
    <>
      <Header isActive={true} getLanguage={(lang)=>{setCurrentLanguage(lang)}} />
      <ToolsSubMenu
      setLocationSelected={(val)=>(setSelectedLocation(val))}
      setDate={setTDate}
      setKeywords={setTKeywords}
      getDate = {Tdate}
      getKeywords = {Tkeywords}
      language={currentLanguage}
      setIsDateSelected = {(val)=>{setIsDateSelected(val)}}
      isDateSelected = {isDateSelected}
      setIsKeywordSelected = {(val)=>{setIsKeywordSelected(val)}}
      isKeywordSelected = {isKeywordSelected}
      Data={Data}
      >

        <form className='ShowAllForm'>
        <input type='checkbox' onChange={()=>{
          setShowAll(!ShowAll);
          }} className='Show-all'/>
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
