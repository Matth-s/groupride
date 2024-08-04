import { auth } from '@/auth';
import { GroupType } from '@/interfaces/groups';
import { Button } from '@mui/material';
import {
  getUserInGroup,
  getUserInInvitationList,
} from '@/data/group';

import Link from 'next/link';
import React from 'react';
import AskToJoinForm from '../ask-to-join-form/AskToJoinForm';
import DeleteJoinAskForm from '../delete-join-ask-form/DeleteJoinAskForm';
import JoinGroupButton from '../join-group-button/JoinGroupButton';

import styles from './styles.module.scss';

type CardButtonProps = {
  moderatorId: string;
  groupType: GroupType;
  id: string;
};

const CardButton = async ({
  moderatorId,
  groupType,
  id,
}: CardButtonProps) => {
  const session = await auth();

  let content;

  if (!session?.user.id) {
    content = (
      <Link href={'/&modal=connexion'}>
        <Button variant="contained">Rejoindre</Button>
      </Link>
    );
  } else {
    const userId = session.user.id;

    if (userId === moderatorId) {
      content = (
        <Link href={`/groupes/${id}`}>
          <Button variant="contained">Afficher</Button>
        </Link>
      );
    } else {
      const userIsInGroup = await getUserInGroup({
        groupId: id,
        userId,
      });

      if (userIsInGroup) {
        content = (
          <Link href={`/groupes/${id}`}>
            <Button variant="contained" color="inherit">
              Afficher
            </Button>
          </Link>
        );
      } else if (groupType === 'invitation') {
        const userIsAlreadyInInvitationList =
          await getUserInInvitationList({
            groupId: id,
            userId,
          });

        content = userIsAlreadyInInvitationList ? (
          <DeleteJoinAskForm groupId={id} />
        ) : (
          <AskToJoinForm groupId={id} />
        );
      } else if (groupType === 'close') {
        content = <Button variant="contained">Fermé</Button>;
      } else {
        content = <JoinGroupButton groupId={id} />;
      }
    }
  }

  return <div className={styles.CardButton}>{content}</div>;
};

export default CardButton;
