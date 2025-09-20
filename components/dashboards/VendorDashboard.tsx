import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { MapPin, Bell, ListChecks, ChevronsRight, CheckCircle, XCircle, Loader } from 'lucide-react';
import { PilotOrder, OrderStatus } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../api/mockApi';

const VendorDashboard: React.FC = () => {
    const [isSharing, setIsSharing] = useState(false);
    const [assignedLoads, setAssignedLoads] = useState<PilotOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchLoads = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const loads = await mockApi.getAssignedLoadsForVendor(user.id);
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
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="h-full">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <MapPin className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold mb-3">Share Location</h3>
                        <p className="text-slate-500 mb-4">Let dispatchers know you're available for loads.</p>
                        <button 
                            onClick={() => setIsSharing(!isSharing)}
                            className={`w-full font-bold py-2 px-4 rounded-lg transition-colors ${
                                isSharing 
                                ? 'bg-red-500 hover:bg-red-600 text-white' 
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                        >
                            {isSharing ? 'Stop Sharing' : 'Start Sharing'}
                        </button>
                        {isSharing && <p className="text-xs text-green-600 mt-2 font-medium">Location shared: Austin, TX (as of 2 mins ago)</p>}
                    </CardContent>
                </Card>
                <Card className="h-full">
                    <CardContent className="text-center">
                        <Bell className="mx-auto h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">New Load Alerts</h3>
                        <p className="text-slate-500">You have <span className="font-bold text-primary">3 new loads</span> available in your area.</p>
                        <button className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded-lg">View Loads</button>
                    </CardContent>
                </Card>
                <Card className="h-full">
                    <CardContent className="text-center">
                        <ListChecks className="mx-auto h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">Profile & Credentials</h3>
                        <div className="space-y-2 mt-4 text-left">
                            <p className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Insurance: Active</p>
                            <p className="flex items-center gap-2"><XCircle size={16} className="text-red-500"/> LA Permit: Expired</p>
                        </div>
                        <button className="mt-4 bg-secondary text-white font-bold py-2 px-4 rounded-lg">Update Profile</button>
                    </CardContent>
                </Card>
            </div>

            {/* Assigned Loads */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Your Assigned Loads</h2>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center p-16">
                                <Loader className="animate-spin text-primary" size={48} />
                            </div>
                        ) : error ? (
                             <p className="p-8 text-center text-red-600">{error}</p>
                        ) : assignedLoads.length === 0 ? (
                            <p className="p-8 text-center text-slate-500">You have no loads assigned to you.</p>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="p-4 font-semibold">Pickup</th>
                                        <th className="p-4 font-semibold">Route</th>
                                        <th className="p-4 font-semibold">Rate</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assignedLoads.map((load, index) => (
                                        <tr key={load.id} className={`border-t ${index === assignedLoads.length - 1 ? '' : 'border-b'}`}>
                                            <td className="p-4">{load.pickupDate} @ {load.pickupTime}</td>
                                            <td className="p-4">{load.pickupAddress} to {load.deliveryAddress}</td>
                                            <td className="p-4 font-medium text-slate-700">{load.rate}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                    load.status === OrderStatus.InProgress ? 'bg-blue-100 text-blue-800' :
                                                    'bg-cyan-100 text-cyan-800'
                                                }`}>{load.status}</span>
                                            </td>
                                            <td className="p-4">
                                                <button className="text-primary hover:underline flex items-center gap-1">View <ChevronsRight size={16}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VendorDashboard;
