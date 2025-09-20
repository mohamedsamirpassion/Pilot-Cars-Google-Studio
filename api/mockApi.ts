import { User, UserRole, PilotOrder, Vendor, OrderStatus, PilotService } from '../types';

// --- IN-MEMORY DATABASE ---

let users: User[] = [
  { id: 'client1', email: 'client@trucking.com', password: 'password', name: 'John Doe', role: UserRole.Client, companyName: 'Heavy Haul Inc.', dotNumber: '123456' },
  { id: 'vendor1', email: 'vendor@pilot.com', password: 'password', name: 'Jane Smith', role: UserRole.Vendor, companyName: 'Safe Escorts LLC' },
  { id: 'admin1', email: 'admin@pilotcars.com', password: 'password', name: 'Admin User', role: UserRole.LeadDispatcher },
];

let orders: PilotOrder[] = [
    { id: 'ORD-001', client: users[0], pickupAddress: 'Houston, TX', deliveryAddress: 'Dallas, TX', pickupDate: '2024-08-15', pickupTime: '08:00', services: [PilotService.ChaseLead], driverName: 'Mike T.', driverPhone: '555-1234', status: OrderStatus.Assigned, assignedVendorId: 'vendor1', rate: '$2.50/mile' },
    { id: 'ORD-002', client: users[0], pickupAddress: 'Austin, TX', deliveryAddress: 'San Antonio, TX', pickupDate: '2024-08-16', pickupTime: '10:00', services: [PilotService.HeightPole], driverName: 'Sarah J.', driverPhone: '555-5678', status: OrderStatus.InProgress, assignedVendorId: 'vendor3', rate: '$300/day' },
    { id: 'ORD-003', client: users[0], pickupAddress: 'El Paso, TX', deliveryAddress: 'Lubbock, TX', pickupDate: '2024-08-18', pickupTime: '09:00', services: [PilotService.ChaseLead, PilotService.Steer], driverName: 'Carlos R.', driverPhone: '555-9012', status: OrderStatus.PendingAssignment, rate: 'Pending' },
    { id: 'ORD-004', client: {id: 'client_temp', name: 'Wide Loads Co', email: 'contact@wideloads.com', role: UserRole.Client}, pickupAddress: 'Denver, CO', deliveryAddress: 'Salt Lake City, UT', pickupDate: '2024-08-19', pickupTime: '07:00', services: [PilotService.RouteSurvey], driverName: 'Anna K.', driverPhone: '555-3344', status: OrderStatus.New, rate: 'Pending' },
];

let vendors: Vendor[] = [
    { id: 'vendor1', name: 'Safe Escorts LLC', services: [PilotService.ChaseLead, PilotService.HeightPole], location: {lat: 30.26, lng: -97.74, timestamp: '5 mins ago'}, availability: 'Available', rating: 4.8 },
    { id: 'vendor2', name: 'Road Guardians', services: [PilotService.Steer], location: {lat: 29.76, lng: -95.36, timestamp: '12 mins ago'}, availability: 'Available', rating: 4.5 },
    { id: 'vendor3', name: 'Tall Load Pros', services: [PilotService.HeightPole, PilotService.RouteSurvey], location: {lat: 32.77, lng: -96.79, timestamp: '1 hour ago'}, availability: 'Unavailable', rating: 4.9 },
];

// --- API FUNCTIONS ---

// A helper to simulate network delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email: string, password: string): Promise<User | null> => {
    await sleep(500);
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },

  register: async (userData: Omit<User, 'id'>): Promise<User> => {
    await sleep(700);
    if (users.some(u => u.email === userData.email)) {
        throw new Error("User with this email already exists.");
    }
    const newUser: User = { ...userData, id: `user_${Date.now()}` };
    users.push(newUser);
    return newUser;
  },
  
  submitOrder: async (orderData: Omit<PilotOrder, 'id' | 'status'>): Promise<PilotOrder> => {
    await sleep(800);
    const newOrder: PilotOrder = {
        ...orderData,
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        status: OrderStatus.New,
    };
    orders.unshift(newOrder); // Add to the beginning of the list
    return newOrder;
  },
  
  getOrdersForClient: async (clientId: string): Promise<PilotOrder[]> => {
    await sleep(500);
    return orders.filter(o => o.client.id === clientId);
  },

  getAssignedLoadsForVendor: async (vendorId: string): Promise<PilotOrder[]> => {
    await sleep(500);
    return orders.filter(o => o.assignedVendorId === vendorId);
  },

  getAllOrders: async (): Promise<PilotOrder[]> => {
      await sleep(500);
      return [...orders].sort((a,b) => {
          const statusOrder = [OrderStatus.New, OrderStatus.PendingAssignment, OrderStatus.Assigned, OrderStatus.InProgress, OrderStatus.Completed];
          return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
  },

  getAllVendors: async (): Promise<Vendor[]> => {
      await sleep(500);
      return vendors;
  },

  assignPilotToOrder: async (orderId: string, vendor: Vendor): Promise<PilotOrder> => {
      await sleep(600);
      const orderIndex = orders.findIndex(o => o.id === orderId);
      if (orderIndex === -1) {
          throw new Error("Order not found");
      }
      orders[orderIndex] = {
          ...orders[orderIndex],
          status: OrderStatus.Assigned,
          assignedVendorId: vendor.id,
          // In a real app, the rate would be negotiated and updated here
      };
      return orders[orderIndex];
  }
};
