import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function VehicleConfiguratorDemo() {
  const mountRef = useRef(null);
  const carGroupRef = useRef(null);
  const bodyMeshRef = useRef(null);
  const [color, setColor] = useState('#C1443C');
  const [roofOn, setRoofOn] = useState(true);
  const roofMeshRef = useRef(null);

  const colors = [
    { name: 'Marquee Red', hex: '#C1443C' },
    { name: 'Spotlight Gold', hex: '#E8B23D' },
    { name: 'Signal Blue', hex: '#2F5D8C' },
    { name: 'Hall Charcoal', hex: '#1C1B22' },
    { name: 'Birch White', hex: '#F3EFE6' },
  ];

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0B0C12');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 3, 6);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(5, 8, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xE8B23D, 0.6);
    rim.position.set(-5, 3, -5);
    scene.add(rim);

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: '#14161F' })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.01;
    scene.add(ground);

    // Car group
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    // Body
    const bodyGeo = new THREE.BoxGeometry(3.2, 0.8, 1.6);
    const bodyMat = new THREE.MeshStandardMaterial({ color: color, metalness: 0.4, roughness: 0.4 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.7;
    bodyMeshRef.current = body;
    carGroup.add(body);

    // Cabin / roof
    const roofGeo = new THREE.BoxGeometry(1.6, 0.6, 1.4);
    const roofMat = new THREE.MeshStandardMaterial({ color: '#1C1B22', metalness: 0.2, roughness: 0.6 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(-0.2, 1.4, 0);
    roofMeshRef.current = roof;
    carGroup.add(roof);

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.4, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#0B0C12', metalness: 0.3, roughness: 0.7 });
    const wheelPositions = [
      [1.1, 0.45, 0.9], [1.1, 0.45, -0.9],
      [-1.1, 0.45, 0.9], [-1.1, 0.45, -0.9],
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      carGroup.add(wheel);
    });

    // Headlights
    const lightGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const lightMat = new THREE.MeshStandardMaterial({ color: '#FDF3D9', emissive: '#E8B23D', emissiveIntensity: 0.8 });
    [0.7, -0.7].forEach((z) => {
      const light = new THREE.Mesh(lightGeo, lightMat);
      light.position.set(1.62, 0.75, z);
      carGroup.add(light);
    });

    scene.add(carGroup);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      carGroup.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (bodyMeshRef.current) {
      bodyMeshRef.current.material.color.set(color);
    }
  }, [color]);

  useEffect(() => {
    if (roofMeshRef.current) {
      roofMeshRef.current.visible = roofOn;
    }
  }, [roofOn]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6" style={{ background: '#0B0C12' }}>
      <div className="text-center mb-4">
        <div className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: '#6B7280' }}>
          3DVista Configurator — Mechanism Demo (placeholder geometry)
        </div>
        <h1 className="text-lg font-bold" style={{ color: '#F3EFE6', fontFamily: "'Space Grotesk', sans-serif" }}>
          Real-Time 3D Color & Part Configuration
        </h1>
      </div>

      <div ref={mountRef} className="w-full max-w-2xl rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />

      <div className="w-full max-w-2xl mt-6">
        <div className="text-xs font-mono mb-2" style={{ color: '#6B7280' }}>BODY COLOR</div>
        <div className="flex gap-2 mb-5">
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              className="w-10 h-10 rounded-full transition-transform hover:scale-110"
              style={{
                background: c.hex,
                border: color === c.hex ? '3px solid #E8B23D' : '2px solid rgba(255,255,255,0.2)'
              }}
              title={c.name}
            />
          ))}
        </div>

        <div className="text-xs font-mono mb-2" style={{ color: '#6B7280' }}>ROOF</div>
        <button
          onClick={() => setRoofOn(!roofOn)}
          className="px-5 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: roofOn ? '#3FA66B' : 'rgba(255,255,255,0.1)', color: roofOn ? '#0B0C12' : '#F3EFE6' }}
        >
          {roofOn ? 'Hardtop ON — click for open-roof' : 'Open Roof — click for hardtop'}
        </button>
      </div>
    </div>
  );
}
