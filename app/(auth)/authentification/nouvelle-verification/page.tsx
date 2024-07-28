'use client';

import { newVerification } from '@/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NewConfirmationPage = () => {
  const searchParams = useSearchParams();
  const [succes, setSucces] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      return setError('Token manquant');
    }

    newVerification(token).then((res) => {
      setError(res.error);
      setSucces(res.success);
    });
  }, [token]);

  console.log(succes);
  console.log(error);

  return <div>Confirmation</div>;
};

export default NewConfirmationPage;
