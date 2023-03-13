
import ReactMarkdown from 'react-markdown';
import { DateTime } from 'luxon';
import { marked } from 'marked';
import { useContext } from 'react';
import { CurrentLanguage , ColorPalette} from '../Data/Context';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
const DetailPopupStyle = styled.div`

    
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    
    z-index: 1;
    .DetailPopup_Body{

        position: absolute;
        top: 5%;
        left: 3%;
        width: 85%;
        height: 90%;
        padding-left: 5%;
        padding-right: 5%;

        background-color: #ffe4c4;
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        overflow-y: scroll;

        display: flex;
        

        .DetailPopup_Details_Side{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;

            
            padding: 20px;
            img{
                width: 40vh;
                height: 60vh;
                object-fit: cover;
            }

            p{
                font-size: 1.0em;
                font-weight: bold;
                margin: 0;
                margin-top: 10px;
            }
            .Container{
                width: 100%;

                display: flex;
                flex-direction: row;
                
                align-items: center;
                i{
                    margin-right: 10px;
                }
                
            }

        }
        .DetailPopup_About_Text{

        }
        table{
            border: 6px solid #948473;
            background-color: #FFE3C6;
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border-radius: 20px;
            thead{
                background: #948473;
            background: -moz-linear-gradient(top, #afa396 0%, #9e9081 66%, #948473 100%);
            background: -webkit-linear-gradient(top, #afa396 0%, #9e9081 66%, #948473 100%);
            background: linear-gradient(to bottom, #afa396 0%, #9e9081 66%, #948473 100%);
                color: white;
            }
        }
    }




`;

const ButtonGoToWebSite = styled.button`
    display: ${props => props.display ? 'block' : 'none'};
    width: 100%;
    height: 50px;
    background-color: ${ColorPalette[0]};
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        background-color: ${ColorPalette[1]};
    }

`;
export function DetailPopup(props){

    let EventData = props.event;
    let {language, setLanguage} = useContext(CurrentLanguage);
    
    function getAttributeValues(attribute)
    {
        for(let key in EventData){
            if(key === "location"){
                if(attribute === "location name"){
                    if(EventData[key].name != undefined && EventData[key].name != null){
                        return EventData[key].name;
                    }
                }
                if(attribute === "location address"){
                    if(EventData[key].address != undefined && EventData[key].address != null){
                        return EventData[key].address;
                    }
                }
                if(attribute === "location phone"){
                    if(EventData[key].phone != undefined && EventData[key].phone != null){
                        return EventData[key].phone;
                    }
                    else{
                        return "N/A";
                    }
                }
                
            }
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
                if(key === "registrationUrl"){
                   
                        return EventData[key];

                }

            }
        }
    }
    {/*
                    <table className='Timings' border={'1px'}>
                    <thead>
                        <tr>
                            <th>{language === "fr" ? "Debut" : "Start"}</th>
                            <th>{language === "fr" ? "Fin" : "End"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timings.map((timing, index) => {
                            let start = DateTime.fromISO(timing.start);
                            let end = DateTime.fromISO(timing.end);
                            let now = DateTime.local();
                            if (start < now) {
                            return (
                                <tr key={index}>
                                    <td>{start.toISODate()}</td>
                                    <td>{end.toISODate()}</td>
                                </tr>
                            )}
                        })}

                    </tbody>
                </table>
    */}
    return props.isShow === true ?  (
        <DetailPopupStyle>
            <button className="DetailPopup_Close" onClick={() => {props.onClickClose(false)}}>X</button>
            <div className="DetailPopup_Body">
                <div className="DetailPopup_Details_Side">
                    <img src={EventData.originalImage !== false ? EventData.originalImage : "No image" } />
                    <div className="DetailPopup_Details_Side_Tags">
                        <div className='Container'>
                            <i class="fa-sharp fa-solid fa-location-dot"></i>
                            <strong>{getAttributeValues('location name')}</strong>
                        </div>
                        <p>{getAttributeValues('location address')}</p>
                        <div className='Container'>
                            <i class="fa-sharp fa-solid fa-phone"></i>
                            <p>{getAttributeValues('location phone')}</p>
                        </div>
                        <ButtonGoToWebSite isLinkAvailable={(EventData.registrationUrl != undefined && EventData.registrationUrl != null)} className="DetailPopup_Go_to_website" onClick={() => {
                            if(EventData.registrationUrl != undefined && EventData.registrationUrl != null){
                                window.open(EventData.registrationUrl);
                            }
                            }}>{language === "fr" ? "Aller au site web" : "Go to website"}</ButtonGoToWebSite>
                    </div>
                </div>

                <div className="DetailPopup_About_Text">
                    <h1>{getAttributeValues('title')}</h1>
                    <hr />
                    <p>{getAttributeValues('description')}</p>
                    <ReactMarkdown>{getAttributeValues('longDescription')}</ReactMarkdown>
                </div>
                
            </div>
        </DetailPopupStyle>
    ) : "";
}