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

  if (!session?.user.id) {
    return (
      <Button variant="outlined">
        <Link href={'/&modal=connexion'}>Rejoindre</Link>
      </Button>
    );
  }

  const userId = session.user.id;

  if (userId === moderatorId) {
    return (
      <Link href={`/groupes/${id}`}>
        <Button variant="outlined">Afficher</Button>
      </Link>
    );
  }

  const userIsInGroup = await getUserInGroup({
    groupId: id,
    userId,
  });

  if (userIsInGroup)
    return (
      <Link href={`/groupes/${id}`}>
        <Button variant="outlined">Afficher</Button>
      </Link>
    );

  if (groupType === 'invitation') {
    const userIsAlreadyInInvitationList =
      await getUserInInvitationList({
        groupId: id,
        userId,
      });

    return userIsAlreadyInInvitationList ? (
      <DeleteJoinAskForm groupId={id} />
    ) : (
      <AskToJoinForm groupId={id} />
    );
  }

  if (groupType === 'close') {
    return <Button variant="outlined">Fermé</Button>;
  }

  return <JoinGroupButton groupId={id} />;
};

export default CardButton;
