'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

const SingoutButton = () => {
  return <button onClick={() => signOut()}>Se deconnecter</button>;
};

export default SingoutButton;
