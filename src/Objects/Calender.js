import { useState } from "react";
import { DateTime } from "luxon";

import '../Styles/Calender.scss';
function Square(props) {
  return <button className={(props.Selected) ? "selectedSquare" : "UnSelectedSquare"} key={props.cle} onClick={props.onSelect}>{props.value}</button>
}
function BodyDays(props){
    //console.log(props.numDays);
    const [days , setDays] = useState(new Array(props.numDays).fill(0));
    const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let body = [];
    const [selectedDays, setSelectedDays] = useState(new Array(props.numDays).fill(false));
    const [selectedDay, setSelectedDay] = useState(DateTime.local().day);
    function refreshDays(){
        if(days.length !== props.numDays){
            setDays(new Array(props.numDays).fill(0));
        }
        for(let i = 0; i < props.numDays; i++){
            //fill the array with the days
            if(i === selectedDay - 1){
                selectedDays[i] = true;
            }
            days[i] = <Square cle={i} value={i + 1} Selected={selectedDays[i]} onSelect={()=>{handleDayClick(i)}}/>;
        }

    }
    
    
    function handleDayClick(index){
        //change the calssname of the selected day to selected
        let temp = selectedDays;
        props.onDayChange(index);
        temp.map((day,i) => {
            if(i === index){
                temp[i] = true;
            }
            else{
                temp[i] = false;
            }
        })
        setSelectedDays(temp);
        setSelectedDay(index + 1);
        
    }
    refreshDays();
    for(let i = 0; i < 7; i++){
        body.push(<div className="Calender_Body_Days_Day" key={i}>{daysNames[i]}</div>);
    }


    return (
        <div className="Calender_Body">
            <div className="Calender_Body_Days">
                {body.map((day) => {
                    return day;
                })
                }
                
            </div>
            <div className="Calender_Body_Dates">
                {days.map((day) => {
                    return day;
                })

                }
            </div>
        </div>
    )


}
export function Calender(props){
    const [Umonth, setUMonth] = useState(DateTime.local().month);
    const [Uyear, setUYear] = useState(DateTime.local().year);
    const [Uday, setUDay] = useState(DateTime.local().day);
    //MonthName and Year Name
    const [MonthName , setMonthName] = useState(DateTime.local(Uyear,Umonth).monthLong);
    const [YearName , setYearName] = useState(Uyear);
    //=====================================================================================

    const [numberOfdays , setNumberOfDays] = useState(DateTime.local(Uyear,Umonth).daysInMonth);



    function showDate(day){
        setUDay(day + 1);
        console.log(`Year : ${Uyear} Month : ${Umonth} Days : ${Uday}`);
        props.getDate({Year: Uyear, Month: Umonth, Day: Uday})
    }
    function changeMonth(isAdd){
        if(isAdd){
            if(Umonth === 12){
                setUMonth(1);
                setUYear(Uyear + 1);
                setMonthName(DateTime.local(Uyear + 1,1).monthLong);
                setNumberOfDays(DateTime.local(Uyear + 1,1).daysInMonth);
            }
            else{
                setUMonth(Umonth + 1);
                setMonthName(DateTime.local(Uyear,Umonth + 1).monthLong);
                setNumberOfDays(DateTime.local(Uyear,Umonth + 1).daysInMonth);
            }
        }
        else{
            if(Umonth === 1){
                setUMonth(12);
                setUYear(Uyear - 1);
                setMonthName(DateTime.local(Uyear - 1,12).monthLong);
                setNumberOfDays(DateTime.local(Uyear - 1,12).daysInMonth);
            }
            else{
                setUMonth(Umonth - 1);
                setMonthName(DateTime.local(Uyear,Umonth - 1).monthLong);
                setNumberOfDays(DateTime.local(Uyear,Umonth - 1).daysInMonth);
            }
        }

        console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${Uday}`);
    }
    function changeYear(isAdd){
        if(isAdd){
            setUYear(Uyear + 1);
            setYearName(Uyear + 1);
        }
        else{
            setUYear(Uyear - 1);
            setYearName(Uyear - 1);
        }
        console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${Uday}`);
    }
    return (
            <div className="Calender">
                <div className="Calender_Header">
                    <div className="Calender_Header_Month">
                        <button className="Calender_Header_Month_Arrow" onClick={()=>changeMonth(false)}>◀</button>
                        <div className="Calender_Header_Month_Name">{MonthName}</div>
                        <button className="Calender_Header_Month_Arrow" onClick={()=>changeMonth(true)}>▶</button>
                    </div>
                    <div className="Calender_Header_Year">
                        <button className="Calender_Header_Year_Arrow" onClick={() => changeYear(false)}>◀</button>
                        <div className="Calender_Header_Year_Name">{YearName}</div>
                        <button className="Calender_Header_Year_Arrow" onClick={() => changeYear(true)}>▶</button>
                    </div>
                </div>
                {
                   
                    <BodyDays numDays={numberOfdays} onDayChange={showDate} />
                }
                    
                </div>
    )
}