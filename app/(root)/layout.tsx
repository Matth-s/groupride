import Header from '@/components/header/Header';
import React from 'react';

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootLayout;
