import SignupForm from '@/components/auth/signup-form/SignupForm';
import React from 'react';

import styles from './styles.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inscription',
};

const SigninPage = () => {
  return (
    <div className={styles.SigninPage}>
      <h1>Inscription</h1>
      <SignupForm />
    </div>
  );
};

export default SigninPage;
