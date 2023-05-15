import React, { useState, useRef } from 'react';
import './Register.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
    faCircleXmark,
    faFileCirclePlus,
    faUserPlus,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import DisplayMessage from '../../Component/DisplayMessage/DisplayMessage';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { storage, auth, db } from '../../firebase';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';

function Register() {
    // const navigate = useNavigate();

    const txtDispName = useRef(null);
    const txtEmail = useRef(null);
    const txtPassword = useRef(null);
    const txtFile = useRef(null);

    //Error component
    const [showErrorComp, setErrorComp] = useState(false);
    const [compClass, setCompClass] = useState('error');
    //Error message
    const [errorText, setErrorText] = useState('');
    const [msgIcon, setMsgIcon] = useState();
    const [msgHeader, setMsgHeader] = useState('');
    const [errCompStyle, setErrCompStyle] = useState('');

    //Slide toast message
    let x;
    const animateDisplayMsg = () => {
        clearTimeout(x);
        setErrCompStyle('translateX(0)');
        x = setTimeout(() => {
            setErrCompStyle('translateX(430px)');
        }, 4000);
    }

    const btnClose = async (event) => {
        await event.preventDefault();
        setErrorComp(false);
        setCompClass('error');
    }

    //Validate form
    const btnSignUp = async (event) => {
        event.preventDefault();
        try {
            if (txtDispName.current.value === '') {
                setErrorComp(true);
                setCompClass('error');
                setErrorText('Display name is empty. Please enter a display name');
                setMsgIcon(faCircleXmark);
                setMsgHeader('Error');
                animateDisplayMsg();
                txtDispName.current.focus();
                return;
            }
            if (txtEmail.current.value === '') {
                setErrorComp(true);
                setCompClass('error');
                setErrorText('Email is empty. Please enter a valid Email address');
                setMsgIcon(faCircleXmark);
                setMsgHeader('Error');
                animateDisplayMsg();
                txtEmail.current.focus();
                return;
            }
            if (txtPassword.current.value === '') {
                setErrorComp(true);
                setCompClass('error');
                setErrorText('Password is empty. Please enter a Password');
                setMsgIcon(faCircleXmark);
                setMsgHeader('Error');
                animateDisplayMsg();
                txtPassword.current.focus();
                return;
            } else {

                const displayName = txtDispName.current.value;
                const email = txtEmail.current.value;
                const password = txtPassword.current.value;
                const file = txtFile.current.files[0];
                try {
                    const storageRef = ref(storage, displayName);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    await createUserWithEmailAndPassword(auth, email, password)
                        .then((createUser) => {
                            const userData = createUser.user
                            console.log(userData.user);
                            uploadTask.on(
                                (error) => {

                                },
                                () => {
                                    //Get download url of photo uploaded
                                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                                        console.log('file available at', downloadURL);
                                        //Update user profile with photo image selected
                                        await updateProfile(userData, {
                                            displayName,
                                            photoURL: downloadURL
                                        }).catch((error) => {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            console.log(errorCode + '::' + errorMessage);
                                            setErrorComp(true);
                                            setCompClass('error');
                                            setErrorText(errorMessage);
                                            setMsgIcon(faCircleXmark);
                                            setMsgHeader('Error');
                                            animateDisplayMsg();
                                        })
                                        //Save user data in users collection in firebase
                                        await setDoc(doc(db, 'users', userData.uid), {
                                            uid: userData.uid,
                                            displayName,
                                            email,
                                            photoURL: downloadURL,
                                        }).catch((error) => {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            console.log(errorCode + '::' + errorMessage);
                                            setErrorComp(true);
                                            setCompClass('error');
                                            setErrorText(errorMessage);
                                            setMsgIcon(faCircleXmark);
                                            setMsgHeader('Error');
                                            animateDisplayMsg();
                                        })
                                        await setDoc(doc(db, 'userChats', userData.uid), {

                                        }).catch((error) => {
                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            console.log(errorCode + '::' + errorMessage);
                                            setErrorComp(true);
                                            setCompClass('error');
                                            setErrorText(errorMessage);
                                            setMsgIcon(faCircleXmark);
                                            setMsgHeader('Error');
                                            animateDisplayMsg();
                                        })
                                        // Display success message for registering user successfully
                                        setErrorComp(true);
                                        setCompClass('success');
                                        setErrorText('User registered successfully.');
                                        setMsgIcon(faCheckCircle);
                                        setMsgHeader('Success');
                                        animateDisplayMsg();
                                    })
                                }
                            );
                        }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode + '::' + errorMessage);
                            setErrorComp(true);
                            setCompClass('error');
                            setErrorText(errorMessage);
                            setMsgIcon(faCircleXmark);
                            setMsgHeader('Error');
                            animateDisplayMsg();
                        })
                } catch (err) {
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='formContainer'>
            {showErrorComp === false ? "" :
                <DisplayMessage
                    ErrorText={errorText}
                    ErrorHeader={msgHeader}
                    btnClose={btnClose}
                    className={compClass}
                    msgIcon={msgIcon}
                    style={errCompStyle}
                />}
            <div className='formWrapper'>
                <span className='logo'>
                    Lema Chat <FontAwesomeIcon icon={faMessage} />
                </span>
                <span className='title'>
                    Register
                </span>
                <form>
                    <input type='text' placeholder='display name' ref={txtDispName}></input>
                    <input type='email' placeholder='email' ref={txtEmail}></input>
                    <input type='password' placeholder='password' ref={txtPassword}></input>
                    <input type='file' id='file' style={{ display: 'none' }} ref={txtFile} />
                    <label htmlFor='file'>
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                        <span> Add an avatar</span>
                    </label>
                    <button onClick={btnSignUp} type='submit'>Sign up <FontAwesomeIcon icon={faUserPlus} /></button>
                </form>
                <p>You do not have an account? <Link to='/'>Login</Link></p>
            </div>
        </div>
    )
}

export default Register
