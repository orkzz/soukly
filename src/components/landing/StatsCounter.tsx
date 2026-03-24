'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const t = useTranslations('stats');

  const stats = [
    { value: 2500, suffix: '+', label: t('stores') },
    { value: 1000000, suffix: '+', label: t('orders'), display: '1M+' },
    { value: 58, suffix: '', label: t('wilayas') },
    { value: 4.9, suffix: '/5', label: t('satisfaction'), isDecimal: true },
  ];

  return (
    <section className="py-16 bg-white dark:bg-surface-dark border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-primary">
                {stat.display ? (
                  stat.display
                ) : stat.isDecimal ? (
                  <>{stat.value}{stat.suffix}</>
                ) : (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                )}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
