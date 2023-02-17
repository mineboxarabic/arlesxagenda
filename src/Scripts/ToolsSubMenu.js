import Background2 from '../Images/Background2.png';
import { ComboBoxView } from '../Objects/ComboBoxView';
import '../Styles/ToolsSubMenu.scss';
export function ToolsSubMenu(){
    function showWhere(){
                        
    }
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

                    <ComboBoxView Text="Where ?">
                        
                    </ComboBoxView>

                    <ComboBoxView Text="When ?">
                    </ComboBoxView>
                    <ComboBoxView Text="What ?">
                    </ComboBoxView>
                </div>
                

            </div>
            <div className="BackgroundImage">
                
            </div>

            </div>
           
    )
}