//import '../Styles/HeaderFooter.scss'
import { useState } from 'react'
import Banner1 from '../Images/Banner1.png'
import Logo from '../Images/Logo.png'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
/*function Banner({leftPosition,sizeX,sizeY}){
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
}*/

const Banner = styled.div`
 
`;


const HeaderNav = styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
    background: radial-gradient(circle, rgb(76 42 2) 0%, rgb(64 21 0) 30%, rgb(77 34 0) 100%);
    //box-shadow:  0px 0px 10px 10px rgba(0,0,0,0.5) inset;
    
    
    .App-header-Left{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 30%;
        height: 100%;
        padding-left: 20px;
        .App-logo{
            width: 50px;
            height: 50px;
        }
        .App-title{
            margin-left: 10px;
            font-size: 30px;
            color: white;
        }
    }

    .App-header-Center{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 40%;
        height: 100%;
        a{
            margin-left: 20px;
            font-size: 20px;
            color: white;
            text-decoration: none;
            background-color:rgb(54 25 2);
            &:hover{
                color: rgb(255 255 255 / 50%);
            }

        }
    }

    .App-header-Right{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 30%;
        height: 100%;
        padding-right: 20px;
       
    }


`;

export function Header(props){
    const [language, setLanguage] = useState("fr");
    return (
        <HeaderNav className="App-header">
            <div className="App-header-Left">
                <img src={Logo} alt="Logo" className="App-logo" />
                <h1 className="App-title">ArlesXAgenda</h1>
            </div>
            <div className="App-header-Center">
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
            <div className="App-header-Right">
                <Banner leftPosition={0} sizeX={200} sizeY={100} />
                <Banner leftPosition={20} sizeX={200} sizeY={100} />
            </div>

        </HeaderNav>
    )
}
export function Footer(){
    return (
        <footer className="App-footer">
            <p>Footer</p>
        </footer>
    )
}
