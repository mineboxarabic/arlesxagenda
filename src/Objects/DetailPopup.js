import '../Styles/DetailPopup.scss'
import ReactMarkdown from 'react-markdown';
import { DateTime } from 'luxon';
import { marked } from 'marked';
export function DetailPopup(props){

    let EventData = props.event;
    function getValue(name){
        for(const key in Event){
            if(key === name){
                if(Event[key][props.language] !== undefined && Event[key][props.language] !== null){
                    return Event[key][props.language];
                }else{
                    if(props.language === "fr"){
                        return Event[key]["en"];
                    }else{
                        return Event[key]["fr"];
                    }
                }

                }
        }
    }

    
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

            }
        }
    }

    let date = new Date(Event.createdAt);
    let timings = Event.timings;
    let language = props.language;
    return props.isShow === true ?  (
        <div className="DetailPopup">
            <div className="DetailPopup_Body">
                <button className='CloseButton' onClick={props.onClickClose}>X</button>
                <img src={Event.image} />
                <h1 className='Header'>{getValue('title')}</h1>
                <p className='Description'>{getValue('description')}</p>
                <html className='LongDescription' dangerouslySetInnerHTML={{__html: marked(getValue('longDescription'))}}></html>
                <h2 className='TimingsHeader'>{language === "fr" ? "Les Temps" : "The Timings"}</h2>
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
                <div className='Footer'>
                    <div className='Date'>{`Created in ${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`}</div>
                </div>
                
            </div>

        </div>
    ) : "";
}