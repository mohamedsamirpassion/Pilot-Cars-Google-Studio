
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import VendorDashboard from '../components/dashboards/VendorDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const renderDashboard = () => {
    switch (user.role) {
      case UserRole.Client:
        return <ClientDashboard />;
      case UserRole.Vendor:
        return <VendorDashboard />;
      default: // All admin roles
        return <AdminDashboard />;
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Welcome to your Dashboard, <span className="text-primary">{user.name}</span>!
      </h1>
      {renderDashboard()}
    </div>
  );
};

export default DashboardPage;
