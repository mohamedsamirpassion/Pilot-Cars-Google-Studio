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
    // IMPORTANT: The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
        return (
            <div className={`flex flex-col items-center justify-center bg-slate-200 text-slate-600 ${className}`}>
                <p className="p-4 text-center font-semibold">Google Maps cannot be displayed.</p>
                <p className="px-4 text-center text-sm -mt-4">Reason: The API key is not configured for this environment.</p>
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