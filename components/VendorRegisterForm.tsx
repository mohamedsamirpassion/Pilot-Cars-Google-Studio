import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import { PilotService, UserRole, Credential } from '../types';
import { UserPlus } from 'lucide-react';
import { mockApi } from '../api/mockApi';
import { useAuth } from '../context/AuthContext';


const VendorRegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        password: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        services: new Set<PilotService>(),
        numCars: '',
        dlExpiry: '',
        certWitpac: false,
        certInsurance: false,
        certLaPermit: false,
        showGL: false,
        glAmount: '',
        glExpiry: '',
        showCA: false,
        caAmount: '',
        showOther: false,
        otherDesc: '',
        otherExpiry: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleServiceChange = (service: PilotService) => {
        setFormData(prev => {
            const newServices = new Set(prev.services);
            if (newServices.has(service)) {
                newServices.delete(service);
            } else {
                newServices.add(service);
            }
            return { ...prev, services: newServices };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.services.size === 0) {
            setError('Please select at least one service.');
            setLoading(false);
            return;
        }

        const credentials: Credential[] = [];
        if (formData.showGL) {
            credentials.push({
                id: 'cred_gl',
                name: 'General Liability Insurance',
                amount: formData.glAmount ? parseInt(formData.glAmount, 10) : undefined,
                expiryDate: formData.glExpiry || undefined,
            });
        }
        if (formData.showCA) {
            credentials.push({
                id: 'cred_ca',
                name: 'Commercial Automotive Insurance',
                amount: formData.caAmount ? parseInt(formData.caAmount, 10) : undefined,
            });
        }
        // You could add more credentials here based on other form fields

        try {
            const newUser = await mockApi.register({
                name: formData.contactName,
                email: formData.email,
                password: formData.password,
                role: UserRole.Vendor,
                companyName: formData.companyName,
                address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`,
                services: Array.from(formData.services),
                credentials,
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
                            <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required disabled={loading} />
                            <InputField label="Contact Name" name="contactName" value={formData.contactName} onChange={handleChange} required disabled={loading} />
                            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={loading} />
                            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={loading} />
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
                                        <input type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" onChange={() => handleServiceChange(service)} checked={formData.services.has(service)} disabled={loading}/>
                                        <span>{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                             <InputField label="Number of Cars" name="numCars" type="number" placeholder="e.g., 5" min="0" value={formData.numCars} onChange={handleChange} disabled={loading} />
                        </div>
                    </div>

                    {/* Section 3: Address */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">3. Address</h3>
                        <div>
                            <InputField label="Street Address" name="street" placeholder="123 Main St" required value={formData.street} onChange={handleChange} disabled={loading} />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                                 <input type="text" className="input" name="city" placeholder="City" required value={formData.city} onChange={handleChange} disabled={loading}/>
                                 <input type="text" className="input" name="state" placeholder="State" required value={formData.state} onChange={handleChange} disabled={loading}/>
                                 <input type="text" className="input" name="zip" placeholder="Zip Code" required value={formData.zip} onChange={handleChange} disabled={loading}/>
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
                                    <CheckboxLabel label="WITPAC Certified" name="certWitpac" checked={formData.certWitpac} onChange={handleChange} disabled={loading}/>
                                    <CheckboxLabel label="$1 Million Insurance" name="certInsurance" checked={formData.certInsurance} onChange={handleChange} disabled={loading}/>
                                    <CheckboxLabel label="LA Permit" name="certLaPermit" checked={formData.certLaPermit} onChange={handleChange} disabled={loading}/>
                                </div>
                            </div>
                            <div>
                                <InputField label="Driving License Expiry Date" name="dlExpiry" type="date" value={formData.dlExpiry} onChange={handleChange} disabled={loading}/>
                            </div>
                        </div>
                    </div>

                    {/* Section 5: Insurance Details */}
                    <div className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold text-primary mb-4">5. Insurance Details (Optional)</h3>
                        <div className="space-y-4">
                            {/* General Liability */}
                            <div>
                                <CheckboxLabel label="General Liability Insurance" name="showGL" checked={formData.showGL} onChange={handleChange} disabled={loading}/>
                                {formData.showGL && (
                                    <div className="grid grid-cols-2 gap-4 mt-2 pl-6">
                                        <InputField label="Amount ($)" name="glAmount" type="number" placeholder="e.g., 1000000" value={formData.glAmount} onChange={handleChange} disabled={loading}/>
                                        <InputField label="Expiry Date" name="glExpiry" type="date" value={formData.glExpiry} onChange={handleChange} disabled={loading}/>
                                    </div>
                                )}
                            </div>
                            {/* Commercial Automotive */}
                             <div>
                                <CheckboxLabel label="Commercial Automotive Insurance" name="showCA" checked={formData.showCA} onChange={handleChange} disabled={loading}/>
                                {formData.showCA && (
                                    <div className="mt-2 pl-6">
                                        <InputField label="Amount ($)" name="caAmount" type="number" placeholder="e.g., 500000" value={formData.caAmount} onChange={handleChange} disabled={loading}/>
                                    </div>
                                )}
                            </div>
                             {/* Other */}
                            <div>
                                <CheckboxLabel label="Other(s)" name="showOther" checked={formData.showOther} onChange={handleChange} disabled={loading}/>
                                {formData.showOther && (
                                    <div className="space-y-2 mt-2 pl-6">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-500 mb-1" htmlFor="other_desc">Description</label>
                                            <textarea id="other_desc" name="otherDesc" className="input" rows={3} placeholder="Describe other insurance or certifications..." value={formData.otherDesc} onChange={handleChange} disabled={loading}></textarea>
                                        </div>
                                        <InputField label="Expiry Date" name="otherExpiry" type="date" value={formData.otherExpiry} onChange={handleChange} disabled={loading}/>
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

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string}> = ({label, name, ...props}) => (
     <div>
        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor={name}>{label}</label>
        <input name={name} id={name} {...props} className="input" />
    </div>
);


const CheckboxLabel: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string}> = ({label, name, ...props}) => (
    <label htmlFor={name} className="flex items-center gap-2 font-medium">
        <input name={name} id={name} type="checkbox" {...props} className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded"/>
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