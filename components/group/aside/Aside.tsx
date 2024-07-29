import Link from 'next/link';
import React, { Suspense } from 'react';

import styles from './styles.module.scss';
import AdminLinkAside from '../admin-link-aside/AdminLinkAside';

type AsideProps = {
  id: string;
  moderatorId: string;
};

const Aside = ({ id, moderatorId }: AsideProps) => {
  const basePath = `/groupes/${id}`;

  return (
    <aside className={styles.Aside}>
      <ul>
        <li>
          <Link href={basePath}>Chat</Link>
        </li>

        <li>
          <Link href={`${basePath}/evenements`}>Evénements</Link>
        </li>

        <li>
          <Link href={`${basePath}/membres`}>Membres</Link>
        </li>

        <Suspense>
          <AdminLinkAside groupId={id} moderatorId={moderatorId} />
        </Suspense>
      </ul>
    </aside>
  );
};

export default Aside;
