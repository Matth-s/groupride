import SigninForm from '@/components/auth/signin-form/SigninForm';
import { Metadata } from 'next';
import React from 'react';

import styles from './styles.module.scss';

export const metadata: Metadata = {
  title: 'Connexion',
};

const SigninPage = () => {
  return (
    <div className={styles.SignupPage}>
      <h1>Connexion</h1>
      <SigninForm />
    </div>
  );
};

export default SigninPage;
