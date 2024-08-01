'use client'

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
// import { View, Preload } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { Topper } from '@/components/Topper'
import { Work } from '@/components/Work'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { Featured } from '@/components/Featured'
import '@/styles/main.scss'
import { useEffect, useRef } from 'react'
// import { Unicorn } from '@/components/Featured/Unicorn'
const Unicorn = dynamic(() => import('@/components/Featured/Unicorn').then((mod) => mod.Unicorn), { ssr: false })

const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})

const Spacer = ({ height }) => {
  return <div className="section" style={{ height: `${height}rem` }}>
  </div>
}

export default function Page() {
  const wrapperRef = useRef(null);
  const homeRef = useRef(null);
  const canvasRef = useRef(null);

  const { scrollY, scrollYProgress } = useScroll();
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["#616161", "#111"]
  );

  useEffect(() => {
    canvasRef.eventSource = document.getElementById('root');
  }, []);

  return (
    <motion.div className='wrapper' ref={wrapperRef}
      style={{ backgroundColor: bgColor }}
    >

      <div className="home" ref={homeRef}>
        <Topper></Topper>
        <Unicorn></Unicorn>
        {/* <Featured></Featured> */}
      </div>
      <Spacer height={3}></Spacer>
      <About></About>
      <Spacer height={3}></Spacer>
      <div className="section padded-sides">
        <Featured></Featured>
      </div>
      <Spacer height={10}></Spacer>
      <Work></Work>
      <Spacer height={10}></Spacer>
      <Footer></Footer>


    </motion.div >
  )
}

