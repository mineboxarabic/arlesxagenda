import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import Arrow from "../Images/Arrow.png";
import ArrowLeft from "../Images/ArrowLeft.png";
import CulumnImage from "../Images/Column.png"
import { render } from "@testing-library/react";
import Background3 from "../Images/Background3.png";
const DaySquares = styled.button`
position: relative;
width: 100%;
height: 100%;
background-color: #FFE3C6;
background: radial-gradient(circle, rgb(255, 227, 198), rgb(249 195 155));
display: flex;
align-items: center;
align-content: center;
justify-content: center;
border: 0px rgb(243 168 113);
outline: none;
cursor: pointer;

&:hover{
    background: radial-gradient(circle, rgb(255, 227, 198), rgb(249 195 155));
    border: 3px solid rgb(243 168 113);
    transition: all 0.1s ease-in-out;
}
.DayNum{
    width: 30px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    color: rgb(104 68 41);

}
.EventNum{
    padding: 0;
    margin: 0;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    background-color: ${props=>props.numberOfEvents !== 0 ? "rgb(243 168 113)" : "transparent"};
    &:hover{
        background-color: rgb(243 168 113);
        transition: all 0.2s ease-in-out;
    }

}

`;
const DaySquaresUnusable = styled.div`
width: 100%;
height: 100%;
//background-color: gray;
display: flex;
align-items: center;
align-content: center;

background: radial-gradient(circle, rgb(211 149 105), rgb(157 100 57));
background-blend-mode: darken;
justify-content: center;
//background: rgb(104 68 41);


`;
const ColumnBack = styled.div`
    position: absolute;
    width: 10%;
    height: 94%;
    left: 88%;
    z-index: 1;
    background-image: url(${CulumnImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    filter: drop-shadow( 10px 10px 10px rgba(0,0,0,0.5) );
    

`;
const ColumnBack2 = styled.div`
    position: absolute;
    width: 10%;
    height: 94%;
    left: 2%;
    z-index: 1;
    background-image: url(${CulumnImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    filter: drop-shadow( -10px 10px 10px rgba(0,0,0,0.5) );
    
    

`;
const ArrowSelector = styled.button`

z-index: 1;
font-size: ${props=>props.scale.x}px;
transform: scale(1,4);
border: 0px;
outline: none;
cursor: pointer;
background-color: transparent;
color: aliceblue;
text-shadow: 0px 0px 2px black;


&:hover{
    transform: scale(1.1,4.4);
    transition: all 0.2s ease-in-out;
    text-shadow: 0px 0px 10px rgb(255 255 255);
}
`;
function Arrows(props){
    let scale = props.scale;
    let direction = props.direction;


    return (
        <>
            
            <ArrowSelector scale={scale} onClick={props.onClicks} className={props.className} >
                {
                    direction === "right" ? "〉" : '〈' 
                }
            </ArrowSelector>
        </>
        )
}
function DaySquare(props){

    return (
        props.isActive ?
        <DaySquares numberOfEvents={props.numberOfEvents} onClick={props.onClicks} >
            <h1 className="DayNum">{props.number}</h1>
            <h1 className="EventNum">{props.numberOfEvents !== 0 ? props.numberOfEvents : "" }</h1>
        </DaySquares>
        :
        <DaySquaresUnusable>
            <h1></h1>
        </DaySquaresUnusable>
    )
}
//===================================================================================================
let widthOfCalender = "90%";
const CalenderBody = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
justify-content: center;

.CalenderHeader{
    width: ${widthOfCalender};
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    background-color: rgb(243 168 113);
    background-image: url(${Background3});
    border-bottom: 1px solid #e0e0e0;
    h1{
        padding: 0;
        margin: 0;
        width: 230px;
        text-align: center;
        background-color: wheat;
    }
}

.CalenderBody{
    width: ${widthOfCalender};
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .Header{
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        
    }

    .Body{
        width: 100%;
        height: 800px;
        display: flex;
        flex-direction: row;
        background-color: rgb(253 181 131);
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;

        .CalenderBodyMonth{
            position: relative;
            width: 90%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            .CalenderBodyDays{
                width: 95%;
                height: 10%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                .CalenderBodyDaysName{
                    padding: 0;
                    margin: 0;
                }

            }

            .CalenderBodyDaySquare{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);
                grid-gap: 1px;
                background-color: #fff;
                border: 1px solid #e0e0e0;
            }



        }
        .leftArrows, .RightArrows{
            display:   flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;


        }
    }
}
`;

export function CalenderView(props){


    const [days, setDays] = useState(Array(42).fill(true));
    let date = props.getDate;
    let linkedDatesToEvents = {};
    const [isLoading, setIsLoading] = useState(true);

    function handleDateChange(newDate)
    {
        props.setDate(newDate);
        props.onChangeDate();
        if(linkedDatesToEvents[newDate.day] !== undefined){
            props.setSelectedEvents(linkedDatesToEvents[newDate.day]);
        }
    }

    let daysInMonth = DateTime.local(date.year, date.month).daysInMonth;
    let firstDayOfMonth = DateTime.local(date.year, date.month, 1).weekday;

    useEffect(() => {
        let days = Array(42).fill(false);
        for (let i = 0; i < daysInMonth; i++) {
            days[firstDayOfMonth + i] = true;
        }
        setDays(days);
        //sort allTimings
        /*allTimings.sort((a,b)=>{
            let dateA = DateTime.fromISO(a.start);
            let dateB = DateTime.fromISO(b.start);
            return dateA - dateB;
        }
        );*/
        //sort allTimings

        

    }, [date]);


    function hasEvents(day){
        let numberOfEvents = 0;
        let dayNumber = day;
        let currentDate = DateTime.local(date.year,date.month,dayNumber);
        props.Data.map((existingObj)=>{
            if(existingObj.date.day === currentDate.day && existingObj.date.month === currentDate.month && existingObj.date.year === currentDate.year)
            {
                if(linkedDatesToEvents[dayNumber] === undefined)
                {
                    linkedDatesToEvents[dayNumber] = [];
                }
                if(linkedDatesToEvents[dayNumber].indexOf(existingObj.uid) === -1)
                {
                    linkedDatesToEvents[dayNumber].push(existingObj.uid);
                    numberOfEvents++;
                }
            }
        });

        return numberOfEvents;

    }
   
    return (
        <>
            <CalenderBody>
                <ColumnBack>
                </ColumnBack>

                <ColumnBack2>
                </ColumnBack2>
                <div className="CalenderHeader">
                   
                    <h1>{date.year.toString()}</h1>
                    <h1>{DateTime.local(date.year,date.month).monthLong}</h1>

                </div>
                <div className="CalenderBody">
                    <div className="Header">
 
                    </div>
                    <div className="Body">
                        <div className="leftArrows">
                            <Arrows onClicks={
                            ()=>{
                                handleDateChange({
                                    year: date.year - 1,
                                    month: date.month,
                                    day: date.day
                                })
                            }
                            
                        } direction="left" scale={{x:150,y:90}} className="CalenderBodyYearArrow"></Arrows>
                            <Arrows onClicks={
                                ()=>{
                                    if(date.month === 1){
                                        handleDateChange({
                                            year: date.year - 1,
                                            month: 12,
                                            day: date.day
                                        })
                                    }
                                    else{

                                    handleDateChange({
                                        year: date.year,
                                        month: date.month - 1,
                                        day: date.day
                                    })}
                                }

                            } className="CalenderBodyMonthArrow" scale={{x:80,y:70}} direction="left"></Arrows>
                        </div>
                       
                        <div className="CalenderBodyMonth">
                            <div className="CalenderBodyDays">
                                <div className="CalenderBodyDaysName">Sun</div>
                                <div className="CalenderBodyDaysName">Mon</div>
                                <div className="CalenderBodyDaysName">Tue</div>
                                <div className="CalenderBodyDaysName">Wed</div>
                                <div className="CalenderBodyDaysName">Thu</div>
                                <div className="CalenderBodyDaysName">Fri</div>
                                <div className="CalenderBodyDaysName">Sat</div>
                            </div>

                            <div className="CalenderBodyDaySquare">
                                {
                                    days.map((day, index) => {
                                        let dayNumber = index - (firstDayOfMonth - 1);
                                        let numberOfEvents = hasEvents(dayNumber);
                                        
                                        return (<DaySquare onClicks={
                                            ()=>{
                                                    handleDateChange({
                                                        year: date.year,
                                                        month: date.month,
                                                        day: dayNumber
                                                    })
                                            }
                                        } isActive={day} numberOfEvents={numberOfEvents} number={day ? index - (firstDayOfMonth - 1 ) : "NO"} key={index} />)

                                        
                                    })
                                    
                                }
                            
                            
                            </div>
                        </div>
                        <div className="RightArrows">
                        <Arrows onClicks={()=>{
                                setIsLoading(true);
                                if(date.month === 12){
                                    handleDateChange({
                                        year: date.year + 1,
                                        month: 1,
                                        day: date.day
                                    })
                                }
                                else{
                                    handleDateChange({
                                        year: date.year,
                                        month: date.month + 1,
                                        day: date.day
                                    })
                                }
                            
                            }} className="CalenderBodyMonthArrow" scale={{x:80,y:70}} direction="right"></Arrows>

                        <Arrows onClicks={
                            ()=>{
                                handleDateChange({
                                    year: date.year + 1,
                                    month: date.month,
                                    day: date.day
                                })
                            }

                        } direction="right" scale={{x:150,y:90}} className="CalenderBodyYearArrow"></Arrows>
                        </div>

                    </div>
                    
                </div>
            </CalenderBody>
        </>

    )
}

export default CalenderView;