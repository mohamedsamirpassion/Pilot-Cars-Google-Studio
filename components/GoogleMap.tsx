import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, MapMouseEvent } from '@vis.gl/react-google-maps';

interface GoogleMapProps {
    center: { lat: number; lng: number };
    zoom: number;
    onClick?: (e: MapMouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({ center, zoom, onClick, children, className }) => {
    // IMPORTANT: In a Vite project, environment variables must be prefixed with VITE_
    // to be exposed on the client. The key must be obtained from `import.meta.env`.
    // FIX: Cast `import.meta` to `any` to resolve TypeScript error about missing 'env' property.
    const apiKey = (import.meta as any).env.VITE_API_KEY;

    if (!apiKey) {
        return (
            <div className={`flex flex-col items-center justify-center bg-slate-200 text-red-600 p-4 ${className}`}>
                <p className="text-center font-semibold">Google Maps API key is missing.</p>
                <p className="text-center text-sm">Please configure it in your environment variables.</p>
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