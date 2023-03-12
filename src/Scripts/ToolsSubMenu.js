import Background2 from '../Images/Background2.png';
import { CalenderView } from './CalenderView';
import  KeywordSearch  from './KeywordSearch'
import { useState } from 'react';
import styled from 'styled-components';

import arenaImage from '../Images/Background2.png';
import BrownFont from '../Fonts/NexaText-Trial-Black.ttf';
import { ColorPalette } from '../Data/Context.js';
import { CalenderObject } from '../Objects/Calender.js';
const CalenderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
`;
const ToolsSubMenuContainer = styled.div`

@font-face {
    font-family: 'Milk';
    src: url(${BrownFont});
}
@font-face {
    font-family: 'OldFont';
    src: url(${BrownFont});
}

@font-face {
    font-family: 'MainFont';
    src: url(${BrownFont});
}
*{
    font-family: 'MainFont' ;
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
function ComboBoxView(props){
    const [display, setDisplay] = useState('none');
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
export function ToolsSubMenu(props){
    const Data = props.Data;
    const [showPropose, setShowPropose] = useState('none');

    const [searchValue, setSearchValue] = useState('');
    
    //console.log('The language in Tools is:' + props.language)
    return (
        <ToolsSubMenuContainer>
        <div className="ToolsSubMenu">

            <div  className="Tools">
                <div  className="Tools_Text">
                    <h6 className='TourismA'>Tourism a</h6>
                    <h1 className='Arles'>Arles</h1>
                    
                </div>
                <div className="Tools_Buttons">

                    <h2>Tools</h2>
                    <form>
                        <label htmlFor="search">Search</label>
                        <input
                        autoComplete="off"
                        onChange={(e)=>{setSearchValue(e.target.value)}}
                        value={searchValue}
                         onClick={()=>{
                            setShowPropose('block');
                        }} type="text" placeholder='Search...' id="search" name="search" />
                        <div style={{
                            padding: '10px',
                            zIndex: '1000',
                            display: showPropose,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            scrollBehavior: 'smooth',
                            position: 'absolute',
                            width: '100%',
                            height: '250px',
                            overflow: 'scroll',
                        }}   className="propose">

                            {
                                Data.events.map((item,i)=>{
                                    return(
                                        item.address.includes(searchValue) &&
                                        <div key={i}  onClick={()=>{
                                            props.setLocationSelected(item.address);
                                            setSearchValue(item.address);
                                            setShowPropose('none');
                                            }}
                                            onBlur={()=>{setShowPropose('none')}} className="propose_item">
                                            <h5>{item.address}</h5> 
                                        </div>
                                    )
                                }
                                )
                            }

                            
                        </div>
                    </form>

                  

                    <ComboBoxView Text="When ?" id="WhenCombo">
                        <CalenderObject setDate={props.setDate} getDate={props.getDate} setIsDateSelected = {props.setIsDateSelected} isDateSelected={props.isDateSelected} >

                        </CalenderObject>
                       {/* <Calender setIsDateSelected = {props.setIsDateSelected} isDateSelected={props.isDateSelected} setDate={props.setDate} getDate={props.getDate} />*/}
                    </ComboBoxView>
                    <ComboBoxView Text="What ?" id="WhatCombo">
                        {
                            props.language==="fr"?<h3>Checher Vos mots cle</h3>:<h3>What are you looking for ?</h3>
                        }
                        <KeywordSearch setIsKeywordSelected = {props.setIsKeywordSelected} isKeywordSelected={props.isKeywordSelected } getKeywords={props.getKeywords} setKeywords={props.setKeywords} ></KeywordSearch>
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