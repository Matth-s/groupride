import { auth } from '@/auth';
import { isUserAdminGroup } from '@/data/group';
import Link from 'next/link';
import React from 'react';

type AdminLinkAsideProps = {
  groupId: string;
};

const AdminLinkAside = async ({ groupId }: AdminLinkAsideProps) => {
  const basePath = `/groupes/${groupId}`;

  const session = await auth();

  if (!session?.user.id) {
    return;
  }

  const userId = session.user.id;

  const isAdmin = await isUserAdminGroup({
    groupId,
    userId,
  });

  console.log(isAdmin);

  if (!isAdmin) return null;

  return (
    <>
      <li>
        <Link href={`${basePath}/demandes`}>Demandes</Link>
      </li>
      <li>
        <Link href={`${basePath}/parametres`}>Paramètres</Link>
      </li>
    </>
  );
};

export default AdminLinkAside;
