import React, { useContext, useEffect, useRef, useState } from 'react'
import { mainData } from '../context/MainContext'

export default function Search({ Search }) {


  const [searchData, setSearchData] = useState([])
  const { setDetails,setPopup,setAplay } = useContext(mainData)
  const [wSize, setWsize] = useState()
  const sm = useRef()

  const getWidth = () => {
    setWsize(sm.current.clientWidth / 226.3)
  }

  const dataClick = (data)=>{
    setPopup(true)
    setDetails(data)
    setAplay(false)
  }

  useEffect(() => {
    searchData.length %
      fetch(`https://api.themoviedb.org/3/search/multi?${'api_key=fd3ac1ee9573a823d516f233cfa108a4'}&query=${Search}`)
        .then(res => res.json())
        .then(data => setSearchData([...data.results.filter(dat => dat.poster_path)]))
    // %sm.current.clientWidth/226.3

  }, [Search])

  useEffect(() => {
    getWidth()
    window.addEventListener('resize', getWidth)
  }, [])

  return (
    <>{
      <div style={{ top: Search ? '0' : '-200vh', opacity: Search ? '1' : '0' }} className='Search'>
        {<div ref={sm} className='search-container'>


          {
            searchData.map((dat, index) => {
              let colCount = wSize
              let maxCount = Math.floor(colCount - (searchData.length % Math.floor(colCount)))
              let fq = Math.floor(searchData.length / Math.floor(colCount))
              sm.current.style.direction = searchData.length < Math.floor(sm.current.clientWidth / 226.3) ? 'ltr' : 'rtl'
              


              return <div onClick={()=>{dataClick(dat)}} key={index}><div className='movieCart'>
                <img src={`http://image.tmdb.org/t/p/w500${dat.poster_path}`} alt="" />
                <div className='div'>
                  <div>
                    <p className='name'>{dat.original_title || dat.name}</p>
                    <p className='date'>{dat.release_date || dat.first_air_date}</p>
                  </div>
                </div>
              </div>
                {(index + 1) % (Math.floor(Math.floor(searchData.length / Math.floor(colCount)))) === 0 && index + 1 !== searchData.length - 1
                  && index < maxCount * fq&&(searchData.length % Math.floor(colCount))!==0 ?
                  <div style={{ opacity: `${.60 / ((searchData.length - 0) - index)}` }} className='movieCartBlank' key={`blank-${index}`}></div> : null}</div>
            })
          }
        </div>
        }
       {
         searchData.length === 0 &&
         <div className='noContents'>No results</div>
       } 
      </div>
    }
    </>
  )
}
