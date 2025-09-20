import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import { PilotService, UserRole } from '../types';
import { UserPlus } from 'lucide-react';
import { mockApi } from '../api/mockApi';
import { useAuth } from '../context/AuthContext';


const VendorRegisterForm: React.FC = () => {
    const [showGeneralLiability, setShowGeneralLiability] = useState(false);
    const [showCommercialAuto, setShowCommercialAuto] = useState(false);
    const [showOther, setShowOther] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        // In a real app, you would collect all form data from state
        // For this demo, we'll use a few key fields
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('v_email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('v_password') as HTMLInputElement).value;
        const contactName = (form.elements.namedItem('v_contactName') as HTMLInputElement).value;
        const companyName = (form.elements.namedItem('v_companyName') as HTMLInputElement).value;

        try {
            const newUser = await mockApi.register({
                name: contactName,
                email: email,
                password: password,
                role: UserRole.Vendor,
                companyName: companyName,
            });
            alert('Vendor registration successful!');
            login(newUser);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    const services = Object.values(PilotService);

    return (
        <Card>
            <CardHeader>
                <h2 className="text-3xl font-bold text-center text-slate-800">Vendor Registration</h2>
                <p className="text-center text-slate-500 mt-1">Join our network of professional pilot car escorts.</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</p>}
                    {/* Section 1: Company Info */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">1. Company Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_companyName">Company Name</label>
                                <input id="v_companyName" name="v_companyName" type="text" className="input" required disabled={loading}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_contactName">Contact Name</label>
                                <input id="v_contactName" name="v_contactName" type="text" className="input" required disabled={loading}/>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_email">Email Address</label>
                                <input id="v_email" name="v_email" type="email" className="input" required disabled={loading}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_password">Password</label>
                                <input id="v_password" name="v_password" type="password" className="input" required disabled={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Services & Fleet */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">2. Services & Fleet</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Services Provided (select at least one)</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {services.map(service => (
                                    <label key={service} className="flex items-center gap-2 p-3 border rounded-lg hover:bg-slate-50">
                                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={loading}/>
                                        <span>{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                             <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="numCars">Number of Cars</label>
                             <input id="numCars" type="number" className="input" placeholder="e.g., 5" min="0" disabled={loading}/>
                        </div>
                    </div>

                    {/* Section 3: Address */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">3. Address</h3>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="v_address">Street Address</label>
                            <input id="v_address" type="text" className="input" placeholder="123 Main St" required disabled={loading}/>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                                 <input type="text" className="input" placeholder="City" required disabled={loading}/>
                                 <input type="text" className="input" placeholder="State" required disabled={loading}/>
                                 <input type="text" className="input" placeholder="Zip Code" required disabled={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Credentials */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">4. Credentials & Equipment (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-2">Car Equipment & Certs</label>
                                <div className="space-y-2">
                                    <CheckboxLabel label="WITPAC Certified" id="cert_witpac" disabled={loading}/>
                                    <CheckboxLabel label="$1 Million Insurance" id="cert_insurance" disabled={loading}/>
                                    <CheckboxLabel label="LA Permit" id="cert_la_permit" disabled={loading}/>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="dl_expiry">Driving License Expiry Date</label>
                                <input id="dl_expiry" type="date" className="input" disabled={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Insurance Details */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">5. Insurance Details (Optional)</h3>
                        <div className="space-y-4">
                            {/* General Liability */}
                            <div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={showGeneralLiability} onChange={(e) => setShowGeneralLiability(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={loading}/>
                                    <span className="font-medium">General Liability Insurance</span>
                                </label>
                                {showGeneralLiability && (
                                    <div className="grid grid-cols-2 gap-4 mt-2 pl-6">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="gl_amount">Amount ($)</label>
                                            <input id="gl_amount" type="number" placeholder="e.g., 1000000" className="input" disabled={loading}/>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="gl_expiry">Expiry Date</label>
                                            <input id="gl_expiry" type="date" className="input" disabled={loading}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Commercial Automotive */}
                             <div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={showCommercialAuto} onChange={(e) => setShowCommercialAuto(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={loading}/>
                                    <span className="font-medium">Commercial Automotive Insurance</span>
                                </label>
                                {showCommercialAuto && (
                                    <div className="mt-2 pl-6">
                                        <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="ca_amount">Amount ($)</label>
                                        <input id="ca_amount" type="number" placeholder="e.g., 500000" className="input" disabled={loading}/>
                                    </div>
                                )}
                            </div>
                             {/* Other */}
                            <div>
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" checked={showOther} onChange={(e) => setShowOther(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={loading}/>
                                    <span className="font-medium">Other(s)</span>
                                </label>
                                {showOther && (
                                    <div className="space-y-2 mt-2 pl-6">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="other_desc">Description</label>
                                            <textarea id="other_desc" className="input" rows={3} placeholder="Describe other insurance or certifications..." disabled={loading}></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="other_expiry">Expiry Date</label>
                                            <input id="other_expiry" type="date" className="input" disabled={loading}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-400" disabled={loading}>
                         <UserPlus size={20} />
                        {loading ? 'Creating Account...' : 'Create Vendor Account'}
                    </button>
                </CardFooter>
            </form>
        </Card>
    );
};

const CheckboxLabel: React.FC<{label: string, id: string, disabled?: boolean}> = ({label, id, disabled}) => (
    <label htmlFor={id} className="flex items-center gap-2">
        <input id={id} type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" disabled={disabled}/>
        <span>{label}</span>
    </label>
);

const GlobalStyles = () => (
    <style>{`
        .input {
            @apply w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100;
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
