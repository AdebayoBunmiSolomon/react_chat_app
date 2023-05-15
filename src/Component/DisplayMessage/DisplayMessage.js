import React from 'react'
import './DisplayMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Error(props) {
    return (
        <div className={props.className} style={{ transform: props.style }}>
            <div className='Message'>
                {/* <div className='errorButton'>
                    <button onClick={props.btnClose}><FontAwesomeIcon icon={faClose} /></button>
                </div> */}
                <div className='msgIcon'>
                    <p><FontAwesomeIcon icon={props.msgIcon} /></p>
                </div>
                <div className='msgInfo'>
                    <p>{props.ErrorHeader}</p>
                    <p>{props.ErrorText}</p>
                </div>
            </div>
        </div>
    )
}

export default Error
