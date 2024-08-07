'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSchema } from '@/schema/group';
import { z } from 'zod';
import SubmitButton from '@/ui/submit-button/SubmitButton';
import { useState, useTransition } from 'react';
import { GroupRole, NewGroupRole } from '@/interfaces/groups';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import FormSubmitError from '@/ui/form-submit-error/FormSubmitError';
import { updateRoleUserGroup } from '@/actions/update-role-user-group';
import { toastSuccess } from '@/libs/toast';
import { useAppDispatch } from '@/libs/redux/hooks';
import { closeModal } from '@/libs/redux/features/modal-slice';

import styles from './styles.module.scss';

type UpdateUserRoleFormProps = {
  userIdToUpdate: string;
  groupId: string;
  memberRole: GroupRole | NewGroupRole;
  currentUserRole: 'admin' | 'moderator';
};

const UpdateUserRoleForm = ({
  userIdToUpdate,
  groupId,
  memberRole,
  currentUserRole,
}: UpdateUserRoleFormProps) => {
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<z.infer<typeof updateUserSchema>>({
    defaultValues: {
      groupId,
      userIdToUpdate,
      newRole: memberRole,
    },
    resolver: zodResolver(updateUserSchema),
  });

  const handleFormSubmit = (
    values: z.infer<typeof updateUserSchema>
  ): void => {
    setError(undefined);
    void startTransition((): void => {
      updateRoleUserGroup(values).then((res) => {
        if (res?.error) {
          setError(res.error);
          return;
        }

        toastSuccess("Le status de l'utilisateur à été modifié");
        dispatch(closeModal());
      });
    });
  };

  return (
    <form
      className={styles.UpdateUserRoleForm}
      onSubmit={handleSubmit((values) => handleFormSubmit(values))}
    >
      <FormControl fullWidth>
        <InputLabel id="role">Rôle</InputLabel>
        <Select
          labelId="role"
          id="newRole"
          label="Role"
          value={watch('newRole') || 'member'}
          {...register('newRole')}
        >
          {currentUserRole === 'admin' && (
            <MenuItem value={'admin'}>Admin</MenuItem>
          )}

          <MenuItem value={'member'}>Membre</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
          <MenuItem value={'moderator'}>Moderateur</MenuItem>
        </Select>
      </FormControl>

      <SubmitButton
        fullWidth={true}
        isPending={isPending}
        label="modifier le status"
        color="secondary"
        variant="contained"
      />

      <FormSubmitError message={error} />
    </form>
  );
};

export default UpdateUserRoleForm;
