import { useState } from "react";
import { DateTime } from "luxon";

import '../Styles/Calender.scss';
export function Calender(props){
    //const [Umonth, setUMonth] = useState(props.getDate.month);
    //const [Uyear, setUYear] = useState(props.getDate.year);
    //const [Uday, setUDay] = useState(props.getDate.day);

    
    //MonthName and Year Name
    //=====================================================================================

    const [numberOfdays , setNumberOfDays] = useState(DateTime.local(props.getDate.year,props.getDate.month).daysInMonth);
    const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [days , setDays] = useState(new Array(numberOfdays).fill(false));
    days[props.getDate.day - 1] = true;


    //console.log(`Year : ${Uyear} Month : ${Umonth} Days : ${Uday}`);

    function changeMonth(isAdd){
        if(isAdd){
            if(props.getDate.month === 12){
                props.setDate({
                    ...props.getDate,
                    month: 1,
                    year: props.getDate.year + 1,
                })
                //setMonthName(DateTime.local(props.getDate.year + 1,1).monthLong);
                setNumberOfDays(DateTime.local(props.getDate.year + 1,1).daysInMonth);
            }
            else{
                props.setDate({
                    ...props.getDate,
                    month: props.getDate.month + 1,
                })
                //setMonthName(DateTime.local(props.getDate.year,props.getDate.month + 1).monthLong);
                setNumberOfDays(DateTime.local(props.getDate.year,props.getDate.month + 1).daysInMonth);
            }
            console.log(`Year : ${props.getDate.year} Month : ${props.getDate.month} Days : ${props.getDate.day}`);
        }
        else{
            if(props.getDate.month === 1){
                props.setDate({
                    ...props.getDate,
                    month: 12,
                    year: props.getDate.year - 1,
                })
                //setMonthName(DateTime.local(props.getDate.year - 1,12).monthLong);
                setNumberOfDays(DateTime.local(props.getDate.year - 1,12).daysInMonth);
            }
            else{
                
                props.setDate({
                    ...props.getDate,
                    month: props.getDate.month - 1,
                })
                //setMonthName(DateTime.local(props.getDate.year,props.getDate.month - 1).monthLong);
                setNumberOfDays(DateTime.local(props.getDate.year,props.getDate.month - 1).daysInMonth);
            }
        }
        setDays(new Array(numberOfdays).fill(false));
        console.log(`Year : ${props.getDate.year} Month : ${props.getDate.month} Days : ${props.getDate.day}`);
        //console.log(`Year : ${Uyear - 1} Month : ${Umonth} Days : ${Uday}`);
    }
    function changeYear(isAdd){
        if(isAdd){
           
            props.setDate({
                ...props.getDate,
                year: props.getDate.year + 1,
            })
        }
        else{
            props.setDate({
                ...props.getDate,
                year: props.getDate.year - 1,
            })
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

        props.setDate({
            ...props.getDate,
            day: dayIndex + 1,
        })
    }
    
    return (
            <div className="Calender">
                <div className="Calender_Header">
                    <div className="Calender_Header_Month">
                        <button className="Calender_Header_Month_Arrow" onClick={()=>changeMonth(false)}>◀</button>
                        <div className="Calender_Header_Month_Name">{DateTime.local(props.getDate.year,props.getDate.month).monthLong}</div>
                        <button className="Calender_Header_Month_Arrow" onClick={()=>changeMonth(true)}>▶</button>
                    </div>
                    <div className="Calender_Header_Year">
                        <button className="Calender_Header_Year_Arrow" onClick={() => changeYear(false)}>◀</button>
                        <div className="Calender_Header_Year_Name">{props.getDate.year}</div>
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