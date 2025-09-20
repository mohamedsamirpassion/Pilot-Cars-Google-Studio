import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import ClientDashboard from '../components/dashboards/ClientDashboard';
import VendorDashboard from '../components/dashboards/VendorDashboard';
import AdminRouter from './admin/AdminRouter';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center">Loading user data...</div>;
  }
  
  const isAdminRole = [
      UserRole.LeadDispatcher, 
      UserRole.Dispatcher, 
      UserRole.Supervisor, 
      UserRole.PermitAgent,
      UserRole.ContentMarketing,
      UserRole.SuperAdmin,
  ].includes(user.role);

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800 mb-2">Dashboard</h1>
      <p className="text-lg text-slate-500 mb-8">Welcome back, {user.name}!</p>
      
      {user.role === UserRole.Client && <ClientDashboard />}
      {user.role === UserRole.Vendor && <VendorDashboard />}
      {isAdminRole && <AdminRouter />}
    </div>
  );
};

export default DashboardPage;