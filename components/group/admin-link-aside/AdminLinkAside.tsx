import { auth } from '@/auth';
import { isUserAdminGroup } from '@/data/group';
import Link from 'next/link';
import React from 'react';

type AdminLinkAsideProps = {
  groupId: string;
  moderatorId: string;
};

const AdminLinkAside = async ({
  groupId,
  moderatorId,
}: AdminLinkAsideProps) => {
  const basePath = `/groupes/${groupId}`;

  const session = await auth();

  if (!session?.user.id) {
    return;
  }

  const userId = session.user.id;

  console.log(userId);
  console.log(moderatorId);
  const isAdmin =
    userId === moderatorId ||
    (await isUserAdminGroup({
      groupId,
      userId: userId,
    }));

  console.log(isAdmin);

  return (
    <div>
      {isAdmin ? (
        <li>
          <Link href={`${basePath}/parametres`}>Paramètres</Link>
        </li>
      ) : null}
    </div>
  );
};

export default AdminLinkAside;
