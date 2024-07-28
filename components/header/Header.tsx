import React from 'react';

import styles from './styles.module.scss';
import { auth } from '@/auth';
import Link from 'next/link';
import SingoutButton from './signout-button/SingoutButton';

const Header = async () => {
  const session = await auth();

  return (
    <header className={styles.Header}>
      <nav>
        {session ? (
          <>
            <ul>
              <li>
                <Link href={'/'}>Groupes</Link>
              </li>
              <li>
                <Link href={'/mes-groupes'}>Mes groupes</Link>
              </li>
              <li>
                <Link href={'/amis'}>Amis</Link>
              </li>
            </ul>

            <ul>
              <li>
                <Link href={'/profil'}>Profil</Link>
              </li>
              <li>
                <SingoutButton />
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li>
                <Link href={'/'}>Groupes</Link>
              </li>
            </ul>

            <ul>
              <li>
                <Link href={'/authentification/inscription'}>
                  Inscription
                </Link>
              </li>
              <li>
                <Link href={'/authentification/connexion'}>
                  Connexion
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
