import React from 'react'
import navbarLogo from '../../Images/dev_bunmi.jpg'
import './Message.scss';

function Message() {
    return (
        <div className='message owner'>
            <div className='messageInfo'>
                <img src={navbarLogo} alt='' />
                <span>just now</span>
            </div>
            <div className='messageContent'>
                <p>hello</p>
                <img src={navbarLogo} alt='' />
            </div>
        </div>
    )
}

export default Message
