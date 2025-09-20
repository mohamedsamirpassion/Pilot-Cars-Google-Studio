
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPinned, FileText, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="bg-white rounded-xl shadow-lg py-20 px-6">
        <h1 className="text-5xl font-extrabold text-primary mb-4">
          Seamless Pilot Car & Permit Solutions
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Your one-stop solution for coordinating pilot car escorts and securing oversized load permits. Fast, reliable, and nationwide.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/order-pilot"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-700 text-white font-bold text-lg py-3 px-8 rounded-lg transition-transform hover:scale-105"
          >
            Order a Pilot Car
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-lg py-3 px-8 rounded-lg transition-transform hover:scale-105"
          >
            Become a Vendor
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">Why Choose Us?</h2>
        <p className="text-lg text-slate-500 mb-12">We streamline the complexities of oversize load logistics.</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-primary-100 text-primary rounded-full p-3 inline-block mb-4">
                <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Expert Coordination</h3>
            <p className="text-slate-600">
              Our experienced dispatchers find the best-qualified and most cost-effective escorts for your specific load requirements.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-primary-100 text-primary rounded-full p-3 inline-block mb-4">
                <FileText size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Hassle-Free Permits</h3>
            <p className="text-slate-600">
              We handle all the paperwork and communication with DOT agencies to secure your permits quickly and efficiently.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-primary-100 text-primary rounded-full p-3 inline-block mb-4">
                <MapPinned size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Vast Vendor Network</h3>
            <p className="text-slate-600">
              Gain access to our extensive network of professional pilot car vendors across the country, ready to serve you.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
