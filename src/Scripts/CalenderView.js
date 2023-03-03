import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import Arrow from "../Images/Arrow.png";
//#FFE3C6

const DaySquares = styled.button`
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
h1{
    padding: 0;
    margin: 0;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    background-color: transparent;
    &:hover{
        background-color: rgb(243 168 113);
        transition: all 0.2s ease-in-out;
    }

}

`;
const DaySquaresUnusable = styled.div`
width: 100%;
height: 100%;
background-color: gray;
display: flex;
align-items: center;
align-content: center;
justify-content: center;
background: rgb(104 68 41);

`;

function DaySquare(props){

    return (
        props.isActive ?
        <DaySquares onClick={props.onClicks} >
            <h1>{props.number}</h1>
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

.CalenderHeader{
    width: ${widthOfCalender};
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    h1{
        padding: 0;
        margin: 0;
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
        background-color: rgb(222,222,220);
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
            button{
                width: 50px;
                height: 90%;
            }


        }
    }
}
`;

export function CalenderView(props){


    const [days, setDays] = useState(Array(42).fill(true));
    let date = props.getDate;

    function handleDateChange(newDate)
    {
        props.setDate(newDate);
    }

    let daysInMonth = DateTime.local(date.year, date.month).daysInMonth;
    let firstDayOfMonth = DateTime.local(date.year, date.month, 1).weekday;

    useEffect(() => {
        let days = Array(42).fill(false);
        for (let i = 0; i < daysInMonth; i++) {
            days[firstDayOfMonth + i] = true;
        }
        setDays(days);
    }, [date]);

   
    return (
        <>
            <CalenderBody>
                <div className="CalenderHeader">
                   
                    <h1>Year</h1>
                    <h1>{date.month.toString()}</h1>

                </div>
                <div className="CalenderBody">
                    <div className="Header">
 
                    </div>
                    <div className="Body">
                        <div className="leftArrows">
                            <button className="CalenderBodyYearArrow">◀</button>
                            <button onClick={
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

                            } className="CalenderBodyMonthArrow">◀</button>
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
                                        return <DaySquare onClicks={
                                            ()=>{
                                                handleDateChange({
                                                    year: date.year,
                                                    month: date.month,
                                                    day: index - (firstDayOfMonth - 1)
                                                })
                                            }
                                        } isActive={day} number={day ? index - (firstDayOfMonth - 1 ) : "NO"} key={index} />
                                    })
                                }
                            
                            
                            </div>
                        </div>
                        <div className="RightArrows">
                            <button className="CalenderBodyMonthArrow" onClick={()=>{
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



                            }}>▶</button>
                            <button className="CalenderBodyYearArrow">▶</button>
                        </div>

                    </div>
                    
                </div>
            </CalenderBody>
        </>
    )
}

export default CalenderView;