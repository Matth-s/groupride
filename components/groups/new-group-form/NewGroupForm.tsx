'use client';

import { newGroupSchema } from '@/schema/group';
import FormFieldError from '@/ui/form-field-error/FormFieldError';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LocationInput from '../location-input/LocationInput';
import SelectSports from '../select-sports/SelectSports';
import GroupType from '../group-type/GroupType';

import styles from './styles.module.scss';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { createNewGroup } from '@/actions/new-group';
import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';

const NewGroupForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof newGroupSchema>>({
    defaultValues: {
      name: '',
      description: undefined,
      location: undefined,
      image: undefined,
      sportPraticed: [],
      groupType: 'open',
    },
    resolver: zodResolver(newGroupSchema),
  });

  const handleFormSubmit = async (
    values: z.infer<typeof newGroupSchema>
  ) => {
    startTransition(() =>
      createNewGroup(values).then((res) => {
        if (res?.error) return setError(res.error);
      })
    );
  };

  return (
    <div className={styles.NewGroupForm}>
      <form
        onSubmit={handleSubmit((values) => handleFormSubmit(values))}
      >
        <div>
          <TextField
            type="text"
            id="name"
            label="Nom du groupe"
            {...register('name')}
          />
          <FormFieldError message={errors.name?.message} />
        </div>

        <div>
          <TextField
            type="mutiline"
            id="description"
            label="Description"
            {...register('description')}
          />
          <FormFieldError message={errors.description?.message} />
        </div>

        <div>
          <LocationInput register={register} setValue={setValue} />
          <FormFieldError message={errors.location?.message} />
          <FormFieldError message={errors.postalCode?.message} />
        </div>

        <div>
          <SelectSports setValue={setValue} values={watch} />
        </div>

        <div>
          <GroupType register={register} setValue={setValue} />
        </div>

        <SubmitButton
          isPending={isPending}
          label="Créer le groupe"
          variant="outlined"
        />
        <FormSubmitError message={error} />
      </form>
    </div>
  );
};

export default NewGroupForm;
