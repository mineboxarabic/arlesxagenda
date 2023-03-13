
import { useState } from 'react';
import { ColorPalette } from '../Data/Context';
import styled from 'styled-components';
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
        <EventGridStyle>
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
        </EventGridStyle>
        </>
    )

}