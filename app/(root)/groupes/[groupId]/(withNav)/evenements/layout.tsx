import GroupEventsNav from '@/components/group-events/group-events-nav/GroupEventsNav';
import React from 'react';

type EventsLayoutProps = {
  children: React.ReactNode;
  params: {
    groupId: string;
  };
};

const EventsLayout = ({ children, params }: EventsLayoutProps) => {
  return (
    <div>
      <GroupEventsNav groupId={params.groupId} />
      {children}
    </div>
  );
};

export default EventsLayout;
