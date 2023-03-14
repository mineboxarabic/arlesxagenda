import '../Styles/App.scss';
import { useEffect, useState } from 'react';
import { Header, Footer } from './HeaderAndFooter';
import loadingImage from '../Images/kOnzy.gif';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { DataContext , CurrentLanguage ,CurrentDate} from '../Data/Context';
import { useContext } from 'react';
function SearchPage() {
  let Data = useContext(DataContext);
  const [currentEvent , setCurrentEvent] = useState({});
  const [currentLanguage , setCurrentLanguage] = useState("en");
  console.log(currentLanguage);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedLocation , setSelectedLocation] = useState("");

  const [currentEvents , setCurrentEvents] = useState(Data.events);
  //================Date Variables================

  //================Temp Variables================
  const [Tkeywords , setTKeywords] = useState([]);

  
   let {currentDate , setCurrentDate} = useContext(CurrentDate);

   const [ShowAll , setShowAll] = useState(false);
   const [filtersAndResults , setFiltersAndResults] = useState({
    "date": {},
    "keywords": [],
    "location": "",
    "results": 0
   });




  function onClickSeachButton()
  {
    let Temp = [];

    let dateEvents = Data.getEventsAfterDate(currentDate.day , currentDate.month , currentDate.year);


    let keywordsEvents = Data.getEventsByKeywords(Tkeywords);
    let locationEvents = Data.getEventsByLocation(selectedLocation);



    let isDateChecked = currentDate.day !== undefined && currentDate.month !== undefined && currentDate.year !== undefined;
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
      "date": currentDate,
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
      setDate={setCurrentDate}
      setKeywords={setTKeywords}
      getDate = {currentDate}
      getKeywords = {Tkeywords}
      language={currentLanguage}
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
