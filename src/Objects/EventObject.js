import '../Styles/EventObject.scss'

export function EventObject(props){
    let EventData = props.EventData;
    let language = props.language;
    function languageSwip(Object,lang){

    }
    return (
        <>
            <div className="Event">
                <div className='Event_Body'>
                <h3 className="Event_Title" >{EventData.title.fr}</h3>
                    <div className='Event_Image_Container'>
                        <img src={EventData.image} alt="EventImage"/>
                        <div className='Event_Image_Shadow'></div>
                    </div>
                    <p className='Event_Description'>{EventData.description.fr}</p>
                </div>
            </div>
        </>
    )
}