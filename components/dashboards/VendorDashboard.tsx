
import React from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { MapPin, Bell, ListChecks, ChevronsRight, CheckCircle, XCircle } from 'lucide-react';
import { PilotOrder, PilotService, OrderStatus } from '../../types';

const mockAssignedLoads: PilotOrder[] = [
    { id: 'ORD-001', clientName: 'Heavy Haul Inc.', pickupAddress: 'Houston, TX', deliveryAddress: 'Dallas, TX', pickupDate: '2024-08-15', pickupTime: '08:00', services: [PilotService.ChaseLead], driverName: 'Mike T.', driverPhone: '555-1234', status: OrderStatus.Assigned, rate: '$2.50/mile' },
    { id: 'ORD-002', clientName: 'Big Movers LLC', pickupAddress: 'Austin, TX', deliveryAddress: 'San Antonio, TX', pickupDate: '2024-08-16', pickupTime: '10:00', services: [PilotService.HeightPole], driverName: 'Sarah J.', driverPhone: '555-5678', status: OrderStatus.InProgress, rate: '$300/day' },
];

const VendorDashboard: React.FC = () => {
    const [isSharing, setIsSharing] = React.useState(false);

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
                                {mockAssignedLoads.map((load, index) => (
                                    <tr key={load.id} className={`border-t ${index === mockAssignedLoads.length - 1 ? '' : 'border-b'}`}>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default VendorDashboard;
