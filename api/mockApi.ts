import { User, UserRole, PilotOrder, OrderStatus, Vendor, PilotService, Permit, PermitStatus, VendorAvailability, Credential, Location, BlogPost, Notification } from '../types';

// In-memory database
let users: User[] = [];
let orders: PilotOrder[] = [];
let vendors: Vendor[] = [];
let permits: Permit[] = [];
let posts: BlogPost[] = [];
let notifications: Notification[] = [];

// --- Seeding Initial Data ---
const marketingUser: User = { id: 'admin5', name: 'Marketing Mary', email: 'marketing@pilotcars.com', role: UserRole.ContentMarketing };

// Helper to create slugs
const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


posts.push(
    {
        id: 'post1',
        slug: 'navigating-oversize-load-regulations-a-beginners-guide',
        title: 'Navigating Oversize Load Regulations: A Beginner\'s Guide',
        excerpt: 'Understanding the complex web of state and federal regulations for oversize loads can be daunting. This guide breaks down the essentials for trucking companies.',
        authorId: marketingUser.id,
        authorName: marketingUser.name,
        publishDate: '2024-08-10T10:00:00Z',
        categories: ['Guides', 'Regulations'],
        tags: ['permitting', 'beginners', 'state laws'],
        content: `
            <p>Transporting an oversize load involves more than just driving from point A to point B. It requires careful planning, adherence to strict regulations, and coordination with various authorities. For newcomers, this can seem overwhelming. Here’s a breakdown of the key areas you need to focus on.</p>
            <h2 class="text-2xl font-bold my-4">1. Understanding State vs. Federal Rules</h2>
            <p>While the federal government sets overall guidelines for the National Network of highways, most of the specific regulations you'll encounter are at the state level. Each state has its own Department of Transportation (DOT) with unique rules for dimensions, weight, and required escorts.</p>
            <h2 class="text-2xl font-bold my-4">2. The Permitting Process</h2>
            <p>Before you move, you'll need an oversize/overweight permit for every state you travel through. This process involves submitting detailed information about your truck, trailer, and load, as well as the specific route you plan to take.</p>
            <p class="mt-2"><strong>Key Tip:</strong> Apply for permits well in advance. Some states can take several days to process applications, especially for complex loads.</p>
            <h2 class="text-2xl font-bold my-4">3. When Are Pilot Cars Required?</h2>
            <p>The need for pilot cars (or escort vehicles) is determined by the dimensions of your load and the specific regulations of the state. Generally, the wider, longer, or taller your load, the more likely you are to need one or more escorts. For example, a load exceeding 12 feet in width on a two-lane highway will almost always require a lead or chase vehicle.</p>
        `
    },
    {
        id: 'post2',
        slug: '5-things-to-look-for-in-a-professional-pilot-car-service',
        title: '5 Things to Look for in a Professional Pilot Car Service',
        excerpt: 'Not all pilot car services are created equal. Choosing the right partner is crucial for the safety and success of your haul. Here are five key qualities to look for.',
        authorId: marketingUser.id,
        authorName: marketingUser.name,
        publishDate: '2024-07-25T14:30:00Z',
        categories: ['Best Practices', 'Safety'],
        tags: ['hiring', 'safety', 'vettng', 'insurance'],
        content: `
            <p>A reliable pilot car service is one of the most critical components of a successful oversize load transport. They are your eyes and ears on the road, ensuring safety for your driver and the public. Here’s what to look for when choosing an escort provider.</p>
            <ol class="list-decimal list-inside space-y-2 my-4">
                <li><strong>Proper Certification and Insurance:</strong> Ask for proof of certification (like UTAC or state-specific certs) and at least $1 million in liability insurance.</li>
                <li><strong>Well-Maintained Equipment:</strong> The escort vehicle should be clean, professional, and equipped with the correct signage, lights, and communication tools.</li>
                <li><strong>Experienced Operators:</strong> An experienced pilot car operator knows how to manage traffic, communicate effectively with the truck driver, and anticipate potential hazards.</li>
                <li><strong>Knowledge of Regulations:</strong> Your escort should be familiar with the specific rules and curfews for the states on your route.</li>
                <li><strong>Excellent Communication Skills:</strong> Clear, concise communication between the pilot car and the truck is non-negotiable for safety.</li>
            </ol>
            <p>Vetting your pilot car service thoroughly beforehand can save you from costly delays, fines, and accidents on the road.</p>
        `
    }
);

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

const initialNotifications: Notification[] = [
    {
        id: 'notif1',
        userId: 'vendor1',
        message: "Your 'LA Permit' credential has expired. Please update it.",
        link: '/dashboard',
        isRead: false,
        timestamp: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 'notif2',
        userId: 'admin1', // Lead Dispatcher
        message: "Order #order105 is pending your review.",
        link: '/dashboard',
        isRead: true,
        timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    }
];
notifications.push(...initialNotifications);


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
              
              // Notify all admins
              const admins = users.filter(u => u.role !== UserRole.Client && u.role !== UserRole.Vendor);
              admins.forEach(admin => {
                  mockApi.createNotification({
                      userId: admin.id,
                      message: `New order #${newOrder.id} from ${newOrder.client.companyName || newOrder.client.name} has been submitted.`,
                      link: '/dashboard'
                  });
              });
              
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
          
          if (orders[orderIndex].assignedVendorId) {
            mockApi.createNotification({
                userId: orders[orderIndex].assignedVendorId!,
                message: `You have been approved and assigned to order #${orderId}.`,
                link: '/dashboard'
            });
          }
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
  },

  // --- Blog API ---
  getAllPosts: async (filters?: { category?: string; tag?: string }): Promise<BlogPost[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        let filteredPosts = [...posts];
        
        if (filters?.category) {
          filteredPosts = filteredPosts.filter(p => p.categories?.includes(filters.category!));
        }
        
        if (filters?.tag) {
          filteredPosts = filteredPosts.filter(p => p.tags?.includes(filters.tag!));
        }
        
        // Return sorted by most recent date
        resolve(filteredPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()));
      }, 400);
    });
  },

  getPostBySlug: async (slug: string): Promise<BlogPost> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const post = posts.find(p => p.slug === slug);
        if (post) {
          resolve(post);
        } else {
          reject(new Error('Post not found'));
        }
      }, 300);
    });
  },

  createPost: async (postData: Omit<BlogPost, 'id' | 'slug' | 'publishDate'>): Promise<BlogPost> => {
      return new Promise(resolve => {
          setTimeout(() => {
              const newPost: BlogPost = {
                  ...postData,
                  id: `post${posts.length + 1}`,
                  slug: slugify(postData.title),
                  publishDate: new Date().toISOString(),
                  categories: postData.categories || [],
                  tags: postData.tags || [],
              };
              posts.push(newPost);
              resolve(newPost);
          }, 500);
      });
  },
  
  // --- Notification API ---
  createNotification: (data: Omit<Notification, 'id' | 'isRead' | 'timestamp'>): Notification => {
      const newNotification: Notification = {
          ...data,
          id: `notif${notifications.length + 1}`,
          isRead: false,
          timestamp: new Date().toISOString(),
      };
      notifications.unshift(newNotification); // Add to the beginning of the list
      return newNotification;
  },
  
  getNotificationsForUser: async (userId: string): Promise<Notification[]> => {
      return new Promise(resolve => {
          setTimeout(() => {
              resolve(notifications.filter(n => n.userId === userId));
          }, 400);
      });
  },
  
  markNotificationAsRead: async (notificationId: string): Promise<Notification> => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              const index = notifications.findIndex(n => n.id === notificationId);
              if (index > -1) {
                  notifications[index].isRead = true;
                  resolve(notifications[index]);
              } else {
                  reject(new Error("Notification not found"));
              }
          }, 100);
      });
  },

  markAllNotificationsAsRead: async (userId: string): Promise<Notification[]> => {
      return new Promise(resolve => {
          setTimeout(() => {
              const userNotifications: Notification[] = [];
              notifications.forEach(n => {
                  if (n.userId === userId) {
                      n.isRead = true;
                      userNotifications.push(n);
                  }
              });
              resolve(userNotifications);
          }, 200);
      });
  }
};
