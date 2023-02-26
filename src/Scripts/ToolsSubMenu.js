import Background2 from '../Images/Background2.png';
import { ComboBoxView } from '../Objects/ComboBoxView';
import '../Styles/ToolsSubMenu.scss';
import { Calender } from '../Objects/Calender';
import  KeywordSearch  from './KeywordSearch'
export function ToolsSubMenu(props){
    function showWhere(){
                        
    }
    console.log('The language in Tools is:' + props.language)
    return (
        <div className="ToolsSubMenu">

            <div className="Tools">
                <div className="Tools_Text">
                    <h6 className='TourismA'>Tourism a</h6>
                    <h1 className='Arles'>Arles</h1>
                    
                </div>
                <div className="Tools_Buttons">

                    <h2>Tools</h2>
                    <form>
                        <label htmlFor="search">Search</label>
                        <input type="text" placeholder='Search...' id="search" name="search" />
                    </form>

                    <ComboBoxView Text="Where ?" id="WhereCombo">
                        
                    </ComboBoxView>

                    <ComboBoxView Text="When ?" id="WhenCombo">
                        <Calender getDate={props.getDate} />
                    </ComboBoxView>
                    <ComboBoxView Text="What ?" id="WhatCombo">
                        {
                            props.language==="fr"?<h3>Checher Vos mots cle</h3>:<h3>What are you looking for ?</h3>
                        }
                        <KeywordSearch getKeywords={props.getKeywords}></KeywordSearch>
                    </ComboBoxView>
                    {props.children}
                </div>

                
                

            </div>
            <div className="BackgroundImage">
                
            </div>

            </div>
           
    )
}