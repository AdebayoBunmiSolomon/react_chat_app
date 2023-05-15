import React, { useState } from 'react';
import './Search.scss';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Search() {
    const [userName, setUserName] = useState(null);
    const [actualUser, setActualUser] = useState(null);

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', userName)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setActualUser(doc.data())
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleKey = (event) => {
        if (event.code === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='search'>
            <div className='searchForm'>
                <input
                    type='text'
                    placeholder='Find a user'
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                    onKeyDown={handleKey}
                />
            </div>
            {actualUser && <div className='userChat'>
                <img src={actualUser.photoURL} alt='' />
                <div className='userChatInfo'>
                    <span>{actualUser.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search
