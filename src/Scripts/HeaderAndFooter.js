import '../Styles/HeaderFooter.scss'
import Banner1 from '../Images/Banner1.png'
import Logo from '../Images/Logo.png'
function Banner({leftPosition,sizeX,sizeY}){
    let sizeXString = sizeX + "px";
    let sizeYString = sizeY + "px";
    let sizeXShadow = sizeX - 20 + "px";
    let sizeYShadow = sizeY - 20 + "px";
    let leftPositionString = leftPosition + "%";
    let leftPositionShadow = leftPosition - 80 + "%";


    return (
        <div style={{
            position: "absolute",
            top: 40,
            left: leftPositionString
        }} className="Banner">
            
            <div style={{
                position: "absolute",
                top: 10,
                left: leftPositionShadow,
                width: sizeXShadow,
                height: sizeYShadow,
                boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.5)"
                ,zIndex: -1
            }} className="ShadowForBanner">

            </div>
            <img width={sizeXString} height={sizeYString} src={Banner1} alt="Banner1" className="App-banner" />
            
        </div>
    )}

export function Header(){
    return (
        <header className="App-header">
            <nav className="App-nav">
                <ul className="App-nav-list">
                    <li><a href="index.html">Dayly</a></li>
                    <li><a href="events.html">Weekly</a></li>
                    <li><a href="about.html">Monthly</a></li>
                </ul>
                <Banner leftPosition={90} sizeX={80} sizeY={100} />
                <Banner leftPosition={95} sizeX={70} sizeY={90} />
                <img width={"80px"} height={"80px"} src={Logo} alt="Logo" className="App-logo" />
            </nav>
        </header>
    )
}
export function Footer(){
    return (
        <footer className="App-footer">
            <p>Footer</p>
        </footer>
    )
}
