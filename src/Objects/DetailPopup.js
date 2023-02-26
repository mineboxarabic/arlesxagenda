import '../Styles/DetailPopup.scss'
import ReactMarkdown from 'react-markdown';
import { DateTime } from 'luxon';
import { marked } from 'marked';
export function DetailPopup(props){

    let Event = props.event;
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