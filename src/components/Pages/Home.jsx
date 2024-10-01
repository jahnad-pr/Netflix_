import play from '../../assets/images/play.svg'
import info from '../../assets/images/info.svg'
import Category from '../Lists/Category'
import React, { useContext, useEffect } from 'react'
import { mainData } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

// Home Page
export default function Home({ data,lodSuccess }) {

  const { setPopup, setDetails, setAplay,isSign } = useContext(mainData)
  const navigate = useNavigate()

  useEffect(()=>{ !isSign&&window.location.pathname==='/'?navigate('/sign'):null },[isSign])

  return ( isSign&&lodSuccess||
    window.location.pathname!=='/'&&
    window.location.pathname!=='/sign' ?
    
    <div className='Home'>
      <div className='hiHead'>
        <div className="hiContents">
          <h1>{data ? data.title : ''}</h1>
          <p style={{ color: data && data.pop < 5 ? 'red' : data && data.pop < 8 ? 'yellow' : 'green' }}>{data ? Math.floor(data.pop*10) : ''}% Match<span>{data ? data.rd : ''}</span></p>
          <p>{data ? data.ov : ''}</p>
          <span className='span'>
            <button onClick={() => {
              setPopup(true)
              setDetails(data.all)
              setAplay(true)
            }} className='play own'><img src={play} alt="" />Play</button>
            <button onClick={() => {
              setPopup(true)
              setDetails(data.all)
              setAplay(false)
            }} className='own info'><img src={info} alt="" />More Info</button>
          </span>
        </div>
      </div>

      <Category cat='Trending Now' path='/trending/movie/day?language=en-US' first={true} />
      <Category cat='Top Rated' path='/movie/top_rated?language=en-US&page=1' not={'not'} />
      <Category cat='Action Thrillers' path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' not={'not'} genre={[28, 53]} />
      <Category cat='Comedies' path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' not={'not'} genre={[35, '']} />
      <Category cat='Scary Movies' path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[27, '']} />
      <Category cat='History' path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[36, '']} />
      <Category cat='Documentaries' path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[99, '']} />

    </div>:<div className='blankk'></div>
    
  )
}
