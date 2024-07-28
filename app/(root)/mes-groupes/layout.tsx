import MyGroupsNav from '@/components/my-groups/my-groups-nav/MyGroupsNav';
import React from 'react';

type MyGroupLayoutProps = {
  children: React.ReactNode;
};

const MyGroupLayout = ({ children }: MyGroupLayoutProps) => {
  return (
    <>
      <MyGroupsNav />
      {children}
    </>
  );
};

export default MyGroupLayout;
