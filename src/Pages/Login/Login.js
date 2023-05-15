import React, { useRef, useState } from 'react';
import './Login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn, faMessage, faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import DisplayMessage from '../../Component/DisplayMessage/DisplayMessage';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';

function Login() {
    //Form fields
    const txtEmail = useRef(null);
    const txtPassword = useRef(null);
    const navigate = useNavigate();
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

    const btnSignIn = async (event) => {
        event.preventDefault();
        try {
            if (txtEmail.current.value === '') {
                setErrorComp(true);
                setCompClass('error');
                setErrorText('Email is empty. Please provide a valid email address');
                setMsgIcon(faCircleXmark);
                setMsgHeader('Error');
                animateDisplayMsg();
                txtEmail.current.focus();
                return;
            }
            if (txtPassword.current.value === '') {
                setErrorComp(true);
                setCompClass('error');
                setErrorText('Password is empty. Please provide a valid password');
                setMsgIcon(faCircleXmark);
                setMsgHeader('Error');
                animateDisplayMsg();
                txtPassword.current.focus();
                return;
            } else {
                //Authenticate firebase
                try {
                    await signInWithEmailAndPassword(auth, txtEmail.current.value, txtPassword.current.value)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            console.log(user);
                            //Set display success message
                            setErrorComp(true);
                            setCompClass('success');
                            setErrorText('Login successful.');
                            setMsgIcon(faCheckCircle);
                            setMsgHeader('Success');
                            animateDisplayMsg();
                            navigate('/Home');
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode + '::' + errorMessage);
                            //Set display error message
                            setErrorComp(true);
                            setCompClass('error');
                            setErrorText(errorMessage);
                            setMsgIcon(faCircleXmark);
                            setMsgHeader('Error');
                            animateDisplayMsg();
                        })
                } catch (err) {
                    // setErr(true)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const btnClose = async (event) => {
        event.preventDefault();
        setErrorComp(false);
        setCompClass('error');
    }

    return (
        <div className='formContainer'>
            {showErrorComp === false ? '' :
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
                    Login
                </span>
                <form>
                    <input type='email' ref={txtEmail} placeholder='email'></input>
                    <input type='password' ref={txtPassword} placeholder='password'></input>
                    <button onClick={btnSignIn}>Sign In <FontAwesomeIcon icon={faSignIn} /></button>
                </form>
                <p>You do not have an account? <Link to='/Register'>Register</Link></p>
            </div>
        </div>
    )
}

export default Login
