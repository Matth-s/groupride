'use server';

import { auth } from '@/auth';
import { getGroupByName } from '@/data/group';
import prisma from '@/libs/prisma';
import { newGroupSchema } from '@/schema/group';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const createNewGroup = async (
  values: z.infer<typeof newGroupSchema>
) => {
  const session = await auth();
  let id: string;

  if (!session?.user.id) {
    return {
      error: 'Vous devez être connectez pour effectuer cette action',
    };
  }

  const validatedFields = newGroupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Champs du formulaire invalide',
    };
  }

  const { name } = validatedFields.data;

  const existingGroup = await getGroupByName(name);

  if (existingGroup) {
    return {
      error: 'Ce nom de groupe est déjà utilisé',
    };
  }

  let { sportPraticed } = validatedFields.data;

  if (!sportPraticed) {
    sportPraticed = [];
  }

  try {
    const groupSaved = await prisma.group.create({
      data: {
        ...validatedFields.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    id = groupSaved.id;
  } catch (error) {
    console.log(error);
    return {
      error: 'Une erreur est survenue',
    };
  }

  revalidateTag('groups');
  redirect(`/mes-groupes/${id}`);
};
