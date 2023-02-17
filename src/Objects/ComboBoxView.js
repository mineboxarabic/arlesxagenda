import React, { useState } from 'react';
import '../Styles/ComboBoxView.scss'
export function ComboBoxView(props){
    const [display, setDisplay] = useState('none');
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
        <button className="ComboBoxView" id={props.id} onFocusCapture={showPopUp} onBlur={hidePopUp}>
                <div className='nameOfType'>{props.Text}</div>
                <div className='downArraw'>︾</div>
                
            <div style={{'--display-PopUp': display }} className="ComboBoxViewPopUp" id={props.id + 'PopUp'}>
                {props.Children}
            </div>
        </button>
        </>
    )

}