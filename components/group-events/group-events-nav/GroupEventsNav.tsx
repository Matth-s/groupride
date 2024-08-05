import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

type GroupEventsNav = {
  groupId: string;
};

const GroupEventsNav = ({ groupId }: GroupEventsNav) => {
  const url = `/groupes/${groupId}/evenements`;

  return (
    <ul className={styles.GroupEventsNav}>
      <li>
        <Link href={url}>Evenements</Link>
      </li>
      <li>
        <Link href={`${url}/ajouter-un-evenement`}>
          Ajouter un evenement
        </Link>
      </li>
    </ul>
  );
};

export default GroupEventsNav;
