'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '@/actions/register';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { signupSchema } from '@/schema/signup-schema';

import FormSubmitSuccess from '@/ui/form-submit-success/FormSubmitSuccess';
import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';
import FormFieldError from '@/ui/form-field-error/FormFieldError';
import Link from 'next/link';
import SubmitButton from '@/ui/submit-button/SubmitButton';

import styles from './styles.module.scss';

const SignupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signupSchema),
  });

  const handleFormSubmit = (values: z.infer<typeof signupSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() =>
      registerUser(values).then((res) => {
        setError(res?.error);
        setSuccess(res?.success);
      })
    );
  };

  return (
    <div className={styles.SignupForm}>
      <form
        onSubmit={handleSubmit((values) => handleFormSubmit(values))}
        autoComplete="off"
      >
        <div>
          <TextField
            id="email"
            label="email"
            type="email"
            {...register('email')}
          />

          <FormFieldError message={errors.email?.message} />
        </div>

        <div>
          <TextField
            id="lastName"
            label="Nom"
            type="text"
            {...register('lastName')}
          />
          <FormFieldError message={errors.lastName?.message} />
        </div>

        <div>
          <TextField
            id="firstName"
            label="Prénom"
            type="text"
            {...register('firstName')}
          />

          <FormFieldError message={errors.firstName?.message} />
        </div>

        <div>
          <TextField
            id="username"
            label="Nom d'utilisateur"
            type="text"
            {...register('username')}
          />

          <FormFieldError message={errors.password?.message} />
        </div>

        <div>
          <TextField
            id="password"
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          />

          <FormFieldError message={errors.password?.message} />
        </div>

        <div>
          <TextField
            id="confirmPassword"
            label="Confirmez le mot de passe"
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
          />

          <FormFieldError message={errors.confirmPassword?.message} />
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

        <SubmitButton isPending={isPending} label="S'inscrire" />
      </form>

      <FormSubmitError message={error} />
      <FormSubmitSuccess message={success} />

      <p>
        Vous avez déjà un compte ?{' '}
        <Link href={'/authentification/connexion'}>
          Connectez vous !
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
