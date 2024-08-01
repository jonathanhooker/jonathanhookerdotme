'use client'

import { useRef } from 'react'

const Dashes = () => {
  const arr = [0, 0, 0];
  return (
    <div className='dashes'>
      {arr.map((object, i) => <div key={i} className='dash' />)}
    </div>
  )
}

const Topper = ({ }) => {
  return <div className="topper full-row padded-sides">
    <Dashes></Dashes>
    <div className="topperCol1">
      <div className="name">Jonathan Hooker</div>
      <div>Portland, OR</div>
    </div>
    <div className="titles">
      <div>Creative Engineer</div>
      <div>Tech Director</div>
      <div>Maker</div>
    </div>

  </div>
}

export { Topper }
