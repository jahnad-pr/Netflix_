import React, { createContext, useEffect, useState } from 'react'

export const mainData = createContext()
export function MainContext({ children }) {

  // Hooks to use whole app
  const [movieData, setMD] = useState({})
  const [getDetails, setDetails] = useState()
  const [popup, setPopup] = useState(false)
  const [genreso, setGenreso] = useState([])
  const [ytKey, setYtKey] = useState('')
  const [casts, setCasts] = useState('')
  const [aPlay, setAplay] = useState(false)
  const [isSign, setSign] = useState(false);
  

  // To get the Genre of movie
  const genress = async (id,di='') => {
    await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=fd3ac1ee9573a823d516f233cfa108a4&&language=en-US')
      .then(res => res.json())
      .then(data =>{ setGenreso([data.genres.find( gens => gens.id === id )?.name,data.genres.find( gens => gens.id === di )?.name]) }) }


  // fetch movie data
  const FetchmovieDatas = async (path, cat, genre = ['', '']) => {
    try {
       await fetch(`https://api.themoviedb.org/3${path}&api_key=fd3ac1ee9573a823d516f233cfa108a4&with_genres=${genre[0]},${genre[1]}`)
        .then((res) => res.json())
        .then((data) => { setMD(prevMD => ({ ...prevMD, [cat]: data.results })) })}
       catch (error) { console.log(error) } }

  // to Fetch Trailer
  const fetchTrailer = async(id,cat)=>{
  
    try {
      await fetch(`https://api.themoviedb.org/3/${cat}/${id}?api_key=fd3ac1ee9573a823d516f233cfa108a4&append_to_response=credits,videos`)
      .then( res => (res.json()) )
      .then( data => {
        let hi = data.videos.results.find( dato => dato.type==='Trailer' )
        setYtKey(hi.key)
        setCasts(data.credits.cast.filter( dato => dato.known_for_department === 'Acting'&&dato.profile_path ).slice(0,6))
        
        
   } ) } 
    catch (error) { (setYtKey('')) } }


  // Value Provider
  return (
    <div>
      <mainData.Provider
      value={{ movieData, setMD, FetchmovieDatas, getDetails, setDetails, popup, 
      setPopup, genress,genreso,fetchTrailer,ytKey ,aPlay,setAplay,casts,isSign,setSign}}>
        {children}
      </mainData.Provider>
    </div>
  )
}
