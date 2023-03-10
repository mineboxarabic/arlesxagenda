
import { useEffect, useState } from 'react';
import '../Styles/EventGrid.scss';
import { EventObject } from './EventObject'

export function EventGrid(props){
    let SizeOfGrid = props.children.length;
    const [currentPage , setCurrentPage] = useState(1);
    //const [rows , serows] = useState([]);
    let Temp = [];
    let rows = [];
    let numberPerRow = 8;

    if(props.children.length < numberPerRow && props.children.length > 0){
        rows.push(props.children);
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


        //serows(rows);

    if(currentPage == 0 || SizeOfGrid == 0){
        return (
            <div className="EventGridMain">
                <div className="EventGrid">
                    <h1>There are no events</h1>
                </div>
            </div>
        )
    }

    function isEvent(children){
        if(children.length == 0 || children == null)
            return false;
        if(children.length == 1 && children.type !== "EventObject")
            return false;
       children.map((child)=>{
              if(child.type !== "EventObject"){
                return false;
              }
         }
         );
            return true;
    }


    function changePage(isAdd){
        let ct = 1;
        if(currentPage == rows.length && isAdd){
            ct = 1;
        }
        else if(currentPage == 1 && !isAdd){
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
        <div className="EventGridMain">
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
        </>
    )

}