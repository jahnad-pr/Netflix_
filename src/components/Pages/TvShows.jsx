import React, { useEffect } from 'react'
import Category from '../Lists/Category'

// Tv show Pgae
export default function TvShows() {

  return (
    <div className='blank'>
        <Category spec='Trending Now' cat={`${window.location.pathname}Trending Now`} path='/trending/tv/day?language=en-US' />
        <Category spec='Top Rated' cat={`${window.location.pathname}Top Rated`} path='/tv/top_rated?language=en-US&page=1' />
        <Category spec='Comedies' cat={`${window.location.pathname}Comedies`} path='/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc' genre={[35,'']}/>
        <Category spec='Documentaries' cat={`${window.location.pathname}Documentaries`} path='/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'  genre={[99,'']}/>
        <Category spec='History' cat={`${window.location.pathname}History`} path='/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc' genre={[36,'']}/>
    </div>
  )
}
10749