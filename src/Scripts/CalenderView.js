import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";

import CulumnImage from "../Images/Column.png"
import { DataContext, ColorPalette , TranslatedTextList, CurrentLanguage , CurrentDate} from '../Data/Context';
import { useContext } from 'react';

//###############################The styles for the Calender view or Month view of the app##############################

const DaySquares = styled.button`
position: relative;
width: 100%;
height: 100%;
background-color: white;
background: radial-gradient(circle,${ props => !props.isSelected ? (ColorPalette.light + ',' + ColorPalette.medium) : ('lightgreen' , ',' ,'green' )});
display: flex;
align-items: center;
align-content: center;
justify-content: center;
border: 3px solid transparent;

outline: none;
cursor: pointer;

&:hover{
    background: radial-gradient(circle,${ props => !props.isSelected ? (ColorPalette.medium , ',' , ColorPalette.light) : ('green' , ',' ,'lightgreen' )});
    border: 3px solid rgb(243 168 113);
    transition: all 0.1s ease-in-out;
}
.DayNum{
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    color: ${props=>props.numberOfEvents !== 0 ? "#e0e0e0" : "black"};
    background-color: ${props=>props.numberOfEvents !== 0 ? ColorPalette.darkest : "transparent"};

}
.EventNum{
    padding: 0;
    margin: 0;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    color: black;
    background-color: ${props=>props.numberOfEvents !== 0 ? ColorPalette.eyeCatch : "transparent"};
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

background: radial-gradient(circle, ${ColorPalette.inBetweenDarkAndDark}, ${ColorPalette.darkest});
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

margin: 0;
padding: 0;

border: 0px;
outline: none;
cursor: pointer;
background-color: transparent;
color: aliceblue;
text-shadow: 0px 0px 2px black;


&:hover{
    transform: scale(1.1,1.1);
    transition: all 0.2s ease-in-out;
    text-shadow: 0px 0px 10px rgb(255 255 255);
}
`;
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
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    
    transform: scale(1.03,1);
    background-color:${ColorPalette.inBetweenDarkAndDark};
    border-bottom: 1px solid #e0e0e0;
    .leftArrows, .RightArrows{
            display:   flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }
    .MonthYearNameContainer{
        width: 50%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;

        background-color: ${ColorPalette.light};
        border-radius: 20px;

        h1{
            margin: 7px;
        }

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
        background: radial-gradient(circle, ${"white"}, ${ColorPalette.light});
        filter: drop-shadow( 0px 0px 10px rgba(0,0,0,0.5) );
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
                width: 97%;
                height: 10%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                align-content: center;
                background-color: ${ColorPalette.inBetweenDarkAndDark};
                filter: drop-shadow( 0px 0px 10px ${ColorPalette.darkest} );
                color: #e0e0e0;

                .CalenderBodyDaysName{
                    text-align: center;
                    width: 110px;
                    
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

                border: 3px solid ${ColorPalette.inBetweenDarkAndDark};
                filter: drop-shadow( 0px 0px 10px ${ColorPalette.darkest} );
            }   



        }
        
    }
}
`;


//============================The end of the styles==================================================


//#################################### The helper functions ############################################

/**
 * 
 * @param {int} props.scale The scale of the calender
 * @param {function} props.onClicks The function that is called when the arrow is clicked
 * @param {string} props.direction The direction of the arrow
 * @param {string} props.className The class name of the arrow
 * @returns An arrow that can be used to navigate the calender
 */
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

/**
 * 
 * @param {int} props.number The number of the day
 * @param {int} props.numberOfEvents The number of events on the day
 * @param {boolean} props.isActive If the day is active or not
 * @param {boolean} props.isSelected If the day is selected or not
 * @param {function} props.onClicks The function that is called when the day is clicked
 * @param {int} props.scale The scale of the calender
 * @returns A day square that can be used to add and to navigate the calender
 */
function DaySquare(props){

    return (
        props.isActive ?
        <DaySquares numberOfEvents={props.numberOfEvents} isSelected={props.isSelected} onClick={props.onClicks} >
            <h1 className="DayNum">{props.number}</h1>
            <h1 className="EventNum">{props.numberOfEvents !== 0 ? props.numberOfEvents : "" }</h1>
        </DaySquares>
        :
        <DaySquaresUnusable>
            
        </DaySquaresUnusable>
    )
}

//============================The end of the helper functions=========================================



//#################################### The main component ############################################

/**
 * 
 * @param {*} props 
 * @returns The calender view
 */
export function CalenderView(props){
//#################################### The states and the context ############################################
    let Data = useContext(DataContext);
    let {language , setLanguage} = useContext(CurrentLanguage); //The language that is currently selected (Taken from the context and set in the context)
    console.log(setLanguage)
    let {currentDate , setCurrentDate} = useContext(CurrentDate);//The date that is currently selected (Taken from the context and set in the context)
    const [days, setDays] = useState(Array(42).fill(true)); //The 42 here is the number of days in a month (6 weeks) 6*7 = 42.


    let text = TranslatedTextList[language]; //The text that is currently selected (Taken from global object TranslatedTextList)
    let date = currentDate;

    /**
     * 
     * @param {DateTime} newDate The new date that is to be set in the context
     */
    function handleDateChange(newDate)
    {
        setCurrentDate(newDate);
        props.onChangeDate();
    }

    let daysInMonth = DateTime.local(date.year, date.month).daysInMonth; //The number of days in the current month
    let firstDayOfMonth = DateTime.local(date.year, date.month, 1).weekday; //The number of the day of the week that the first day of the month is (1 = Monday, 7 = Sunday)

    useEffect(() => {
        //this useEffect is used to set or fill the days in the calender
        //Each true value in the array represents a day in the calender
        //Each false value in the array represents an empty day or a day that does not exist in the array in the calender
        let days = Array(42).fill(false);
        for (let i = 0; i < daysInMonth; i++) {
            days[firstDayOfMonth + i] = true;
        }
        setDays(days);
    }, [daysInMonth,firstDayOfMonth]);

//============================The end of the states and the context=========================================

//#################################### The JSX ###########################################################
   
    return (
        <>
            <CalenderBody>
                <ColumnBack>
                </ColumnBack>

                <ColumnBack2>
            </ColumnBack2>
                <div className="CalenderHeader">
                <div className="leftArrows">
                            <Arrows onClicks={
                            ()=>{
                                handleDateChange({
                                    year: date.year - 1,
                                    month: date.month,
                                    day: date.day
                                })
                            }
                            
                        } direction="left" scale={{x:100,y:30}} className="CalenderBodyYearArrow"></Arrows>
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
                        <div className="MonthYearNameContainer">
                            <h1>{date.year.toString()}</h1>
                            <h1>{text[DateTime.local(date.year,date.month).monthLong]}</h1>
                        </div>
                        <div className="RightArrows">
                        <Arrows onClicks={()=>{
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

                        } direction="right" scale={{x:100,y:90}} className="CalenderBodyYearArrow"></Arrows>
                        </div>
                    

                </div>
                <div className="CalenderBody">
                    <div className="Header">
 
                    </div>
                    <div className="Body">

                       
                        <div className="CalenderBodyMonth">
                            <div className="CalenderBodyDays">
                                <div className="CalenderBodyDaysName">{text["Sun"]}</div>
                                <div className="CalenderBodyDaysName">{text["Mon"]}</div>
                                <div className="CalenderBodyDaysName">{text["Tue"]}</div>
                                <div className="CalenderBodyDaysName">{text["Wed"]}</div>
                                <div className="CalenderBodyDaysName">{text["Thu"]}</div>
                                <div className="CalenderBodyDaysName">{text["Fri"]}</div>
                                <div className="CalenderBodyDaysName">{text["Sat"]}</div>

                            </div>

                            <div className="CalenderBodyDaySquare">
                                {
                                    days.map((day, index) => {
                                        let dayNumber = index - (firstDayOfMonth - 1);
                                        let numberOfEvents = Data.getEventsByDate(dayNumber,date.month,date.year).size;
                                        return (<DaySquare onClicks={
                                            ()=>{
                                                    handleDateChange({
                                                        year: date.year,
                                                        month: date.month,
                                                        day: dayNumber
                                                    })
                                            }
                                        } isSelected={
                                            date.day === dayNumber
                                        } isActive={day} numberOfEvents={numberOfEvents} number={day ? index - (firstDayOfMonth - 1 ) : "NO"} key={index} />)

                                        
                                    })
                                    
                                }
                            
                            
                            </div>
                        </div>


                    </div>
                    
                </div>
            </CalenderBody>
        </>

    )
//============================The end of the JSX=========================================
}

export default CalenderView;