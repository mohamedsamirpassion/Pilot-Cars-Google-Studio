import React, { useState, useEffect, useMemo } from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { Layers, Map, UserCheck, Plus, Search, Loader } from 'lucide-react';
import { PilotOrder, Vendor, OrderStatus } from '../../types';
import AssignPilotModal from './AssignPilotModal';
import { mockApi } from '../../api/mockApi';

const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState<PilotOrder[]>([]);
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<PilotOrder | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [fetchedOrders, fetchedVendors] = await Promise.all([
                    mockApi.getAllOrders(),
                    mockApi.getAllVendors()
                ]);
                setOrders(fetchedOrders);
                setVendors(fetchedVendors);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const vendorMap = useMemo(() => {
        return vendors.reduce((acc, vendor) => {
            acc[vendor.id] = vendor;
            return acc;
        }, {} as Record<string, Vendor>);
    }, [vendors]);

    const handleOpenModal = (order: PilotOrder) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleAssignPilot = async (orderId: string, vendor: Vendor) => {
        try {
            const updatedOrder = await mockApi.assignPilotToOrder(orderId, vendor);
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? updatedOrder : order
                )
            );
            handleCloseModal();
            alert(`Successfully assigned ${vendor.name} to order ${orderId}.`);
        } catch (err) {
            alert('Failed to assign pilot. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <>
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
                                            <th className="p-4 font-semibold">Client / Assigned</th>
                                            <th className="p-4 font-semibold">Route</th>
                                            <th className="p-4 font-semibold">Pickup</th>
                                            <th className="p-4 font-semibold">Status</th>
                                            <th className="p-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                             <tr key={order.id} className={`border-t ${index === orders.length - 1 ? '' : 'border-b'}`}>
                                                <td className="p-4">
                                                    <p className="font-medium">{order.client.companyName || order.client.name}</p>
                                                    {order.assignedVendorId && vendorMap[order.assignedVendorId] && (
                                                        <p className="text-xs text-slate-500">Pilot: {vendorMap[order.assignedVendorId].name}</p>
                                                    )}
                                                </td>
                                                <td className="p-4">{order.pickupAddress} <br/> to {order.deliveryAddress}</td>
                                                <td className="p-4">{order.pickupDate}</td>
                                                <td className="p-4">
                                                     <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                        order.status === OrderStatus.Assigned ? 'bg-cyan-100 text-cyan-800' :
                                                        order.status === OrderStatus.New ? 'bg-green-100 text-green-800' :
                                                        order.status === OrderStatus.InProgress ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>{order.status}</span>
                                                </td>
                                                <td className="p-4">
                                                    {(order.status === OrderStatus.New || order.status === OrderStatus.PendingAssignment) && (
                                                    <button 
                                                        onClick={() => handleOpenModal(order)}
                                                        className="bg-primary hover:bg-primary-700 text-white font-bold py-1 px-3 rounded-md text-sm"
                                                    >
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
                                {vendors.map(vendor => (
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
            {isModalOpen && selectedOrder && (
                <AssignPilotModal 
                    order={selectedOrder} 
                    vendors={vendors.filter(v => v.availability === 'Available')}
                    onClose={handleCloseModal}
                    onAssign={handleAssignPilot}
                />
            )}
        </>
    );
};

export default AdminDashboard;
