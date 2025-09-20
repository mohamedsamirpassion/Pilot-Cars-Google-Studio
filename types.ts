// FIX: Replaced entire file content to define and export types, removing the mock API implementation and circular imports. This resolves numerous module resolution errors across the application.
export enum UserRole {
    Client = 'CLIENT',
    Vendor = 'VENDOR',
    LeadDispatcher = 'LEAD_DISPATCHER',
}

export enum PilotService {
    ChaseLead = 'Chase/Lead',
    Steer = 'Steer',
    HeightPole = 'Height Pole',
    RouteSurvey = 'Route Survey',
}

export enum OrderStatus {
    New = 'New',
    PendingAssignment = 'Pending Assignment',
    Assigned = 'Assigned',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  companyName?: string;
  dotNumber?: string;
}

export interface PilotOrder {
    id: string;
    client: User;
    pickupAddress: string;
    deliveryAddress: string;
    pickupDate: string;
    pickupTime: string;
    services: PilotService[];
    driverName: string;
    driverPhone: string;
    status: OrderStatus;
    assignedVendorId?: string;
    rate: string;
}

export interface Vendor {
    id: string;
    name: string;
    companyName: string;
    email: string;
    services: PilotService[];
    location: {
        lat: number;
        lng: number;
        timestamp: string;
    };
    availability: 'Available' | 'Unavailable';
    rating: number;
    address: string;
}
