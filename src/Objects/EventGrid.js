
import { useState } from 'react';
import '../Styles/EventGrid.scss';
import { EventObject } from './EventObject'
export function EventGrid(props){
    let Data = props.Data;
    let numberPerRow = 4;
    
    

    let Temp = [];
    let Trows = [];
    for(let i = 1 ; i <= Data.events.length ; i++){
        
        Temp.push(Data.events[i]);
        if(i % numberPerRow === 0){
            Trows.push(Temp);
            Temp = [];
        }
    }
    const [rows , setRows] = useState(Trows);
    const [currentPage, setCurrentPage] = useState(1);
    function changePage(isAdd){
        if(currentPage <= rows.length -1){
            let ct = isAdd ? (currentPage + 1) : (currentPage - 1); //Fix here 
            setCurrentPage(ct);
        }
        
    }
    return (
        <>
        <div className="EventGridMain">
            <div className="EventGrid">


            </div>
            <div className="EventGriControls">
                <button onClick={()=>changePage(false)}>◀</button>
                <p>{`${currentPage} of ${rows.length}`}</p>
                <button onClick={()=>changePage(true)}>▶</button>
            </div>
        </div>


        </>
    )

}