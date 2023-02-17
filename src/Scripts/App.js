import '../Styles/App.scss';
import Data from '../Data/events-arles-small.json';
import { useEffect, useState } from 'react';
import {Event} from './Event';
import { Header, Footer } from './HeaderAndFooter';
import { ToolsSubMenu } from './ToolsSubMenu';
import { EventGrid } from '../Objects/EventGrid';
import { EventObject } from '../Objects/EventObject';
function App() {
  //====================================================================================\\
  let events = [];
  Data.events.map((event) => {
    events.push(JSON.stringify(event));
  });
  for(let i = 0; i < events.length; i++){
    events[i] = JSON.parse(events[i]);
  }
  const [eventsData, setEventsData] = useState(events);
  //====================================================================================\\


  return (
    <>
      <Header />
      <ToolsSubMenu />
      <EventGrid>
        <EventObject />
        <EventObject />
        <EventObject />
        <EventObject />

        <EventObject />
        <EventObject />
        <EventObject />
        <EventObject />
      </EventGrid>
      <Footer />
    </>
  );
}

export default App;
