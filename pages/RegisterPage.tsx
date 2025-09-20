
import React, { useState } from 'react';
import ClientRegisterForm from '../components/ClientRegisterForm';
import VendorRegisterForm from '../components/VendorRegisterForm';

const RegisterPage: React.FC = () => {
  const [userType, setUserType] = useState<'client' | 'vendor'>('client');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 mb-8 flex justify-center gap-2">
        <button
          onClick={() => setUserType('client')}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${
            userType === 'client'
              ? 'bg-primary text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          I'm a Trucking Company (Client)
        </button>
        <button
          onClick={() => setUserType('vendor')}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-colors ${
            userType === 'vendor'
              ? 'bg-primary text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          I'm a Pilot Car Service (Vendor)
        </button>
      </div>
      
      {userType === 'client' ? <ClientRegisterForm /> : <VendorRegisterForm />}
    </div>
  );
};

export default RegisterPage;
