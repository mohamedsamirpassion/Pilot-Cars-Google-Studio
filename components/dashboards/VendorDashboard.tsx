import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../Card';
import { MapPin, Bell, ListChecks, ChevronsRight, CheckCircle, XCircle, Loader, Briefcase, Edit } from 'lucide-react';
import { PilotOrder, OrderStatus, Vendor } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../api/mockApi';
import OrderDetailsModal from './OrderDetailsModal';
import AvailableLoadsModal from './AvailableLoadsModal';
import UpdateProfileModal from './UpdateProfileModal';

const VendorDashboard: React.FC = () => {
    const { user } = useAuth();
    // Local UI state
    const [isSharing, setIsSharing] = useState(false);
    
    // Data state
    const [assignedLoads, setAssignedLoads] = useState<PilotOrder[]>([]);
    const [availableLoads, setAvailableLoads] = useState<PilotOrder[]>([]);
    const [vendorProfile, setVendorProfile] = useState<Vendor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal visibility state
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isAvailableLoadsModalOpen, setIsAvailableLoadsModalOpen] = useState(false);
    const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
    
    // State for selected items
    const [selectedOrder, setSelectedOrder] = useState<PilotOrder | null>(null);

    useEffect(() => {
        if (!user) return;
        
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [assigned, available, profile] = await Promise.all([
                    mockApi.getAssignedLoadsForVendor(user.id),
                    mockApi.getAvailableLoads(),
                    mockApi.getVendorById(user.id)
                ]);
                setAssignedLoads(assigned);
                setAvailableLoads(available);
                setVendorProfile(profile);
            } catch (err) {
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchDashboardData();
    }, [user]);

    // --- Handlers for Order Details ---
    const handleViewDetails = (order: PilotOrder) => {
        setSelectedOrder(order);
        setIsDetailsModalOpen(true);
    };
    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedOrder(null);
    };

    // --- Handlers for Available Loads ---
    const handleViewLoads = () => setIsAvailableLoadsModalOpen(true);
    const handleCloseAvailableLoadsModal = () => setIsAvailableLoadsModalOpen(false);
    const handleExpressInterest = (orderId: string) => {
        console.log(`Expressed interest in order ${orderId}`);
        // In a real app, this would make an API call.
        // For now, the modal handles its own "sent" state.
        alert(`Your interest for order ${orderId} has been sent to the dispatcher!`);
    };

    // --- Handlers for Profile Update ---
    const handleUpdateProfile = () => setIsUpdateProfileModalOpen(true);
    const handleCloseUpdateProfileModal = () => setIsUpdateProfileModalOpen(false);
    const handleSaveProfile = async (vendorId: string, updatedData: Partial<Vendor>) => {
        if (!vendorProfile) return;
        try {
            const updatedProfile = await mockApi.updateVendorProfile(vendorId, updatedData);
            setVendorProfile(updatedProfile);
            alert('Profile updated successfully!');
            handleCloseUpdateProfileModal();
        } catch (err) {
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <>
            <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Share Location Card */}
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
                    
                    {/* New Load Alerts Card */}
                    <Card className="h-full">
                        <CardContent className="text-center">
                            <Bell className="mx-auto h-12 w-12 text-primary mb-2" />
                            <h3 className="text-xl font-semibold">New Load Alerts</h3>
                            <p className="text-slate-500">There are <span className="font-bold text-primary">{availableLoads.length} new loads</span> available.</p>
                            <button onClick={handleViewLoads} className="mt-4 bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full">
                                <Briefcase size={18} /> View Loads
                            </button>
                        </CardContent>
                    </Card>
                    
                    {/* Profile & Credentials Card */}
                    <Card className="h-full">
                        <CardContent className="text-center">
                            <ListChecks className="mx-auto h-12 w-12 text-primary mb-2" />
                            <h3 className="text-xl font-semibold">Profile & Credentials</h3>
                            <div className="space-y-2 mt-4 text-left text-sm">
                                <p className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Insurance: Active</p>
                                <p className="flex items-center gap-2"><XCircle size={16} className="text-red-500"/> LA Permit: Expired</p>
                            </div>
                            <button onClick={handleUpdateProfile} className="mt-4 bg-secondary hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 w-full">
                                <Edit size={16} /> Update Profile
                            </button>
                        </CardContent>
                    </Card>
                </div>

                {/* Assigned Loads Table */}
                <Card>
                    <CardHeader>
                        <h2 className="text-2xl font-bold">Your Assigned Loads</h2>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="flex justify-center items-center p-16"><Loader className="animate-spin text-primary" size={48} /></div>
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
                                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${load.status === OrderStatus.InProgress ? 'bg-blue-100 text-blue-800' : 'bg-cyan-100 text-cyan-800'}`}>{load.status}</span>
                                                </td>
                                                <td className="p-4">
                                                    <button onClick={() => handleViewDetails(load)} className="text-primary hover:underline flex items-center gap-1">View <ChevronsRight size={16}/></button>
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
            
            {/* --- Modals --- */}
            {isDetailsModalOpen && selectedOrder && (
                <OrderDetailsModal order={selectedOrder} assignedVendor={null} onClose={handleCloseDetailsModal} />
            )}
            {isAvailableLoadsModalOpen && (
                <AvailableLoadsModal loads={availableLoads} onClose={handleCloseAvailableLoadsModal} onExpressInterest={handleExpressInterest} />
            )}
            {isUpdateProfileModalOpen && vendorProfile && (
                <UpdateProfileModal vendor={vendorProfile} onClose={handleCloseUpdateProfileModal} onSave={handleSaveProfile} />
            )}
        </>
    );
};

export default VendorDashboard;
