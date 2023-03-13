
import { useState } from 'react';
import { DateTime } from "luxon";
import noFoundImage from '../Images/Event_no_Image.png';
import styled from 'styled-components';
import { useContext  } from 'react';
import { ColorPalette , CurrentLanguage , TranslatedTextList} from '../Data/Context';
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
                    
                    color: ${props => props.Ended ? 'red' : 'green'};

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
    
    let {language , setLanguage} = useContext(CurrentLanguage);
    console.log('the language is : ' + language);

    


    function getAttributeValues(attribute)
    {
        for(let key in EventData){
            if(key === attribute){
                if(key === 'title' || key === 'description' || key === 'longDescription'){
                    if(EventData[key][language] == undefined && EventData[key][language] == null)
                    {
                        if(language === 'fr'){
                           return EventData[key]['en'];
                        }
                        else{
                            return EventData[key]['fr'];
                        }
                    }
                    else
                    {
                        return EventData[key][language];
                    }
                }
                if(key === "timings"){
                    if(EventData[key] != undefined && EventData[key] != null){
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
                        timings.map((timing,index)=>{
                            
                        })

                        for(let i = 0; i < timings.length; i++){
                            let start = DateTime.fromISO(timings[i].start);
                            let end = DateTime.fromISO(timings[i].end);
                            let today = DateTime.local();
                            if(start >= today){
                                return start.toFormat('dd LLL yyyy');
                            }
                            else if (start <= today && end >= today && i === timings.length - 1){
                                return "On going";
                            }
                            else if (end < today && i === timings.length - 1){
                                return "Ended";
                            }
                        }
                    
                        
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

            }
        }
    }

    let timming = getAttributeValues("timings");
    return (
        <>

                <Event onClick={props.onClickEvent} Ended={timming === "Ended"}>
                    
                    <img src={EventData.thumbnail == false ? noFoundImage: EventData.thumbnail } alt="EventImage"/>
                    <div className='Event_Body'>
                        <div className='Event_Title_Container'>
                            <h3 className="Event_Title" >{getAttributeValues("title")}</h3>
                            <p>{TranslatedTextList[language]["Next Date is :"] + timming}</p>
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