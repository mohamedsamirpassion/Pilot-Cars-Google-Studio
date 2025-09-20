
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, UserRole } from '../types';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { LogIn } from 'lucide-react';

// Mock users for demonstration
const mockUsers: User[] = [
  { id: 'client1', email: 'client@trucking.com', name: 'John Doe', role: UserRole.Client, companyName: 'Heavy Haul Inc.', dotNumber: '123456' },
  { id: 'vendor1', email: 'vendor@pilot.com', name: 'Jane Smith', role: UserRole.Vendor, companyName: 'Safe Escorts LLC' },
  { id: 'admin1', email: 'admin@pilotcars.com', name: 'Admin User', role: UserRole.LeadDispatcher },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email);
    if (user) { // In a real app, you'd check the password
      login(user);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center text-slate-800">Login to your Account</h1>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="text-sm text-center text-slate-500">
                <p>Use 'client@trucking.com', 'vendor@pilot.com', or 'admin@pilotcars.com' to log in.</p>
                <p>Password can be anything.</p>
            </div>
          </CardContent>
          <CardFooter>
            <button type="submit" className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <LogIn size={20} />
              Login
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
