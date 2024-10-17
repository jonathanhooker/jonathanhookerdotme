'use client'
import dynamic from 'next/dynamic'
import { useRef, useState, forwardRef, useImperativeHandle, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, PerspectiveCamera, Clone, Plane, Sphere, Stage, OrbitControls, Environment, MeshTransmissionMaterial, MeshRefractionMaterial } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { MeshBasicMaterial, Vector3, TextureLoader, MeshStandardMaterial, MeshLambertMaterial, SRGBColorSpace, OneMinusConstantAlphaFactor, DoubleSide } from 'three'
import { DuneBuggy } from './DuneBuggy/duneBuggy'
import { DynamicTerrain } from './DuneBuggy/dynamicTerrain'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, HueSaturation, DotScreen } from '@react-three/postprocessing'
import { TiltShiftVignetteEffect } from './DuneBuggy/tiltShiftVignetteShader'
import { motion, useScroll, useMotionValueEvent, useMotionValue } from 'framer-motion';
import { RGBELoader } from 'three-stdlib';

// const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })
// const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
// const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
//     ssr: false,
//     loading: () => (
//         <div className='flex h-96 w-full flex-col items-center justify-center'>
//             <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
//                 <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
//                 <path
//                     className='opacity-75'
//                     fill='currentColor'
//                     d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//                 />
//             </svg>
//         </div>
//     ),
// })
import { View } from '../canvas/View'

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Swiitch (https://sketchfab.com/Swiitch)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/origami-unicorn-f4dda8c578db49708b2ef94ad8adf9c0
Title: Origami Unicorn
*/

const UnicornModel = forwardRef(function UnicornModel(props, ref) {

    const { nodes, materials } = useGLTF('/assets/models/origami_unicorn.glb');

    return (
        <group {...props} dispose={null} ref={ref}>
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.polySurface13_lambert1_0.geometry}
            >
                {/* <meshStandardMaterial color={'orange'} roughness={0} /> */}
                {/* <MeshRefractionMaterial envMap={props.envMap} /> */}
                <MeshTransmissionMaterial color={"white"} resolution={512} thickness={50} anisotropy={1} chromaticAberration={10} />
            </mesh>
            <mesh
                castShadow
                // receiveShadow
                geometry={nodes.polySurface10_lambert1_0.geometry}
            >
                {/* <meshStandardMaterial color={'orange'} roughness={0} /> */}
                {/* <MeshRefractionMaterial envMap={props.envMap} /> */}
                <MeshTransmissionMaterial color={"white"} resolution={512} thickness={50} anisotropy={1} chromaticAberration={10} />
            </mesh>
        </group >
    )
});

const Shards = forwardRef(function UnicornModel(props, ref) {

    const { nodes, materials } = useGLTF('/assets/models/shards.glb');
    const shardsRef1 = useRef(null);
    const shardsRef2 = useRef(null);
    const shardsRef3 = useRef(null);
    useFrame((state, delta, frame) => {
        shardsRef1.current.rotation.y += delta * .05;
        shardsRef2.current.rotation.y += delta * .035;
        shardsRef3.current.rotation.y += delta * .025;
        shardsRef1.current.rotation.x += delta * .035;
        shardsRef2.current.rotation.x += delta * .025;
        shardsRef3.current.rotation.x += delta * -.035;

        shardsRef1.current.scale.y = 1 + 0.1 * Math.sin(state.clock.elapsedTime * 1);
        shardsRef2.current.scale.x = 1 + 0.05 * Math.sin(0.25 + state.clock.elapsedTime * 0.75);
        shardsRef3.current.scale.z = 1 + 0.05 * Math.cos(0.75 + state.clock.elapsedTime * 0.65);
    });

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shards3.geometry}
                ref={shardsRef1}
            >
                <MeshTransmissionMaterial side={DoubleSide} color={"white"} resolution={512} thickness={50} anisotropy={1} chromaticAberration={10} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shards2.geometry}
                ref={shardsRef2}
            >
                <MeshTransmissionMaterial side={DoubleSide} color={"white"} resolution={512} thickness={50} anisotropy={1} chromaticAberration={10} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shards1.geometry}
                rotation={[0, 0, 0.197]}
                ref={shardsRef3}
            >
                <MeshTransmissionMaterial side={DoubleSide} color={"white"} resolution={512} thickness={50} anisotropy={1} chromaticAberration={10} />
            </mesh>
        </group>
    )
});

const Unicorn = ({ }) => {
    const introProgress = useMotionValue(0);
    const viewRef = useRef(null);
    const cameraRef = useRef(null);
    const unicornRef = useRef(null);

    const { scrollY, scrollYProgress } = useScroll({
        target: viewRef,
        offset: ["start start", "end start"]
    })
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (cameraRef.current) {
            cameraRef.current.position.x = 150 - latest * 100;
            cameraRef.current.position.y = 100 + latest * 100;
            unicornRef.current.rotation.y = latest * Math.PI / 4;
        }
    })

    const envTex = useLoader(RGBELoader, '/assets/images/syferfontein_0d_clear_puresky_1k.hdr');

    return (
        <motion.div className='view' ref={viewRef}
            initial={{ introProgress: 0 }}
            animation={{ introProgress: 1 }}
        >
            <View className='view'>
                <Suspense fallback={null}>
                    <PerspectiveCamera ref={cameraRef} fov={85} makeDefault position={[150, 100, 0]} near={1} far={10000} rotation={[0, Math.PI / 2, 0]} target={[0, 50, 0]} />
                    <UnicornModel envMap={envTex} ref={unicornRef} rotation={[0, 0, 0]} />
                    <Shards envMap={envTex} rotation={[0, 0, 0]} scale={[35, 35, 35]} position={[0, 100, 0]} />
                    <Environment
                        files='/assets/images/syferfontein_0d_clear_puresky_1k.hdr'
                        ground={{ height: 45, radius: 1000, scale: 1000 }}
                    />
                    {/* <primitive attach="background" object={envTex} /> */}
                    {/* <EffectComposer> */}
                    {/* <TiltShiftVignetteEffect r={0.635} v={3.5 / 512} offset={0.5} darkness={3.5} /> */}
                    {/* <HueSaturation saturation={-1} /> */}
                    {/* <DotScreen /> */}
                    {/* </EffectComposer> */}
                    {/* </Canvas> */}
                </Suspense>
            </View>
        </motion.div>
    )
}

export { Unicorn }
