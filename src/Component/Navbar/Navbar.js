import React, { useContext } from 'react';
import './Navbar.scss';
import navbarLogo from '../../Images/dev_bunmi.jpg'
import { auth } from '../../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../../Context/AuthContext';

function Navbar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <span className='logo'>Lema Chat</span>
            <div className='user'>
                <img src={currentUser.photoURL} alt='' />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
