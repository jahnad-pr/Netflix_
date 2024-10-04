import React, { useContext, useEffect } from 'react'
import Category from '../Lists/Category'
import { mainData } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

// Movies Page
export default function Movies() {

  const { isSign } = useContext(mainData)
  const navigate = useNavigate()
  useEffect(()=>{ !isSign?navigate('/sign'):null },[isSign])


  return (
    <div className='blank'>
      <Category spec='Trending Now' cat={`${window.location.pathname}Trending Now`} path='/trending/movie/day?language=en-US' />
      <Category spec='Top Rated' cat={`${window.location.pathname}Top Rated`} path='/movie/top_rated?language=en-US&page=1' />
      <Category spec='Action Thrillers' cat={`${window.location.pathname}Action Thrillers`} path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[28,53]} />
      <Category spec='Comedies' cat={`${window.location.pathname}Comedies`} path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[35,'']} />
      <Category spec='Scary Movies' cat={`${window.location.pathname}Scary Movies`} path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[27,'']} />
      <Category spec='Documentaries' cat={`${window.location.pathname}Documentaries`} path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[99,'']} />
      <Category spec='History' cat={`${window.location.pathname}History`} path='/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' genre={[36,'']} />
    </div>
  )
}
