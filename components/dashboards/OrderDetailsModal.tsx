import React from 'react';
import { X, Truck, User, MapPin, Calendar, Phone, Star, Briefcase, FileText, DollarSign } from 'lucide-react';
import { PilotOrder, Vendor, OrderStatus } from '../../types';

interface OrderDetailsModalProps {
  order: PilotOrder;
  assignedVendor: Vendor | null;
  onClose: () => void;
}

const getStatusAppearance = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.Completed: return 'bg-green-100 text-green-800';
        case OrderStatus.InProgress: return 'bg-blue-100 text-blue-800';
        case OrderStatus.Assigned: return 'bg-cyan-100 text-cyan-800';
        case OrderStatus.New: return 'bg-emerald-100 text-emerald-800';
        case OrderStatus.PendingAssignment: return 'bg-yellow-100 text-yellow-800';
        case OrderStatus.Cancelled: return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
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


const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, assignedVendor, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Order Details</h2>
            <div className="flex items-center gap-3 mt-1">
                <p className="text-slate-500 font-medium">Order ID: <span className="text-primary">{order.id}</span></p>
                <span className={`px-2.5 py-0.5 text-sm font-bold rounded-full ${getStatusAppearance(order.status)}`}>{order.status}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto">
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-lg text-primary border-b pb-2 mb-3">Route & Schedule</h3>
                <DetailItem icon={MapPin} label="Pickup Address" value={order.pickupAddress} />
                <DetailItem icon={MapPin} label="Delivery Address" value={order.deliveryAddress} />
                <DetailItem icon={Calendar} label="Pickup Date & Time" value={`${order.pickupDate} at ${order.pickupTime}`} />
            </div>

            <div className="space-y-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-lg text-primary border-b pb-2 mb-3">Client & Driver</h3>
                <DetailItem icon={Briefcase} label="Client" value={order.client.companyName || order.client.name} />
                <DetailItem icon={User} label="Driver Name" value={order.driverName} />
                <DetailItem icon={Phone} label="Driver Phone" value={order.driverPhone} />
            </div>

            <div className="md:col-span-2 space-y-4 p-4 bg-slate-50 rounded-lg">
                <h3 className="font-bold text-lg text-primary border-b pb-2 mb-3">Load & Service Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailItem icon={FileText} label="Services Required" value={order.services.join(', ')} />
                    <DetailItem icon={DollarSign} label="Agreed Rate" value={order.rate || 'Not specified'} />
                </div>
            </div>

            {assignedVendor && (
                 <div className="md:col-span-2 space-y-4 p-4 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <h3 className="font-bold text-lg text-cyan-800 border-b border-cyan-200 pb-2 mb-3">Assigned Pilot</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailItem icon={User} label="Pilot Name" value={assignedVendor.name} />
                        <div className="flex items-start">
                            <Star className="h-5 w-5 text-slate-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-slate-800">Rating</p>
                                <p className="text-slate-600 flex items-center">{assignedVendor.rating} <Star size={14} className="ml-1 text-yellow-500 fill-current" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t text-right">
            <button 
                onClick={onClose} 
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg"
            >
                Close
            </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
        }
    `}</style>
    </div>
  );
};

export default OrderDetailsModal;