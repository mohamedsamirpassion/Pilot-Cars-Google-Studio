import React from 'react';
// FIX: Import `MapMouseEvent` to use for the `onClick` handler.
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps';

interface GoogleMapProps {
    center: { lat: number; lng: number };
    zoom: number;
    // FIX: Replaced `google.maps.MapMouseEvent` with the correct `MapMouseEvent` type from `@vis.gl/react-google-maps`.
    onClick?: (e: MapMouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ center, zoom, onClick, children, className }) => {
    // IMPORTANT: API keys should be stored in environment variables and not hardcoded.
    // In a real application, this would be handled by a build process (e.g., Vite, Webpack).
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <div className={`flex items-center justify-center bg-slate-200 text-red-600 ${className}`}>
                <p className="p-4 text-center">Google Maps API key is missing. Please configure it in your environment variables.</p>
            </div>
        );
    }

    return (
        <APIProvider apiKey={apiKey}>
            <Map
                mapId="pilot-cars-map"
                center={center}
                zoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={onClick}
                className={className}
            >
                {children}
            </Map>
        </APIProvider>
    );
};

export const Marker = AdvancedMarker;
export const MarkerPin = Pin;

export default GoogleMapComponent;