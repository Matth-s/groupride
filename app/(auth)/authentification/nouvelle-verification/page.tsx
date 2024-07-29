'use client';

import { newVerification } from '@/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import Loader from '@/ui/loader/Loader';

const NewConfirmationPage = () => {
  const searchParams = useSearchParams();
  const [succes, setSucces] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const token = searchParams.get('token');

  useEffect(() => {
    if (error || succes) return;

    if (!token) {
      return setError('Token manquant');
    }

    newVerification(token).then((res) => {
      setError(res.error);
      setSucces(res.success);
    });
  }, [token, error, succes]);

  return (
    <div className={styles.NewVerification}>
      <h2>Confirmation de votre email</h2>

      {!error && !succes ? <Loader /> : null}

      {error ? <p>{error}</p> : null}
      {succes ? <p>{succes}</p> : null}
    </div>
  );
};

export default NewConfirmationPage;
