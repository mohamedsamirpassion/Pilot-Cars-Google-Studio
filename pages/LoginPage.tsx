import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../api/mockApi';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { LogIn, Users } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('client@test.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await mockApi.login(email, password);
      login(user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password');
  }

  const demoAccounts = [
    { role: 'Client', email: 'client@test.com' },
    { role: 'Vendor', email: 'vendor@test.com' },
    { role: 'Lead Dispatcher', email: 'lead.dispatcher@pilotcars.com' },
    { role: 'Dispatcher', email: 'dispatcher@pilotcars.com' },
    { role: 'Permit Agent', email: 'permit.agent@pilotcars.com' },
    { role: 'Supervisor', email: 'supervisor@pilotcars.com' },
    { role: 'Content Marketing', email: 'marketing@pilotcars.com' },
    { role: 'Super Admin', email: 'super.admin@pilotcars.com' },
  ];
  
  const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-100";

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-slate-800">Login</h1>
          <p className="text-center text-slate-500 mt-1">Access your dashboard.</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">Email</label>
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className={inputClasses}
                required 
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">Password</label>
              <input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={inputClasses} 
                required 
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-slate-400" 
              disabled={loading}
            >
              <LogIn size={20} />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </CardFooter>
        </form>
      </Card>

      <Card className="mt-8">
        <CardHeader className="flex items-center gap-3">
          <Users className="text-primary" />
          <h2 className="text-xl font-bold text-slate-800">Demo Accounts</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">Click an account to fill the form. The password for all accounts is: <strong className="text-slate-600">password</strong></p>
          <div className="space-y-2">
            {demoAccounts.map(account => (
              <button key={account.email} onClick={() => handleDemoLogin(account.email)} className="w-full text-left p-2 rounded-md hover:bg-slate-100">
                <span className="font-semibold text-primary">{account.role}:</span>
                <span className="ml-2 text-slate-700">{account.email}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
};

export default LoginPage;
