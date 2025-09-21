import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import { UserPlus } from 'lucide-react';
import { mockApi } from '../api/mockApi';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';

const ClientRegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        dotNumber: '',
        address: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const newUser = await mockApi.register({
                name: formData.contactName,
                email: formData.email,
                password: formData.password,
                role: UserRole.Client,
                companyName: formData.companyName,
                dotNumber: formData.dotNumber,
            });
            alert('Client registration successful!');
            login(newUser); // Automatically log in the new user
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-3xl font-bold text-center text-slate-800">Client Registration</h2>
                <p className="text-center text-slate-500 mt-1">Create an account for your trucking company.</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {error && <p className="md:col-span-2 bg-red-100 text-red-700 p-3 rounded-lg">{error}</p>}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="companyName">Company Name</label>
                        <input id="companyName" type="text" className={inputClasses} value={formData.companyName} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="contactName">Contact Name</label>
                        <input id="contactName" type="text" className={inputClasses} value={formData.contactName} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="dotNumber">DOT Number</label>
                        <input id="dotNumber" type="text" className={inputClasses} value={formData.dotNumber} onChange={handleChange} disabled={loading} />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="address">Company Address</label>
                        <textarea id="address" className={inputClasses} rows={3} value={formData.address} onChange={handleChange} disabled={loading}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">Email Address</label>
                        <input id="email" type="email" className={inputClasses} value={formData.email} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">Password</label>
                        <input id="password" type="password" className={inputClasses} value={formData.password} onChange={handleChange} required disabled={loading} />
                    </div>
                </CardContent>
                <CardFooter>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-400" disabled={loading}>
                        <UserPlus size={20} />
                        {loading ? 'Creating Account...' : 'Create Client Account'}
                    </button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ClientRegisterForm;
