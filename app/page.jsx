'use client'
import { Topper } from '@/components/Topper'
import { Work } from '@/components/Work'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import '@/styles/main.scss'

const Spacer = ({ height }) => {
  return <div className="section" style={{ height: `${height}rem` }}>
  </div>
}

export default function Page() {
  return (
    <div className='wrapper'>
      <div className="section home">
        <Topper></Topper>
      </div>
      <Spacer height={10}></Spacer>
      <Work></Work>
      <Spacer height={10}></Spacer>
      <About></About>
      <Spacer height={10}></Spacer>
      <Footer></Footer>

    </div>
  )
}

