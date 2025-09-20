
import React from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { Layers, Map, UserCheck, Plus, Search } from 'lucide-react';
import { PilotOrder, Vendor, PilotService, OrderStatus } from '../../types';

const mockOrders: PilotOrder[] = [
    { id: 'ORD-003', clientName: 'Heavy Haul Inc.', pickupAddress: 'El Paso, TX', deliveryAddress: 'Lubbock, TX', pickupDate: '2024-08-18', pickupTime: '09:00', services: [PilotService.ChaseLead, PilotService.Steer], driverName: 'Carlos R.', driverPhone: '555-9012', status: OrderStatus.PendingAssignment, rate: 'Pending' },
    { id: 'ORD-004', clientName: 'Wide Loads Co', pickupAddress: 'Denver, CO', deliveryAddress: 'Salt Lake City, UT', pickupDate: '2024-08-19', pickupTime: '07:00', services: [PilotService.RouteSurvey], driverName: 'Anna K.', driverPhone: '555-3344', status: OrderStatus.New, rate: 'Pending' },
     { id: 'ORD-001', clientName: 'Heavy Haul Inc.', pickupAddress: 'Houston, TX', deliveryAddress: 'Dallas, TX', pickupDate: '2024-08-15', pickupTime: '08:00', services: [PilotService.ChaseLead], driverName: 'Mike T.', driverPhone: '555-1234', status: OrderStatus.Assigned, assignedVendor: 'Safe Escorts LLC', rate: '$2.50/mile' },
];

const mockVendors: Vendor[] = [
    { id: 'vendor1', name: 'Safe Escorts LLC', services: [PilotService.ChaseLead, PilotService.HeightPole], location: {lat: 30.26, lng: -97.74, timestamp: '5 mins ago'}, availability: 'Available', rating: 4.8 },
    { id: 'vendor2', name: 'Road Guardians', services: [PilotService.Steer], location: {lat: 29.76, lng: -95.36, timestamp: '12 mins ago'}, availability: 'Available', rating: 4.5 },
    { id: 'vendor3', name: 'Tall Load Pros', services: [PilotService.HeightPole, PilotService.RouteSurvey], location: {lat: 32.77, lng: -96.79, timestamp: '1 hour ago'}, availability: 'Unavailable', rating: 4.9 },
]

const AdminDashboard: React.FC = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content: Load Management */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Load Management</h2>
                     <button className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
                        <Plus size={20} />
                        Create New Load
                    </button>
                </div>
                <Card>
                    <CardContent className="p-0">
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="p-4 font-semibold">Client</th>
                                        <th className="p-4 font-semibold">Route</th>
                                        <th className="p-4 font-semibold">Pickup</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockOrders.map((order, index) => (
                                         <tr key={order.id} className={`border-t ${index === mockOrders.length - 1 ? '' : 'border-b'}`}>
                                            <td className="p-4 font-medium">{order.clientName}</td>
                                            <td className="p-4">{order.pickupAddress} <br/> to {order.deliveryAddress}</td>
                                            <td className="p-4">{order.pickupDate}</td>
                                            <td className="p-4">
                                                 <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                    order.status === OrderStatus.Assigned ? 'bg-cyan-100 text-cyan-800' :
                                                    order.status === OrderStatus.New ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>{order.status}</span>
                                            </td>
                                            <td className="p-4">
                                                {order.status !== OrderStatus.Assigned && (
                                                <button className="bg-primary hover:bg-primary-700 text-white font-bold py-1 px-3 rounded-md text-sm">
                                                    Assign Pilot
                                                </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar: Vendor Map & List */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold">Vendor Locations</h2>
                <Card>
                    <CardHeader className="p-0">
                        <div className="bg-slate-200 h-56 flex items-center justify-center">
                            <Map size={48} className="text-slate-400"/>
                             <p className="ml-4 text-slate-500">Live Map Placeholder</p>
                        </div>
                    </CardHeader>
                    <CardContent>
                         <div className="relative">
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                             <input type="text" placeholder="Search by location..." className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-lg"/>
                         </div>
                         <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                            {mockVendors.map(vendor => (
                                <div key={vendor.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                                    <div>
                                        <p className="font-semibold">{vendor.name}</p>
                                        <p className="text-sm text-slate-500">Updated: {vendor.location.timestamp}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${vendor.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'}`}>
                                        {vendor.availability}
                                    </span>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
