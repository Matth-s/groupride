import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

const MyGroupsNav = () => {
  return (
    <ul className={styles.MyGroupsNav}>
      <li>
        <Link href={'/mes-groupes'}>Mes groupes</Link>
      </li>
      <li>
        <Link href={'/mes-groupes/groupes-rejoints'}>
          Groupes rejoints
        </Link>
      </li>
      <li>
        <Link href={'/mes-groupes/nouveau'}>Créer un groupe</Link>
      </li>
    </ul>
  );
};

export default MyGroupsNav;
