'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/lib/validations';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('auth');
  const { toast } = useToast();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/${locale}/auth/login`,
    });

    if (error) {
      toast('error', error.message);
      return;
    }

    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
          {t('emailSent')}
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
        </p>
        <Link
          href={`/${locale}/auth/login`}
          className="inline-flex items-center gap-2 mt-8 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToLogin')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
        {t('forgotTitle')}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {t('forgotSubtitle')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <Input
          label={t('email')}
          type="email"
          placeholder="nom@exemple.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full" size="lg">
          {t('sendReset')}
        </Button>
      </form>

      <p className="mt-8 text-center">
        <Link
          href={`/${locale}/auth/login`}
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToLogin')}
        </Link>
      </p>
    </div>
  );
}
