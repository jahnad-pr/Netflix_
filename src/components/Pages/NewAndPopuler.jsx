import React from 'react'
import Category from '../Lists/Category'

// New Content Page
export default function NewAndPopuler() {
  return (
    <div className='blank'>
      <Category spec='New TV Shows' cat={`${window.location.pathname}New TV Shows`} path='/discover/tv?sort_by=first_air_date.desc' />
      <Category spec='Upcoming Movies' cat={`${window.location.pathname}New Movies`} path='/discover/movie?sort_by=release_date.desc' />
      <Category spec='Popular TV Shows' cat={`${window.location.pathname}Popular TV Shows`} path='/tv/popular?' />
      <Category spec='Popular Movies' cat={`${window.location.pathname}Popular Movies`} path='/movie/popular?' />
    </div>
  )
}
