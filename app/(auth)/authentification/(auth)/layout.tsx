import Header from '@/components/header/Header';
import React from 'react';

type AuthentificationLayoutProps = {
  children: React.ReactNode;
};

const AuthentificationLayout = ({
  children,
}: AuthentificationLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default AuthentificationLayout;
