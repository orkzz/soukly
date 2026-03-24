'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khelifi',
    role: 'Mode DZ',
    city: 'Alger',
    avatar: 'AK',
    rating: 5,
    text: 'Soukly m\'a permis de lancer ma boutique en une journée. Les paiements BaridiMob marchent parfaitement et la livraison Yalidine est intégrée automatiquement.',
  },
  {
    name: 'Fatima Zerrouki',
    role: 'Beauté Naturelle',
    city: 'Oran',
    avatar: 'FZ',
    rating: 5,
    text: 'L\'assistant IA est incroyable ! Il m\'a généré des descriptions de produits en arabe et français. Mes ventes ont augmenté de 40% en un mois.',
  },
  {
    name: 'Karim Benali',
    role: 'Tech Store DZ',
    city: 'Constantine',
    avatar: 'KB',
    rating: 5,
    text: 'Le SMS marketing est un game changer. J\'envoie des promos ciblées par wilaya et mes clients adorent. Le taux de conversion a doublé.',
  },
  {
    name: 'Amira Haddad',
    role: 'Pâtisserie Amira',
    city: 'Blida',
    avatar: 'AH',
    rating: 5,
    text: 'En tant que pâtissière, je n\'ai aucune compétence technique. Soukly m\'a permis de créer une boutique professionnelle et de gérer mes commandes facilement.',
  },
  {
    name: 'Youcef Mebarki',
    role: 'Artisanat Kabyle',
    city: 'Tizi Ouzou',
    avatar: 'YM',
    rating: 5,
    text: 'La boutique multilingue arabe/français est exactement ce qu\'il me fallait. Mes clients de toutes les wilayas peuvent commander dans leur langue.',
  },
  {
    name: 'Nadia Boudiaf',
    role: 'Hijab Collection',
    city: 'Sétif',
    avatar: 'NB',
    rating: 4,
    text: 'Le calcul automatique des frais de livraison par wilaya fait gagner un temps fou. Plus besoin de répondre à chaque cliente individuellement.',
  },
];

export default function TestimonialsCarousel() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visibleCount = 3;

  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimonials[(current + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-24 bg-gray-50/80 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${current}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white dark:bg-surface-dark rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200 dark:text-gray-700'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.role} — {testimonial.city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current
                      ? 'w-8 bg-primary'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
