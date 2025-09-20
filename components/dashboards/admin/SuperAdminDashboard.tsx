import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../../Card';
import { User, UserRole } from '../../../types';
import { mockApi } from '../../../api/mockApi';
import { Loader, Users, Edit } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const allUsers = await mockApi.getAllUsers();
        setUsers(allUsers);
      } catch (err) {
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const roleDisplayNames: Record<UserRole, string> = {
    [UserRole.Client]: 'Client',
    [UserRole.Vendor]: 'Vendor',
    [UserRole.LeadDispatcher]: 'Lead Dispatcher',
    [UserRole.Dispatcher]: 'Dispatcher',
    [UserRole.Supervisor]: 'Supervisor',
    [UserRole.PermitAgent]: 'Permit Agent',
    [UserRole.ContentMarketing]: 'Marketing',
    [UserRole.SuperAdmin]: 'Super Admin',
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <Users className="text-primary" />
        <h2 className="text-2xl font-bold">User Management</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>
          ) : error ? (
            <p className="p-8 text-center text-red-600">{error}</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={`border-t ${index === users.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{roleDisplayNames[user.role] || user.role}</td>
                    <td className="p-4">
                      <button className="flex items-center gap-2 text-primary hover:underline">
                        <Edit size={14} /> Edit Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminDashboard;