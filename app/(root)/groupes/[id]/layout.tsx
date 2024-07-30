import React from 'react';

import Aside from '@/components/group/aside/Aside';
import notFound from './not-found';
import GroupHeader from '@/components/group/group-header/GroupHeader';

import {
  getGroupById,
  getUserInGroup,
  isGroupModerator,
} from '@/data/group';
import { auth } from '@/auth';

import styles from './styles.module.scss';
import ClientOnly from '@/components/ClientOnly';
import KickUserModal from '@/components/modals/kick-user-modal/KickUserModal';
import UpdateUserModal from '@/components/modals/update-user-modal/UpdateUserModal';

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
  const session = await auth();

  if (!params.id) return notFound();

  const userIsInGroup = await getUserInGroup({
    groupId: params.id,
    userId: session?.user.id || '',
  });

  const isModerator = await isGroupModerator({
    groupId: params.id,
    userId: session?.user.id || '',
  });

  if (!userIsInGroup && !isModerator) {
    return <p>non autorisé</p>;
  }

  const existingGroup = await getGroupById(params.id);

  if (!existingGroup) {
    return notFound();
  }

  return (
    <div className={styles.GroupLayout}>
      <GroupHeader groupName={existingGroup.name} />
      <div className={styles.Main}>
        <Aside id={params.id} />
        {children}
      </div>

      <ClientOnly>
        <KickUserModal />
        <UpdateUserModal />
      </ClientOnly>
    </div>
  );
};

export default GroupLayout;
