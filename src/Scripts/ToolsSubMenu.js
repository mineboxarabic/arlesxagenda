import Background2 from '../Images/Background2.png';
import { ComboBoxView } from '../Objects/ComboBoxView';
import '../Styles/ToolsSubMenu.scss';
import { Calender } from '../Objects/Calender';
import  KeywordSearch  from './KeywordSearch'
import Data from '../Data/events-arles-small.json';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
export function ToolsSubMenu(props){
    const [showPropose, setShowPropose] = useState('none');

    const [searchValue, setSearchValue] = useState('');
    
    //console.log('The language in Tools is:' + props.language)
    return (
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
                        <Calender setIsDateSelected = {props.setIsDateSelected} isDateSelected={props.isDateSelected} setDate={props.setDate} getDate={props.getDate} />
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
           
    )
}