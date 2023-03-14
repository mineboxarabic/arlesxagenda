import { useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import CulumnImage from "../Images/Column.png";
import { DataContext, ColorPalette , CurrentDate} from "../Data/Context";
import { useContext } from "react";
const DaySquares = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  background: radial-gradient(circle,${ props => !props.isSelected ? (ColorPalette.light + ',' + ColorPalette.medium) : ('green' + ',' + 'green')});
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid transparent;

  outline: none;
  cursor: pointer;

  &:hover {
    background: radial-gradient(circle,${ props => !props.isSelected ? (ColorPalette.medium + ',' + ColorPalette.light) : ('green' + ',' + 'green')});;
    border: 1px solid rgb(243 168 113);
    transition: all 0.1s ease-in-out;
  }
  .DayNum {
    padding: 0;
    margin: 0;
    font-size:20px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    color: black;
    &:hover {
      transform: scale(1.04);
      transition: all 0.2s ease-in-out;
    }
  }
  .EventNum {
    
  }
`;
const DaySquaresUnusable = styled.div`
  width: 100%;
  height: 100%;
  //background-color: gray;
  display: flex;
  align-items: center;
  align-content: center;

  background: radial-gradient(
    circle,
    ${ColorPalette.inBetweenDarkAndDark},
    ${ColorPalette.darkest}
  );
  background-blend-mode: darken;
  justify-content: center;
  //background: rgb(104 68 41);
`;
const ArrowSelector = styled.button`
  z-index: 1;
  font-size: ${(props) => props.scale.x}px;

  margin: 0;
  padding: 0;

  border: 0px;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: aliceblue;
  text-shadow: 0px 0px 2px black;

  &:hover {
    transform: scale(1.1, 1.1);
    transition: all 0.2s ease-in-out;
    text-shadow: 0px 0px 10px rgb(255 255 255);
  }
`;
function Arrows(props) {
  let scale = props.scale;
  let direction = props.direction;

  return (
    <>
      <ArrowSelector
        scale={scale}
        onClick={props.onClicks}
        className={props.className}
      >
        {direction === "right" ? "〉" : "〈"}
      </ArrowSelector>
    </>
  );
}
function DaySquare(props) {
  return props.isActive ? (

    <DaySquares numberOfEvents={props.numberOfEvents} isSelected={props.isSelected} onClick={props.onClicks}>
      <h1 className="DayNum">{props.number}</h1>
    </DaySquares>

  )
   : (
    <DaySquaresUnusable>
      <h1></h1>
    </DaySquaresUnusable>
  );
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

  .CalenderHeader {
    width: ${widthOfCalender};
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;

    transform: scale(1.03, 1);
    background-color: ${ColorPalette.inBetweenDarkAndDark};
    border-bottom: 1px solid #e0e0e0;
    .leftArrows,
    .RightArrows {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .MonthYearNameContainer {
      width: 50%;
      height: 100%;
        z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      justify-content: center;

      background-color: ${ColorPalette.light};
      border-radius: 20px;
        font-size: 5px;
      h1 {
        margin: 0px;
        z-index: 1000;
      }
    }
  }

  .CalenderBody {
    width: ${widthOfCalender};
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .Header {
      width: 100%;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    .Body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      background: radial-gradient(circle, ${"white"}, ${ColorPalette.light});
      //filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;

      .CalenderBodyMonth {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        .CalenderBodyDays {
          width: 97%;
          height: 10%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          align-content: center;
          background-color: ${ColorPalette.inBetweenDarkAndDark};
          //filter: drop-shadow(0px 0px 10px ${ColorPalette.darkest});
          color: #e0e0e0;

          .CalenderBodyDaysName {
            text-align: center;
            width: 110px;
          }
        }

        .CalenderBodyDaySquare {
          width: 100%;
          height: 60%;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(6, 1fr);
          grid-gap: 1px;
          background-color: #fff;

          border: 1px solid ${ColorPalette.inBetweenDarkAndDark};
          filter: drop-shadow(0px 0px 10px ${ColorPalette.darkest});
        }
      }
    }
  }
`;

export function CalenderObject(props) {
  let Data = useContext(DataContext);
  const [days, setDays] = useState(Array(42).fill(true));
  let {currentDate, setCurrentDate} = useContext(CurrentDate);
  console.log(currentDate);
  let linkedDatesToEvents = {};
  const [isLoading, setIsLoading] = useState(true);

  function handleDateChange(newDate) {
    setCurrentDate(newDate);

  }

  let daysInMonth = DateTime.local(currentDate.year, currentDate.month).daysInMonth;
  let firstDayOfMonth = DateTime.local(currentDate.year, currentDate.month, 1).weekday;

  useEffect(() => {
    let days = Array(42).fill(false);
    for (let i = 0; i < daysInMonth; i++) {
      days[firstDayOfMonth + i] = true;
    }
    setDays(days);
  }, [currentDate]);

  return (
    <>
      <CalenderBody>
        {/*<ColumnBack>
                </ColumnBack>

                <ColumnBack2>
    </ColumnBack2>*/}
        <div className="CalenderHeader">
          <div className="leftArrows">
            <Arrows
              onClicks={() => {
                handleDateChange({
                  year: currentDate.year - 1,
                  month: currentDate.month,
                  day: currentDate.day,
                });
              }}
              direction="left"
              scale={{ x: 50, y: 30 }}
              className="CalenderBodyYearArrow"
            ></Arrows>
            <Arrows
              onClicks={() => {
                if (currentDate.month === 1) {
                  handleDateChange({
                    year: currentDate.year - 1,
                    month: 12,
                    day: currentDate.day,
                  });
                } else {
                  handleDateChange({
                    year: currentDate.year,
                    month: currentDate.month - 1,
                    day: currentDate.day,
                  });
                }
              }}
              className="CalenderBodyMonthArrow"
              scale={{ x: 35, y: 70 }}
              direction="left"
            ></Arrows>
          </div>
          <div className="MonthYearNameContainer">
            <h1>{currentDate.year.toString()}</h1>
            <h1>{DateTime.local(currentDate.year, currentDate.month).monthLong}</h1>
          </div>
          <div className="RightArrows">
            <Arrows
              onClicks={() => {
                setIsLoading(true);
                if (currentDate.month === 12) {
                  handleDateChange({
                    year: currentDate.year + 1,
                    month: 1,
                    day: currentDate.day,
                  });
                } else {
                  handleDateChange({
                    year: currentDate.year,
                    month: currentDate.month + 1,
                    day: currentDate.day,
                  });
                }
              }}
              className="CalenderBodyMonthArrow"
              scale={{ x: 35, y: 70 }}
              direction="right"
            ></Arrows>

            <Arrows
              onClicks={() => {
                handleDateChange({
                  year: currentDate.year + 1,
                  month: currentDate.month,
                  day: currentDate.day,
                });
              }}
              direction="right"
              scale={{ x: 50, y: 90 }}
              className="CalenderBodyYearArrow"
            ></Arrows>
          </div>
        </div>
        <div className="CalenderBody">
          <div className="Header"></div>
          <div className="Body">
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
                {days.map((day, index) => {
                  let dayNumber = index - (firstDayOfMonth - 1);
                  let numberOfEvents = Data.getEventsByDate(dayNumber,currentDate.month,currentDate.year).size;
                  return (
                    <DaySquare
                      onClicks={() => {
                        handleDateChange({
                          year: currentDate.year,
                          month: currentDate.month,
                          day: dayNumber,
                        });
                        
                      }}
                      isSelected={
                        currentDate.day === dayNumber &&
                        currentDate.month === currentDate.month &&
                        currentDate.year === currentDate.year
                      }
                      isActive={day}
                      numberOfEvents={numberOfEvents}
                      number={day ? index - (firstDayOfMonth - 1) : "NO"}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CalenderBody>
    </>
  );
}

export default CalenderObject;
