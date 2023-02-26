import '../Styles/EventObject.scss'
import { useState } from 'react';

export function EventObject(props){
    let EventData = props.EventData;
    let timings = props.EventData.timings;
    
    let language = props.language;
    const [showDetail, setShowDetail] = useState(false);

    let DataWithLang = {};
    for(const key in EventData){
        if(key === "title" || key === "description"){
            DataWithLang[key] = {};
            if(EventData[key].hasOwnProperty(language)){
                DataWithLang[key] = EventData[key][language];
            }
            else{
                DataWithLang[key] = EventData[key]["fr"];
            }
        }
    }

    console.log(showDetail)
    return (
        <>
            <div onClick={props.onClickEvent} className="Event">
                <div className='Event_Body'>
                <h3 className="Event_Title" >{DataWithLang["title"]}</h3>
                    <div className='Event_Image_Container'>
                        <img src={EventData.image} alt="EventImage"/>
                        <div className='Event_Image_Shadow'></div>
                    </div>
                    <p className='Event_Description'>{DataWithLang["description"]}</p>
                </div>
            </div>
        </>
    )
}