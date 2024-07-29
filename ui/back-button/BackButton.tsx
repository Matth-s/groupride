'use client';

import { Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

type BackButtonProps = {
  label: string;
};

const BackButton = ({ label }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.back();
      }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
