
import { useState } from 'react';
import '../Styles/EventGrid.scss';
import { EventObject } from './EventObject'

export function EventGrid(props){
    let SizeOfGrid = props.size;
    let currentPage = props.currentPage;
    //console.log('currentPage: ' + currentPage + ' SizeOfGrid: ' + SizeOfGrid);
    if(currentPage == 0 || SizeOfGrid == 0){
        return (
            <div className="EventGridMain">
                <div className="EventGrid">
                    <h1>There are no events</h1>
                </div>
            </div>
        )
    }
    //const [currentPage, setCurrentPage] = useState(1);


    return (
        <>
        <div className="EventGridMain">
            <div className="EventGrid">
               {props.children}
            </div>
            <div className="EventGriControls">
                <button onClick={()=>props.onChangePage(false)}>◀</button>
                <p>{`${currentPage} of ${SizeOfGrid}`}</p>
                <button onClick={()=>props.onChangePage(true)}>▶</button>
            </div>
        </div>


        </>
    )

}