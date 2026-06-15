import React, { useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { showToast } from './Toast'

export default function AirplaneModel(props) {
  const group = React.useRef()
  const { nodes, materials, animations } = useGLTF('/airplane.glb')
  const { actions } = useAnimations(animations, group)
  
  const [hoveredPart, setHoveredPart] = useState(null)

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.7, -0.3, 0]} scale={0.004}>
          <group name="Boeing_787_Dreamlinerfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                
                {/* Left Engine - Healthy */}
                <group name="object022" position={[-852.977, -128.328, 836.584]} rotation={[0, 0, 0.191]} scale={100}>
                  <mesh 
                    name="object022_Material001_0" 
                    geometry={nodes.object022_Material001_0.geometry} 
                    onPointerOver={() => setHoveredPart('engine-L')}
                    onPointerOut={() => setHoveredPart(null)}
                  >
                    <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={hoveredPart === 'engine-L' ? 4 : 1.5} toneMapped={false} />
                  </mesh>
                </group>

                {/* Right Engine - Critical */}
                <group name="object009" position={[852.977, -128.328, 836.584]} rotation={[0, 0, 0.191]} scale={100}>
                  <mesh 
                    name="object009_Material001_0" 
                    geometry={nodes.object009_Material001_0.geometry} 
                    onPointerOver={() => setHoveredPart('engine-R')}
                    onPointerOut={() => setHoveredPart(null)}
                    onClick={() => showToast("Critical Warning: Engine 2 degradation detected.")}
                  >
                    <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={hoveredPart === 'engine-R' ? 4 : 1.5} toneMapped={false} />
                  </mesh>
                </group>

                <group name="object" position={[0, -138.028, 324.485]} scale={100}>
                  <mesh name="object_Material002_0" geometry={nodes.object_Material002_0.geometry} material={materials['Material.002']} />
                </group>
                <group name="object001" position={[0, 70.537, 30.73]} scale={100}>
                  <mesh name="object001_Material003_0" geometry={nodes.object001_Material003_0.geometry} material={materials['Material.003']} />
                </group>
                <group name="object002" position={[0, -149.498, 632.457]} scale={100}>
                  <mesh name="object002_whtemet_0" geometry={nodes.object002_whtemet_0.geometry} material={materials.whtemet} />
                </group>
                <group name="object005" position={[0, -138.028, 594.153]} scale={100}>
                  <mesh name="object005_blackmat_0" geometry={nodes.object005_blackmat_0.geometry} material={materials.blackmat} />
                </group>
                <group name="object008" position={[0, 654.136, -1821.8]} scale={100}>
                  <mesh name="object008_Material011_0" geometry={nodes.object008_Material011_0.geometry} material={materials['Material.011']} />
                </group>
                <group name="object010" position={[0, -179.186, 862.198]} scale={100}>
                  <mesh name="object010_Material012_0" geometry={nodes.object010_Material012_0.geometry} material={materials['Material.012']} />
                </group>
                <group name="object011" position={[0, -57.815, 250.025]} scale={100}>
                  <mesh name="object011_Material005_0" geometry={nodes.object011_Material005_0.geometry} material={materials['Material.005']} />
                </group>
                <group name="object012" position={[0, -22.811, 330.598]} scale={100}>
                  <mesh name="object012_Material007_0" geometry={nodes.object012_Material007_0.geometry} material={materials['Material.007']} />
                </group>
                <group name="object013" position={[0, 59.463, -263.899]} scale={100}>
                  <mesh name="object013_Material008_0" geometry={nodes.object013_Material008_0.geometry} material={materials['Material.008']} />
                </group>
                <group name="object015" position={[0, 127.618, -1877.22]} scale={100}>
                  <mesh name="object015_Material010_0" geometry={nodes.object015_Material010_0.geometry} material={materials['Material.010']} />
                </group>
                <group name="object016" position={[0, 88.837, -77.138]} scale={100}>
                  <mesh name="object016_Material006_0" geometry={nodes.object016_Material006_0.geometry} material={materials['Material.006']} />
                </group>
                <group name="object017" position={[0, 169.391, -2067.514]} scale={100}>
                  <mesh name="object017_Material009_0" geometry={nodes.object017_Material009_0.geometry} material={materials['Material.009']} />
                </group>
                <group name="object018" position={[-0.003, -129.251, 672.206]} scale={100}>
                  <mesh name="object018_Material004_0" geometry={nodes.object018_Material004_0.geometry} material={materials['Material.004']} />
                </group>
                <group name="object014" position={[0, -113.566, 1032.396]} scale={100}>
                  <mesh name="object014_whtemet_0" geometry={nodes.object014_whtemet_0.geometry} material={materials.whtemet} />
                </group>

              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/airplane.glb')
