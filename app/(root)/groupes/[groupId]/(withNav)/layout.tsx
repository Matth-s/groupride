import React from 'react';

import ClientOnly from '@/components/ClientOnly';
import KickUserModal from '@/components/modals/kick-user-modal/KickUserModal';
import UpdateUserModal from '@/components/modals/update-user-modal/UpdateUserModal';
import LeaveGroupModal from '@/components/modals/leave-group-modal/LeaveGroupModal';
import Aside from '@/components/group-id/aside/Aside';
import DeleteEventModal from '@/components/modals/delete-event-modal/DeleteEventModal';

import styles from './styles.module.scss';
import DeleteMessageModal from '@/components/modals/delete-message-modal/DeleteMessageModal';

type GroupLayoutProps = {
  children: React.ReactNode;
  params: {
    groupId: string;
  };
};

const GroupLayout = async ({
  children,
  params,
}: GroupLayoutProps) => {
  return (
    <div className={styles.GroupLayout}>
      <div className={styles.Main}>
        <Aside id={params.groupId} />
        <div className={styles.RightPart}>{children}</div>
      </div>

      <ClientOnly>
        <KickUserModal />
        <UpdateUserModal />
        <LeaveGroupModal />
        <DeleteEventModal />
        <DeleteMessageModal />
      </ClientOnly>
    </div>
  );
};

export default GroupLayout;
