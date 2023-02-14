import Background2 from '../Images/Background2.png';
import '../Styles/ToolsSubMenu.scss';
export function ToolsSubMenu(){
    return (
        <div className="ToolsSubMenu">

            <div className="Tools">
                <h6 className='TourismA'>Tourism a</h6>
                <h1 className='Arles'>Arles</h1>
                <h2>Tools</h2>
                <form>
                    <label htmlFor="search">Search</label>
                    <input type="text" placeholder='Search...' id="search" name="search" />
                </form>

                <select className="Tools_When">

                </select>
                <select className="Tools_Where">

                </select>
                <select className="Tools_What">

                </select>

            </div>
            <div className="BackgroundImage">
                
            </div>

            </div>
           
    )
}