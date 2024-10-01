import React, { useContext, useEffect, useRef } from 'react'
import Video from '../../assets/videos/Netflix New Logo Animation 2019.mp4'
import { mainData } from '../context/MainContext'

function Loading({setLoadSuccess}) {

  const player = useRef(null)
  const intro = useRef(null)
  const { isSign} = useContext(mainData)

  useEffect(() => {
    if(isSign){
      isSign?setLoadSuccess(true):null
      // Fade animation
     setTimeout(() => {
       player.current.style.display = 'none'
       intro.current.style.opacity = '0'
       player.current.muted = true 
     },4400)
  
     // INTRO 1.Close 2.play Sound
     setTimeout(()=> (intro.current.style.display = 'none'),4800)
     }
    }, [isSign])
    

      
  return (
    <>
    { isSign&&  window.location.pathname === '/'&&
      <div ref={intro} className='loadingMain'>
        <video ref={player} autoPlay muted loop>
          <source src={Video} type="video/mp4" />
        </video>
      </div>}
    </>

  )
}

export default React.memo(Loading)