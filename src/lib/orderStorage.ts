// Order storage utility that works across multiple machines via API
// This connects to a local Express server for shared order storage

export interface Order {
  id: number;
  name: string;
  email: string;
  items: string[];
  time: string;
  status: string;
  deliveredAt?: string;
}

class OrderStorage {
  private apiBaseUrl: string;
  private syncInterval: NodeJS.Timeout | null = null;
  private lastSync = 0;
  private isOnline = false;

  constructor() {
    // Default to localhost:3001, but can be configured
    this.apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.checkServerConnection();
    this.startSync();
  }

  private async checkServerConnection() {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`);
      if (response.ok) {
        this.isOnline = true;
        console.log('✅ Connected to order server');
      } else {
        this.isOnline = false;
        console.warn('⚠️ Server responded but not healthy');
      }
    } catch (error) {
      this.isOnline = false;
      console.warn('⚠️ Cannot connect to order server, falling back to localStorage');
    }
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  private startSync() {
    // Check server connection every 30 seconds
    this.syncInterval = setInterval(() => {
      this.checkServerConnection();
    }, 30000);
  }

  public stopSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // Get all active orders
  public async getOrders(): Promise<Order[]> {
    try {
      if (this.isOnline) {
        const orders = await this.makeRequest('/orders');
        return orders;
      } else {
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        return orders.sort((a: Order, b: Order) => new Date(b.time).getTime() - new Date(a.time).getTime());
      }
    } catch (error) {
      console.error('Error getting orders:', error);
      // Fallback to localStorage
      const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
      return orders.sort((a: Order, b: Order) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }
  }

  // Get all delivered orders
  public async getDeliveredOrders(): Promise<Order[]> {
    try {
      if (this.isOnline) {
        const orders = await this.makeRequest('/orders/delivered');
        return orders;
      } else {
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
        return orders.sort((a: Order, b: Order) => new Date(b.time).getTime() - new Date(a.time).getTime());
      }
    } catch (error) {
      console.error('Error getting delivered orders:', error);
      // Fallback to localStorage
      const orders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
      return orders.sort((a: Order, b: Order) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }
  }

  // Add a new order
  public async addOrder(order: Omit<Order, 'id'>): Promise<Order> {
    try {
      if (this.isOnline) {
        const newOrder = await this.makeRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(order),
        });
        return newOrder;
      } else {
        // Fallback to localStorage
        const newOrder: Order = {
          ...order,
          id: Date.now(),
          status: 'pending'
        };
        
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        orders.push(newOrder);
        localStorage.setItem("petes_orders", JSON.stringify(orders));
        return newOrder;
      }
    } catch (error) {
      console.error('Error adding order:', error);
      // Fallback to localStorage
      const newOrder: Order = {
        ...order,
        id: Date.now(),
        status: 'pending'
      };
      
      const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
      orders.push(newOrder);
      localStorage.setItem("petes_orders", JSON.stringify(orders));
      return newOrder;
    }
  }

  // Update order status
  public async updateOrderStatus(id: number, status: string): Promise<void> {
    try {
      if (this.isOnline) {
        await this.makeRequest(`/orders/${id}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status }),
        });
      } else {
        // Fallback to localStorage
        if (status === "delivered") {
          const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
          const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
          
          const orderIndex = orders.findIndex((order: Order) => order.id === id);
          if (orderIndex !== -1) {
            const order = orders[orderIndex];
            const deliveredOrder = {
              ...order,
              status,
              deliveredAt: new Date().toISOString()
            };
            
            deliveredOrders.push(deliveredOrder);
            orders.splice(orderIndex, 1);
            
            localStorage.setItem("petes_orders", JSON.stringify(orders));
            localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
          }
        } else {
          const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
          const order = orders.find((order: Order) => order.id === id);
          if (order) {
            order.status = status;
            localStorage.setItem("petes_orders", JSON.stringify(orders));
          }
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Fallback to localStorage logic (same as above)
      if (status === "delivered") {
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
        
        const orderIndex = orders.findIndex((order: Order) => order.id === id);
        if (orderIndex !== -1) {
          const order = orders[orderIndex];
          const deliveredOrder = {
            ...order,
            status,
            deliveredAt: new Date().toISOString()
          };
          
          deliveredOrders.push(deliveredOrder);
          orders.splice(orderIndex, 1);
          
          localStorage.setItem("petes_orders", JSON.stringify(orders));
          localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
        }
      } else {
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        const order = orders.find((order: Order) => order.id === id);
        if (order) {
          order.status = status;
          localStorage.setItem("petes_orders", JSON.stringify(orders));
        }
      }
    }
  }

  // Restore delivered order to active
  public async restoreOrder(id: number): Promise<void> {
    try {
      if (this.isOnline) {
        await this.makeRequest(`/orders/${id}/restore`, {
          method: 'POST',
        });
      } else {
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
        
        const orderIndex = deliveredOrders.findIndex((order: Order) => order.id === id);
        if (orderIndex !== -1) {
          const order = deliveredOrders[orderIndex];
          const restoredOrder = {
            ...order,
            status: 'pending',
            deliveredAt: undefined
          };
          
          orders.push(restoredOrder);
          deliveredOrders.splice(orderIndex, 1);
          
          localStorage.setItem("petes_orders", JSON.stringify(orders));
          localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
        }
      }
    } catch (error) {
      console.error('Error restoring order:', error);
      // Fallback to localStorage logic (same as above)
      const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
      const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
      
      const orderIndex = deliveredOrders.findIndex((order: Order) => order.id === id);
      if (orderIndex !== -1) {
        const order = deliveredOrders[orderIndex];
        const restoredOrder = {
          ...order,
          status: 'pending',
          deliveredAt: undefined
        };
        
        orders.push(restoredOrder);
        deliveredOrders.splice(orderIndex, 1);
        
        localStorage.setItem("petes_orders", JSON.stringify(orders));
        localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
      }
    }
  }

  // Export orders for backup/sharing
  public async exportOrders(): Promise<string> {
    try {
      if (this.isOnline) {
        const data = await this.makeRequest('/orders/export');
        return JSON.stringify(data, null, 2);
      } else {
        // Fallback to localStorage
        const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
        const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
        
        return JSON.stringify({
          orders,
          deliveredOrders,
          exportedAt: new Date().toISOString()
        }, null, 2);
      }
    } catch (error) {
      console.error('Error exporting orders:', error);
      // Fallback to localStorage
      const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
      const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
      
      return JSON.stringify({
        orders,
        deliveredOrders,
        exportedAt: new Date().toISOString()
      }, null, 2);
    }
  }

  // Import orders from backup/sharing
  public async importOrders(data: string): Promise<void> {
    try {
      const parsed = JSON.parse(data);
      
      if (this.isOnline) {
        await this.makeRequest('/orders/import', {
          method: 'POST',
          body: JSON.stringify({
            orders: parsed.orders || [],
            deliveredOrders: parsed.deliveredOrders || []
          }),
        });
      } else {
        // Fallback to localStorage
        if (parsed.orders && Array.isArray(parsed.orders)) {
          localStorage.setItem("petes_orders", JSON.stringify(parsed.orders));
        }
        if (parsed.deliveredOrders && Array.isArray(parsed.deliveredOrders)) {
          localStorage.setItem("petes_delivered_orders", JSON.stringify(parsed.deliveredOrders));
        }
      }
    } catch (error) {
      console.error('Error importing orders:', error);
      // Fallback to localStorage
      const parsed = JSON.parse(data);
      if (parsed.orders && Array.isArray(parsed.orders)) {
        localStorage.setItem("petes_orders", JSON.stringify(parsed.orders));
      }
      if (parsed.deliveredOrders && Array.isArray(parsed.deliveredOrders)) {
        localStorage.setItem("petes_delivered_orders", JSON.stringify(parsed.deliveredOrders));
      }
    }
  }

  // Check if server is online
  public isServerOnline(): boolean {
    return this.isOnline;
  }

  // Get server URL
  public getServerUrl(): string {
    return this.apiBaseUrl;
  }
}

// Create a singleton instance
export const orderStorage = new OrderStorage();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  orderStorage.stopSync();
});

