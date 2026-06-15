import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import AirplaneModel from './AirplaneModel';

export default function AircraftModel() {
  return (
    <div className="aircraft-model-container" style={{ width: '100%', height: '100%', position: 'relative', cursor: 'grab' }}>
      <Canvas camera={{ position: [8, 5, 8], fov: 45 }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <AirplaneModel />
        </Float>
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} />
      </Canvas>
      <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 12, background: 'rgba(15, 15, 26, 0.6)', padding: '8px 12px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981'}}></div>
            <span style={{fontSize: 12, color: '#fff', fontWeight: 500}}>Healthy Engine</span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444'}}></div>
            <span style={{fontSize: 12, color: '#fff', fontWeight: 500}}>Critical Engine</span>
          </div>
      </div>
    </div>
  );
}
