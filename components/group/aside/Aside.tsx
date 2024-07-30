import Link from 'next/link';
import React, { Suspense } from 'react';

import AdminLinkAside from '../admin-link-aside/AdminLinkAside';

import styles from './styles.module.scss';

type AsideProps = {
  id: string;
};

const Aside = ({ id }: AsideProps) => {
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
          <AdminLinkAside groupId={id} />
        </Suspense>
      </ul>
    </aside>
  );
};

export default Aside;
