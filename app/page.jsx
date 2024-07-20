'use client'
import { Topper } from '@/components/Topper'
import { Work } from '@/components/Work'
import '@/styles/main.scss'

export default function Page() {
  return (
    <div className='wrapper'>
      <div className="section home">
        <Topper></Topper>
      </div>
      <Work></Work>

    </div>
  )
}
