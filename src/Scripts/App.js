import '../Styles/App.scss';
import Data from '../Data/events-arles-small.json';
import { useEffect, useState } from 'react';
import {Event} from './Event';
import { Header, Footer } from './HeaderAndFooter';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
import { DetailPopup } from '../Objects/DetailPopup';
import { Calender } from '../Objects/Calender';

function App() {
  const [currentEvent , setCurrentEvent] = useState({});
  const [currentLanguage , setCurrentLanguage] = useState("fr");
  const [currentPage, setCurrentPage] = useState(1);
  const [Tkeywords , setTKeywords] = useState([]);
  const [Filters, setFilters] = useState({
    "keywords": [],
    "date": [],
    "location": [],
  });

  let numberPerRow = 8;
  //====================Create Rows====================
  let Temp = [];
  let Trows = [];

  const [rows , setRows] = useState(new Array());
  //====================Function to change the page====================
  function changePage(isAdd){
    console.log('Current Page: ' + currentPage);
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
}
  //====================End of Function to change the page====================
  function packEvents(events){
    let Temp = [];
    let Trows = [];
    if(events.length < numberPerRow){
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
      
  }
  function onClickSeachButton()
  {
    console.log(Tkeywords);
    let Trows = [];
    let Temp = [];
    let ct = 0;
    if(Tkeywords.length !== 0){
    Data.events.forEach((event,i)=>{
      if(event.keywords !== null){
      
      let EventKeywords = event.keywords[currentLanguage];
        if(EventKeywords.length > 0){


          for(let i = 0 ; i < EventKeywords.length ; i++){

            if(Tkeywords.includes(EventKeywords[i])){
              Temp.push(event);
            }

          };
        }
      }
        

    });
    packEvents(Temp);
    setCurrentPage(1);
    console.log('this is forom search button' + rows.length + ' ' + currentPage);
  }


    
  }
  
  const [showDetail, setShowDetail] = useState(false);//here
  return (
    <>
      <Header getLanguage={(lang)=>{setCurrentLanguage(lang)}} />
      <ToolsSubMenu getKeywords={setTKeywords} language={currentLanguage} ><button onClick={onClickSeachButton} className='Submit-Search'>Search</button></ToolsSubMenu>
      <DetailPopup event={currentEvent} isShow={false} />
      <EventGrid currentPage={currentPage} onChangePage={(val)=>{changePage(val)}} size={rows.length} Data={Data} language={currentLanguage}>
      {/*checkEvent(rows[currentPage - 1][0])*/}
          {
            rows.length > 0 && currentPage > 0 && 
            rows[currentPage - 1].map((event,i)=>{
              return <EventObject EventData={event} language={currentLanguage}></EventObject>
            })
          }
      </EventGrid>

      
  <Footer />
    </>
  );
}

export default App;
