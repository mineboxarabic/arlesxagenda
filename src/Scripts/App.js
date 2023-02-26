import '../Styles/App.scss';
import Data from '../Data/events-arles-small.json';
import { useEffect, useState } from 'react';
import {Event} from './Event';
import { Header, Footer } from './HeaderAndFooter';
import loadingImage from '../Images/kOnzy.gif';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { Calender } from '../Objects/Calender';
import { DateTime } from "luxon";
function App() {
  const [currentEvent , setCurrentEvent] = useState({});
  const [currentLanguage , setCurrentLanguage] = useState("fr");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  //================Date Variables================
  let date = {
    "day": DateTime.local().day,
    "month": DateTime.local().month,
    "year": DateTime.local().year
  }
  //================Temp Variables================
  //const [Tkeywords , setTKeywords] = useState([]);
  let Tkeywords = [];
  //================Filters================

let Filters = {
    "date": [],
    "keywords": []}

  let numberPerRow = 8;
  //====================Create Rows====================
  let Temp = [];
  let Trows = [];

  const [rows , setRows] = useState(new Array());
  //====================Function to change the page====================
  function changePage(isAdd){
    


    setIsLoading(true);
    setTimeout
    ( 
        () => {
    console.log('Rows Length: ' + rows.length);
        let ct = 1;
        if(isAdd){
            if(currentPage < rows.length)
                ct = currentPage + 1;
        }
        else{
            if(currentPage > 1)
                ct = currentPage - 1;
        }
        setCurrentPage(ct); 
      
        setIsLoading(false);
} , 500 );



}
  //====================End of Function to change the page====================
  function packEvents(events){
    let Temp = [];
    let Trows = [];
    if(events.length < numberPerRow && events.length > 0){
        Trows.push(events);
        setRows(Trows);
        return;
    }
    for(let i = 1 ; i <= events.length  ; i++){
        Temp.push(events[i]);
        if(Temp.length === numberPerRow){
            Trows.push(Temp);
            Temp = [];
        }
    }
    setRows(Trows);
    console.log(Trows);
  }
  useEffect(()=>{
    packEvents(Data.events);
  },[]);
  function checkEvent(event){

    let DateCheck = (event)=>{
      if(Filters.date.length === 0){
        return true;
      }
      let starts = ()=>{
        let starts = [];
        event.timings.forEach((timing,i)=>{
          if( timing.start !== null){
            starts.push(new Date(timing.start));
          }
          
        });
        return starts;
      }
      let ends = ()=>{
        let ends = [];
        event.timings.forEach((timing,i)=>{
          if( timing.end !== null){
            ends.push(new Date(timing.end));
          }

        });
        return ends;
      }
      let start = starts();
      let end = ends();
      let date = new Date(Filters.date.year, Filters.date.month, Filters.date.day);
      
      if(start.length === 0 || end.length === 0){
        return false;
      }
      for(let i = 0 ; i < start.length ; i++){
        if(date <= end[i]){
          return true;
        }
      }
      return false;
    }
    let KeywordCheck = (event)=>{
      if(Filters.keywords.length === 0){
        return true;
      }
      if(Filters.keywords !== null ){
        if(event.keywords === null){
          return false;
        }
        let EventKeywords = event.keywords[currentLanguage];
        if(EventKeywords.length > 0){
          for(let i = 0 ; i < EventKeywords.length ; i++){

            if(Filters.keywords.includes(EventKeywords[i])){
              return true;
            }

          };
        }
      }
      return false;
    }
    return DateCheck(event) && KeywordCheck(event);
  }
  function onClickSeachButton()
  {
    
    Filters.date = date;
    Filters.keywords = Tkeywords;
    console.log('Filters are:' + date);

    let Temp = [];
    Data.events.forEach((event,i)=>{
      if(checkEvent(event)){
        console.log(checkEvent(event));
        Temp.push(event);
      }
    });
    packEvents(Temp);
    setCurrentPage(1);
  }
  return (
    <>
      <Header getLanguage={(lang)=>{setCurrentLanguage(lang)}} />
      <ToolsSubMenu getDate={date}
      getKeywords={Tkeywords}
      setDate = {date}
      language={currentLanguage}
       ><button onClick={onClickSeachButton} className='Submit-Search'>Search</button></ToolsSubMenu>
      <DetailPopup language={currentLanguage} onClickClose={()=>{setShowDetail(false);}} event={currentEvent} isShow={showDetail} />
      
      {isLoading && <img className='LoadingImage' src={loadingImage}/>}
      
      { !isLoading && <EventGrid currentPage={currentPage} onChangePage={(val)=>{changePage(val)}} size={rows.length} Data={Data} language={currentLanguage}>
      {/*checkEvent(rows[currentPage - 1][0])*/}
          {
            rows.length > 0 && currentPage > 0 && 
            rows[currentPage - 1].map((event,i)=>{
              return <EventObject onClickEvent={()=>{
              setShowDetail(true);
              setCurrentEvent(event);
            }} EventData={event} language={currentLanguage}></EventObject>
            })
          }
      </EventGrid>}

      
  <Footer />
    </>
  );
}

export default App;
