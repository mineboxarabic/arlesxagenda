import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";


const DaySquares = styled.div`
width: 100%;
height: 100%;
background-color: gray;
display: flex;
align-items: center;
align-content: center;
justify-content: center;

`;
function DaySquare(props){

    return (
        <DaySquares >
            <h1>{props.number}</h1>
        </DaySquares>
    )
}
export function CalenderView(props){
    const widthOfCalender = "90%";
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
            height: 600px;
            display: flex;
            flex-direction: row;
            background-color: rgb(222,222,220);
            .CalenderBodyMonth{
                position: relative;
                width: 90%;
                
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
    const [days, setDays] = useState(Array(42).fill(true));
    const [date , setDate] = useState({
        year: DateTime.local().year,
        month: DateTime.local().month,
        day: DateTime.local().day
    });

    let daysInMonth = DateTime.local().set({year: date.year, month: date.month}).daysInMonth;
    let firstDayOfMonth = DateTime.local().set({year: date.year, month: date.month}).startOf('month').weekday;

    function setList(){
        let temp = days;
        for(let i = 0; i < days.length; i++){
            
            if(i < firstDayOfMonth){
                temp[i] = false;
            }
            else if(i > daysInMonth + firstDayOfMonth){
                temp[i] = false;
            }
    
        }
        setDays(temp);
    }

    useEffect(() => {
        setList();
    }, []);


 


    console.log(days);

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
                            <button className="CalenderBodyMonthArrow">◀</button>
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
                                        return <DaySquare number={day === true ? (index - firstDayOfMonth) + 1: "NO"} key={index} />
                                    })
                                }
                            
                            
                            </div>
                        </div>
                        <div className="RightArrows">
                            <button className="CalenderBodyMonthArrow" onClick={()=>{
                                setDate({
                                    year: date.year,
                                    month: date.month + 1,
                                    day: date.day
                                })
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