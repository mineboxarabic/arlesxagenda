import { useState } from "react";
import { DateTime } from "luxon";

import '../Styles/Calender.scss';
export function Calender(props){
    const [Umonth, setUMonth] = useState(props.getDate.month);
    const [Uyear, setUYear] = useState(props.getDate.year);
    const [Uday, setUDay] = useState(props.getDate.day);
    //MonthName and Year Name
    const [MonthName , setMonthName] = useState(DateTime.local(Uyear,Umonth).monthLong);
    const [YearName , setYearName] = useState(Uyear);
    //=====================================================================================

    const [numberOfdays , setNumberOfDays] = useState(DateTime.local(Uyear,Umonth).daysInMonth);
    const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [days , setDays] = useState(new Array(numberOfdays).fill(false));
    days[Uday - 1] = true;


    //console.log(`Year : ${Uyear} Month : ${Umonth} Days : ${Uday}`);
    function sendData(m,d,y){
        setUDay(d);
    }
    props.getDate.day = Uday;
    props.getDate.month = Umonth;
    props.getDate.year = Uyear;
    console.log(props.getDate);
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
        setDays(new Array(numberOfdays).fill(false));

        //console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${Uday}`);
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
       // console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${Uday}`);
    }
    function changeDay(dayIndex){
        //console.log(('here'))
        setDays(days.map((day,i) => {
            if(i === dayIndex){
                return true;
            }
            else{
                return false;
            }
        }))


        //console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${dayIndex + 1}`);
        setUDay(dayIndex + 1);
        sendData(Umonth,dayIndex + 1,Uyear);
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
                <div className="Calender_Body">
                    <div className="Calender_Body_Days">
                        {daysNames.map((day) => {
                            return <div className="Calender_Body_Days_Day" key={day}>{day}</div>;
                        })
                        }
                        
                    </div>
                    <div className="Calender_Body_Dates">
                        {
                            days.map((day,i) => {

                                return <button className={ day === true ? "selectedSquare" : "UnSelectedSquare"} key={i + 1} onClick={()=>changeDay(i)}>{i + 1}</button>;
                            })
                        }
                    </div>
                </div>
                    
                </div>
    )
}