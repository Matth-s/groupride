import { GroupType } from '@prisma/client';

// Function to get group type text based on enum
export const getGroupTypeText = (type: GroupType): string => {
  let groupText: string;

  switch (type) {
    case GroupType.close:
      groupText = 'Fermé';
      break;
    case GroupType.open:
      groupText = 'Rejoindre';
      break;
    case GroupType.invitation:
      groupText = 'Demandez à rejoindre';
      break;
    default:
      groupText = 'Rejoindre';
  }

  return groupText;
};
