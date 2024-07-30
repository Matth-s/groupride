import { UsersInterface } from '@/interfaces/groups';
import prisma from '@/libs/prisma';
import React, { Suspense } from 'react';
import ButtonAction from '../action-button-list/ActionButtonList';
import { formatDate } from '@/utils/date';
import ClientOnly from '@/components/ClientOnly';
import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

type MemberCardProps = {
  member: UsersInterface;
  groupId: string;
};

const MemberCard = async ({ member, groupId }: MemberCardProps) => {
  const user = await prisma.user.findFirst({
    where: {
      id: member.userId,
    },
    select: {
      image: true,
      username: true,
    },
  });

  if (!user) return;

  return (
    <div className={styles.MemberCard}>
      <div className={styles.header}>
        <Link href={`/utilisateur/${member.userId}`}>
          <Image
            src={user.image ? user.image : '/no-image-user.svg'}
            width={40}
            height={40}
            alt={user.username}
            decoding="async"
          />

          <p>{user.username}</p>
        </Link>
      </div>

      <ul className={styles.info}>
        <li>
          <span>
            Membre depuis : {formatDate(new Date(member.joinedAt))}
          </span>
        </li>
        <li>
          <span>
            Role : {member.role === 'member' ? 'Membre' : 'Admin'}
          </span>
        </li>
      </ul>

      <ClientOnly>
        <Suspense fallback={''}>
          <ButtonAction
            groupId={groupId}
            memberRole={member.role}
            memberId={member.userId}
            memberName={user.username}
          />
        </Suspense>
      </ClientOnly>
    </div>
  );
};

export default MemberCard;
