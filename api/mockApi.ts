import { User, UserRole, PilotOrder, OrderStatus, Vendor, PilotService, Permit, PermitStatus, VendorAvailability, Credential, Location } from '../types';

// In-memory database
let users: User[] = [];
let orders: PilotOrder[] = [];
let vendors: Vendor[] = [];
let permits: Permit[] = [];

// --- Seeding Initial Data ---

const clientUser: User = { 
    id: 'client1', 
    name: 'John Doe', 
    email: 'client@test.com', 
    role: UserRole.Client, 
    companyName: 'Heavy Haulers Inc.', 
    dotNumber: '123456' 
};

const vendorUser: Vendor = { 
    id: 'vendor1', 
    name: 'Jane Smith', 
    email: 'vendor@test.com', 
    role: UserRole.Vendor, 
    companyName: 'Safe Escorts LLC', 
    services: [PilotService.Lead, PilotService.Chase], 
    rating: 4.8,
    address: '123 Pilot Rd, Austin, TX',
    availability: VendorAvailability.Available,
    credentials: [
        { id: 'ins_1', name: 'General Liability Insurance', expiryDate: '2025-12-31', amount: 1000000 },
        { id: 'ins_2', name: 'Commercial Automotive Insurance', expiryDate: '2026-06-30', amount: 750000 },
        { id: 'p_la', name: 'LA Permit', expiryDate: '2024-01-15' },
    ]
};
const vendorUser2: Vendor = { 
    id: 'vendor2', 
    name: 'Carlos Ray', 
    email: 'carlos@test.com', 
    role: UserRole.Vendor, 
    companyName: 'Ray Route Runners', 
    services: [PilotService.HighPole, PilotService.Steer], 
    rating: 4.9,
    address: '456 Pilot Ln, Dallas, TX',
    availability: VendorAvailability.OnLoad,
    credentials: [
        { id: 'ins_gl_2', name: 'General Liability Insurance', expiryDate: '2026-06-30', amount: 2000000 },
    ]
};


const leadDispatcherUser: User = { id: 'admin1', name: 'Lead Dispatcher', email: 'lead.dispatcher@pilotcars.com', role: UserRole.LeadDispatcher };
const dispatcherUser: User = { id: 'admin2', name: 'Dispatcher Bob', email: 'dispatcher@pilotcars.com', role: UserRole.Dispatcher };
const permitAgentUser: User = { id: 'admin3', name: 'Permit Agent Pam', email: 'permit.agent@pilotcars.com', role: UserRole.PermitAgent };
const supervisorUser: User = { id: 'admin4', name: 'Supervisor Sam', email: 'supervisor@pilotcars.com', role: UserRole.Supervisor };
const marketingUser: User = { id: 'admin5', name: 'Marketing Mary', email: 'marketing@pilotcars.com', role: UserRole.ContentMarketing };
const superAdminUser: User = { id: 'admin6', name: 'Super Admin', email: 'super.admin@pilotcars.com', role: UserRole.SuperAdmin };


users.push(clientUser, vendorUser, vendorUser2, leadDispatcherUser, dispatcherUser, permitAgentUser, supervisorUser, marketingUser, superAdminUser);
vendors.push(vendorUser, vendorUser2);

const order1: PilotOrder = {
  id: 'order101', client: clientUser, pickupAddress: 'Houston, TX', deliveryAddress: 'Dallas, TX', pickupDate: '2024-08-15', pickupTime: '09:00', services: [PilotService.Lead, PilotService.Chase], driverName: 'Mike', driverPhone: '555-1234', rate: '$1.75/mile', status: OrderStatus.Assigned, assignedVendorId: 'vendor1', assignedDispatcherId: 'admin2'
};
const order2: PilotOrder = {
  id: 'order102', client: clientUser, pickupAddress: 'San Antonio, TX', deliveryAddress: 'Austin, TX', pickupDate: '2024-08-18', pickupTime: '11:00', services: [PilotService.HighPole], driverName: 'Dave', driverPhone: '555-5678', rate: 'Pending', status: OrderStatus.New,
};
const order3: PilotOrder = {
  id: 'order103', client: {id: 'client2', name: 'Big Rig Co', email: 'brc@test.com', role: UserRole.Client}, pickupAddress: 'El Paso, TX', deliveryAddress: 'Lubbock, TX', pickupDate: '2024-08-20', pickupTime: '08:00', services: [PilotService.Chase], driverName: 'Sarah', driverPhone: '555-9012', rate: 'Pending', status: OrderStatus.New,
};
const order4: PilotOrder = {
  id: 'order104', client: clientUser, pickupAddress: 'Corpus Christi, TX', deliveryAddress: 'Laredo, TX', pickupDate: '2024-08-22', pickupTime: '14:00', services: [PilotService.Steer], driverName: 'Chen', driverPhone: '555-3456', rate: 'Pending', status: OrderStatus.PendingAssignment, assignedDispatcherId: 'admin2'
};
const order5: PilotOrder = {
  id: 'order105', 
  client: {id: 'client2', name: 'Big Rig Co', email: 'brc@test.com', role: UserRole.Client}, 
  pickupAddress: 'Amarillo, TX', 
  deliveryAddress: 'Fort Worth, TX', 
  pickupDate: '2024-08-25', 
  pickupTime: '10:00', 
  services: [PilotService.Lead], 
  driverName: 'Tom', 
  driverPhone: '555-4321', 
  rate: '$1.80/mile (proposed)', 
  status: OrderStatus.PendingReview,
  assignedDispatcherId: 'admin2', 
  assignedVendorId: 'vendor2'
};


orders.push(order1, order2, order3, order4, order5);

permits.push(
    { id: 'p001', clientId: 'client1', clientName: 'Heavy Haulers Inc.', state: 'Texas', submittedDate: '2024-08-10', status: PermitStatus.Issued },
    { id: 'p002', clientId: 'client2', clientName: 'Big Rig Co', state: 'New Mexico', submittedDate: '2024-08-11', status: PermitStatus.Processing },
    { id: 'p003', clientId: 'client1', clientName: 'Heavy Haulers Inc.', state: 'Oklahoma', submittedDate: '2024-08-12', status: PermitStatus.Requested }
);

export const mockApi = {
  login: async (email: string, pass: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  },

  register: async (userData: Partial<Vendor> & { password?: string }): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users.some(u => u.email === userData.email)) {
          return reject(new Error('User with this email already exists'));
        }
        
        const baseUser: User = {
          id: `user${users.length + 1}`, name: userData.name!, email: userData.email!, role: userData.role!, companyName: userData.companyName, dotNumber: userData.dotNumber
        };
        
        if (baseUser.role === UserRole.Vendor) {
            const newVendor: Vendor = { 
                ...baseUser, 
                address: userData.address || '',
                services: userData.services || [],
                rating: 5.0, 
                availability: VendorAvailability.Available,
                credentials: userData.credentials || []
            };
            users.push(newVendor);
            vendors.push(newVendor);
            resolve(newVendor);
        } else {
            users.push(baseUser);
            resolve(baseUser);
        }
      }, 500);
    });
  },

  submitOrder: async (orderData: Omit<PilotOrder, 'id' | 'status'>): Promise<PilotOrder> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              const newOrder: PilotOrder = {
                  ...orderData, id: `order${orders.length + 101}`, status: OrderStatus.New
              };
              orders.push(newOrder);
              resolve(newOrder);
          }, 500);
      });
  },

  getOrdersForClient: async (clientId: string): Promise<PilotOrder[]> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(orders.filter(o => o.client.id === clientId));
          }, 500);
      });
  },

  getVendorById: async (vendorId: string): Promise<Vendor> => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const vendor = vendors.find(v => v.id === vendorId);
              if (vendor) resolve(vendor);
              else reject(new Error('Vendor not found'));
          }, 300);
      });
  },
  
  getAllVendors: async (): Promise<Vendor[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(vendors);
        }, 300);
    });
  },

  getLoadsByStatus: async(statuses: OrderStatus[]): Promise<PilotOrder[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(orders.filter(o => statuses.includes(o.status)));
        }, 500);
    });
  },

  getLoadsAssignedToDispatcher: async(dispatcherId: string): Promise<PilotOrder[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(orders.filter(o => o.assignedDispatcherId === dispatcherId && o.status === OrderStatus.PendingAssignment));
        }, 500);
    });
  },

  getAllLoads: async(): Promise<PilotOrder[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(orders), 500));
  },

  getAllPermits: async(): Promise<Permit[]> => {
     return new Promise((resolve) => setTimeout(() => resolve(permits), 500));
  },
  
  getAllUsers: async(): Promise<User[]> => {
      return new Promise((resolve) => setTimeout(() => resolve(users), 500));
  },

  getAssignedLoadsForVendor: async (vendorId: string): Promise<PilotOrder[]> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(orders.filter(o => o.assignedVendorId === vendorId));
          }, 500);
      });
  },

  getAvailableLoads: async (): Promise<PilotOrder[]> => {
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(orders.filter(o => o.status === OrderStatus.New || o.status === OrderStatus.PendingAssignment));
          }, 500);
      });
  },
  
  updateVendorProfile: async (vendorId: string, updatedData: Partial<Vendor>): Promise<Vendor> => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const vendorIndex = vendors.findIndex(v => v.id === vendorId);
              if (vendorIndex > -1) {
                  vendors[vendorIndex] = { ...vendors[vendorIndex], ...updatedData };
                   const userIndex = users.findIndex(u => u.id === vendorId);
                   if (userIndex > -1) users[userIndex] = { ...users[userIndex], ...updatedData };
                  resolve(vendors[vendorIndex]);
              } else {
                  reject(new Error('Vendor not found'));
              }
          }, 500);
      });
  },
  
  updateVendorAvailability: async (vendorId: string, availability: VendorAvailability): Promise<Vendor> => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const vendorIndex = vendors.findIndex(v => v.id === vendorId);
              if (vendorIndex > -1) {
                  vendors[vendorIndex].availability = availability;
                  resolve(vendors[vendorIndex]);
              } else {
                  reject(new Error('Vendor not found'));
              }
          }, 300);
      });
  },

  approveAssignment: async (orderId: string): Promise<PilotOrder> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
          orders[orderIndex].status = OrderStatus.Assigned;
          resolve(orders[orderIndex]);
        } else {
          reject(new Error('Order not found'));
        }
      }, 500);
    });
  },

  declineAssignment: async (orderId: string): Promise<PilotOrder> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
          orders[orderIndex].status = OrderStatus.PendingAssignment;
          orders[orderIndex].assignedVendorId = undefined;
          resolve(orders[orderIndex]);
        } else {
          reject(new Error('Order not found'));
        }
      }, 500);
    });
  },

  reverseGeocode: async (lat: number, lon: number): Promise<string> => {
    return new Promise(resolve => {
      setTimeout(() => {
        // This is a mock function. In a real app, you'd use a service
        // like Google Maps Geocoding API.
        resolve(`${Math.abs(lat).toFixed(3)}° Fictional Ave, ${Math.abs(lon).toFixed(3)}° Fictional City`);
      }, 300);
    });
  },

  updateVendorLocation: async (vendorId: string, location: Location): Promise<Vendor> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const vendor = vendors.find(v => v.id === vendorId);
        if (vendor) {
          vendor.location = location;
          resolve(vendor);
        } else {
          reject(new Error('Vendor not found'));
        }
      }, 300);
    });
  },

  clearVendorLocation: async (vendorId: string): Promise<Vendor> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const vendor = vendors.find(v => v.id === vendorId);
        if (vendor) {
          vendor.location = undefined;
          resolve(vendor);
        } else {
          reject(new Error('Vendor not found'));
        }
      }, 300);
    });
  }
};