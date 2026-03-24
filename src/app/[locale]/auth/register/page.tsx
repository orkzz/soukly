'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { registerSchema, type RegisterFormData } from '@/lib/validations';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone || null,
        },
        emailRedirectTo: `${window.location.origin}/${locale}/dashboard`,
      },
    });

    if (error) {
      toast('error', t('registerError'), error.message);
      return;
    }

    toast('success', t('emailSent'));
    router.push(`/${locale}/auth/login`);
  };

  const handleGoogleRegister = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/${locale}/dashboard`,
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
        {t('registerTitle')}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {t('registerSubtitle')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <Input
          label={t('fullName')}
          type="text"
          placeholder="Ahmed Benali"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.fullName?.message}
          {...formRegister('fullName')}
        />

        <Input
          label={t('email')}
          type="email"
          placeholder="nom@exemple.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...formRegister('email')}
        />

        <Input
          label={t('phone')}
          type="tel"
          placeholder={t('phonePlaceholder')}
          leftIcon={<Phone className="h-4 w-4" />}
          error={errors.phone?.message}
          hint="+213 format"
          {...formRegister('phone')}
        />

        <Input
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={errors.password?.message}
          {...formRegister('password')}
        />

        <Input
          label={t('confirmPassword')}
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.confirmPassword?.message}
          {...formRegister('confirmPassword')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
          {t('register')}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-background-dark text-gray-500">
              {t('orContinueWith')}
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          size="lg"
          onClick={handleGoogleRegister}
          leftIcon={
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          }
        >
          {t('google')}
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
        {t('hasAccount')}{' '}
        <Link
          href={`/${locale}/auth/login`}
          className="text-primary hover:text-primary-dark font-medium transition-colors"
        >
          {t('login')}
        </Link>
      </p>
    </div>
  );
}
