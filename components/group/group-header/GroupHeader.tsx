import LeaveGroupButton from '../leave-group-button/LeaveGroupButton';
import styles from './styles.module.scss';
import BackButton from '@/ui/back-button/BackButton';

type GroupHeaderProps = {
  groupName: string;
  isModerator: boolean;
  groupId: string;
};

const GroupHeader = ({
  groupName,
  isModerator,
  groupId,
}: GroupHeaderProps) => {
  return (
    <div className={styles.GroupHeader}>
      <BackButton label="Retour" />
      <h1>{groupName}</h1>
      {isModerator ? null : <LeaveGroupButton groupId={groupId} />}
    </div>
  );
};

export default GroupHeader;
