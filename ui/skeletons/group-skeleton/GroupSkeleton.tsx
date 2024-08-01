import Skeleton from '@mui/material/Skeleton';

import styles from './styles.module.scss';

const GroupSkeleton = () => {
  return (
    <div className={styles.GroupSkeleton}>
      <Skeleton
        variant="rectangular"
        height={500}
        width={400}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        height={500}
        width={400}
        animation={false}
      />
      <Skeleton
        variant="rectangular"
        height={500}
        width={400}
        animation={false}
      />
    </div>
  );
};

export default GroupSkeleton;
