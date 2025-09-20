import React, { useState } from 'react';
import { X, Loader, CheckCircle } from 'lucide-react';
import { PilotOrder } from '../../types';

interface AvailableLoadsModalProps {
  loads: PilotOrder[];
  onClose: () => void;
  onExpressInterest: (orderId: string) => void;
}

const AvailableLoadsModal: React.FC<AvailableLoadsModalProps> = ({ loads, onClose, onExpressInterest }) => {
  const [interestedLoads, setInterestedLoads] = useState<Set<string>>(new Set());

  const handleInterestClick = (orderId: string) => {
    onExpressInterest(orderId);
    setInterestedLoads(prev => new Set(prev).add(orderId));
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Available Loads</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="p-2 md:p-6 overflow-y-auto">
          {loads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 font-semibold">Route</th>
                    <th className="p-4 font-semibold">Pickup Date</th>
                    <th className="p-4 font-semibold">Services</th>
                    <th className="p-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loads.map((load) => (
                    <tr key={load.id} className="border-b">
                      <td className="p-4">{load.pickupAddress} to {load.deliveryAddress}</td>
                      <td className="p-4">{load.pickupDate}</td>
                      <td className="p-4 text-sm">{load.services.join(', ')}</td>
                      <td className="p-4 text-center">
                        {interestedLoads.has(load.id) ? (
                          <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                            <CheckCircle size={16} />
                            Interest Sent
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleInterestClick(load.id)}
                            className="bg-primary hover:bg-primary-700 text-white font-bold py-1 px-3 rounded-md text-sm"
                          >
                            Express Interest
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-slate-500 py-12">No available loads at the moment.</p>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t text-right">
          <button onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableLoadsModal;
