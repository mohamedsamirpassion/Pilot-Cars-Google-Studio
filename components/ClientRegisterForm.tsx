
import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from './Card';
import { UserPlus } from 'lucide-react';

const ClientRegisterForm: React.FC = () => {
    // In a real app, this would use useState and handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Client registration submitted! (This is a demo)');
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-3xl font-bold text-center text-slate-800">Client Registration</h2>
                <p className="text-center text-slate-500 mt-1">Create an account for your trucking company.</p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="companyName">Company Name</label>
                        <input id="companyName" type="text" className="w-full input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="contactName">Contact Name</label>
                        <input id="contactName" type="text" className="w-full input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="dotNumber">DOT Number</label>
                        <input id="dotNumber" type="text" className="w-full input" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="address">Company Address</label>
                        <textarea id="address" className="w-full input" rows={3}></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">Email Address</label>
                        <input id="email" type="email" className="w-full input" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">Password</label>
                        <input id="password" type="password" className="w-full input" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                        <UserPlus size={20} />
                        Create Client Account
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

const ClientRegisterFormWithStyles: React.FC = () => (
    <>
        <GlobalStyles />
        <ClientRegisterForm />
    </>
);


export default ClientRegisterFormWithStyles;
