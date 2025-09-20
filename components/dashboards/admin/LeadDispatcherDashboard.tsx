import React from 'react';
import LeadDispatcherSpecificViews from './LeadDispatcherSpecificViews';
import DispatcherView from './DispatcherView';

const LeadDispatcherDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <LeadDispatcherSpecificViews />
      <DispatcherView />
    </div>
  );
};

export default LeadDispatcherDashboard;
