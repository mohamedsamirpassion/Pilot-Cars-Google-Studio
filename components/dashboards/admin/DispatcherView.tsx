import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../../Card';
import { PilotOrder } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { mockApi } from '../../../api/mockApi';
import { Loader, UserCheck } from 'lucide-react';

const DispatcherView: React.FC = () => {
  const { user } = useAuth();
  const [assignedLoads, setAssignedLoads] = useState<PilotOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchLoads = async () => {
      try {
        setLoading(true);
        const loads = await mockApi.getLoadsAssignedToDispatcher(user.id);
        setAssignedLoads(loads);
      } catch (err) {
        setError('Failed to fetch assigned loads.');
      } finally {
        setLoading(false);
      }
    };
    fetchLoads();
  }, [user]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <UserCheck className="text-primary"/>
        <h2 className="text-2xl font-bold">Your Assigned Loads</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>
          ) : error ? (
            <p className="p-8 text-center text-red-600">{error}</p>
          ) : assignedLoads.length === 0 ? (
            <p className="p-8 text-center text-slate-500">You have no loads to work on right now.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 font-semibold">Order ID</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">Route</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {assignedLoads.map((load, index) => (
                  <tr key={load.id} className={`border-t ${index === assignedLoads.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{load.id}</td>
                    <td className="p-4">{load.client.companyName}</td>
                    <td className="p-4">{load.pickupAddress} to {load.deliveryAddress}</td>
                    <td className="p-4">
                      <button className="font-semibold text-primary hover:underline">Find Pilot</button>
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

export default DispatcherView;