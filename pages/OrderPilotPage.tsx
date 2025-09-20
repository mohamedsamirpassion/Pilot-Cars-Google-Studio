import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { useAuth } from '../context/AuthContext';
// FIX: Import `UserRole` to use the enum member instead of a string literal.
import { PilotService, PilotOrder, UserRole } from '../types';
import { Send } from 'lucide-react';
import { mockApi } from '../api/mockApi';

const OrderPilotPage: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const services = Array.from(formData.keys())
      .filter(key => key.startsWith('service-'))
      .map(key => formData.get(key) as PilotService);

    const orderData: Omit<PilotOrder, 'id' | 'status'> = {
        // FIX: Replaced the string literal 'CLIENT' with `UserRole.Client` to match the expected `UserRole` enum type.
        client: user ? { id: user.id, name: user.name, email: user.email, role: user.role, companyName: user.companyName } : { id: 'guest', name: formData.get('contactName') as string, email: formData.get('email') as string, role: UserRole.Client, companyName: formData.get('companyName') as string },
        pickupAddress: formData.get('pickupAddress') as string,
        deliveryAddress: formData.get('deliveryAddress') as string,
        pickupDate: formData.get('pickupDate') as string,
        pickupTime: formData.get('pickupTime') as string,
        services: services,
        driverName: formData.get('driverName') as string,
        driverPhone: formData.get('driverPhone') as string,
        rate: 'Pending',
    };

    try {
        await mockApi.submitOrder(orderData);
        alert('Pilot car order submitted! Our team will contact you shortly.');
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    } catch (err) {
        alert('There was an error submitting your order. Please try again.');
    } finally {
        setLoading(false);
    }
  };
  
  const services = Object.values(PilotService);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-slate-800">Order a Pilot Car</h1>
          <p className="text-center text-slate-500 mt-1">Fill out the form below to request an escort.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Section 1: Company & Contact */}
            <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">1. Company & Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Company Name" id="companyName" name="companyName" defaultValue={user?.companyName} required disabled={loading} />
                    <InputField label="DOT Number" id="dotNumber" name="dotNumber" defaultValue={user?.dotNumber} disabled={loading} />
                    <InputField label="Contact Name" id="contactName" name="contactName" defaultValue={user?.name} required disabled={loading} />
                    <InputField label="Email" id="email" name="email" type="email" defaultValue={user?.email} required disabled={loading} />
                    <InputField label="Phone Number" id="phone" name="phone" type="tel" required disabled={loading} />
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="preferredContact">Preferred Contact</label>
                        <select id="preferredContact" name="preferredContact" className="input" disabled={loading}>
                            <option>Phone</option>
                            <option>Email</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Section 2: Pickup & Delivery */}
            <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">2. Pickup & Delivery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="pickupAddress">Pickup Address</label>
                        <textarea id="pickupAddress" name="pickupAddress" className="input" rows={3} required disabled={loading}></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="deliveryAddress">Delivery Address</label>
                        <textarea id="deliveryAddress" name="deliveryAddress" className="input" rows={3} required disabled={loading}></textarea>
                    </div>
                     <InputField label="Pickup Date" id="pickupDate" name="pickupDate" type="date" required disabled={loading} />
                     <InputField label="Pickup Time" id="pickupTime" name="pickupTime" type="time" required disabled={loading} />
                </div>
            </div>

            {/* Section 3: Service & Load Details */}
            <div className="p-4 border rounded-lg">
                 <h3 className="text-lg font-semibold text-primary mb-4">3. Service & Load Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                         <label className="block text-sm font-medium text-slate-600 mb-2">Pilot Car Position (select at least one)</label>
                         <div className="space-y-2">
                             {services.map(service => (
                                <label key={service} className="flex items-center gap-2">
                                    <input type="checkbox" name={`service-${service}`} value={service} className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={loading}/>
                                    <span>{service}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                    <div>
                        <InputField label="Driver Name" id="driverName" name="driverName" required disabled={loading}/>
                        <InputField label="Driver Phone" id="driverPhone" name="driverPhone" type="tel" required disabled={loading}/>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <InputField label="Length (ft)" id="length" name="length" required disabled={loading}/>
                    <InputField label="Width (ft)" id="width" name="width" required disabled={loading}/>
                    <InputField label="Height (ft)" id="height" name="height" required disabled={loading}/>
                    <InputField label="Weight (lbs)" id="weight" name="weight" required disabled={loading}/>
                 </div>
                 <div className="mt-4">
                     <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="additionalNotes">Additional Notes</label>
                     <textarea id="additionalNotes" name="additionalNotes" className="input" rows={3} disabled={loading}></textarea>
                 </div>
            </div>

             {/* Section 4: Payment */}
             <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">4. Payment Information</h3>
                <InputField label="PO Number" id="po" name="po" disabled={loading} />
                 <div>
                    <label className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" required disabled={loading}/>
                        <span>Pay with Credit Card (4% processing fee applies)</span>
                    </label>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded-lg text-sm text-slate-600">
                    <p className="font-semibold">Credit Card Authorization:</p>
                    <p>We'll temporarily set aside an estimated amount on your card. After service completion, we'll adjust to match the final invoice total.</p>
                </div>
                 <div className="mt-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" required disabled={loading}/>
                        <span>I agree to the payment terms.</span>
                    </label>
                </div>
             </div>

          </CardContent>
          <CardFooter>
            <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg disabled:bg-slate-400" disabled={loading}>
                <Send size={20} />
                {loading ? 'Submitting...' : 'Submit Order'}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor={id}>{label}</label>
        <input id={id} {...props} className="input" />
    </div>
);

const GlobalStyles = () => (
    <style>{`
        .input {
            @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100;
        }
    `}</style>
);

const OrderPilotPageWithStyles: React.FC = () => (
    <>
        <GlobalStyles />
        <OrderPilotPage />
    </>
);


export default OrderPilotPageWithStyles;