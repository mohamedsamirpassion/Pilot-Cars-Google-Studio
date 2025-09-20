// This file defines shared data structures and enumerations used across the application.

export enum UserRole {
  Client = 'CLIENT',
  Vendor = 'VENDOR',
  LeadDispatcher = 'LEAD_DISPATCHER',
  Dispatcher = 'DISPATCHER',
  Supervisor = 'SUPERVISOR',
  PermitAgent = 'PERMIT_AGENT',
  ContentMarketing = 'CONTENT_MARKETING',
  SuperAdmin = 'SUPER_ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
  dotNumber?: string;
}

export enum PilotService {
  Lead = 'Lead',
  Chase = 'Chase',
  HighPole = 'High Pole',
  Steer = 'Steer',
  Survey = 'Survey',
  Other = 'Other',
}

export enum OrderStatus {
  New = 'New',
  PendingAssignment = 'Pending Assignment',
  PendingReview = 'Pending Review',
  Assigned = 'Assigned',
  InProgress = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
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
  rate: string;
  status: OrderStatus;
  assignedVendorId?: string;
  assignedDispatcherId?: string;
}

export enum VendorAvailability {
  Available = 'Available',
  OnLoad = 'On a Load',
  Unavailable = 'Unavailable',
}

export interface Credential {
    id: string;
    name: string;
    expiryDate?: string;
    amount?: number;
}

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
    timestamp: string;
}

export interface Vendor extends User {
  address?: string;
  services: PilotService[];
  rating: number;
  availability: VendorAvailability;
  credentials?: Credential[];
  location?: Location;
}

export enum PermitStatus {
  Requested = 'Requested',
  Processing = 'Processing',
  Issued = 'Issued',
  Rejected = 'Rejected',
}

export interface Permit {
  id: string;
  clientId: string;
  clientName: string;
  state: string;
  submittedDate: string;
  status: PermitStatus;
}

export interface BlogPost {
  id: string;
  slug: string; // URL-friendly version of the title
  title: string;
  content: string; // HTML content
  excerpt: string; // Short summary for SEO and list views
  authorId: string;
  authorName: string;
  publishDate: string; // ISO 8601 format
  tags?: string[];
}