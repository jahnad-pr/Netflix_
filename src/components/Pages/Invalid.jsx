import React, { useEffect } from 'react'

// To show inValid Route
export default function Invalid() {

  return (
    <>
    <h1>gi</h1>
    <div className='invalid'>
      <h1>Lost your way ?</h1>
      <p>Sorry, we can't find that page.You'll find lost to <br />explore on the homepage.</p>
      <a href="/"><button className='play'><strong>Netlix Home</strong></button></a>
      <p><span className='spanu'>|</span>Error Code <span>NSES 404</span></p>
    </div>
    </>
  )
}
