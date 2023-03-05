import MonthView from './MonthView';
import SearchPage from './searchPage';
import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';

function App() {
    return (
      
       <Router>
        <Routes>
            <Route path="/" element={<SearchPage/>}/>
            <Route path="/month" element={<MonthView/>}/>
        </Routes>
       </Router>

        
    );
}

export default App;