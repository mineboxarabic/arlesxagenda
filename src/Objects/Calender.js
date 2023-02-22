import { useState } from "react";
import { DateTime } from "luxon";

import '../Styles/Calender.scss';

function Square(props) {
  return <button className={(props.Selected) ? "selectedSquare" : "UnSelectedSquare"} key={props.cle} onClick={props.onSelect}>{props.value}</button>
}
function BodyDays(props){
    const [days , setDays] = useState(new Array(props.numDays).fill(0));
    const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let body = [];
    const [selectedDays, setSelectedDays] = useState(new Array(props.numDays).fill(false));
    const [selectedDay, setSelectedDay] = useState(DateTime.local().day);
    function handleDayClick(index){
        //change the calssname of the selected day to selected
        let temp = selectedDays;
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
    for(let i = 0; i < 7; i++){
        body.push(<div className="Calender_Body_Days_Day" key={i}>{daysNames[i]}</div>);
    }
    for(let i = 0; i < days.length; i++){
        //fill the array with the days
        if(i === selectedDay - 1){
            selectedDays[i] = true;
        }
        days[i] = <Square cle={i} value={i + 1} Selected={selectedDays[i]} onSelect={()=>{handleDayClick(i)}}/>;
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
export function Calender(){
    const [Umonth, setUMonth] = useState(DateTime.local().month);
    const [Uyear, setUYear] = useState(DateTime.local().year);
    const [MonthName , setMonthName] = useState(DateTime.local(Uyear,Umonth).monthLong);
    const [YearName , setYearName] = useState(Uyear);
    const [selectedDay, setSelectedDay] = useState(DateTime.local().day);

    const [dayNumber , setDayNumber] = useState(DateTime.local(Uyear,Umonth).day);

    function fillCalender(){
        let date = DateTime.local(Uyear,Umonth);
        let days = date.daysInMonth;
        

        return <BodyDays numDays={days} />;
        
    }
    function changeMonth(isAdd){
        if(isAdd){
            if(Umonth === 12){
                setUMonth(1);
                setUYear(Uyear + 1);
                setMonthName(DateTime.local(Uyear + 1,1).monthLong);
            }
            else{
                setUMonth(Umonth + 1);
                setMonthName(DateTime.local(Uyear,Umonth + 1).monthLong);
            }
        }
        else{
            if(Umonth === 1){
                setUMonth(12);
                setUYear(Uyear - 1);
                setMonthName(DateTime.local(Uyear - 1,12).monthLong);
            }
            else{
                setUMonth(Umonth - 1);
                setMonthName(DateTime.local(Uyear,Umonth - 1).monthLong);
            }
        }

        fillCalender();
       
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
         fillCalender();
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
                {/*<div className="Calender_Body">
                    <div className="Calender_Body_Days">
                        <div className="Calender_Body_Days_Day">Lun</div>
                        <div className="Calender_Body_Days_Day">Mar</div>
                        <div className="Calender_Body_Days_Day">Mer</div>
                        <div className="Calender_Body_Days_Day">Jeu</div>
                        <div className="Calender_Body_Days_Day">Ven</div>
                        <div className="Calender_Body_Days_Day">Sam</div>
                        <div className="Calender_Body_Days_Day">Dim</div>
                    </div>
                    <div className="Calender_Body_Dates">

                        {fillCalender().map((date) => {
                            return date;
                        }
                        )
                         }


                        </div>



                </div>*/}
                {fillCalender()}
            </div>
    )
}