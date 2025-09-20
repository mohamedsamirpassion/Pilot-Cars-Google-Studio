import React, { useState, useEffect, useCallback } from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { PilotOrder, OrderStatus, Vendor } from '../../types';
import { mockApi } from '../../api/mockApi';
import { Loader, ChevronsRight, Inbox, Clock } from 'lucide-react';
import AssignPilotModal from './AssignPilotModal';
import ReviewAssignmentModal from './admin/ReviewAssignmentModal';

const LeadDispatcherView: React.FC = () => {
    const [newLoads, setNewLoads] = useState<PilotOrder[]>([]);
    const [pendingLoads, setPendingLoads] = useState<PilotOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // State for Assign modal
    const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [selectedOrderForAssignment, setSelectedOrderForAssignment] = useState<PilotOrder | null>(null);

    // State for Review modal
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedOrderForReview, setSelectedOrderForReview] = useState<PilotOrder | null>(null);

    const fetchData = useCallback(async () => {
        try {
            // setLoading(true); // Don't show full loader on refresh
            const [newOrders, pendingReviewOrders, allVendors] = await Promise.all([
                mockApi.getLoadsByStatus([OrderStatus.New]),
                mockApi.getLoadsByStatus([OrderStatus.PendingReview]),
                mockApi.getAllVendors()
            ]);
            setNewLoads(newOrders);
            setPendingLoads(pendingReviewOrders);
            setAvailableVendors(allVendors);
        } catch (err) {
            setError('Failed to fetch loads.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Assign Modal Handlers ---
    const handleOpenAssignModal = (order: PilotOrder) => {
        setSelectedOrderForAssignment(order);
        setIsAssignModalOpen(true);
    };

    const handleCloseAssignModal = () => {
        setIsAssignModalOpen(false);
        setSelectedOrderForAssignment(null);
    };

    const handleAssign = (orderId: string, vendor: Vendor) => {
        console.log(`Assigning vendor ${vendor.name} to order ${orderId}`);
        alert(`Vendor ${vendor.name} assigned to order ${orderId}! The order is now pending review.`);
        // In real app, API call would change status to PendingReview.
        fetchData(); 
        handleCloseAssignModal();
    };
    
    // --- Review Modal Handlers ---
    const handleOpenReviewModal = (order: PilotOrder) => {
        setSelectedOrderForReview(order);
        setIsReviewModalOpen(true);
    };
    
    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
        setSelectedOrderForReview(null);
    };
    
    const handleApprove = async (orderId: string) => {
        try {
            await mockApi.approveAssignment(orderId);
            alert(`Order ${orderId} has been approved and assigned.`);
            fetchData(); // Refresh data from API
        } catch (err: any) {
            alert(`Error approving order: ${err.message}`);
        } finally {
            handleCloseReviewModal();
        }
    };
    
    const handleDecline = async (orderId: string) => {
        try {
            await mockApi.declineAssignment(orderId);
            alert(`Order ${orderId} assignment has been declined. It is now back in the dispatcher's queue.`);
            fetchData(); // Refresh data from API
        } catch (err: any) {
            alert(`Error declining order: ${err.message}`);
        } finally {
            handleCloseReviewModal();
        }
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
                        <OrderTable orders={pendingLoads} onActionClick={handleOpenReviewModal} actionLabel="Review" />
                    </CardContent>
                </Card>
            </div>
            
            {isAssignModalOpen && selectedOrderForAssignment && (
                <AssignPilotModal
                    order={selectedOrderForAssignment}
                    vendors={availableVendors}
                    onClose={handleCloseAssignModal}
                    onAssign={handleAssign}
                />
            )}
            
            {isReviewModalOpen && selectedOrderForReview && (
                <ReviewAssignmentModal
                    order={selectedOrderForReview}
                    onClose={handleCloseReviewModal}
                    onApprove={handleApprove}
                    onDecline={handleDecline}
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