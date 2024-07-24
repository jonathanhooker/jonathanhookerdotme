'use client'
import { useRef, useState, forwardRef, useImperativeHandle, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, PerspectiveCamera, Clone, Plane, Sphere } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { MeshBasicMaterial, Vector3, TextureLoader, MeshStandardMaterial, MeshLambertMaterial } from 'three'
import { DuneBuggy } from './DuneBuggy/duneBuggy'
import { DynamicTerrain } from './DuneBuggy/dynamicTerrain'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, HueSaturation, DotScreen } from '@react-three/postprocessing'
import { TiltShiftVignetteEffect } from './DuneBuggy/tiltShiftVignetteShader'

// this is basically Modulo, but it works with negative numbers
const wrapVal = function (val, range) {
    if (val >= 0) {
        return val % range;
    } else {
        return range - (Math.abs(val) % range)
    }
}

const Terrain = forwardRef(function Terrain({ }, ref) {
    var terrainChunks = [
        { pos: [0, 0], ref: useRef(null) },
        { pos: [100, 0], ref: useRef(null) },
        { pos: [-100, 0], ref: useRef(null) },
        { pos: [0, 100], ref: useRef(null) },
        { pos: [0, -100], ref: useRef(null) },
        { pos: [100, 100], ref: useRef(null) },
        { pos: [-100, -100], ref: useRef(null) },
        { pos: [100, -100], ref: useRef(null) },
        { pos: [-100, 100], ref: useRef(null) }
    ]
    useImperativeHandle(ref, () => {
        return {
            moveTerrain: (x, y) => {
                terrainChunks.forEach((chunk) => {
                    if (chunk.ref.current) {
                        chunk.ref.current.position.set(x + chunk.pos[0], 0, y + chunk.pos[1]);
                    }
                });
            }
        }
    })

    const TerrainPeice = function (obj, map) {
        const albedo = useLoader(TextureLoader, map);
        const mat = new MeshStandardMaterial({ map: albedo });
        const loadedObj = useLoader(OBJLoader, obj);
        const geo = useMemo(() => {
            let g;
            loadedObj.traverse((c) => {
                if (c.type === "Mesh") {
                    g = c.geometry;
                }
            });
            return g;
        }, [loadedObj]);
        return [geo, mat];
    }

    var [geometry_NE, mat_NE] = TerrainPeice("/assets/dunebuggy/models/terrain_NE.obj", "/assets/dunebuggy/images/albedo_NE.jpg");
    var [geometry_NW, mat_NW] = TerrainPeice("/assets/dunebuggy/models/terrain_NW.obj", "/assets/dunebuggy/images/albedo_NW.jpg");
    var [geometry_SE, mat_SE] = TerrainPeice("/assets/dunebuggy/models/terrain_SE.obj", "/assets/dunebuggy/images/albedo_SE.jpg");
    var [geometry_SW, mat_SW] = TerrainPeice("/assets/dunebuggy/models/terrain_SW.obj", "/assets/dunebuggy/images/albedo_SW.jpg");

    return (
        <Suspense fallback={null}>
            {terrainChunks.map((chunk, i) =>
                <group
                    scale={[1, 1.1333333, 1]}
                    key={i}
                    ref={chunk.ref}
                    name={`terrain_chunk_${i}`}
                >
                    <mesh geometry={geometry_NE} material={mat_NE} receiveShadow={true} />
                    <mesh geometry={geometry_NW} material={mat_NW} receiveShadow={true} />
                    <mesh geometry={geometry_SE} material={mat_SE} receiveShadow={true} />
                    <mesh geometry={geometry_SW} material={mat_SW} receiveShadow={true} />
                </group>
            )}
        </Suspense>
        // </group>
    );
});

const DuneBuggyModel = forwardRef(function DuneBuggyModel({ scale }, ref) {
    const buggySpin = useRef(null);
    const buggyFrame = useRef(null);
    const wheel_fr = useRef(null);
    const wheel_fl = useRef(null);
    const wheel_br = useRef(null);
    const wheel_bl = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            update: (_duneBuggy) => {

                // buggySpin.current.rotation.y = Math.PI - _duneBuggy.rotation;
                buggySpin.current.rotation.y = Math.PI - _duneBuggy.rotation;
                buggyFrame.current.rotation.x = _duneBuggy.tilt; // tilt
                buggyFrame.current.rotation.z = _duneBuggy.roll; // roll
                buggyFrame.current.position.y = _duneBuggy.midHeight / scale;

                wheel_fl.current.position.set(_duneBuggy.wheelPositions[0][0], _duneBuggy.wheelPositions[0][2] / scale, _duneBuggy.wheelPositions[0][1]);
                wheel_fr.current.position.set(_duneBuggy.wheelPositions[1][0], _duneBuggy.wheelPositions[1][2] / scale, _duneBuggy.wheelPositions[1][1]);
                wheel_bl.current.position.set(_duneBuggy.wheelPositions[2][0], _duneBuggy.wheelPositions[2][2] / scale, _duneBuggy.wheelPositions[2][1]);
                wheel_br.current.position.set(_duneBuggy.wheelPositions[3][0], _duneBuggy.wheelPositions[3][2] / scale, _duneBuggy.wheelPositions[3][1]);

                wheel_fl.current.rotation.y = Math.PI - _duneBuggy.rotation;
                wheel_fr.current.rotation.y = Math.PI - _duneBuggy.rotation;
                wheel_bl.current.rotation.y = Math.PI - _duneBuggy.rotation;
                wheel_br.current.rotation.y = Math.PI - _duneBuggy.rotation;
            }
        }
    })

    const { nodes, materials } = useGLTF('/assets/dunebuggy/models/duneBuggy.glb');

    return (
        <group scale={scale} dispose={null} name={`dunebuggy`}>
            <group ref={buggySpin}>
                <mesh
                    receiveShadow={true}
                    castShadow={true}
                    geometry={nodes.Frame.geometry}
                    material={materials.VertexColor}
                    position={[0, 0, -0.177]}
                    ref={buggyFrame}
                />
            </group>
            <mesh
                receiveShadow={true}
                castShadow={true}
                geometry={nodes.BackLeftWheel.geometry}
                material={materials.VertexColor}
                position={[-1.829, 0, 2.253]}
                ref={wheel_bl}
            />
            <mesh
                receiveShadow={true}
                castShadow={true}
                geometry={nodes.FrontLeftWheel.geometry}
                material={materials.VertexColor}
                position={[-1.366, 0, -2.608]}
                ref={wheel_fl}
            />
            <mesh
                receiveShadow={true}
                castShadow={true}
                geometry={nodes.FrontRightWheel.geometry}
                material={materials.VertexColor}
                position={[1.366, 0, -2.608]}
                ref={wheel_fr}
            />
            <mesh
                receiveShadow={true}
                castShadow={true}
                geometry={nodes.BackRightWheel.geometry}
                material={materials.VertexColor}
                position={[1.829, 0, 2.253]}
                ref={wheel_br}
            />
        </group>
    )
});

const Scene = ({ }) => {
    // react refs
    const cameraRef = useRef(null);
    const terrainRef = useRef(null);
    const buggyRef = useRef(null);
    const dirLightRef = useRef(null);

    // local vars
    const terrain = useRef(new DynamicTerrain(Math.round(25 * 1.75), 50));
    const duneBuggy = useRef(new DuneBuggy());
    const initialized = useRef(false);
    const currTime = useRef(new Date().getTime());
    const autoDrive = useRef(true);

    const buggyScale = 0.5;

    // this is our initialization function we want to call before our update loop
    const init = () => {
        if (initialized.current) return; // should only call once
        if (!cameraRef.current) { return; }
        cameraRef.current.lookAt(new Vector3(0, 11, 0));
        terrainRef.current.moveTerrain(0, 0);

        terrain.current.setPosition(50, 50);
        duneBuggy.current.rotate(Math.PI); // default start direction

        dirLightRef.current.position.set(50, 50, 50);
        dirLightRef.current.castShadow = true;
        dirLightRef.current.shadow.mapSize.width = 512;
        dirLightRef.current.shadow.mapSize.height = 512;
        dirLightRef.current.shadow.camera.near = 0.5;
        dirLightRef.current.shadow.camera.far = 1000;
        dirLightRef.current.shadow.camera.left = dirLightRef.current.shadow.camera.bottom = -30;
        dirLightRef.current.shadow.camera.right = dirLightRef.current.shadow.camera.top = 30;
        dirLightRef.current.shadow.needsUpdate = true;

        initialized.current = true;

        console.log(dirLightRef.current);
    }
    // useEffect(() => { init(); }, []);

    // this is out update loop
    useFrame((state, delta, xrFrame) => {
        if (!initialized.current) {
            init();
            return;
        }

        var _currTime = new Date().getTime();
        var _elapsedTime = _currTime - currTime.current;
        currTime.current = _currTime;

        ////////// Update terrain and dune buggy //////////
        terrain.current.move(
            duneBuggy.current.vectorXY[0] * duneBuggy.current.speedXY * _elapsedTime / 1000,
            -duneBuggy.current.vectorXY[1] * duneBuggy.current.speedXY * _elapsedTime / 1000
        );
        terrainRef.current.moveTerrain(
            -(wrapVal(terrain.current.currentPosition[0], 100) - 50),
            (wrapVal(terrain.current.currentPosition[1], 100) - 50)
        );
        // console.log(terrain.current.currentPosition);

        if (autoDrive.current) {
            duneBuggy.current.accelerationXY_Mult = 1;
            duneBuggy.current.rotate(((Math.sin(3 + currTime.current / 8000) + Math.sin(currTime.current / 800)) * 0.65) * _elapsedTime / 1000);
        } else {
            // we'll come back to this
            // duneBuggy.current.accelerationXY_Mult = ((this.touching) ? 1 : 0) + (this.interaction.arrows.up ? 1 : 0) - (this.interaction.arrows.down ? 1 : 0);
            // duneBuggy.current.rotate(((this.dragVector[0]) + ((this.interaction.arrows.left ? -1 : 0) + (this.interaction.arrows.right ? 1 : 0))) * _elapsedTime / 500);
        }

        duneBuggy.current.update(
            _elapsedTime / 1000,
            terrain.current.getPt(terrain.current.currentPosition[0] + duneBuggy.current.wheelPositions[0][0] * buggyScale, terrain.current.currentPosition[1] - duneBuggy.current.wheelPositions[0][1] * buggyScale).z,
            terrain.current.getPt(terrain.current.currentPosition[0] + duneBuggy.current.wheelPositions[1][0] * buggyScale, terrain.current.currentPosition[1] - duneBuggy.current.wheelPositions[1][1] * buggyScale).z,
            terrain.current.getPt(terrain.current.currentPosition[0] + duneBuggy.current.wheelPositions[2][0] * buggyScale, terrain.current.currentPosition[1] - duneBuggy.current.wheelPositions[2][1] * buggyScale).z,
            terrain.current.getPt(terrain.current.currentPosition[0] + duneBuggy.current.wheelPositions[3][0] * buggyScale, terrain.current.currentPosition[1] - duneBuggy.current.wheelPositions[3][1] * buggyScale).z
        );

        // update buggy 3d model to match
        buggyRef.current.update(duneBuggy.current);

        // update light position to follow the dune buggy
        // this keeps the shadow from clipping
        dirLightRef.current.position.y = 50 + duneBuggy.current.midHeight / buggyScale;
    })

    return (
        <>
            <PerspectiveCamera ref={cameraRef} fov={30} makeDefault position={[0, 100, 100]} near={1} far={10000} rotation={[0, 0, 0]} />
            <directionalLight position={[50, 50, 50]} castShadow={true} ref={dirLightRef} intensity={1} />
            <ambientLight intensity={0.5} />
            <group scale={[2, 2, 2]}>
                <DuneBuggyModel scale={buggyScale} ref={buggyRef} />
                <Terrain ref={terrainRef} />
            </group>
        </>
    )
}

const DuneBuggyScene = ({ }) => {


    return (
        <Canvas shadows>
            <Scene />
            <EffectComposer>
                <TiltShiftVignetteEffect r={0.635} v={3.5 / 512} offset={2} darkness={4.5} />
                {/* <HueSaturation saturation={-1} /> */}
                {/* <DotScreen /> */}
            </EffectComposer>
        </Canvas>
    )
}

export { DuneBuggyScene }
