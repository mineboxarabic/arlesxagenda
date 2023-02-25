import '../Styles/DetailPopup.scss'
export function DetailPopup(props){

    let Event = props.event;



    return props.isShow === true ?  (
        <div className="DetailPopup">
            <img/>
            <h1>Detail Popup</h1>
        </div>
    ) : "";
}