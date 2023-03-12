
import { useState } from 'react';
import { DateTime } from "luxon";
import noFoundImage from '../Images/Event_no_Image.png';
import styled from 'styled-components';
import { ColorPalette } from '../Data/Context';
import font from '../Fonts/Roboto-Bold.ttf';
const Event = styled.div`
        @font-face {
            font-family: 'Roboto-Bold';
            src: url(${font});
        }
        font-family: 'Roboto-Bold';
        color: ${ColorPalette.light};
        height : 310px;
        width : 90%;
        background-color: ${ColorPalette.darkest};
        border-radius: 10px;
        margin: 10px;
        display: flex;
        flex-direction: row;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover{
            background-color: ${ColorPalette.inBetweenDarkAndDark};
            box-shadow:  0 0 20px 0 ${ColorPalette.lightest};
            img{
                transform: scale(1.02);
                transition: all 0.4s ease-in-out;
                box-shadow:  0 0 20px 0 ${ColorPalette.light} inset;
            }
        }

        img{
            height: 100%;
            width: 300px;
            border-radius: 10px 0 0 10px;
        }

        .Event_Body{
            position: relative;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 10px;
            .Event_Title_Container{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
             
                .Event_Title{
                    font-size: 40px;
                    height: 90%;
                    width: 60vh;
                    margin: 0;
                    padding: 0;
                    color: ${ColorPalette.eyeCatch};
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    


                }
                p{
                    font-size: 20px;
                    color: ${ColorPalette.light};
                    margin: 0;
                    text-align: right;

                }
            }
            .Event_Description_Container{
                height: 60%;
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                
                .Event_Description{
                    font-size: 20px;
                    color: ${ColorPalette.light};
                    width: 60%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    

                }
            }
            .Tags{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                width: 100%;
                height: 20%;
                p{
                    font-size: 20px;
                    color: ${ColorPalette.light};
                    margin: 0;
                    background-color: ${ColorPalette.inBetweenDarkAndMedium};
                    border-radius: 5px;
                    padding: 5px;
                    margin: 5px;

                    
                }
            }
        }
`;
export function EventObject(props){
    let EventData = props.EventData;
    let timings = props.EventData.timings;
    
    let language = props.language;

    let DataWithLang = {};
    

    function getAttributeValues(attribute){ //here
        for(let key in EventData){
            if(key == attribute){
                if(typeof(EventData[key]) == "object"){
                if(EventData[key] != undefined && EventData[key] != null){
                    if(EventData[key][language] != undefined && EventData[key][language] != null){
                        return EventData[key][language];
                    }
                }}
                else if (typeof(EventData[key]) == "array"){
  
                }
                if(key === "timings"){
                    if(EventData[key][0] != undefined && EventData[key][0] != null){
                        let timings = EventData[key];
                        timings.sort((a,b)=>{
                            let aStart = DateTime.fromISO(a.start);
                            let bStart = DateTime.fromISO(b.start);
                            if(aStart < bStart){
                                return -1;
                            }
                            if(aStart > bStart){
                                return 1;
                            }
                            return 0;
                        })
                        let start = DateTime.fromISO(timings[0].start);
                        return start.toFormat('dd/MM/yyyy');
                    }
                }
                if(key === "tags"){
                    if(EventData[key] != undefined && EventData[key] != null){
                        let tagsString = [];
                        EventData[key].forEach((tag,index)=>{
                            for(let name in tag){
                                if(name === "slug"){
                                    tagsString.push(tag[name]);
                                }
                            }
                        })

                        return tagsString;
                    }
                }
                //check if EventData[key] is an object or a list
                

            }
        }
    }


    return (
        <>

                <Event onClick={props.onClickEvent}>
                    
                    <img src={EventData.thumbnail == false ? noFoundImage: EventData.thumbnail } alt="EventImage"/>
                    <div className='Event_Body'>
                        <div className='Event_Title_Container'>
                            <h3 className="Event_Title" >{getAttributeValues("title")}</h3>
                            <p>{"Date: " + getAttributeValues("timings")}</p>
                        </div>
                        <div className='Event_Description_Container'>
                            <p className="Event_Description">{getAttributeValues("description")}</p>
                        </div>
                        <div className='Tags'>
                          {
                          getAttributeValues("tags").map((tag,index)=>{
                                return <p key={index}>{tag}</p>
                            })
                          }
                        </div>
                    </div>
                </Event>
        </>
    )
}