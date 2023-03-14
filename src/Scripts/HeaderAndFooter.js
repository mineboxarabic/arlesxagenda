//import '../Styles/HeaderFooter.scss'

import Banner1 from '../Images/Banner1.png'
import Logo from '../Images/Logo.png'

import styled from 'styled-components'
import { useContext } from 'react'
import { ColorPalette, CurrentLanguage , TranslatedTextList } from '../Data/Context.js'

//###############################The styles for the Calender view or Month view of the app##############################
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
    background: radial-gradient(circle, ${ColorPalette.inBetweenDarkAndDark} 10%, ${ColorPalette.darkest} 100%, ${ColorPalette.dark} 100%);
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
            background-color:  ${ColorPalette.eyeCatch};
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 10px;
            transition: all 0.3s ease-in-out;
            width: 20%;
            &:hover{
                color: rgb(255 255 255);
                background-color:${ColorPalette.inBetweenDarkAndMedium};
            }

        }
        .notSelected{
            margin-left: 20px;
            font-size: 20px;
            color: white;
            text-decoration: none;
            background-color: ${ColorPalette.darkest};
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 0 10px;
            transition: all 0.3s ease-in-out;
            width: 20%;
            &:hover{
                color: rgb(255 255 255);
                background-color:${ColorPalette.inBetweenDarkAndMedium};
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
            background-color: ${ColorPalette.medium};
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
                background-color:${ColorPalette.dark};
            }
        }

       
    }




`;

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
//========================================The end of the styles ========================================================

//##############################################The Header of the app###################################################
export function Header(props){
    let {language, setLanguage} = useContext(CurrentLanguage);

    let selectedA = props.isActive ? "selected" : "notSelected";
    let selectedB = props.isActive ? "notSelected" : "selected";
    let text = TranslatedTextList[language];
    
    
    return (
        <HeaderNav isActive={props.isActive} className="App-header">
            <div className="App-header-Left">
                <img src={Logo} alt="Logo" className="App-logo" />
                <h1 className="App-title">Arles X Agenda </h1>
            </div>
            <div className="App-header-Center">
                <a className={selectedA} href="/">{text["Search Page"]}</a>
                <a className={selectedB} href="/month">{text["Month View"]}</a>
            </div>
            <div className="App-header-Right">
                <Banner src={Banner1} topPosition={20} leftPosition={93} sizeX={100} sizeY={130} />
                <Banner src={Banner1} topPosition={28} leftPosition={88} sizeX={90} sizeY={115} />

                <select onChange={(e) =>{
                    setLanguage(e.target.value);
                    }} >
                    <option value="fr">fr</option>
                    <option value="en">en</option>
                </select>
            </div>

        </HeaderNav>
    )
}

//=================================================The end of the Header==================================================

//##############################################The Footer of the app###################################################

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
//=================================================The end of the Footer==================================================