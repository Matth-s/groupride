'use client';

import { signinSchema } from '@/schema/signin-schema';
import FormFieldError from '@/ui/form-field-error/FormFieldError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './styles.module.scss';
import { signin } from '@/actions/signin';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import FormSubmitSuccess from '@/ui/form-submit-success/FormSubmitSuccess';
import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';

const SigninForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<z.infer<typeof signinSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signinSchema),
  });

  const handleFormSubmit = (values: z.infer<typeof signinSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() =>
      signin(values).then((res) => {
        if (res?.error) return setError(res.error);
        if (res?.success) return setSuccess(res.success);
      })
    );
  };

  return (
    <div className={styles.SigninForm}>
      <form
        onSubmit={handleSubmit((values) => handleFormSubmit(values))}
        autoComplete="off"
      >
        <div>
          <TextField
            label="Email"
            id="email"
            type="email"
            {...register('email')}
          />
          <FormFieldError message={errors.email?.message} />
        </div>

        <div>
          <TextField
            label="Mot de passe"
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />
          <FormFieldError message={errors.password?.message} />
        </div>

        <FormControlLabel
          label={`${
            showPassword
              ? 'Masquer les mots de passe'
              : 'Afficher les mots de passer'
          }`}
          control={
            <Checkbox
              value={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          }
        />

        <SubmitButton isPending={isPending} label="Se connecter" />

        <FormSubmitError message={error} />
        <FormSubmitSuccess message={success} />
      </form>
      <p>
        Vous n&apos;avez pas de compte ?
        <Link href={'/authentification/inscription'}>
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default SigninForm;
