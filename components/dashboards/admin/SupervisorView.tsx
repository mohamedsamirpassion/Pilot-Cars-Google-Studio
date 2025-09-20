import React, { useState, useEffect } from 'react';
import Card, { CardContent } from '../../Card';
import { PilotOrder, Permit } from '../../../types';
import { mockApi } from '../../../api/mockApi';
import { Loader } from 'lucide-react';
import LeadDispatcherDashboard from './LeadDispatcherDashboard';
import VendorMapView from './VendorMapView';

type Tab = 'dispatch' | 'permits' | 'map';

const OperationsOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dispatch');
  const [loads, setLoads] = useState<PilotOrder[]>([]);
  const [permits, setPermits] = useState<Permit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allLoads, allPermits] = await Promise.all([
          mockApi.getAllLoads(),
          mockApi.getAllPermits()
        ]);
        setLoads(allLoads);
        setPermits(allPermits);
      } catch (err) {
        setError('Failed to fetch operational data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>;
    }
    if (error) {
       return <p className="p-8 text-center text-red-600">{error}</p>;
    }
    switch(activeTab) {
        case 'dispatch':
            return <div className="overflow-x-auto"><DispatchTable loads={loads} /></div>;
        case 'permits':
            return <div className="overflow-x-auto"><PermitsTable permits={permits} /></div>;
        case 'map':
            return <VendorMapView />; // Render the map view directly
        default:
            return null;
    }
  }

  return (
    <Card>
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Operations Overview (Supervisor)</h2>
        <div className="flex gap-2 flex-wrap">
          <TabButton
            label="Dispatch Operations"
            isActive={activeTab === 'dispatch'}
            onClick={() => setActiveTab('dispatch')}
          />
          <TabButton
            label="Permit Operations"
            isActive={activeTab === 'permits'}
            onClick={() => setActiveTab('permits')}
          />
           <TabButton
            label="Live Map"
            isActive={activeTab === 'map'}
            onClick={() => setActiveTab('map')}
          />
        </div>
      </div>
      <CardContent className="p-0">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`font-bold py-2 px-4 rounded-lg transition-colors ${
        isActive ? 'bg-primary text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        }`}
    >
        {label}
    </button>
);

const DispatchTable: React.FC<{loads: PilotOrder[]}> = ({ loads }) => (
    <table className="w-full text-left">
        <thead className="bg-slate-50">
            <tr>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Route</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Assigned Dispatcher</th>
            </tr>
        </thead>
        <tbody>
            {loads.map((load, i) => (
                <tr key={load.id} className={`border-t ${i === loads.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{load.id}</td>
                    <td className="p-4">{load.pickupAddress} to {load.deliveryAddress}</td>
                    <td className="p-4">{load.status}</td>
                    <td className="p-4">{load.assignedDispatcherId || 'N/A'}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const PermitsTable: React.FC<{permits: Permit[]}> = ({ permits }) => (
     <table className="w-full text-left">
        <thead className="bg-slate-50">
            <tr>
                <th className="p-4 font-semibold">Permit ID</th>
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">State</th>
                <th className="p-4 font-semibold">Status</th>
            </tr>
        </thead>
        <tbody>
            {permits.map((p, i) => (
                <tr key={p.id} className={`border-t ${i === permits.length - 1 ? '' : 'border-b'}`}>
                    <td className="p-4 font-medium">{p.id}</td>
                    <td className="p-4">{p.clientName}</td>
                    <td className="p-4">{p.state}</td>
                    <td className="p-4">{p.status}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

const SupervisorView: React.FC = () => {
    return (
        <div className="space-y-8">
            <OperationsOverview />
            <LeadDispatcherDashboard />
        </div>
    );
};

export default SupervisorView;
