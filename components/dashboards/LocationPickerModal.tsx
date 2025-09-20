import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
// FIX: Import `MapMouseEvent` to use for the map click handler.
import type { MapMouseEvent } from '@vis.gl/react-google-maps';
import GoogleMap, { Marker, MarkerPin } from '../GoogleMap';

interface LocationPickerModalProps {
  onClose: () => void;
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({ onClose, onLocationSelect }) => {
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  
  // FIX: Replaced `google.maps.MapMouseEvent` with the correct `MapMouseEvent` type and updated property access from `e.latLng` to `e.detail.latLng`.
  const handleMapClick = (e: MapMouseEvent) => {
    if (e.detail.latLng) {
      setSelectedCoords({ lat: e.detail.latLng.lat(), lng: e.detail.latLng.lng() });
    }
  };
  
  const handleConfirm = () => {
      if (selectedCoords) {
          onLocationSelect(selectedCoords);
      }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Select Location on Map</h2>
            <p className="text-slate-500">Click anywhere on the map to drop a pin.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-grow relative">
            <GoogleMap
                center={{ lat: 39.82, lng: -98.57 }} // Center of USA
                zoom={4}
                onClick={handleMapClick}
                className="w-full h-full"
            >
                {selectedCoords && (
                    <Marker position={selectedCoords}>
                        <MarkerPin
                            background={'#ef4444'}
                            borderColor={'#b91c1c'}
                            glyphColor={'#ffffff'}
                        />
                    </Marker>
                )}
            </GoogleMap>
        </div>

        <div className="p-4 bg-slate-50 border-t flex justify-between items-center">
          <div className="text-sm text-slate-600">
            {selectedCoords 
                ? `Selected: ${selectedCoords.lat.toFixed(4)}, ${selectedCoords.lng.toFixed(4)}`
                : 'No location selected.'
            }
          </div>
          <div className="flex gap-4">
             <button onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-6 rounded-lg">
                Cancel
            </button>
            <button 
                onClick={handleConfirm} 
                disabled={!selectedCoords}
                className="bg-primary hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
                <Check size={18}/> Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationPickerModal;