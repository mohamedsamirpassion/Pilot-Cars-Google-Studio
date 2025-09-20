import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Vendor, PilotService, Credential } from '../../types';

interface UpdateProfileModalProps {
  vendor: Vendor;
  onClose: () => void;
  onSave: (vendorId: string, updatedData: Partial<Vendor>) => Promise<void>;
}

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ vendor, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Vendor>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
        name: vendor.name,
        companyName: vendor.companyName,
        email: vendor.email,
        address: vendor.address,
        services: [...(vendor.services || [])],
        credentials: vendor.credentials ? vendor.credentials.map(c => ({...c})) : [] // Deep copy
    });
  }, [vendor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleServiceChange = (service: PilotService) => {
    const currentServices = formData.services || [];
    const newServices = currentServices.includes(service)
        ? currentServices.filter(s => s !== service)
        : [...currentServices, service];
    setFormData({ ...formData, services: newServices });
  };

  const handleCredentialChange = (credId: string, newDate: string) => {
    setFormData(prev => ({
        ...prev,
        credentials: (prev.credentials || []).map(cred => 
            cred.id === credId ? { ...cred, expiryDate: newDate } : cred
        ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(vendor.id, formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">Update Your Profile</h2>
          <button type="button" onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Contact Name" name="name" value={formData.name || ''} onChange={handleChange} />
                <InputField label="Company Name" name="companyName" value={formData.companyName || ''} onChange={handleChange} />
            </div>
             <InputField label="Email Address" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
             <InputField label="Address" name="address" value={formData.address || ''} onChange={handleChange} />

             <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Services Provided</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {Object.values(PilotService).map(service => (
                        <label key={service} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-slate-50">
                            <input 
                                type="checkbox"
                                checked={formData.services?.includes(service) ?? false}
                                onChange={() => handleServiceChange(service)}
                                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"
                            />
                            <span>{service}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">Manage Credentials</h3>
                <div className="space-y-4">
                    {(formData.credentials || []).map(cred => (
                         <div key={cred.id} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 items-center">
                            <label className="font-medium text-slate-700" htmlFor={`cred-${cred.id}`}>{cred.name} Expiry</label>
                            <input
                                id={`cred-${cred.id}`}
                                type="date"
                                value={cred.expiryDate || ''}
                                onChange={(e) => handleCredentialChange(cred.id, e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                         </div>
                    ))}
                     {(!formData.credentials || formData.credentials.length === 0) && (
                        <p className="text-sm text-slate-500 text-center">No credentials on file.</p>
                     )}
                </div>
            </div>
        </div>

        <div className="p-6 bg-slate-50 border-t flex justify-end items-center gap-4">
          <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2" disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};


const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor={props.id || props.name}>{label}</label>
        <input 
            {...props}
            id={props.id || props.name}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

export default UpdateProfileModal;