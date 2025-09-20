import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader } from '../Card';
import { PlusCircle, FileText, Compass, ChevronsRight, Loader } from 'lucide-react';
import { PilotOrder, OrderStatus, Vendor } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../api/mockApi';
import OrderDetailsModal from './OrderDetailsModal';

const ClientDashboard: React.FC = () => {
  const [orders, setOrders] = useState<PilotOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  const [selectedOrder, setSelectedOrder] = useState<PilotOrder | null>(null);
  const [assignedVendor, setAssignedVendor] = useState<Vendor | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const clientOrders = await mockApi.getOrdersForClient(user.id);
        setOrders(clientOrders);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const handleViewDetails = async (order: PilotOrder) => {
    setSelectedOrder(order);
    if (order.assignedVendorId) {
      try {
        const vendor = await mockApi.getVendorById(order.assignedVendorId);
        setAssignedVendor(vendor);
      } catch {
        setAssignedVendor(null); // Handle case where vendor might not be found
      }
    } else {
      setAssignedVendor(null);
    }
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedOrder(null);
    setAssignedVendor(null);
  };

  return (
    <>
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
                  {loading ? (
                      <div className="flex justify-center items-center p-16">
                          <Loader className="animate-spin text-primary" size={48} />
                      </div>
                  ) : error ? (
                      <p className="p-8 text-center text-red-600">{error}</p>
                  ) : orders.length === 0 ? (
                      <p className="p-8 text-center text-slate-500">You have no active orders.</p>
                  ) : (
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
                              {orders.map((order, index) => (
                                  <tr key={order.id} className={`border-t ${index === orders.length -1 ? '' : 'border-b'}`}>
                                      <td className="p-4 font-medium">{order.id}</td>
                                      <td className="p-4">{order.pickupAddress} to {order.deliveryAddress}</td>
                                      <td className="p-4">{order.pickupDate}</td>
                                      <td className="p-4">
                                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                              order.status === OrderStatus.Completed ? 'bg-green-100 text-green-800' :
                                              order.status === OrderStatus.InProgress ? 'bg-blue-100 text-blue-800' :
                                              order.status === OrderStatus.Assigned ? 'bg-cyan-100 text-cyan-800' :
                                              order.status === OrderStatus.New ? 'bg-emerald-100 text-emerald-800' :
                                              'bg-yellow-100 text-yellow-800'
                                          }`}>{order.status}</span>
                                      </td>
                                      <td className="p-4">
                                          <button onClick={() => handleViewDetails(order)} className="text-primary hover:underline flex items-center gap-1">View <ChevronsRight size={16}/></button>
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

      {isDetailsModalOpen && selectedOrder && (
          <OrderDetailsModal
              order={selectedOrder}
              assignedVendor={assignedVendor}
              onClose={handleCloseDetailsModal}
          />
      )}
    </>
  );
};

export default ClientDashboard;