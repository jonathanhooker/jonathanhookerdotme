import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, extend, useLoader, useThree } from "@react-three/fiber";
import { PerspectiveCamera, shaderMaterial, useGLTF } from "@react-three/drei";
import { TextureLoader, NoToneMapping, Texture, Color } from "three";
import gsap from "gsap";


const rad2Deg = 180 / Math.PI;
function CalculateFOV(maxWidth, maxHeight, distance, aspect) {

    // const {camera, gl} = useThree(); 
    // const scaleY = Math.tan(camera.fov * Math.PI / 180 * 0.5) * distance * 2 ;
    // const scaleX = scaleY * camera.aspect;
    const height_fov = Math.atan((maxHeight / 2) / distance) * 2;
    const width_fov = Math.atan(((maxWidth / aspect) / 2) / distance) * 2;
    // width_fov = width_fov/aspect;

    return Math.min(width_fov, height_fov) * rad2Deg;
}

const SymbolMaterial = shaderMaterial(
    { map: new Texture(), brightness: 0, bgColor: new Color() },
    // vertex shader
    `
        uniform vec4 uvRect;
        varying vec2 vUv;

        void main() {
            vUv = uv;
            vUv.y = 1.-uv.y;

            // outputs
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    // fragment shader
    `
        uniform sampler2D map;
        uniform vec3 bgColor;
        uniform float brightness;
        varying vec2 vUv;

        void main() {
            vec4 px = texture2D(map, vUv);

            gl_FragColor.rgba = LinearTosRGB(vec4(mix(bgColor, px.rgb, brightness), 1.));
        }
    `
)
extend({ SymbolMaterial })

function SymbolScene() {
    const cameraRef = useRef(null);
    const meshRef = useRef(null);
    const symbolMat = useRef(null);
    const { camera, gl, invalidate } = useThree();

    // gets reset to false on each re-render
    let isSetup = false;

    const setCameraFOV = () => {
        console.log('SetupScene')
        isSetup = true;
        camera.fov = CalculateFOV(10, 10, 10, camera.aspect);
        camera.updateProjectionMatrix();
        gl.toneMapping = NoToneMapping;
    }

    const symbolTexture = useLoader(TextureLoader, `/assets/firesymbol/symbol_fire_expanded.jpg`);

    const { nodes } = useGLTF("/assets/firesymbol/symbol_fire.glb");
    const bgColor = "#090303";

    useFrame(() => {
        if (!isSetup) setCameraFOV();
    });

    useEffect(() => {
        console.log('animate in!')

        const tl = gsap.timeline({
            onComplete: () => {

            }
        });

        tl.fromTo(symbolMat.current.uniforms.brightness, { value: 0 }, { value: 1, duration: 4 }, 0);
        tl.fromTo(meshRef.current.rotation, { x: 0 }, { x: Math.PI / 2, duration: 3.5 }, 0);
        tl.fromTo(cameraRef.current.position, { z: 1, y: 1 }, { z: 10, y: 0, duration: 4 }, 0);
    }, []);

    return <>
        <color attach="background" args={[bgColor]} />
        <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} rotation={[0, 0, 0]} />
        <Suspense fallback={null}>
            <mesh ref={meshRef} geometry={nodes.symbol.geometry} position={[0, 0, 0]}>
                <symbolMaterial key={SymbolMaterial.key} ref={symbolMat} map={symbolTexture} bgColor={bgColor} />
            </mesh>
        </Suspense>
    </>
};

function FireSymbol() {

    return (
        <Canvas>
            <SymbolScene />
        </Canvas>
    );
}

export default FireSymbol