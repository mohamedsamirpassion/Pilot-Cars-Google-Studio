import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { LogIn } from 'lucide-react';
import { mockApi } from '../api/mockApi';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await mockApi.login(email, password);
      if (user) {
        login(user);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
            <div className="text-sm text-center text-slate-500 bg-slate-100 p-2 rounded-md">
                <p className="font-semibold">Demo Accounts:</p>
                <p>client@trucking.com</p>
                <p>vendor@pilot.com</p>
                <p>admin@pilotcars.com</p>
                <p>(Password is: <span className="font-mono">password</span>)</p>
            </div>
          </CardContent>
          <CardFooter>
            <button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400"
                disabled={loading}
            >
              <LogIn size={20} />
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
