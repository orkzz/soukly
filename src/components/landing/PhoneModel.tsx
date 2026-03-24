'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

function PhoneScreen() {
  const meshRef = useRef<THREE.Mesh>(null);

  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Status bar
    ctx.fillStyle = '#7C3AED';
    ctx.fillRect(0, 0, 512, 60);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Soukly Store', 20, 40);

    // Header bar
    ctx.fillStyle = '#F5F3FF';
    ctx.fillRect(0, 60, 512, 80);
    ctx.fillStyle = '#7C3AED';
    ctx.beginPath();
    ctx.roundRect(20, 75, 472, 45, 10);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px sans-serif';
    ctx.fillText('Rechercher des produits...', 40, 103);

    // Product grid
    const products = [
      { color: '#DDD6FE', price: '3,500 DZD' },
      { color: '#FDE68A', price: '2,800 DZD' },
      { color: '#BBF7D0', price: '5,200 DZD' },
      { color: '#FBCFE8', price: '1,900 DZD' },
    ];

    products.forEach((product, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 20 + col * 246;
      const y = 160 + row * 280;

      // Product card bg
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.roundRect(x, y, 226, 260, 12);
      ctx.fill();

      // Product image placeholder
      ctx.fillStyle = product.color;
      ctx.beginPath();
      ctx.roundRect(x + 10, y + 10, 206, 160, 8);
      ctx.fill();

      // Product name
      ctx.fillStyle = '#1E1B4B';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('Produit Algerien', x + 10, y + 195);

      // Price
      ctx.fillStyle = '#7C3AED';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(product.price, x + 10, y + 220);

      // Add to cart button
      ctx.fillStyle = '#7C3AED';
      ctx.beginPath();
      ctx.roundRect(x + 10, y + 230, 206, 22, 6);
      ctx.fill();
    });

    // Bottom navigation
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 964, 512, 60);
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(0, 964, 512, 1);

    const icons = ['🏠', '🔍', '🛒', '👤'];
    icons.forEach((icon, i) => {
      ctx.font = '24px sans-serif';
      ctx.fillText(icon, 50 + i * 120, 1000);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0.076]}>
      <planeGeometry args={[1.55, 3.2]} />
      <meshBasicMaterial map={gradientTexture} />
    </mesh>
  );
}

function PhoneBody() {
  return (
    <group>
      {/* Phone frame */}
      <RoundedBox args={[1.75, 3.5, 0.15]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Screen bezel */}
      <RoundedBox args={[1.6, 3.25, 0.01]} radius={0.12} smoothness={4} position={[0, 0, 0.07]}>
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* Screen content */}
      <PhoneScreen />

      {/* Notch / Dynamic Island */}
      <mesh position={[0, 1.5, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.04, 0.2, 4, 8]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Side button (power) */}
      <mesh position={[0.9, 0.5, 0]}>
        <boxGeometry args={[0.03, 0.3, 0.08]} />
        <meshPhysicalMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Volume buttons */}
      <mesh position={[-0.9, 0.7, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.08]} />
        <meshPhysicalMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-0.9, 0.3, 0]}>
        <boxGeometry args={[0.03, 0.2, 0.08]} />
        <meshPhysicalMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function PhoneModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Subtle mouse parallax
    const targetRotX = pointer.y * 0.1;
    const targetRotY = pointer.x * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + state.clock.elapsedTime * 0.08,
      0.05
    );
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.1}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef} scale={1.1}>
        <PhoneBody />

        {/* Purple shadow/glow plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
          <circleGeometry args={[2, 32]} />
          <meshBasicMaterial
            color="#7C3AED"
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}
