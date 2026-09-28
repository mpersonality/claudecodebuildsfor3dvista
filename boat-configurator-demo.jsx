import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function BoatConfiguratorDemo() {
  const mountRef = useRef(null);
  const hullMeshRef = useRef(null);
  const canopyMeshRef = useRef(null);
  const flagMeshRef = useRef(null);
  const [hullColor, setHullColor] = useState('#2F5D8C');
  const [canopyOn, setCanopyOn] = useState(true);
  const [flagColor, setFlagColor] = useState('#E8B23D');

  const hullColors = [
    { name: 'Signal Blue', hex: '#2F5D8C' },
    { name: 'Marquee Red', hex: '#C1443C' },
    { name: 'Birch White', hex: '#F3EFE6' },
    { name: 'Hall Charcoal', hex: '#1C1B22' },
  ];
  const flagColors = ['#E8B23D', '#C1443C', '#F3EFE6'];

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = 420;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0A1520');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6, 3.5, 7);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const sun = new THREE.DirectionalLight(0xffffff, 1.3);
    sun.position.set(6, 9, 4);
    scene.add(sun);
    const glow = new THREE.DirectionalLight(0x2F5D8C, 0.5);
    glow.position.set(-5, 2, -5);
    scene.add(glow);

    // Water plane
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.MeshStandardMaterial({ color: '#0E2438', metalness: 0.3, roughness: 0.2 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.4;
    scene.add(water);

    const boatGroup = new THREE.Group();

    // Hull (tapered via scaled box + angled front piece)
    const hullMat = new THREE.MeshStandardMaterial({ color: hullColor, metalness: 0.35, roughness: 0.45 });
    const hullMain = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.7, 1.5), hullMat);
    hullMain.position.y = 0.35;
    boatGroup.add(hullMain);
    hullMeshRef.current = hullMain;

    // Bow (angled front, approximated with a scaled box rotated)
    const bow = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 1.3), hullMat);
    bow.position.set(2.1, 0.35, 0);
    bow.rotation.y = Math.PI / 4;
    boatGroup.add(bow);

    // Deck
    const deck = new THREE.Mesh(
      new THREE.BoxGeometry(3.0, 0.1, 1.3),
      new THREE.MeshStandardMaterial({ color: '#D8CBB0', roughness: 0.8 })
    );
    deck.position.y = 0.75;
    boatGroup.add(deck);

    // Cabin / canopy
    const canopy = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.8, 1.1),
      new THREE.MeshStandardMaterial({ color: '#F3EFE6', roughness: 0.5 })
    );
    canopy.position.set(-0.3, 1.2, 0);
    boatGroup.add(canopy);
    canopyMeshRef.current = canopy;

    // Windshield hint
    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.4, 1.0),
      new THREE.MeshStandardMaterial({ color: '#2F5D8C', metalness: 0.6, roughness: 0.1, transparent: true, opacity: 0.6 })
    );
    windshield.position.set(0.35, 1.0, 0);
    boatGroup.add(windshield);

    // Mast
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.6, 8),
      new THREE.MeshStandardMaterial({ color: '#F3EFE6' })
    );
    mast.position.set(-1.2, 1.6, 0);
    boatGroup.add(mast);

    // Flag
    const flagMat = new THREE.MeshStandardMaterial({ color: flagColor, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.25, 0.02), flagMat);
    flag.position.set(-1.0, 2.2, 0);
    boatGroup.add(flag);
    flagMeshRef.current = flag;

    scene.add(boatGroup);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      boatGroup.rotation.y += 0.006;
      boatGroup.position.y = Math.sin(Date.now() * 0.0012) * 0.06;
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
    if (hullMeshRef.current) hullMeshRef.current.material.color.set(hullColor);
  }, [hullColor]);

  useEffect(() => {
    if (canopyMeshRef.current) canopyMeshRef.current.visible = canopyOn;
  }, [canopyOn]);

  useEffect(() => {
    if (flagMeshRef.current) flagMeshRef.current.material.color.set(flagColor);
  }, [flagColor]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6" style={{ background: '#0A1520' }}>
      <div className="text-center mb-4">
        <div className="text-[10px] tracking-widest uppercase font-mono mb-1" style={{ color: '#5A7A94' }}>
          3DVista Configurator — Boat Mechanism Demo (placeholder geometry)
        </div>
        <h1 className="text-lg font-bold" style={{ color: '#F3EFE6', fontFamily: "'Space Grotesk', sans-serif" }}>
          Real-Time Boat Color & Canopy Configuration
        </h1>
      </div>

      <div ref={mountRef} className="w-full max-w-2xl rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }} />

      <div className="w-full max-w-2xl mt-6">
        <div className="text-xs font-mono mb-2" style={{ color: '#5A7A94' }}>HULL COLOR</div>
        <div className="flex gap-2 mb-5">
          {hullColors.map((c) => (
            <button
              key={c.hex}
              onClick={() => setHullColor(c.hex)}
              className="w-10 h-10 rounded-full transition-transform hover:scale-110"
              style={{ background: c.hex, border: hullColor === c.hex ? '3px solid #E8B23D' : '2px solid rgba(255,255,255,0.2)' }}
              title={c.name}
            />
          ))}
        </div>

        <div className="text-xs font-mono mb-2" style={{ color: '#5A7A94' }}>FLAG COLOR</div>
        <div className="flex gap-2 mb-5">
          {flagColors.map((c) => (
            <button
              key={c}
              onClick={() => setFlagColor(c)}
              className="w-8 h-8 rounded-md transition-transform hover:scale-110"
              style={{ background: c, border: flagColor === c ? '3px solid #E8B23D' : '2px solid rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>

        <div className="text-xs font-mono mb-2" style={{ color: '#5A7A94' }}>CABIN</div>
        <button
          onClick={() => setCanopyOn(!canopyOn)}
          className="px-5 py-2.5 rounded-lg text-sm font-bold"
          style={{ background: canopyOn ? '#3FA66B' : 'rgba(255,255,255,0.1)', color: canopyOn ? '#0A1520' : '#F3EFE6' }}
        >
          {canopyOn ? 'Cabin ON — click for open deck' : 'Open Deck — click for cabin'}
        </button>
      </div>
    </div>
  );
}
