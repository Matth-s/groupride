import { auth } from '@/auth';
import { getGroupById, getUserInGroup } from '@/data/group';
import React from 'react';
import notFound from './not-found';
import GroupHeader from '@/components/group-id/group-header/GroupHeader';

import styles from './styles.module.scss';

type GroupLayoutProps = {
  children: React.ReactNode;
  params: {
    groupId: string;
  };
};

const layout = async ({ children, params }: GroupLayoutProps) => {
  const session = await auth();

  const existingGroup = await getGroupById(params.groupId);

  if (!existingGroup) {
    return notFound();
  }

  const userIsInGroup = await getUserInGroup({
    groupId: params.groupId,
    userId: session?.user.id || '',
  });

  if (!userIsInGroup) {
    return <p>Vous ne faites pas partie du groupe</p>;
  }

  return (
    <div className={styles.GroupLayout}>
      <GroupHeader
        groupName={existingGroup.name}
        isModerator={true}
        groupId={params.groupId}
      />
      {children}
    </div>
  );
};

export default layout;
