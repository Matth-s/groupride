import styles from './styles.module.scss';
import BackButton from '@/ui/back-button/BackButton';

type GroupHeaderProps = {
  groupName: string;
};

const GroupHeader = ({ groupName }: GroupHeaderProps) => {
  return (
    <div className={styles.GroupHeader}>
      <BackButton label="Retour" />
      <h1>{groupName}</h1>
    </div>
  );
};

export default GroupHeader;
