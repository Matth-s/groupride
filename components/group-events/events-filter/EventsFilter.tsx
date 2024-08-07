'use client';

import { Button } from '@mui/material';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React from 'react';

import styles from './styles.module.scss';

type EventsFilterProps = {
  filter: string | undefined;
};

const EventsFilter = ({ filter }: EventsFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleSetFilter = (filter: string) => {
    if (filter) {
      params.set('evenements', filter);
    } else {
      params.delete('evenements');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.EventsFilter}>
      <Button
        onClick={() => handleSetFilter('futur')}
        variant={
          filter === 'futur' || !filter ? 'contained' : 'outlined'
        }
      >
        Evenements futur
      </Button>
      <Button
        onClick={() => handleSetFilter('passe')}
        variant={filter === 'passe' ? 'contained' : 'outlined'}
      >
        Evenements passé
      </Button>
    </div>
  );
};

export default EventsFilter;
