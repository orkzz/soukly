'use client';

import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingNotifications from './FloatingNotifications';

const PhoneModel = lazy(() => import('./PhoneModel'));

function PhoneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-5, 3, 2]} intensity={0.5} color="#A78BFA" />
      <pointLight position={[0, -2, 3]} intensity={0.8} color="#7C3AED" />

      <Suspense fallback={null}>
        <PhoneModel />
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={4}
          color="#7C3AED"
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

interface Hero3DPhoneProps {
  locale: string;
}

export default function Hero3DPhone({ locale }: Hero3DPhoneProps) {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden noise">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-primary-900/20 dark:via-background-dark dark:to-background-dark" />
        <motion.div
          className="absolute top-0 start-0 w-[600px] h-[600px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-0 end-0 w-[500px] h-[500px] rounded-full bg-accent/5 dark:bg-accent/10 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
          {/* Text content */}
          <motion.div
            className="text-center lg:text-start order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display leading-[1.1] text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('hero.title')}{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href={`/${locale}/auth/register`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-0.5"
              >
                {t('hero.cta')}
                <svg className="ms-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary border-2 border-primary/20 hover:border-primary/40 rounded-xl transition-all duration-300 hover:bg-primary/5"
              >
                <svg className="me-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[t('hero.badge1'), t('hero.badge2'), t('hero.badge3')].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Phone area */}
          <motion.div
            className="relative order-1 lg:order-2 h-[500px] sm:h-[600px] lg:h-[700px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FloatingNotifications />
            <PhoneCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
