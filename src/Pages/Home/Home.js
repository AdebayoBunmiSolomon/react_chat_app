import React from 'react';
import Sidebar from '../../Component/Sidebar/Sidebar';
import Chat from '../../Component/Chat/Chat';
import './Home.scss';

function Home() {
    return (
        <div className='home'>
            <div className='container'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home
