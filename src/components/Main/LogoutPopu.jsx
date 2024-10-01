import React, { useContext, useEffect, useRef } from 'react'
import { signOut, auth } from '../../Auth/Firebase';
import { mainData } from '../context/MainContext';
import { useNavigate } from 'react-router-dom';


export default function LogoutPopu({setLlogOut}) {

    const an = useRef()
    const { setSign } = useContext(mainData)
    const nav = useNavigate()

    // to see the animtaion
    useEffect(() => { setTimeout(_ => (an.current.style.top = '80px', an.current.style.opacity = '1'), 0) }, [])

    // Sign out function
    const signOutUser = () => {
            signOut(auth)
                .then(() => (setSign(false),setLlogOut(false),nav('/')))
                .catch((error) => console.error('Error signing out: ', error));
    };

    return (
        <div ref={an} className='logout-popup'>
            <h1 className='athe'>Are you sure you want to log out?</h1>
            <div onClick={signOutUser} className='log-container'>
                <p id='cgl'>Logout Now</p>
                <img id='ggl' src="https://d3sxshmncs10te.cloudfront.net/icon/free/svg/3856460.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkM3N4c2htbmNzMTB0ZS5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcyNzk2Mjc5MCwicSI6bnVsbCwiaWF0IjoxNzI3NzAzNTkwfQ__.9e013497de6e470b81340da6f5119fe6dabd450d6492bf36b3b9aa2cd2a5e66b" alt="" />
            </div>
        </div>
    )
}
