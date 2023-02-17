import '../Styles/EventObject.scss'
export function EventObject(props){
    let EventData = props.EventData;
    let Language = props.Language;
    function languageSwip(Object,lang){
        if(lang === 'fr'){
            Object.fr;
        }
        else{
            Object.en;
        }
    }
    return (
        <>
            <div className="Event">
                <div></div>
            </div>
        </>
    )
}