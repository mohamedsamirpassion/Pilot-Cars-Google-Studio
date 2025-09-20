import React from 'react';
import LeadDispatcherSpecificViews from './LeadDispatcherSpecificViews';
import DispatcherView from './DispatcherView';
import VendorMapView from './VendorMapView';

const LeadDispatcherDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <LeadDispatcherSpecificViews />
      <VendorMapView />
      <DispatcherView />
    </div>
  );
};

export default LeadDispatcherDashboard;
