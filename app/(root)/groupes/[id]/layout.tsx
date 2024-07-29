import React from 'react';

import Aside from '@/components/group/aside/Aside';

import { getGroupById } from '@/data/group';
import notFound from './not-found';
import GroupHeader from '@/components/group/group-header/GroupHeader';

import styles from './styles.module.scss';

type GroupLayoutProps = {
  children: React.ReactNode;
  params: {
    id?: string;
  };
};

const GroupLayout = async ({
  children,
  params,
}: GroupLayoutProps) => {
  if (!params.id) return null;
  const existingGroup = await getGroupById(params.id);

  if (!existingGroup) {
    return notFound();
  }

  return (
    <div className={styles.GroupLayout}>
      <GroupHeader groupName={existingGroup.name} />
      <div className={styles.Main}>
        <Aside
          id={params.id}
          moderatorId={existingGroup.moderatorId}
        />
        {children}
      </div>
    </div>
  );
};

export default GroupLayout;
