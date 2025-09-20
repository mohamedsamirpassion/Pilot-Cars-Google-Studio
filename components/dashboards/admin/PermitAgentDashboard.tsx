import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../../Card';
import { Permit, PermitStatus } from '../../../types';
import { mockApi } from '../../../api/mockApi';
import { Loader, FileText } from 'lucide-react';

const PermitAgentDashboard: React.FC = () => {
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        setLoading(true);
        const allPermits = await mockApi.getAllPermits();
        setPermits(allPermits);
      } catch (err) {
        setError('Failed to load permits.');
      } finally {
        setLoading(false);
      }
    };
    fetchPermits();
  }, []);

  const getStatusClass = (status: PermitStatus) => {
    switch (status) {
      case PermitStatus.Issued: return 'bg-green-100 text-green-800';
      case PermitStatus.Processing: return 'bg-blue-100 text-blue-800';
      case PermitStatus.Requested: return 'bg-yellow-100 text-yellow-800';
      case PermitStatus.Rejected: return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <FileText className="text-primary"/>
        <h2 className="text-2xl font-bold">Permit Management</h2>
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
                  <th className="p-4 font-semibold">Permit ID</th>
                  <th className="p-4 font-semibold">Client</th>
                  <th className="p-4 font-semibold">State</th>
                  <th className="p-4 font-semibold">Submitted</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {permits.map((permit, index) => (
                  <tr key={permit.id} className={`border-t ${index === permits.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{permit.id}</td>
                    <td className="p-4">{permit.clientName}</td>
                    <td className="p-4">{permit.state}</td>
                    <td className="p-4">{permit.submittedDate}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusClass(permit.status)}`}>
                        {permit.status}
                      </span>
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

export default PermitAgentDashboard;