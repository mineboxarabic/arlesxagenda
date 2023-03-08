import '../Styles/App.scss';
import Data from '../Data/events-arles-small.json';
import { useEffect, useState } from 'react';
import { Header, Footer } from './HeaderAndFooter';
import loadingImage from '../Images/kOnzy.gif';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { DateTime } from "luxon";
function SearchPage() {
  const [currentEvent , setCurrentEvent] = useState({});
  const [currentLanguage , setCurrentLanguage] = useState("fr");
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
  //================Filters================


  const [Filters , setFilters] = useState({
    "date": [],
    "keywords": []});

  function sortEvents(events){
    //sort by date
    events.sort((a,b)=>{
      let aDate = new Date(a.timings[0].start);
      let bDate = new Date(b.timings[0].start);
      return aDate.getTime() - bDate.getTime();
    }
    );

  }
  sortEvents(currentEvents);
  function checkEvent(event){
    //console.log('isDateSelected: ' + isDateSelected + ' isKeywordSelected: ' + isKeywordSelected);
    let DateCheck = (event)=>{
      if(!isDateSelected){
        return true;
      }
      let starts = ()=>{
        let starts = [];
        event.timings.forEach((timing,i)=>{
          if( timing.start !== null){
            starts.push(DateTime.fromISO(timing.start));
          }
          
        });
        return starts;
      }
      let ends = ()=>{
        let ends = [];
        event.timings.forEach((timing,i)=>{
          if( timing.end !== null){
            ends.push(DateTime.fromISO(timing.end));
          }

        });
        return ends;
      }
      let start = starts();
      let end = ends();
      let date = DateTime.local(Tdate.year , Tdate.month , Tdate.day);
      
      if(start.length === 0 || end.length === 0){
        return false;
      }
      for(let i = 0 ; i < start.length ; i++){
        if(date <= end[i]){
          //console.log(date.day + '/' + date.month + '/' + date.year + ' is smaller than ' + end[i].day + '/' + end[i].month + '/' + end[i].year)
          return true;
        }
      }
      return false;
    }
    let KeywordCheck = (event)=>{
      if(!isKeywordSelected){
        return true;
      }
      if(Tkeywords !== null ){
        if(event.keywords === null){
          return false;
        }
        let EventKeywords = event.keywords[currentLanguage];
        event.tags.forEach((tag,i)=>{
          EventKeywords.push(tag[currentLanguage]);
        });
        if(EventKeywords.length > 0){
          for(let i = 0 ; i < EventKeywords.length ; i++){

            if(Tkeywords.includes(EventKeywords[i])){
              return true;
            }

          };
        }
      }
      return false;
    }
    return DateCheck(event) && KeywordCheck(event) && (event.address === selectedLocation || selectedLocation === "");
  }

  function onClickSeachButton()
  {
    
   setFilters({
      ...Filters,
      date: date,
      keywords: Tkeywords
    });
    let Temp = [];
    Data.events.forEach((event,i)=>{
      if(!ShowAll){
        if(checkEvent(event)){
          Temp.push(event);
        }
      }
      else{
        Temp.push(event);
      }
    });
    sortEvents(Temp);
    setCurrentEvents(Temp);
  }
  console.log('the date is: ' + Tdate.day + '/' + Tdate.month + '/' + Tdate.year);
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
      >

        <form className='ShowAllForm'>
        <input type='checkbox' onChange={()=>{
          setShowAll(!ShowAll);
          }} className='Show-all'/>
        <label className='Show-all-label' >Show All</label>
        </form>
        <button onClick={onClickSeachButton} className='Submit-Search'>Search</button>

       </ToolsSubMenu>
      <DetailPopup language={currentLanguage} onClickClose={()=>{setShowDetail(false);}} event={currentEvent} isShow={showDetail} />
      { <EventGrid language={currentLanguage}>
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
