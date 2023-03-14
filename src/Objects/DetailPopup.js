
import ReactMarkdown from 'react-markdown';
import noImage from '../Images/Event_no_Image.png';
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { CurrentLanguage , ColorPalette} from '../Data/Context';
import styled from 'styled-components';
//############################################ Detail STYLES  ############################################
const DetailPopupStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${ColorPalette.darkest} 70%;
    color: ${ColorPalette.darkest};
    z-index: 1;

    .DetailPopup_Body{

        position: absolute;
        top: 5%;
        left: 3%;
        width: 85%;
        height: 90%;
        padding-left: 5%;
        padding-right: 5%;
        background-color: ${ColorPalette.light};
        background: radial-gradient(circle, ${ColorPalette.lightest} 0%, ${ColorPalette.light} 100%);
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        overflow-y: scroll;
        display: flex;
        .DetailPopup_Close{
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            border-radius: 20px;
            background-color: ${ColorPalette.lightest};
            color: ${ColorPalette.darkest};
            font-size: 2.0em;
            background-color: red;
            cursor: pointer;
            &:hover{
                background-color: #ff3f3f;
                transition:  all 0.3s ease-in-out;
            }


        }
        h1{
            margin: 0;
            margin-bottom: 10px;
            font-weight: 2000;
            color: ${ColorPalette.medium};
        }
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
                border-radius: 10px;
                filter: drop-shadow(0 0 2px ${ColorPalette.darkest});
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
            padding: 20px;
            .DetailPopup_Dates_Details{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            .DetailPopup_Dates_Details_right{

            }
            .DetailPopup_Conditions{
                
            }
    }
        }
        table{
            border: 6px solid ${ColorPalette.inBetweenDarkAndDark};
            background-color: ${ColorPalette.lightest};
            width: 100%;
            text-align: center;
            border-collapse: collapse;
            border-radius: 20px;
            thead{
                background: #948473;
            background: -moz-linear-gradient(top, ${ColorPalette.lightest} 0%, ${ColorPalette.light} 66%, ${ColorPalette.medium} 100%);
            background: -webkit-linear-gradient(top, ${ColorPalette.lightest} 0%, ${ColorPalette.light} 66%, ${ColorPalette.medium} 100%);
            background: linear-gradient(to bottom, ${ColorPalette.dark} 0%, ${ColorPalette.medium} 66%, ${ColorPalette.medium} 100%);
                color: white;
            }
        }
    }





`;
const ButtonGoToWebSite = styled.button`
    display: ${props => props.isLinkAvailable ? 'block' : 'none'};
    width: 50%;
    height: 50px;
    background-color: ${ColorPalette.medium};
    border: none;
    border-radius: 10px;
    color: ${ColorPalette.darkest};
    font-size: 1.0em;
    font-weight: bold;
    margin-top: 20px;
    cursor: pointer;
    filter:  drop-shadow(0 0 1px ${ColorPalette.darkest});
    transition: 0.3s;
    &:hover{
        background-color: ${ColorPalette[1]};
    }

`;
//============================================ End of Detail STYLES  ============================================

//############################################ Detail COMPONENT  ############################################
export function DetailPopup(props){

    let EventData = props.event; // The data of the event that is being displayed
    let {language, setLanguage} = useContext(CurrentLanguage); // The current language of the app
    
    console.log(setLanguage)
    /**
     * 
     * @param {string} attribute The attribute that is being searched for (ex: "location name") 
     * I made this function to test if the attribute is available or not
     * @returns string The value of the attribute
     */
    function getAttributeValues(attribute)
    {
        for(let key in EventData){
            if(key === "location"){
                if(attribute === "location name"){
                    if(EventData[key].name !== undefined && EventData[key].name !== null){
                        return EventData[key].name;
                    }
                }
                if(attribute === "location address"){
                    if(EventData[key].address !== undefined && EventData[key].address !== null){
                        return EventData[key].address;
                    }
                }
                if(attribute === "location phone"){
                    if(EventData[key].phone !== undefined && EventData[key].phone !== null){
                        return EventData[key].phone;
                    }
                    else{
                        return "N/A";
                    }
                }
                
            }
            if(key === "timings"){
                if(attribute === "all timings"){
                    if(EventData[key] !== undefined && EventData[key] !== null){
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
                        return timings;
                        
                    }
                }
            }
            if(key === attribute){
                if(key === 'title' || key === 'description' || key === 'longDescription'){
                    if(EventData[key][language] === undefined || EventData[key][language] === null)
                    {
                        if(language === 'fr')
                        {
                           return EventData[key]['en'];
                        }
                        else
                        {
                            return EventData[key]['fr'];
                        }
                    }
                    else
                    {
                        return EventData[key][language];
                    }
                }
                if(key === "timings"){
                    if(EventData[key][0] !== undefined && EventData[key][0] !== null){
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
                    if(EventData[key] !== undefined && EventData[key] !== null){
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
                if(key === "conditions"){
                    if(EventData[key][language] !== undefined && EventData[key][language] !== null){
                        return EventData[key][language];
                    }
                }

            }
        }
    }
    return props.isShow === true ?  (
        <DetailPopupStyle>
           
            <div className="DetailPopup_Body">
            <button className="DetailPopup_Close" onClick={() => {props.onClickClose(false)}}>X</button>
                <div className="DetailPopup_Details_Side">
                    <img src={EventData.originalImage !== false ? EventData.originalImage : noImage } alt={"Image of event"} />
                    <div className="DetailPopup_Details_Side_Tags">
                        <div className='Container'>
                            <i className="fa-sharp fa-solid fa-location-dot"></i>
                            <strong>{getAttributeValues('location name')}</strong>
                        </div>
                        <p>{getAttributeValues('location address')}</p>
                        <div className='Container'>
                            <i className="fa-sharp fa-solid fa-phone"></i>
                            <p>{getAttributeValues('location phone')}</p>
                        </div>
                        <ButtonGoToWebSite isLinkAvailable={EventData.registrationUrl !== undefined && EventData.registrationUrl !== null} className="DetailPopup_Go_to_website" onClick={() => {
                            if(EventData.registrationUrl !== undefined && EventData.registrationUrl !== null){
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

                    <div className="DetailPopup_Dates_Details">

                        <div className="DetailPopup_Conditions">
                            <h1>{language === "fr" ? "Conditions ou tarifs" :"Conditions or tarifs" }</h1>
                            <p>{getAttributeValues('conditions')}</p>
                        </div>
                        <h1 className="DetailPopup_Dates_Details_right">{language === "fr" ? "Dates" : "Dates"}</h1>
                        <div className="DetailPopup_Dates_Details_right">
                            <table className='Timings' border={'1px'}>
                            <thead>
                                <tr>
                                    <th>{language === "fr" ? "Debut" : "Start"}</th>
                                    <th>{language === "fr" ? "Fin" : "End"}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAttributeValues('all timings').map((timing, index) => {
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
                                    
                        </div>
                    </div>
                </div>
                
            </div>

            
        </DetailPopupStyle>
    ) : "";
}
//====================================== End of DetailPopup Component ======================================