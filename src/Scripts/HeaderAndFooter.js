import '../Styles/HeaderFooter.scss'
import { useState } from 'react'
import Banner1 from '../Images/Banner1.png'
import Logo from '../Images/Logo.png'
import { useEffect } from 'react'
import CSSHeaderFooter from '../Styles/HeaderFooter.scss'
function Banner({leftPosition,sizeX,sizeY}){
    let sizeXString = sizeX + "px";
    let sizeYString = sizeY + "px";
    let sizeXShadow = sizeX - 20 + "px";
    let sizeYShadow = sizeY - 20 + "px";
    let leftPositionString = leftPosition + "%";
    let leftPositionShadow = leftPosition - 80 + "%";


    return (
        <div style={{
            position: "relative",
            display: "inline-block",
            top: '10%',
            left: leftPositionString
        }} className="Banner">
            
            <div style={{
                position: "absolute",
                top: 10,
                left: 6,
                width: sizeXShadow,
                height: sizeYShadow,
                boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.5)"
            }} className="ShadowForBanner">

            </div>
            <img style={{
                position: "absolute",
                top: 0,
                zIndex: 1,
                left: 0,
            }} width={sizeXString} height={sizeYString} src={Banner1} alt="Banner1" className="App-banner" />
            
        </div>
    )}
function ComboBox(props){

    let [selectedLanguage, setSelectedLanguage] = useState(props.selected);
    let [style, setStyle] = useState();



    function setDisplay(display){
        document.querySelector('.Language-Selection-ComboBox').style.setProperty('--state_of_popup', display);
    }

    return (
        <>
        <div className='Language-Selection'>
            {selectedLanguage}
            <div style={style} className='Language-Selection-ComboBox'>
                <div onClick={
                    () =>{
                        setSelectedLanguage("fr");
                        props.getLanguage("fr")
                    }
                } value="fr">fr</div>
                <div onClick={()=>{
                    setSelectedLanguage("en");
                    props.getLanguage("en")
                }} value="en">en</div>
            </div>
        </div>
        </>
    )
}
export function Header(props){
    const [language, setLanguage] = useState("fr");
    return (
            <nav className="App-nav">
                <img width={"80px"} height={"80px"} src={Logo} alt="Logo" className="App-logo" />
                <ul className="App-nav-list">
                    <li><a href="index.html">Dayly</a></li>
                    <li><a href="events.html">Weekly</a></li>
                    <li><a href="about.html">Monthly</a></li>
                </ul>
                <Banner leftPosition={85} sizeX={80} sizeY={100} />
                <Banner leftPosition={92} sizeX={70} sizeY={90} />
                <ComboBox getLanguage={props.getLanguage} selected="fr" />
            </nav>
    )
}
export function Footer(){
    return (
        <footer className="App-footer">
            <p>Footer</p>
        </footer>
    )
}
