
import CalenderView from "./CalenderView";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";
function App(){
    const [language, setLanguage] = useState("en");
    const [selectedDate, setSelectedDate] = useState({
        year: DateTime.local().year,
        month: DateTime.local().month,
        day: DateTime.local().day
    });

    console.log("current selected date: " + selectedDate.year + " " + selectedDate.month + " " + selectedDate.day + "")

    return (
        <>
            <CalenderView setDate={setSelectedDate} getDate={selectedDate} />
        </>
    )
}

export default App;