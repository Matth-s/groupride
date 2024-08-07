'use client';

import { useForm } from 'react-hook-form';

import { TextField } from '@mui/material';
import { useTransition } from 'react';
import { postGroupMessage } from '@/actions/post-group-message';
import { LoadingButton } from '@mui/lab';

import SendIcon from '@mui/icons-material/Send';

import styles from './styles.module.scss';

type SendMessageFormProps = {
  groupId: string;
};

const SendMessageForm = ({ groupId }: SendMessageFormProps) => {
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const handleFormSubmit = async (values: { message: string }) => {
    startTransition(() => {
      void postGroupMessage({
        message: values.message,
        groupId,
      }).then(() => {
        reset();
      });
    });
  };

  return (
    <form
      className={styles.SendMessageForm}
      onSubmit={handleSubmit((values) => handleFormSubmit(values))}
    >
      <TextField
        type="text"
        placeholder="Votre message ..."
        {...register('message')}
      />

      <LoadingButton
        loading={isPending}
        variant="contained"
        type="submit"
      >
        <SendIcon />
      </LoadingButton>
    </form>
  );
};

export default SendMessageForm;
