
import { useState } from 'react';
import { ColorPalette } from '../Data/Context';
import styled from 'styled-components';

//############################################## STYLED COMPONENTS ##############################################
const EventGridStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;


    .EventGridMain{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        justify-content: center;

        .EventsDetails{
            width: 100%;
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            .EventsDetailsFiltersUsed{
                .date{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    p{
                        font-size: 30px;
                        color: ${ColorPalette.light};
                        margin: 0;
                        text-align: center;
                        width: 100px;
                    }
                }
                .keyWords{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    ul{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        align-content: center;
                        justify-content: center;
                        flex-wrap: wrap;
                        li{
                            width: 100px;
                            height: 100%;
                            display: flex;
                            flex-direction: row;
                            background-color: ${ColorPalette.medium};
                            border-radius: 5px;
                            color: ${ColorPalette.light};
                            align-items: center;
                            align-content: center;
                            justify-content: center;
                            margin: 5px;
                        }
                    }
                }
                .location{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    p{
                        font-size: 30px;
                        color: ${ColorPalette.light};
                        margin: 0;
                    }
                }

                

            }
        }
        .EventGrid{
            width: 100%;
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            justify-content: center;
            
        }

        .EventGriControls{
            width: 100%;
            height: 10%;
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;
            justify-content: center;
            button{
                width: 10%;
                height: 100%;
                background-color: ${ColorPalette.dark};
                color: ${ColorPalette.light};
                font-size: 20px;
                border: none;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                transition: 0.2s;
                &:hover{
                    background-color: ${ColorPalette.inBetweenDarkAndMedium};

                }
            }
            p{
                font-size: 20px;
                color: ${ColorPalette.light};
                margin: 0;
                text-align: center;
                width: 100px;
            }

        }
    }

`;
//============================================== End of STYLED COMPONENTS ==============================================
export function EventGrid(props){
    let SizeOfGrid = props.children.length; // number of events
    const [currentPage , setCurrentPage] = useState(1); //number of the current page

    let Temp = []; // temp array to hold the events
    let rows = []; // rows of events
    let numberPerRow = 8; // number of events per row

    if(props.children.length < numberPerRow && props.children.length > 0){
        rows.push(props.children); // if there are less than 8 events then just add them to the rows
    }else{
        for(let i = 0 ; i < props.children.length  ; i++){
            Temp.push(props.children[i]);
            if(Temp.length === numberPerRow ){
                rows.push(Temp);
                Temp = [];
            }
            else if(i === props.children.length - 1 && Temp.length > 0)
                rows.push(Temp );
    
        }
    }
    if(currentPage === 0 || SizeOfGrid === 0){
        return (
            <div className="EventGridMain">
                <div className="EventGrid">
                    <h1>There are no events</h1>
                </div>
            </div>
        )
    }


    function changePage(isAdd){
        let ct = 1;
        if(currentPage === rows.length && isAdd){
            ct = 1;
        }
        else if(currentPage === 1 && !isAdd){
            ct = rows.length;
        }

        if(isAdd){
            if(currentPage < rows.length)
                ct = currentPage + 1;
        }
        else{
            if(currentPage > 1)
                ct = currentPage - 1;
        }
        //setCurrentPage(ct); 
        setCurrentPage(ct);
    }


    return (
        <>
        <EventGridStyle>
        <div className="EventGridMain">
           { !props.isMonthView && <div className="EventsDetails">
               {props.filtersAndResults.results > 0 && <h1>{ props.filtersAndResults.results} resaults found</h1>}
                <div className="EventsDetailsFiltersUsed">
                    {props.filtersAndResults.keywords.length > 0 && <div className='keyWords'>
                        <h2>Keywords: </h2>
                        <div className="EventsDetailsFiltersUsedList">
                        <ul>
                                {
                                    props.filtersAndResults.keywords.map((filter)=>{
                                        return <li>{filter}</li>
                                    })
                                }
                        </ul>
                        </div>
                    
                    </div>}
                    
                    {props.filtersAndResults.date.day !== undefined && <div className='date'>
                     <h2>Date: </h2>
                         <p>{props.filtersAndResults.date.day +'/'+ props.filtersAndResults.date.month +'/'+ props.filtersAndResults.date.year}</p>
                        </div>}
                    {props.filtersAndResults.location !== "" && <div className='location'>
                        <h2>Location: </h2>
                        <p>{props.filtersAndResults.location}</p>
                    </div>}
                </div>
            </div>}
            <div className="EventGrid">
               {
                    props.children.length > 0 ?
                    rows[currentPage - 1].map((child)=>{
                        return child;
                    }
                    ) :
                    <h1>There are no events</h1>
                    
               }
            </div>
            <div className="EventGriControls">
                <button onClick={()=>{changePage(false)}}>◀</button>
                <p>{`${currentPage} of ${rows.length}`}</p>
                <button onClick={()=>{changePage(true)}}>▶</button>
            </div>
        </div>
        </EventGridStyle>
        </>
    )

}