import React from 'react';
import './Chats.scss';
import navbarLogo from '../../Images/dev_bunmi.jpg'

function Chats() {
    return (
        <div className='chats'>
            <div className='userChat'>
                <img src={navbarLogo} alt='' />
                <div className='userChatInfo'>
                    <span>Bunmi</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className='userChat'>
                <img src={navbarLogo} alt='' />
                <div className='userChatInfo'>
                    <span>Bunmi</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className='userChat'>
                <img src={navbarLogo} alt='' />
                <div className='userChatInfo'>
                    <span>Bunmi</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats
