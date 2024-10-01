import React, { useContext, useEffect,useRef,useState } from 'react'
import { mainData } from '../context/MainContext'

// Category (list of movies)
function Category({ path, cat, genre, spec,first }) {

  // Hooks for List
  const { movieData, FetchmovieDatas,setDetails,setPopup,setAplay } = useContext(mainData)
  const [scrolled,setScrolled] = useState(false)
  const [scred,setScred] = useState(false)
  const cato = useRef(null)
  const firsto = useRef(null)
  const lasto = useRef(null)
  const catos = useRef(null)
  const catox = useRef(null)

  // Function for event
  // to see the nav when mouse eneterd
  const showNav = ()=>{
    catos.current.style.opacity = '1',catox.current.style.opacity = '1'
  }
  // ^^to hide the Scroll Nave
  const hideNav = ()=>{
    catos.current.style.opacity = '0',catox.current.style.opacity = '0'
  }

  // 1.Fetch the releated movies 
  useEffect(() => { FetchmovieDatas(path, cat.trim(), genre) }, [path.cat, genre])
  // To manage the scroll Nav
  useEffect(()=>{
    setScred(true)
    cato.current.addEventListener('scroll',()=>{
      firsto.current.getBoundingClientRect().x-2===cato.current.getBoundingClientRect().x?setScrolled(false):setScrolled(true);
      (cato.current.getBoundingClientRect().x + cato.current.clientWidth - lasto.current.clientWidth -2).toFixed(0) ===
      lasto.current.getBoundingClientRect().x.toFixed(0)?setScred(false):setScred(true) }) },[])


  return (
    <>
      <div onMouseEnter={showNav} onMouseLeave={hideNav} style={{marginTop:first?'20rem':'6rem'}} className='category'>
        <h1>{spec ? spec : cat}</h1>
        <div ref={cato} className="img-container">
          { movieData[cat] ? movieData[cat].map((data,Index) => {
              return <div onClick={()=>{
                setPopup(true)
                setDetails(data)
                setAplay(false)
              }} ref={Index===0?firsto:Index===movieData[cat].length-1?lasto:null} key={data.id} className='img'><img src={`http://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" /></div>
            }):''}
        </div>

      {/* Scroll Navgator */}
      <div style={{display:scrolled?'flex':'none'}} onClick={()=>{  cato.current.scrollBy({left: -cato.current.clientWidth,behavior:'smooth'},)  }} ref={catos} className="scroll-IN">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
      <div style={{display:scred?'flex':'none'}} onClick={()=>{ cato.current.scrollBy({left: cato.current.clientWidth,behavior:'smooth'}) }} ref={catox} className="scroll-OUT">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>
      </div>
    </>
  )
}

export default React.memo(Category)