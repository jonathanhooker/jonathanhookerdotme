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

const Footer = ({ }) => {
  return (
    <div className="footer full-row">
      <div className='link'>EMAIL: <a href="mailto:hello@jonathanhooker.me">hello@jonathanhooker.me</a></div>
      <div className='link'>linkedin: <a target="_blank" href="https://www.linkedin.com/in/jchooker/">JCHOOKER</a></div>
      <div className='link'>github: <a target="_blank" href="https://github.com/jonathanhooker">JONATHANHOOKER</a></div>
      <Dashes></Dashes>
    </div>
  )
}

export { Footer }
