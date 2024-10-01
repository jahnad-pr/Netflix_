import React, { useRef, useEffect, useState, useContext } from 'react';
import nfLogo from '../../assets/images/netflix-logo.svg';
import searchIcon from '../../assets/images/search.svg';
import notIcon from '../../assets/images/notfi.svg';
import { mainData } from '../context/MainContext';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutPopu from './LogoutPopu';
import { auth, onAuthStateChanged } from '../../Auth/Firebase';


export default function Header({ setInputValue, inputValue }) {
  // Hooks
  const Home = useRef(null);
  const Tv = useRef(null);
  const Movies = useRef(null);
  const New = useRef(null);
  const head = useRef(null);
  const prof = useRef(null);
  const sec = useRef(null);
  const [resM, setResM] = useState(false);
  const [sToggle, setToggle] = useState(false);
  const [logOut, setLlogOut] = useState(false);
  const { isSign, setSign } = useContext(mainData)
  const nav = useNavigate()
  const location = useLocation()


  // search detected
  useEffect(() => {
    inputValue !== '' ? (head.current.style.background = '#ffffff05',
      head.current.style.backdropFilter = 'blur(100px)') :
      (head.current.style.background = '#00000000',
        head.current.style.backdropFilter = '')
  }, [inputValue])


  // is user detected
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        console.log('hi');
        setSign(user);
      }
    })

  }, []);


  // Handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value); // Update the input value state correctly
  };

  // Search btn toggle
  const searchBtn = () => {
    !sToggle ? sec.current.focus() : null
    setToggle(!sToggle)
  }


  useEffect(() => {
    // Route navigation current router highlight
    if (location.pathname === '/home' || location.pathname === '/') {
      Home.current.style.opacity = '.5'
      Tv.current.style.opacity = '1'
      Movies.current.style.opacity = '1'
      New.current.style.opacity = '1'
    } else if (location.pathname === '/tvShows') {
      Home.current.style.opacity = '1'
      Tv.current.style.opacity = '.5'
      Movies.current.style.opacity = '1'
      New.current.style.opacity = '1'
    } else if (location.pathname === '/movies') {
      Home.current.style.opacity = '1'
      Tv.current.style.opacity = '1'
      Movies.current.style.opacity = '.5'
      New.current.style.opacity = '1'
    } else if (location.pathname === '/new-popular') {
      Home.current.style.opacity = '1'
      Tv.current.style.opacity = '1'
      Movies.current.style.opacity = '1'
      New.current.style.opacity = '.5'
    }

  }, [location.pathname])


  useEffect(() => {

    // Add background to header on scroll
    const scrollEff = () => {
      if (window.scrollY > 36) {
        head.current.style.background = '#171717';
      } else {
        head.current.style.background = 'transparent';
      }
    };

    window.addEventListener('scroll', scrollEff);

    // Remove scroll listener on component unmount
    return () => window.removeEventListener('scroll', scrollEff);
  }, []);

  return (
    <>
      <div ref={head} className="Header">
        <img className="netLogo" src={nfLogo} alt="Netflix Logo" />

        <div className="resB">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-red-600">
            <path fill="currentColor" d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"></path>
          </svg>
          <p onClick={() => setResM(!resM)}>Menu</p>
        </div>

        <ul>
          <a onClick={() => { nav('/home') }} className="no-decoration">
            <li ref={Home}>Home</li>
          </a>
          <a onClick={() => { nav('/tvShows') }} className="no-decoration">
            <li ref={Tv}>TV Shows</li>
          </a>
          <a onClick={() => { nav('/movies') }} className="no-decoration">
            <li ref={Movies}>Movies</li>
          </a>
          <a onClick={() => { nav('/new-popular') }} className="no-decoration">
            <li ref={New}>New & Popular</li>
          </a>
        </ul>
        <span style={{ flex: '1' }}></span>
        <div className="tool">
          <div className="searchTool">
            <img id="voido" onClick={searchBtn} src={searchIcon} alt="Search Icon" />
            <input style={{ width: sToggle ? '150px' : '0px', transition: 'all .5s' }} ref={sec}
              type="text"
              placeholder="Search for a movie"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <img id="void" src={notIcon} alt="Notification Icon" />
          {isSign?.photoURL ? (
            <img
              ref={prof}
              id="profile"
              src={isSign.photoURL}
              alt="Profile"
              onClick={() => { setLlogOut(!logOut) }}
            />
          ) : ''}
        </div>
      </div>

      <div
        style={{
          opacity: resM ? '1' : '0',
          top: resM ? '60px' : '0',
          zIndex: resM ? '11' : '0',
        }}
        className="resMenu">
        <ul>
          <li className='li'>
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4 text-red-600 svg"><path fill="currentColor" d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"></path></svg>
            <p>Netflix Web</p>
          </li>
          <a onClick={() => { nav('/home') }} className='no-decoration'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <p>Home</p>
          </li></a>
          <a onClick={() => { nav('/tvShows') }} className='no-decoration'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4" aria-hidden="true"><path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z"></path><path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11.01Z"></path><path d="m6.6 4.99 3.38 4.2"></path><path d="m11.86 3.38 3.38 4.2"></path></svg>
            <p>Tv Shows</p>
          </li></a>
          <a onClick={() => { nav('/movies') }} className='no-decoration'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18"></rect><line x1="7" x2="7" y1="2" y2="22"></line><line x1="17" x2="17" y1="2" y2="22"></line><line x1="2" x2="22" y1="12" y2="12"></line><line x1="2" x2="7" y1="7" y2="7"></line><line x1="2" x2="7" y1="17" y2="17"></line><line x1="17" x2="22" y1="17" y2="17"></line><line x1="17" x2="22" y1="7" y2="7"></line></svg>
            <p>Movies</p>
          </li></a>
          <a onClick={() => { nav('/new-popular') }} className='no-decoration'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            <p>New & Popular</p>
          </li></a>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
            <p>Notifications</p>
          </li>
        </ul>
      </div>
      {logOut && <LogoutPopu setLlogOut={setLlogOut} />}
    </>
  );
}
