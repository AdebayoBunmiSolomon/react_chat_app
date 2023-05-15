import React from 'react';
import './Input.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Input() {
    return (
        <div className='input'>
            <input type='text' placeholder='Type something...' />
            <div className='send'>
                <FontAwesomeIcon icon={faPaperclip} className='icon' />
                <input type='file' style={{ display: 'none' }} id='file' />
                <label htmlFor='file'>
                    <FontAwesomeIcon icon={faImage} className='icon' />
                </label>
                <button><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    )
}

export default Input
