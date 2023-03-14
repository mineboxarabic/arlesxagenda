import MonthView from './MonthView';
import SearchPage from './searchPage';
import {DateTime} from 'luxon';
import {useContext, useState} from 'react';
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';


import DataContext from '../Data/Context.js';
import { CurrentLanguage , CurrentDate } from '../Data/Context.js';
function App() {
    let [language, setLanguage] = useState("fr");
    console.log(language);
    let events = useContext(DataContext);
    let [currentDate, setCurrentDate] = useState(
        {
            day: DateTime.local().day,
            month: DateTime.local().month,
            year: DateTime.local().year,
        }
    );
    
   
   
    return (
        <>
        <CurrentDate.Provider value={{currentDate, setCurrentDate}}>
            <CurrentLanguage.Provider value={{language,setLanguage}}>
                <DataContext.Provider value={events}>
                <Router>
                    <Routes>
                        <Route path="/" element={<SearchPage/>}/>
                        <Route path="/month" element={<MonthView/>}/>
                    </Routes>
                </Router>
                </DataContext.Provider>
            </CurrentLanguage.Provider>
        </CurrentDate.Provider>
       
        </>
       
    );
}
/* */
export default App;