import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { PilotOrder, OrderStatus, Vendor } from '../../types';
import { mockApi } from '../../api/mockApi';
import { Loader, ChevronsRight, Inbox, Clock } from 'lucide-react';
import AssignPilotModal from './AssignPilotModal';

const LeadDispatcherView: React.FC = () => {
    const [newLoads, setNewLoads] = useState<PilotOrder[]>([]);
    const [pendingLoads, setPendingLoads] = useState<PilotOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Note: In a real app, vendors would be filtered based on proximity, availability, etc.
    const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<PilotOrder | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [newOrders, pendingOrders] = await Promise.all([
                    mockApi.getLoadsByStatus([OrderStatus.New]),
                    mockApi.getLoadsByStatus([OrderStatus.PendingAssignment])
                ]);
                setNewLoads(newOrders);
                setPendingLoads(pendingOrders);
                 // Mock fetching a few vendors for the assignment modal
                const vendor = await mockApi.getVendorById('vendor1');
                setAvailableVendors([vendor]);
            } catch (err) {
                setError('Failed to fetch loads.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOpenAssignModal = (order: PilotOrder) => {
        setSelectedOrder(order);
        setIsAssignModalOpen(true);
    };

    const handleCloseAssignModal = () => {
        setIsAssignModalOpen(false);
        setSelectedOrder(null);
    };

    const handleAssign = (orderId: string, vendor: Vendor) => {
        console.log(`Assigning vendor ${vendor.name} to order ${orderId}`);
        // Here you would make an API call to update the order status and assigned vendor
        alert(`Vendor ${vendor.name} assigned to order ${orderId}!`);
        handleCloseAssignModal();
    };


    if (loading) return <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>;
    if (error) return <p className="p-8 text-center text-red-600">{error}</p>;

    return (
        <>
            <div className="space-y-8">
                <Card>
                    <CardHeader className="flex items-center gap-3">
                        <Inbox className="text-primary"/>
                        <h2 className="text-2xl font-bold">New Loads for Assignment ({newLoads.length})</h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        <OrderTable orders={newLoads} onActionClick={handleOpenAssignModal} actionLabel="Assign" />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex items-center gap-3">
                        <Clock className="text-secondary" />
                        <h2 className="text-2xl font-bold">Loads Pending Review ({pendingLoads.length})</h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        <OrderTable orders={pendingLoads} onActionClick={(order) => alert(`Reviewing order ${order.id}`)} actionLabel="Review" />
                    </CardContent>
                </Card>
            </div>
            
            {isAssignModalOpen && selectedOrder && (
                <AssignPilotModal
                    order={selectedOrder}
                    vendors={availableVendors}
                    onClose={handleCloseAssignModal}
                    onAssign={handleAssign}
                />
            )}
        </>
    );
};

interface OrderTableProps {
    orders: PilotOrder[];
    onActionClick: (order: PilotOrder) => void;
    actionLabel: string;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, onActionClick, actionLabel }) => (
    <div className="overflow-x-auto">
        {orders.length === 0 ? (
            <p className="p-8 text-center text-slate-500">No loads in this category.</p>
        ) : (
            <table className="w-full text-left">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="p-4 font-semibold">Client</th>
                        <th className="p-4 font-semibold">Route</th>
                        <th className="p-4 font-semibold">Pickup Date</th>
                        <th className="p-4 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id} className={`border-t ${index === orders.length - 1 ? '' : 'border-b'}`}>
                            <td className="p-4 font-medium">{order.client.companyName || order.client.name}</td>
                            <td className="p-4">{order.pickupAddress} to {order.deliveryAddress}</td>
                            <td className="p-4">{order.pickupDate}</td>
                            <td className="p-4">
                                <button onClick={() => onActionClick(order)} className="text-primary hover:underline flex items-center gap-1 font-semibold">
                                    {actionLabel} <ChevronsRight size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
);


export default LeadDispatcherView;