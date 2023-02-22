import React, { useState } from 'react';
import '../Styles/ComboBoxView.scss'
import '../Styles/PopUpsStyles.scss'

function PopUp(props){
    return (props.trigger) ? (
        <div className="PopUp" id={props.id + 'PopUp'}>
            <button className="PopUp_CloseButton" onClick={() =>{props.setTriggered(false);}}>X</button>
            {props.children}
        </div>
    ) : "";
}
export function ComboBoxView(props){
    const [display, setDisplay] = useState('none');
    const [isTriggered, setIsTriggered] = useState(false);

    function showPopUp(){
        if(display === 'none'){
            setDisplay('block');
        }
        else{
            setDisplay('none');
        }
    }
    function hidePopUp(){
        setDisplay('none');
    }

    return (
        <>
        <button className="ComboBoxView" id={props.id} onFocusCapture={()=> setIsTriggered(true)}>
                <div className='nameOfType'>{props.Text}</div>
                <div className='downArraw'>︾</div>
            <PopUp trigger={isTriggered} setTriggered={setIsTriggered} id={props.id}>
                {props.children}
            </PopUp>
        </button>
        </>
    )

}