import React from 'react';
import './Chat.scss';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoCamera, faUserPlus, faInfo } from '@fortawesome/free-solid-svg-icons';

function Chat() {
    return (
        <div className='chat'>
            <div className='chatInfo'>
                <span>Jane</span>
                <div className='chatIcons'>
                    <FontAwesomeIcon icon={faVideoCamera} className='icons' />
                    <FontAwesomeIcon icon={faUserPlus} className='icons' />
                    <FontAwesomeIcon icon={faInfo} className='icons' />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat
