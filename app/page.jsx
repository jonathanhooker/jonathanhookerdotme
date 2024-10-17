'use client'

import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import dynamic from 'next/dynamic'

import { Topper } from '@/components/Topper'
import { Work } from '@/components/Work'
import { About } from '@/components/About'
import { Footer } from '@/components/Footer'
import { Featured } from '@/components/Featured'
import '@/styles/main.scss'
import { useEffect, useRef } from 'react'

const Unicorn = dynamic(() => import('@/components/Featured/Unicorn').then((mod) => mod.Unicorn), { ssr: false })

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
      </div>
      <Spacer height={3}></Spacer>
      <About></About>
      <Spacer height={5}></Spacer>
      <Work></Work>
      <Spacer height={10}></Spacer>
      <div className="section padded-sides">
        <Featured></Featured>
      </div>
      <Spacer height={10}></Spacer>
      <Footer></Footer>
    </motion.div >
  )
}

