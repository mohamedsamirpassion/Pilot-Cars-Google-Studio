
import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader } from '../Card';
import { PlusCircle, FileText, Compass, ChevronsRight } from 'lucide-react';
import { PilotOrder, PilotService, OrderStatus } from '../../types';

const mockOrders: PilotOrder[] = [
    { id: 'ORD-001', clientName: 'Heavy Haul Inc.', pickupAddress: 'Houston, TX', deliveryAddress: 'Dallas, TX', pickupDate: '2024-08-15', pickupTime: '08:00', services: [PilotService.ChaseLead], driverName: 'Mike T.', driverPhone: '555-1234', status: OrderStatus.Assigned, assignedVendor: 'Safe Escorts LLC', rate: '$2.50/mile' },
    { id: 'ORD-002', clientName: 'Heavy Haul Inc.', pickupAddress: 'Austin, TX', deliveryAddress: 'San Antonio, TX', pickupDate: '2024-08-16', pickupTime: '10:00', services: [PilotService.HeightPole], driverName: 'Sarah J.', driverPhone: '555-5678', status: OrderStatus.InProgress, assignedVendor: 'Tall Load Pros', rate: '$300/day' },
    { id: 'ORD-003', clientName: 'Heavy Haul Inc.', pickupAddress: 'El Paso, TX', deliveryAddress: 'Lubbock, TX', pickupDate: '2024-08-18', pickupTime: '09:00', services: [PilotService.ChaseLead, PilotService.Steer], driverName: 'Carlos R.', driverPhone: '555-9012', status: OrderStatus.PendingAssignment, rate: 'Pending' },
];

const ClientDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/order-pilot" className="block">
          <Card className="hover:shadow-xl hover:border-primary border-2 border-transparent transition-all h-full">
            <CardContent className="text-center">
              <PlusCircle className="mx-auto h-12 w-12 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Order a Pilot Car</h3>
              <p className="text-slate-500">Quickly request an escort for your next load.</p>
            </CardContent>
          </Card>
        </Link>
        <Card className="h-full">
          <CardContent className="text-center text-slate-400">
            <FileText className="mx-auto h-12 w-12 mb-2" />
            <h3 className="text-xl font-semibold">Order a Permit</h3>
            <p>(Feature coming soon)</p>
          </CardContent>
        </Card>
         <Card className="h-full">
          <CardContent className="text-center text-slate-400">
            <Compass className="mx-auto h-12 w-12 mb-2" />
            <h3 className="text-xl font-semibold">Plan a Load</h3>
            <p>(Feature coming soon)</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Orders */}
      <Card>
        <CardHeader>
            <h2 className="text-2xl font-bold">Your Active Orders</h2>
        </CardHeader>
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="p-4 font-semibold">Order ID</th>
                            <th className="p-4 font-semibold">Route</th>
                            <th className="p-4 font-semibold">Pickup Date</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map((order, index) => (
                            <tr key={order.id} className={`border-t ${index === mockOrders.length -1 ? '' : 'border-b'}`}>
                                <td className="p-4 font-medium">{order.id}</td>
                                <td className="p-4">{order.pickupAddress} to {order.deliveryAddress}</td>
                                <td className="p-4">{order.pickupDate}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                        order.status === OrderStatus.Completed ? 'bg-green-100 text-green-800' :
                                        order.status === OrderStatus.InProgress ? 'bg-blue-100 text-blue-800' :
                                        order.status === OrderStatus.Assigned ? 'bg-cyan-100 text-cyan-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>{order.status}</span>
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

export default ClientDashboard;
