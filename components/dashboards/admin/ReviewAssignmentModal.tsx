import React, { useState, useEffect } from 'react';
import { X, Check, ThumbsDown, Loader, User, MapPin, Calendar, Briefcase, Star, Truck } from 'lucide-react';
import { PilotOrder, Vendor } from '../../../types';
import { mockApi } from '../../../api/mockApi';

interface ReviewAssignmentModalProps {
  order: PilotOrder;
  onClose: () => void;
  onApprove: (orderId: string) => void;
  onDecline: (orderId: string) => void;
}

const DetailItem: React.FC<{icon: React.ElementType, label: string, value: React.ReactNode}> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start">
        <Icon className="h-5 w-5 text-slate-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
            <p className="font-semibold text-slate-800">{label}</p>
            <p className="text-slate-600">{value}</p>
        </div>
    </div>
);

const ReviewAssignmentModal: React.FC<ReviewAssignmentModalProps> = ({ order, onClose, onApprove, onDecline }) => {
    const [assignedVendor, setAssignedVendor] = useState<Vendor | null>(null);
    const [loadingVendor, setLoadingVendor] = useState(true);

    useEffect(() => {
        if (!order.assignedVendorId) {
            setLoadingVendor(false);
            return;
        }
        const fetchVendor = async () => {
            try {
                setLoadingVendor(true);
                const vendor = await mockApi.getVendorById(order.assignedVendorId!);
                setAssignedVendor(vendor);
            } catch (error) {
                console.error("Failed to fetch vendor", error);
            } finally {
                setLoadingVendor(false);
            }
        };
        fetchVendor();
    }, [order.assignedVendorId]);
    
    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Review Pilot Assignment</h2>
                <p className="text-slate-500 font-medium">Order ID: <span className="text-primary">{order.id}</span></p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-bold text-lg text-primary border-b pb-2 mb-3">Order Details</h3>
                    <DetailItem icon={Briefcase} label="Client" value={order.client.companyName || order.client.name} />
                    <DetailItem icon={MapPin} label="Route" value={`${order.pickupAddress} to ${order.deliveryAddress}`} />
                    <DetailItem icon={Calendar} label="Pickup" value={`${order.pickupDate} at ${order.pickupTime}`} />
                </div>

                <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-bold text-lg text-yellow-800 border-b border-yellow-200 pb-2 mb-3">Proposed Pilot</h3>
                    {loadingVendor ? (
                        <div className="flex items-center justify-center h-full">
                            <Loader className="animate-spin text-primary" />
                        </div>
                    ) : assignedVendor ? (
                        <>
                            <DetailItem icon={User} label="Vendor" value={assignedVendor.companyName || assignedVendor.name} />
                            <DetailItem icon={Star} label="Rating" value={`${assignedVendor.rating} / 5.0`} />
                            <DetailItem icon={Truck} label="Services" value={assignedVendor.services.join(', ')} />
                        </>
                    ) : (
                        <p className="text-red-600">Could not load vendor details.</p>
                    )}
                </div>
            </div>

            <div className="p-6 bg-slate-50 border-t flex justify-end items-center gap-4">
              <button onClick={() => onDecline(order.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2">
                <ThumbsDown size={18} />
                Decline
              </button>
              <button onClick={() => onApprove(order.id)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2">
                <Check size={18} />
                Approve
              </button>
            </div>
          </div>
        </div>
    );
};

export default ReviewAssignmentModal;
