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

const Banner = styled.img`
    position: absolute;
    display: inline-block;
    top: ${props => props.topPosition}%;
    left: ${props => props.leftPosition}%;
    width: ${props => props.sizeX}px;
    height: ${props => props.sizeY}px;
    filter: drop-shadow( 0px 0px 10px 10px rgba(0,0,0,0.5));
    z-index: 2;
   

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
    box-shadow:  0px 0px 10px 10px rgba(0,0,0,0.5) ;
    filter: drop-shadow( 0px 0px 10px 10px rgba(0,0,0,0.5));
    
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
        .selected{
            margin-left: 20px;
            font-size: 20px;
            color: white;
            text-decoration: none;
            background-color:  rgb(147 86 36);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 10px;
            transition: all 0.3s ease-in-out;
            width: 20%;
            &:hover{
                color: rgb(255 255 255 / 50%);
                background-color:rgb(34 16 1);
            }

        }
        .notSelected{
            margin-left: 20px;
            font-size: 20px;
            color: white;
            text-decoration: none;
            background-color: rgb(34 16 1);
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 10px;
            transition: all 0.3s ease-in-out;
            width: 20%;
            &:hover{
                color: rgb(255 255 255 / 50%);
                background-color:rgb(34 16 1);
            }
        }
    }

    .App-header-Right{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 100%;
        padding-right: 20px;

        select{
            width: 100px;
            height: 30px;
            background-color: rgb(34 16 1);
            color: white;
            border: 1px solid white;
            border-radius: 5px;
            font-size: 20px;
            padding: 0 5px;
            margin-left: 20px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            &:hover{
                color: rgb(255 255 255);
                background-color:rgb(147, 86, 36);
            }
        }

       
    }




`;

export function Header(props){
    
    let selectedA = props.isActive ? "selected" : "notSelected";
    let selectedB = props.isActive ? "notSelected" : "selected";
    return (
        <HeaderNav isActive={props.isActive} className="App-header">
            <div className="App-header-Left">
                <img src={Logo} alt="Logo" className="App-logo" />
                <h1 className="App-title">ArlesXAgenda</h1>
            </div>
            <div className="App-header-Center">
                <a className={selectedA} href="/">Search Page</a>
                <a className={selectedB} href="/month">Month View</a>
            </div>
            <div className="App-header-Right">
                <Banner src={Banner1} topPosition={20} leftPosition={93} sizeX={100} sizeY={130} />
                <Banner src={Banner1} topPosition={28} leftPosition={88} sizeX={90} sizeY={115} />

                <select onChange={(e) => props.setLanguage(e.target.value)} value={props.language}>
                    <option value="fr">fr</option>
                    <option value="en">en</option>
                </select>
            </div>

        </HeaderNav>
    )
}

const FooterNav = styled.nav`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;

    background: radial-gradient(circle, rgb(76 42 2) 0%, rgb(64 21 0) 30%, rgb(77 34 0) 100%);
    box-shadow:  0px 12px 10px 10px rgba(0,0,0,0.5);

    p{
        margin-left: 20px;
        font-size: 20px;
        color: white;

    }
    div{
        display: flex;
        flex-direction: row;
        margin-right: 20px;
        p{
            font-size: 20px;
            color: white;
        }
    }

    //filter: drop-shadow( 0px 12px 10px 10px rgba(0,0,0,0.5));
    `;
export function Footer(){
    return (
        <FooterNav className="App-footer">
            <p>
                Creator Yassin YOUNES
            </p>
            <div>
                <p>
                    Contact :
                </p>
                <p>
                    yasin.younes@etu.univ-amu.fr
                </p>
            </div>
            

        </FooterNav>
    )
}
