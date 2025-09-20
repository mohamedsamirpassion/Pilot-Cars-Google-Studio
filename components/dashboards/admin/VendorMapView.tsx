import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, User, Briefcase, CheckCircle, XCircle, Search, Loader } from 'lucide-react';
// FIX: Import `MapMouseEvent` to use for the map click handler.
import type { MapMouseEvent } from '@vis.gl/react-google-maps';
import { Vendor, Location } from '../../../types';
import { mockApi } from '../../../api/mockApi';
import Card, { CardContent, CardHeader } from '../../Card';
import GoogleMap, { Marker, MarkerPin } from '../../GoogleMap';

// Simple distance calculation for sorting
const calculateDistance = (loc1: Location, loc2: {latitude: number, longitude: number}) => {
    const dx = loc1.latitude - loc2.latitude;
    const dy = loc1.longitude - loc2.longitude;
    return Math.sqrt(dx * dx + dy * dy);
};

const VendorMapView: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  
  const [isPinDropMode, setIsPinDropMode] = useState(false);
  const [searchPin, setSearchPin] = useState<{ latitude: number, longitude: number } | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const allVendors = await mockApi.getAllVendors();
        setVendors(allVendors);
      } catch (err) {
        setError('Failed to load vendor locations.');
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const locatedVendors = useMemo(() => vendors.filter(v => !!v.location), [vendors]);

  const nearbyVendors = useMemo(() => {
    if (!searchPin) return [];
    return locatedVendors
        .map(vendor => ({
            vendor,
            distance: calculateDistance(vendor.location!, searchPin)
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Show top 5 closest
  }, [searchPin, locatedVendors]);


  // FIX: Replaced `google.maps.MapMouseEvent` with the correct `MapMouseEvent` type and updated property access from `e.latLng` to `e.detail.latLng`.
  const handleMapClick = (e: MapMouseEvent) => {
    if (!isPinDropMode || !e.detail.latLng) return;
    
    setSearchPin({ latitude: e.detail.latLng.lat(), longitude: e.detail.latLng.lng() });
    setIsPinDropMode(false);
  };
  
  const handlePinClick = (e: React.MouseEvent, vendor: Vendor) => {
      e.stopPropagation(); // prevent map click event
      setSelectedVendor(vendor);
      setSearchPin(null);
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Live Vendor Map</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 sm:p-4">
        {/* Map Area */}
        <div className="md:col-span-2 h-96 lg:h-[600px] relative rounded-lg overflow-hidden bg-slate-200">
            <GoogleMap
                center={{ lat: 39.82, lng: -98.57 }}
                zoom={4}
                onClick={handleMapClick}
                className="w-full h-full"
            >
                {locatedVendors.map(vendor => (
                    <Marker 
                        key={vendor.id} 
                        position={{ lat: vendor.location!.latitude, lng: vendor.location!.longitude }}
                        onClick={(e) => handlePinClick(e.domEvent as any, vendor)}
                    >
                         <MarkerPin
                            background={selectedVendor?.id === vendor.id ? '#06b6d4' : '#1e293b'}
                            borderColor={selectedVendor?.id === vendor.id ? '#0891b2' : '#0f172a'}
                            glyphColor={'#ffffff'}
                        />
                    </Marker>
                ))}
                {searchPin && (
                    <Marker position={{ lat: searchPin.latitude, lng: searchPin.longitude }}>
                         <div className="p-1 bg-green-600 rounded-full shadow-lg">
                            <Search className="h-5 w-5 text-white" />
                         </div>
                    </Marker>
                )}
            </GoogleMap>
            {isPinDropMode && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl animate-pulse cursor-crosshair"
                 onClick={() => setIsPinDropMode(false)} // allow closing the mode
                >
                    Click on the map to drop a pin...
                </div>
            )}
        </div>

        {/* Info Panel */}
        <div className="h-96 lg:h-[600px] flex flex-col">
            <button 
                onClick={() => { setIsPinDropMode(true); setSelectedVendor(null); setSearchPin(null); }}
                className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 mb-4"
            >
                <Search size={18} /> Find Pilots Near Point
            </button>
             <div className="flex-grow bg-slate-50 p-4 rounded-lg overflow-y-auto">
                {loading && <div className="flex items-center justify-center h-full"><Loader className="animate-spin text-primary"/></div>}
                
                {selectedVendor && (
                    <div className="animate-fade-in">
                        <h3 className="font-bold text-lg text-primary border-b pb-2 mb-3">Vendor Details</h3>
                        <InfoItem icon={User} label="Name" value={selectedVendor.name} />
                        <InfoItem icon={Briefcase} label="Company" value={selectedVendor.companyName} />
                        <InfoItem icon={MapPin} label="Location" value={selectedVendor.location?.address} />
                        <InfoItem icon={CheckCircle} label="Status" value={selectedVendor.availability} />
                        <InfoItem icon={XCircle} label="Services" value={selectedVendor.services.join(', ')} />
                    </div>
                )}

                {searchPin && (
                    <div className="animate-fade-in">
                         <h3 className="font-bold text-lg text-green-700 border-b pb-2 mb-3">Closest Vendors</h3>
                         {nearbyVendors.length > 0 ? (
                            <ul className="space-y-3">
                                {nearbyVendors.map(({ vendor, distance }, index) => (
                                    <li key={vendor.id} className="p-2 border rounded-md hover:bg-slate-100 cursor-pointer" onClick={() => setSelectedVendor(vendor)}>
                                        <p className="font-semibold">{index + 1}. {vendor.name}</p>
                                        <p className="text-sm text-slate-500">{vendor.companyName} - {vendor.availability}</p>
                                        <p className="text-xs text-slate-400">Approx. {distance.toFixed(2)} units away</p>
                                    </li>
                                ))}
                            </ul>
                         ) : <p className="text-slate-500">No vendors found nearby.</p>}
                    </div>
                )}
                
                {!loading && !selectedVendor && !searchPin && (
                    <div className="text-center text-slate-500 pt-16">
                        <p>Click a pin on the map to see vendor details or use the search button to find pilots near a specific point.</p>
                    </div>
                )}
             </div>
        </div>
      </CardContent>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
    `}</style>
    </Card>
  );
};

const InfoItem: React.FC<{icon: React.ElementType, label: string, value?: string}> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start mb-3">
        <Icon className="h-5 w-5 text-slate-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
            <p className="text-xs font-bold text-slate-500 uppercase">{label}</p>
            <p className="text-slate-800">{value || 'N/A'}</p>
        </div>
    </div>
);


export default VendorMapView;