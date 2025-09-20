
import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import { PilotService } from '../types';
import { UserPlus } from 'lucide-react';

const VendorRegisterForm: React.FC = () => {
    // In a real app, this would use useState and handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Vendor registration submitted! (This is a demo)');
    };
    
    const services = Object.values(PilotService);

    return (
        <Card>
            <CardHeader>
                <h2 className="text-3xl font-bold text-center text-slate-800">Vendor Registration</h2>
                <p className="text-center text-slate-500 mt-1">Join our network of professional pilot car escorts.</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_companyName">Company Name</label>
                            <input id="v_companyName" type="text" className="input" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_contactName">Contact Name</label>
                            <input id="v_contactName" type="text" className="input" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Services Provided (select at least one)</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                        {services.map(service => (
                            <label key={service} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-slate-50">
                                <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"/>
                                <span>{service}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_address">Address</label>
                        <input id="v_address" type="text" className="input" placeholder="Street Address" required />
                        <div className="grid grid-cols-3 gap-2 mt-2">
                             <input type="text" className="input" placeholder="City" required />
                             <input type="text" className="input" placeholder="State" required />
                             <input type="text" className="input" placeholder="Zip Code" required />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_email">Email Address</label>
                            <input id="v_email" type="email" className="input" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_password">Password</label>
                            <input id="v_password" type="password" className="input" required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                         <UserPlus size={20} />
                        Create Vendor Account
                    </button>
                </CardFooter>
            </form>
        </Card>
    );
};

// Add this style to your index.html or a global CSS file if you extract it.
// For simplicity, Tailwind will pick it up from here if it's in a JS/TS file.
const GlobalStyles = () => (
    <style>{`
        .input {
            @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary;
        }
    `}</style>
);

const VendorRegisterFormWithStyles: React.FC = () => (
    <>
        <GlobalStyles />
        <VendorRegisterForm />
    </>
);

export default VendorRegisterFormWithStyles;
