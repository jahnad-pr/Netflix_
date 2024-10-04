import React, { useContext, useEffect } from 'react'
import Category from '../Lists/Category'
import { mainData } from '../context/MainContext'
import { useNavigate } from 'react-router-dom'

// New Content Page
export default function NewAndPopuler() {

  const { isSign } = useContext(mainData)
  const navigatt = useNavigate()
  useEffect(()=>{ !isSign?navigate('/sign'):null },[isSign])



  return (
    <div className='blank'>
      <Category spec='New TV Shows' cat={`${window.location.pathname}New TV Shows`} path='/discover/tv?sort_by=first_air_date.desc' />
      <Category spec='Upcoming Movies' cat={`${window.location.pathname}New Movies`} path='/discover/movie?sort_by=release_date.desc' />
      <Category spec='Popular TV Shows' cat={`${window.location.pathname}Popular TV Shows`} path='/tv/popular?' />
      <Category spec='Popular Movies' cat={`${window.location.pathname}Popular Movies`} path='/movie/popular?' />
    </div>
  )
}
