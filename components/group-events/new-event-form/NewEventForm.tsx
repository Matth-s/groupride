'use client';

import { newEventSchema } from '@/schema/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, InputLabel, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createEvent } from '@/actions/new-event';
import { SportPracticed } from '@/interfaces/groups';
import React, { useState, useTransition } from 'react';

import FormFieldError from '@/ui/form-field-error/FormFieldError';
import LocationInput from '../location-input/LocationInput';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import SelectSport from '../select-sport/SelectSport';
import DatePicker from '../date-picker/DatePicker';
import dayjs from 'dayjs';
import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';

import styles from './styles.module.scss';
import { toastSuccess } from '@/libs/toast';

type NewEventFormProps = {
  groupId: string;
  sportPraticed: SportPracticed[];
};

const NewEventForm = ({
  groupId,
  sportPraticed,
}: NewEventFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTranstition] = useTransition();
  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof newEventSchema>>({
    defaultValues: {
      name: '',
      location: undefined,
      postalCode: undefined,
      departureDate: dayjs().add(1, 'week').toDate(),
      startAt: new Date(),
      description: '',
      sportPraticed: sportPraticed,
    },
    resolver: zodResolver(newEventSchema),
  });

  const handleFormSubmit = (
    values: z.infer<typeof newEventSchema>
  ) => {
    setError(undefined);
    startTranstition(() => {
      createEvent({ values, groupId }).then((res) => {
        if (res?.error) {
          return setError(res.error);
        }

        toastSuccess(
          `L'évènement "${values.name}" a été crée avec succès`
        );
      });
    });
  };

  return (
    <div className={styles.NewFormEvent}>
      <form
        onSubmit={handleSubmit((values) => handleFormSubmit(values))}
        autoComplete="off"
      >
        <div>
          <TextField
            type="text"
            label="Nom de l'evenement"
            {...register('name')}
            variant="outlined"
          />

          <FormFieldError message={errors.name?.message} />
        </div>

        <div>
          <TextField
            type="text"
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            {...register('description')}
          />
        </div>

        <div>
          <DatePicker />
        </div>

        <div>
          <LocationInput setValue={setValue} register={register} />
        </div>

        <div>
          <FormControl>
            <InputLabel variant="outlined">Code postal</InputLabel>
            <TextField {...register('postalCode')} disabled />
          </FormControl>
        </div>

        <div>
          <SelectSport
            setValue={setValue}
            sportPraticed={sportPraticed}
            sportSelected={watch}
          />
        </div>

        <SubmitButton
          isPending={isPending}
          label="Créer l'evenement"
          variant="contained"
        />

        <FormSubmitError message={error} />
      </form>
    </div>
  );
};

export default NewEventForm;
