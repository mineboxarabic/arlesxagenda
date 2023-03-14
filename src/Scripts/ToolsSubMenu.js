import  KeywordSearch  from './KeywordSearch'
import { useContext, useState } from 'react';
import styled from 'styled-components';

import arenaImage from '../Images/Background2.png';
import BrownFont from '../Fonts/AlegreyaSansSC-Bold.otf';
import { ColorPalette, DataContext , CurrentLanguage , TranslatedTextList } from '../Data/Context.js';
import { CalenderObject } from '../Objects/Calender.js';

//############################### The styles for the Calender view or Month view of the app ##############################
const ToolsSubMenuContainer = styled.div`

@font-face {
    font-family: 'Milk';
    src: url(${BrownFont});
}
@font-face {
    font-family: 'OldFont';
    src: url(${BrownFont});
}
*{
    font-family: 'Milk';
}

@font-face {
    font-family: 'MainFont';
    src: url(${BrownFont});
}

.ToolsSubMenu{
    display: flex;
    flex-direction: row;
    height: 600px;
    color: ${ColorPalette.lightest};

    .ShowAllForm{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .Show-all{
            width: 30px;
            height: 30px;
            
        }
    }


    .BackgroundImage{
        position: relative;
        background-image: url(${arenaImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 0% 60%;

        width: 100%;
        height: 600px;
        object-fit: contain;
        object-position: 50% 50%;
        z-index: -1;
    }
    .Tools{
        //background-image: url(../Images/Background3.png);
        background-color: ${ColorPalette.darkest};
        background-size: cover;
        background-repeat: no-repeat;
        width: 30%;
        height: 600px;
        object-fit: cover;
        object-position: 25% 25%; 
        padding: 15px;
        position: relative;
        .TourismA{
            position: absolute;
            margin: 0;
            padding: 0%;
            font-size: 36px;
            font-family: 'Milk';
            color:${ColorPalette.lightest};
            text-shadow: #534845 0px 4px 10px;
            top:10%;
        }
        .Arles{
            position: absolute;
            margin: 0%;
            font-size: 77px;
            top:17%;
            left: 12%;
            color: ${ColorPalette.medium};
            font-family: 'OldFont';
            text-shadow: #1a1615 0px 10px 10px;
        }
        .Tools_Buttons{
            position: absolute;
            top: 40%;
            width: 100%;
            h2{
                font-size:40px;
                margin: 0;
                color: ${ColorPalette.lightest};
                font-family: 'MainFont';
                text-shadow: ${ColorPalette.darkest} 0px 4px 10px;
            }
            #search{
                border-radius: 15px;
                border-width: 4px;
                border-style: solid;
                height: 30px;
                margin-left: 7%;
                border-color: ${ColorPalette.inBetweenDarkAndDark};
                background: radial-gradient(circle, ${ColorPalette.lightest}, ${ColorPalette.light});
                box-shadow: 0 5px 10px 3px rgba(0,0,0,0.5);
                &::placeholder{
                    color: #1a1615;
                    font-style: italic;
                }
            }
            .Submit-Search{
                border-radius: 15px;
                border-width: 4px;
                border-style: solid;
                height: 50px;
                margin-left: 40%;
                border-color: ${ColorPalette.lightest};
                background: radial-gradient(circle, ${ColorPalette.medium}, ${ColorPalette.eyeCatch});
                box-shadow: 0 5px 10px 3px rgba(0,0,0,0.5);
                cursor: pointer;
                &:hover{
                    background: radial-gradient(circle, ${ColorPalette.eyeCatch}, ${ColorPalette.medium});
                }
            
            }

            
        }


    }

}
.propose_item{
    cursor: pointer;
    &:hover{
        background-color: #fb3e3e;
        transition: all 0.2s ease-in-out;
    }
}
.ComboBoxContainer{
 
:root{
    --display-PopUp: none;
}

.ComboBoxView
{
    position: relative;
    background-color: ${ColorPalette.medium};
    width: 90%;
    border-radius: 4px;
    height: 30px;
    margin: 0;
    box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
    text-align: center;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5%;
    margin-bottom: 5%;
    .downArraw{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: end;
    }
    .nameOfType{
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .ComboBoxViewPopUp{
            display: var(--display-PopUp);
            background-color: white;
            height: 550px;
            width: 550px;
            position: relative;
            top: 30px;
            left: 0;
       }



}
}

`;
const PopUpS = styled.div`
    @keyframes popup {
    0% {
      opacity: 0;
      width: 100px;
        height: 100px;
    }
    100% {
      opacity: 1;
      width: 300px;
        height: 300px;
    }
    }
    @mixin mainStyle {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background-color: rgb(255, 255, 255);
        animation: popup 0.3s ease-in-out;
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        .PopUp_CloseButton{
            //put the close button in the top right corner
            position: absolute;
            border-top-right-radius: 20px;
            top: 0;
            right: 0;
            width: 30px;
            height: 40px;
            background-color: red;
            //remove the border
            border: none;

            cursor: pointer;
            &:hover{
                background-color: #fb3e3e;
                transition: all 0.2s ease-in-out;
            }
            
        }
        
    }

    #WhenComboPopUp{
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgb(255, 255, 255);
        animation: popup 0.3s ease-in-out;
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        .PopUp_CloseButton{
            //put the close button in the top right corner
            position: absolute;
            border-top-right-radius: 20px;
            top: 0;
            right: 0;
            width: 30px;
            height: 40px;
            background-color: red;
            //remove the border
            border: none;

            cursor: pointer;
            &:hover{
                background-color: #fb3e3e;
                transition: all 0.2s ease-in-out;
            }
            
        }
        width: 200px;
        height: 200px;
    }

    #WhenComboPopUp{
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background-color: rgb(255, 255, 255);
        animation: popup 0.3s ease-in-out;
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        .PopUp_CloseButton{
            //put the close button in the top right corner
            position: absolute;
            border-top-right-radius: 20px;
            top: 0;
            right: 0;
            width: 30px;
            height: 40px;
            background-color: red;
            //remove the border
            border: none;

            cursor: pointer;
            &:hover{
                background-color: #fb3e3e;
                transition: all 0.2s ease-in-out;
            }
            
        }
        width: 400px;
        height: 350px;
        .PopUp_CloseButton{
            z-index: 1;
        }
    }

    #WhatComboPopUp{
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 300px;
        background-color: rgb(255, 255, 255);
        animation: popup 0.3s ease-in-out;
        border-radius: 20px;
        box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
        .PopUp_CloseButton{
            //put the close button in the top right corner
            position: absolute;
            border-top-right-radius: 20px;
            top: 0;
            right: 0;
            width: 30px;
            height: 40px;
            background-color: red;
            //remove the border
            border: none;

            cursor: pointer;
            &:hover{
                background-color: #fb3e3e;
                transition: all 0.2s ease-in-out;
            }
            
        }
    }

`;
const SearchProposed = styled.div`
    position: absolute;
    display: ${props => props.showMode};
    flex-direction: column;
    color: ${ColorPalette.medium};
    background-color: ${ColorPalette.light};
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 200px;
    border-radius: 20px;
    box-shadow: 0 10px 5px 0 rgba(0,0,0,0.5);
    top: 100px;
    left: 100px;
    z-index: 1;

    

    .CloseButton{
        //put the close button in the top right corner
        position: absolute;

        top: 0;
        right: 15px;
        width: 30px;
        height: 40px;
        background-color: red;
        //remove the border
        border: none;

        cursor: pointer;
        &:hover{
            background-color: #fb3e3e;
            transition: all 0.2s ease-in-out;
        }
    }
    ul{
        overflow-y: scroll;
        list-style-type: none;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        //style the scrollbar
        &::-webkit-scrollbar{
            width: 15px;
        }
        &::-webkit-scrollbar-track{
            border-radius: 0px 10px 10px 0px;
            background: ${ColorPalette.lightest};
        }
        &::-webkit-scrollbar-thumb{
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover{
            background: #555;
        }

        li{
            padding: 10px;
            cursor: pointer;
            &:hover{
                background-color: ${ColorPalette.inBetweenDarkAndDark};
                transition: all 0.2s ease-in-out;
            }
        }
    }



`;

//============================== End of Styled Components ==============================

/**
 * 
 * @param {boolean} props.trigger - if the popup should be displayed or not
 * @param {function} props.setTriggered - function to set the trigger to false
 * @param {string} props.id - id of the popup
 * @returns 
 */
function PopUp(props){
    return (props.trigger) ? (
        <PopUpS>
            <div id={props.id + 'PopUp'}>
            <button className="PopUp_CloseButton" onClick={() =>{props.setTriggered(false);}}>X</button>
                {props.children}
            </div>
        </PopUpS>
    ) : "";
}
/**
 * 
 * @param {string} props.id - id of the combo box
 * @param {string} props.Text - text to be displayed in the combo box
 * @param {string} props.type - type of the combo box
 * @param {object} props.children - children of the combo box
 * @returns 
 */
function ComboBoxView(props){
    const [isTriggered, setIsTriggered] = useState(false);


    return (
        <div className='ComboBoxContainer'>
            <button className="ComboBoxView" id={props.id} onFocusCapture={()=> setIsTriggered(true)}>
                    <div className='nameOfType'>{props.Text}</div>
                    <div className='downArraw'>︾</div>
                
                <PopUp trigger={isTriggered} setTriggered={setIsTriggered} id={props.id}>
                    {props.children}
                </PopUp>
            </button>
        </div>
    )

}
/**
 * this component is the search bar and the when and what combo boxes
 */
export function ToolsSubMenu(props){
    const Data = useContext(DataContext); //getting the data from the data context
    const language = useContext(CurrentLanguage); //getting the current language from the context
    const text = TranslatedTextList[language.language]; //getting the translated text from the translated text list
    const [showPropose, setShowPropose] = useState('none'); //showing the search propose
    const [searchValue, setSearchValue] = useState(''); //the value of the search


    
    let locations = [];
    Data.getAllLocaitons().forEach((location)=>{
        locations.push(location); //pushing the location name to the array beacuse of an error that i dont know how to fix
    })
    

    
    

    return (
        <ToolsSubMenuContainer>
        <div className="ToolsSubMenu">
            <div  className="Tools">
                <div  className="Tools_Text">
                    <h6 className='TourismA'>{text["Tourism in"]}</h6>
                    <h1 className='Arles'>Arles</h1>
                    
                </div>
                <div className="Tools_Buttons">

                    <h2>Tools</h2>
                    <form>
                        <label htmlFor="search">{text["Search"]}</label>
                        <input
                        autoComplete="off"
                        onChange={(e)=>{
                            setSearchValue(e.target.value);
                            props.setLocationSelected(e.target.value);
                            if(e.target.value === ''){
                                setShowPropose('none');
                            }else{
                                setShowPropose('flex');
                            }
                        }

                        }
                        value={searchValue}
                         onClick={()=>{
                            setShowPropose('flex');
                        }} type="text" placeholder='Search...' id="search" name="search" />

                    </form>
                    <SearchProposed showMode={showPropose}>
                        <button onClick={()=>{
                            setShowPropose('none');
                        }} className="CloseButton">X</button>

                        <ul>
                            {
                                locations.map((location)=>{
                                    if(location.toLowerCase().includes(searchValue.toLowerCase())){
                                        return <li key={location}
                                         onClick={()=>{
                                            setShowPropose('none');
                                            setSearchValue(location);
                                            props.setLocationSelected(location);
                                            
                                        }}>{location}</li>
                                    }
                                    return null;

                                   
                                })
                            }
                        </ul>

                    </SearchProposed>

                    {text["Search"]}
                  

                    <ComboBoxView Text={text["When?"]} id="WhenCombo">
                        <CalenderObject setDate={props.setDate} getDate={props.getDate} >

                        </CalenderObject>
                       {/* <Calender setIsDateSelected = {props.setIsDateSelected} isDateSelected={props.isDateSelected} setDate={props.setDate} getDate={props.getDate} />*/}
                    </ComboBoxView>
                    <ComboBoxView Text={text["What?"]} id="WhatCombo">
                        {
                            text["Search for a keyword"]
                        }
                        <KeywordSearch getKeywords={props.getKeywords} setKeywords={props.setKeywords} ></KeywordSearch>
                    </ComboBoxView>
                    {props.children}
                </div>

                
                

            </div>
            <div className="BackgroundImage">
                
            </div>

            </div>
        </ToolsSubMenuContainer>
           
    )
}