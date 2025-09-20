import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import DispatcherView from '../../components/dashboards/admin/DispatcherView';
import SupervisorView from '../../components/dashboards/admin/SupervisorView';
import PermitAgentDashboard from '../../components/dashboards/admin/PermitAgentDashboard';
import ContentMarketingDashboard from '../../components/dashboards/admin/ContentMarketingDashboard';
import SuperAdminDashboard from '../../components/dashboards/admin/SuperAdminDashboard';
import LeadDispatcherView from '../../components/dashboards/AdminDashboard'; 

const AdminRouter: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    }
    
    switch(user.role) {
        case UserRole.LeadDispatcher:
            return <LeadDispatcherView />;
        case UserRole.Dispatcher:
            return <DispatcherView />;
        case UserRole.Supervisor:
            return <SupervisorView />;
        case UserRole.PermitAgent:
            return <PermitAgentDashboard />;
        case UserRole.ContentMarketing:
            return <ContentMarketingDashboard />;
        case UserRole.SuperAdmin:
            return <SuperAdminDashboard />;
        default:
            return <p>You do not have access to an admin dashboard.</p>;
    }
};

export default AdminRouter;