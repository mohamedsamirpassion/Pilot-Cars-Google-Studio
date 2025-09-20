export enum UserRole {
  Client = 'CLIENT',
  Vendor = 'VENDOR',
  PermitAgent = 'PERMIT_AGENT',
  Dispatcher = 'DISPATCHER',
  LeadDispatcher = 'LEAD_DISPATCHER',
  DispatchSupervisor = 'DISPATCH_SUPERVISOR',
  PermitsSupervisor = 'PERMITS_SUPERVISOR',
  OperationsSupervisor = 'OPERATIONS_SUPERVISOR',
  Marketing = 'MARKETING',
  ManagingDirector = 'MANAGING_DIRECTOR',
  SuperAdmin = 'SUPER_ADMIN',
}

export interface User {
  id: string;
  email: string;
  password?: string; // Added for registration/login logic
  name: string;
  role: UserRole;
  companyName?: string;
  dotNumber?: string;
}

export enum PilotService {
  ChaseLead = 'Chase/Lead',
  HeightPole = 'Height Pole (HP)',
  Steer = 'Steer',
  RouteSurvey = 'Route Survey',
}

export enum OrderStatus {
    New = 'New',
    PendingAssignment = 'Pending Assignment',
    Assigned = 'Assigned',
    InProgress = 'In Progress',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export interface PilotOrder {
  id: string;
  client: Pick<User, 'id' | 'name' | 'email' | 'role' | 'companyName'>; // Link to user
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTime: string;
  services: PilotService[];
  driverName: string;
  driverPhone: string;
  status: OrderStatus;
  assignedVendorId?: string; // More realistic linking
  rate?: string;
}

export interface Vendor {
    id: string;
    name: string;
    services: PilotService[];
    location: { lat: number; lng: number; timestamp: string };
    availability: 'Available' | 'Unavailable';
    rating: number;
}
