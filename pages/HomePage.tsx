import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPinned, FileText, ArrowRight, Send, Briefcase, Check, Users, Quote } from 'lucide-react';

const ServiceCard: React.FC<{ icon: React.ElementType, title: string, children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="bg-primary-100 text-primary rounded-full p-3 inline-block mb-4">
            <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600">{children}</p>
    </div>
);

const HowItWorksStep: React.FC<{ icon: React.ElementType, title: string, description: string, step: number }> = ({ icon: Icon, title, description, step }) => (
    <div className="text-center relative">
        <div className="relative inline-block">
            <div className="w-20 h-20 bg-primary-100 text-primary rounded-full flex items-center justify-center mx-auto">
                <Icon size={40} />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                {step}
            </div>
        </div>
        <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const TestimonialCard: React.FC<{ quote: string, name: string, company: string }> = ({ quote, name, company }) => (
    <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <Quote className="text-primary-200 w-16 h-16 mx-auto mb-4" />
        <p className="text-slate-600 italic">"{quote}"</p>
        <p className="font-bold text-slate-800 mt-4">{name}</p>
        <p className="text-sm text-slate-500">{company}</p>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative bg-slate-900 rounded-xl shadow-lg overflow-hidden text-white -mt-8 -mx-4">
          <img 
            src="https://images.unsplash.com/photo-1622045492334-0a67232152c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Oversized load truck with a pilot car escort"
            className="absolute inset-0 w-full h-full object-cover brightness-50"
          />
          <div className="relative container mx-auto text-center py-28 px-6">
            <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
              Your Trusted Partner for Oversize Load Escorts & Permits
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-8 drop-shadow-md">
              We provide professional pilot car services and streamlined permitting to ensure your oversized loads arrive safely and on time, every time.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/order-pilot"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-700 text-white font-bold text-lg py-3 px-8 rounded-lg transition-transform hover:scale-105"
              >
                Get a Quote
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold text-lg py-3 px-8 rounded-lg transition-colors"
              >
                Become a Vendor
              </Link>
            </div>
          </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto">
        <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Comprehensive Logistical Support</h2>
            <p className="text-lg text-slate-500 mb-12">We offer everything you need for a successful oversize load journey.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard icon={ShieldCheck} title="Pilot Car Escorts">
            Our network of certified, professional pilot car operators ensures the safe passage of your load. We coordinate chase, lead, height pole, and steerable escorts.
          </ServiceCard>
          <ServiceCard icon={FileText} title="Hassle-Free Permitting">
            Navigating state and local regulations is complex. Our experts handle all the paperwork to secure the necessary oversize/overweight permits for your route.
          </ServiceCard>
          <ServiceCard icon={MapPinned} title="Expert Route Planning">
            We don't just escort; we plan. Our team analyzes routes to identify potential obstacles, ensuring the most efficient and safest path from start to finish.
          </ServiceCard>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="container mx-auto bg-slate-100 rounded-xl py-20">
         <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">Our Simple 3-Step Process</h2>
            <p className="text-lg text-slate-500 mb-16">Getting started is quick and easy.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 items-start">
            <HowItWorksStep step={1} icon={Send} title="Submit Your Request" description="Fill out our easy online form or give us a call with your load details, route, and requirements." />
            <HowItWorksStep step={2} icon={Briefcase} title="We Coordinate" description="Our expert dispatchers tap into our vast network to find the best pilots and secure all necessary permits." />
            <HowItWorksStep step={3} icon={Check} title="Safe Arrival" description="Your load is escorted professionally, with real-time communication, ensuring a safe and timely delivery." />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto">
        <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">What Our Clients Say</h2>
            <p className="text-lg text-slate-500 mb-12">We're proud to be a reliable partner for top trucking companies.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard name="David Chen" company="Heavy Haul Logistics" quote="Pilot Cars & Permits is our go-to for a reason. They're fast, professional, and their communication is top-notch. They make complex moves feel simple." />
            <TestimonialCard name="Maria Rodriguez" company="Wind Turbine Transport" quote="The permitting team saved us on a last-minute job across three states. I don't know how they did it so quickly, but we made our deadline. Incredible service." />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-white rounded-xl shadow-lg">
          <div className="container mx-auto text-center py-20 px-6">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Move Your Oversize Load?</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Let our team of experts handle the logistics, so you can focus on the road ahead. Get a fast, no-obligation quote today.
            </p>
            <Link
                to="/order-pilot"
                className="inline-flex items-center gap-2 bg-white hover:bg-primary-100 text-primary font-bold text-lg py-3 px-8 rounded-lg transition-transform hover:scale-105"
              >
                Request a Pilot Car Now
                <ArrowRight size={20} />
              </Link>
          </div>
      </section>
    </div>
  );
};

export default HomePage;