import React, { useState } from 'react';
import { X, MapPin, Check } from 'lucide-react';

interface LocationPickerModalProps {
  onClose: () => void;
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({ onClose, onLocationSelect }) => {
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // In a real map, you'd convert pixel coordinates to lat/lng.
    // Here, we'll just simulate it.
    const mockLat = 50 - (y / rect.height) * 25; // Example range: 25 to 50
    const mockLng = -120 + (x / rect.width) * 50; // Example range: -70 to -120

    setPinPosition({ x, y });
    setSelectedCoords({ lat: mockLat, lng: mockLng });
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
        
        <div className="flex-grow p-4 relative" onClick={handleMapClick}>
            <img 
                src="https://images.unsplash.com/photo-1567114631382-fa58a4356a52?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Map of the USA"
                className="absolute inset-0 w-full h-full object-cover rounded-b-lg cursor-pointer"
            />
             {pinPosition && (
                <div 
                    className="absolute" 
                    style={{ left: `${pinPosition.x}px`, top: `${pinPosition.y}px`, transform: 'translate(-50%, -100%)' }}
                >
                    <MapPin className="h-10 w-10 text-red-500 fill-current drop-shadow-lg" />
                </div>
            )}
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
                disabled={!pinPosition}
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