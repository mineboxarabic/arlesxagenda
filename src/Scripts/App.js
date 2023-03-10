import MonthView from './MonthView';
import SearchPage from './searchPage';
import {DateTime} from 'luxon';
import {useState} from 'react';
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Events from '../Objects/Events.js';
function App({Data}) {
    const [isLoading , setIsLoading] = useState(true);
    let events = new Events(Data.events);
    //let eventstemp = events.getEventsByDate(28, 10, 2022);
    console.log('Event by keyword' , events.getEventsByKeyword('saint'));
    return (
        <>
            <Router>
            <Routes>
                <Route path="/" element={<SearchPage Data={events}/>}/>
                <Route path="/month" element={<MonthView Data={events}/>}/>
            </Routes>
        </Router>
       
        </>
       
    );
}
/* */
export default App;