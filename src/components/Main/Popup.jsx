import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import playy from '../../assets/images/play.svg'
import { mainData } from '../context/MainContext'

export default function Popup() {

  const { popup, getDetails, genress, genreso, fetchTrailer, ytKey, setPopup, aPlay, setAplay,casts } = useContext(mainData)
  const [youKey, setYouKey] = useState('')
  const [isPay, setPlay] = useState(false)
  const playPouse = useRef(null)
  const playBTn = useRef(null)
  const jo = useRef(null)
  const [load, setLoad] = useState(false)
  const [auto, setAuto] = useState('')
  const [showCar, setShowCar] = useState(false)

  

  // To play and pause the video
  const playPouseVideo = () => {
    !isPay ? (playPouse.current.contentWindow.postMessage( '{"event":"command","func":"playVideo","args":""}', '*' ), setPlay(true)) :
      (playPouse.current.contentWindow.postMessage( '{"event":"command","func":"pauseVideo","args":""}', '*' ), setPlay(false))
  }
  // Transition for Popup
  const fadeAnim = ()=> {
    jo.current.style.opacity = '1'
  }
  // Close popup
  const closePopup = ()=>{
    setPopup(false)
  }
  // Store Propegation
  const stopPrpegation = event =>{
    event.stopPropagation()
  }
  // playButton
  const play = ()=>{
    !load ? playPouseVideo() : null
  }
  // Close Button
  const close  = ()=>{
    setPopup(false), setLoad(true)
  }

  // AutoPlay or not
  useEffect(() => { !popup ? setPlay(false) : null; 
                     aPlay ? setAuto('&autoplay=1') : setAuto('') }, [popup])

  // To set The Trailer or Poster
  useEffect(() => {
    setShowCar(false)
    getDetails ? (fetchTrailer(getDetails.id,getDetails.media_type?getDetails.media_type:'movie')
    ) : null;
    getDetails ? genress(getDetails.genre_ids[0], getDetails.genre_ids[1]) : null
    ytKey ? (setYouKey(`https://www.youtube.com/embed/${ytKey}?enablejsapi=1${auto}`)) : null;
    auto ? setPlay(true) : setPlay(false) },[getDetails, ytKey, auto, popup])



  return (
    <>
      {popup &&
        <div onLoad={fadeAnim} ref={jo} onClick={closePopup} className='Popup'>
          <div onClick={stopPrpegation} className="contents">

            {/* Video?poster section */}
            <div style={{opacity:load?'.3':'1'}} className="yt">
              {ytKey &&
                <button onClick={play} ref={playBTn} className='play own'>
                  {isPay ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 h-6 w-6 fill-current" aria-hidden="true"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>
                    :<img src={playy} alt="" />
                  }{!isPay ? <p>&nbsp;Play</p> : <p>&nbsp;Pause</p>}
                  </button>}
                  <button onClick={close} className='closer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
                  </button>
                  {/* if the key exits */}
                  {ytKey ? <iframe
                    onLoad={()=> setLoad()}
                    ref={playPouse}
                    width="100%"
                    src={youKey}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                  </iframe>:
                  getDetails.backdrop_path ? <img onLoad={()=>setLoad('auto')} id='popupImg' src={`http://image.tmdb.org/t/p/original${getDetails.backdrop_path}`} alt="" />:null

                  }
            </div>

            {/* Info section */}
            <div className="det">
              <h4>{getDetails.original_title||getDetails.name}</h4>
              <h4><span style={{ color: getDetails && getDetails.vote_average < 5 ? 'red' : getDetails && getDetails.vote_average < 8 ? 'yellow' : 'green' }}>
                {Math.floor(getDetails.vote_average*10)}% Match</span> {getDetails.release_date?.split("-")[0] ? '' : console.log()
                }<span className='enf'>EN</span></h4>
              <p>{getDetails.overview}</p>
            <p style={{opacity:'.5'}}><span style={{opacity:'1'}}>Genres: </span>{`${genreso[0]}, ${genreso[1] ? genreso[1] : ''}`}</p>
            </div>
            <div style={{bottom:showCar?'50px':'-500px'}} className='Cart-container'>
              {casts?casts.map((data)=>{ 
                return data.profile_path?   <div className='Cart'>
                  <img src={`http://image.tmdb.org/t/p/original${data.profile_path}`} alt="" />
                  <div className='name-container'>
                  <p>{data.character.split('/')[0]}</p>
                  <p>{data.original_name}</p>

                  </div>
                </div>:''
                }):null}
                
                </div>
            <p onClick={()=>{setShowCar(!showCar)}} className='Opener'>
              Charecters {
                showCar&&
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>
              } 
            </p>
            

          </div>
        </div>
      }
    </>
  )
}
