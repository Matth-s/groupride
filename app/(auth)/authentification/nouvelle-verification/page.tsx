'use client';

import { newVerification } from '@/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import Loader from '@/ui/loader/Loader';

import styles from './styles.module.scss';

const NewConfirmationPageContent = () => {
  const searchParams = useSearchParams();
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const token = searchParams.get('token');

  useEffect(() => {
    if (error || success) return;

    if (!token) {
      return setError('Token manquant');
    }

    try {
      newVerification(token).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    } catch (error) {
      setError(
        'Une erreur est survenue. Veuillez réessayer plus tard.'
      );
    }
  }, [token, error, success]);

  return (
    <div className={styles.NewVerification}>
      <h2>Confirmation de votre email</h2>

      {!error && !success ? <Loader /> : null}

      {error ? <p>{error}</p> : null}
      {success ? <p>{success}</p> : null}
    </div>
  );
};

const NewConfirmationPage = () => (
  <Suspense fallback={<Loader />}>
    <NewConfirmationPageContent />
  </Suspense>
);

export default NewConfirmationPage;
