'use client';

import React, { useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
};

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
