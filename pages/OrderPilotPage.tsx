
import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { useAuth } from '../context/AuthContext';
import { PilotService } from '../types';
import { Send } from 'lucide-react';

const OrderPilotPage: React.FC = () => {
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pilot car order submitted! Our team will contact you shortly. (This is a demo)');
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
                    <InputField label="Company Name" id="companyName" defaultValue={user?.companyName} required />
                    <InputField label="DOT Number" id="dotNumber" defaultValue={user?.dotNumber} />
                    <InputField label="Contact Name" id="contactName" defaultValue={user?.name} required />
                    <InputField label="Email" id="email" type="email" defaultValue={user?.email} required />
                    <InputField label="Phone Number" id="phone" type="tel" required />
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="preferredContact">Preferred Contact</label>
                        <select id="preferredContact" className="input">
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
                        <textarea id="pickupAddress" className="input" rows={3} required></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="deliveryAddress">Delivery Address</label>
                        <textarea id="deliveryAddress" className="input" rows={3} required></textarea>
                    </div>
                     <InputField label="Pickup Date" id="pickupDate" type="date" required />
                     <InputField label="Pickup Time" id="pickupTime" type="time" required />
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
                                    <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"/>
                                    <span>{service}</span>
                                </label>
                            ))}
                         </div>
                    </div>
                    <div>
                        <InputField label="Driver Name" id="driverName" required />
                        <InputField label="Driver Phone" id="driverPhone" type="tel" required />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <InputField label="Length (ft)" id="length" required />
                    <InputField label="Width (ft)" id="width" required />
                    <InputField label="Height (ft)" id="height" required />
                    <InputField label="Weight (lbs)" id="weight" required />
                 </div>
                 <div className="mt-4">
                     <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="additionalNotes">Additional Notes</label>
                     <textarea id="additionalNotes" className="input" rows={3}></textarea>
                 </div>
            </div>

             {/* Section 4: Payment */}
             <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-4">4. Payment Information</h3>
                <InputField label="PO Number" id="po" />
                 <div>
                    <label className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" required/>
                        <span>Pay with Credit Card (4% processing fee applies)</span>
                    </label>
                </div>
                <div className="mt-4 bg-slate-100 p-3 rounded-lg text-sm text-slate-600">
                    <p className="font-semibold">Credit Card Authorization:</p>
                    <p>We'll temporarily set aside an estimated amount on your card. After service completion, we'll adjust to match the final invoice total.</p>
                </div>
                 <div className="mt-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" required/>
                        <span>I agree to the payment terms.</span>
                    </label>
                </div>
             </div>

          </CardContent>
          <CardFooter>
            <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-lg">
                <Send size={20} />
                Submit Order
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

// Add this style to your index.html or a global CSS file if you extract it.
// For simplicity, Tailwind will pick it up from here if it's in a JS/TS file.
const GlobalStyles = () => (
    <style>{`
        .input {
            @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary;
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
