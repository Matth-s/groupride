import SigninForm from '@/components/auth/signin-form/SigninForm';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Connexion',
};

const SigninPage = () => {
  return (
    <div>
      <h1>Connexion</h1>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
