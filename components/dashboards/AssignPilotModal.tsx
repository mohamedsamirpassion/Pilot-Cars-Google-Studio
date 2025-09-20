import React, { useMemo } from 'react';
import { X, Star } from 'lucide-react';
import { PilotOrder, Vendor, VendorAvailability } from '../../types';

interface AssignPilotModalProps {
  order: PilotOrder;
  vendors: Vendor[];
  onClose: () => void;
  onAssign: (orderId: string, vendor: Vendor) => void;
}

const getStatusAppearance = (status: VendorAvailability) => {
    switch (status) {
        case VendorAvailability.Available: return 'bg-green-100 text-green-800';
        case VendorAvailability.OnLoad: return 'bg-blue-100 text-blue-800';
        case VendorAvailability.Unavailable: return 'bg-slate-200 text-slate-600';
        default: return 'bg-slate-100 text-slate-800';
    }
}

const AssignPilotModal: React.FC<AssignPilotModalProps> = ({ order, vendors, onClose, onAssign }) => {

  const sortedVendors = useMemo(() => {
    return [...vendors].sort((a, b) => {
        if (a.availability === VendorAvailability.Available && b.availability !== VendorAvailability.Available) return -1;
        if (a.availability !== VendorAvailability.Available && b.availability === VendorAvailability.Available) return 1;
        return 0; // Keep original order for same-status vendors
    });
  }, [vendors]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Assign Pilot to Order</h2>
            <p className="text-slate-500 font-medium">Order ID: <span className="text-primary">{order.id}</span></p>
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
        <div className="p-6 space-y-4 overflow-y-auto">
            <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700">Route Details</h3>
                <p className="text-sm text-slate-600">{order.pickupAddress} to {order.deliveryAddress}</p>
            </div>
            <div>
                <h3 className="font-semibold text-slate-700 mb-2">Available Vendors</h3>
                <div className="space-y-3">
                    {sortedVendors.length > 0 ? sortedVendors.map(vendor => (
                        <div key={vendor.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="font-semibold">{vendor.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Star size={14} className="text-yellow-500 fill-current" />
                                        <span>{vendor.rating}</span>
                                        <span>&bull;</span>
                                        <span>5 miles away</span> 
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${getStatusAppearance(vendor.availability)}`}>
                                    {vendor.availability}
                                </span>
                            </div>
                            <button 
                                onClick={() => onAssign(order.id, vendor)}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded-md text-sm disabled:bg-slate-400"
                                disabled={vendor.availability !== VendorAvailability.Available}
                            >
                                Assign
                            </button>
                        </div>
                    )) : (
                        <p className="text-center text-slate-500 py-4">No available vendors found.</p>
                    )}
                </div>
            </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50 border-t text-right">
            <button 
                onClick={onClose} 
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg"
            >
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

export default AssignPilotModal;