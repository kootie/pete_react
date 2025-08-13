// Order storage utility that works across multiple machines via API
// This connects to a local Express server for shared order storage

export interface Order {
  id: number;
  name: string;
  email: string;
  items: string[];
  time: string;
  status?: string;
  deliveredAt?: string;
  updatedAt?: string;
}

export interface NotificationResult {
  email: { success: boolean; messageId?: string; error?: string };
  whatsapp: { success: boolean; messageId?: string; error?: string };
}

class OrderStorage {
  private apiBaseUrl: string;
  private isOnline: boolean = false;

  constructor() {
    this.apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.checkServerConnection();
  }

  private async checkServerConnection(): Promise<void> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`);
      if (response.ok) {
        this.isOnline = true;
        console.log('✅ Connected to order server');
      } else {
        this.isOnline = false;
        console.warn('⚠️ Server health check failed');
      }
    } catch (error) {
      this.isOnline = false;
      console.warn('⚠️ Cannot connect to order server, using local storage only');
    }
  }

  private async makeRequest(endpoint: string, options?: RequestInit): Promise<any> {
    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Get all active orders
  public async getOrders(): Promise<Order[]> {
    try {
      if (this.isOnline) {
        return await this.makeRequest('/orders');
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
        return await this.makeRequest('/orders/delivered');
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

  // Submit a new order (saves to server and sends notifications)
  public async submitOrder(order: Omit<Order, 'id' | 'time'>): Promise<{ order: Order; notifications: NotificationResult }> {
    try {
      if (this.isOnline) {
        const result = await this.makeRequest('/orders', {
          method: 'POST',
          body: JSON.stringify(order),
        });
        return result;
      } else {
        // Fallback to localStorage only
        const newOrder: Order = {
          ...order,
          id: Date.now(),
          time: new Date().toISOString(),
          status: 'pending'
        };
        
        // Store locally
        const orders = this.getLocalOrders();
        orders.unshift(newOrder);
        localStorage.setItem("petes_orders", JSON.stringify(orders));
        
        return {
          order: newOrder,
          notifications: {
            email: { success: false, error: 'Server offline' },
            whatsapp: { success: false, error: 'Server offline' }
          }
        };
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      
      // Fallback to localStorage
      const newOrder: Order = {
        ...order,
        id: Date.now(),
        time: new Date().toISOString(),
        status: 'pending'
      };
      
      const orders = this.getLocalOrders();
      orders.unshift(newOrder);
      localStorage.setItem("petes_orders", JSON.stringify(orders));
      
      return {
        order: newOrder,
        notifications: {
          email: { success: false, error: 'Server error' },
          whatsapp: { success: false, error: 'Server error' }
        }
      };
    }
  }

  // Update order status
  public async updateOrderStatus(orderId: number, status: string): Promise<void> {
    try {
      if (this.isOnline) {
        await this.makeRequest(`/orders/${orderId}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status }),
        });
      } else {
        // Fallback to localStorage
        this.updateLocalOrderStatus(orderId, status);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Fallback to localStorage
      this.updateLocalOrderStatus(orderId, status);
    }
  }

  // Restore delivered order to active
  public async restoreOrder(orderId: number): Promise<void> {
    try {
      if (this.isOnline) {
        await this.makeRequest(`/orders/${orderId}/restore`, {
          method: 'POST',
        });
      } else {
        // Fallback to localStorage
        this.restoreLocalOrder(orderId);
      }
    } catch (error) {
      console.error('Error restoring order:', error);
      // Fallback to localStorage
      this.restoreLocalOrder(orderId);
    }
  }

  // Get orders from localStorage (for display purposes)
  public getLocalOrders(): Order[] {
    try {
      const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
      return orders.sort((a: Order, b: Order) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } catch (error) {
      console.error('Error reading local orders:', error);
      return [];
    }
  }

  // Update order status locally
  public updateLocalOrderStatus(orderId: number, status: string): void {
    try {
      const orders = this.getLocalOrders();
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex !== -1) {
        if (status === 'delivered') {
          // Move to delivered orders
          const order = orders[orderIndex];
          const deliveredOrder = {
            ...order,
            status: 'delivered',
            deliveredAt: new Date().toISOString()
          };
          
          const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
          deliveredOrders.unshift(deliveredOrder);
          localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
          
          // Remove from active orders
          orders.splice(orderIndex, 1);
          localStorage.setItem("petes_orders", JSON.stringify(orders));
        } else {
          // Update status in active orders
          orders[orderIndex].status = status;
          orders[orderIndex].updatedAt = new Date().toISOString();
          localStorage.setItem("petes_orders", JSON.stringify(orders));
        }
      }
    } catch (error) {
      console.error('Error updating local order status:', error);
    }
  }

  // Restore delivered order locally
  public restoreLocalOrder(orderId: number): void {
    try {
      const deliveredOrders = JSON.parse(localStorage.getItem("petes_delivered_orders") || "[]");
      const orderIndex = deliveredOrders.findIndex((order: Order) => order.id === orderId);
      
      if (orderIndex !== -1) {
        const order = deliveredOrders[orderIndex];
        const restoredOrder = {
          ...order,
          status: 'pending',
          deliveredAt: undefined,
          updatedAt: new Date().toISOString()
        };
        
        const orders = this.getLocalOrders();
        orders.unshift(restoredOrder);
        localStorage.setItem("petes_orders", JSON.stringify(orders));
        
        // Remove from delivered orders
        deliveredOrders.splice(orderIndex, 1);
        localStorage.setItem("petes_delivered_orders", JSON.stringify(deliveredOrders));
      }
    } catch (error) {
      console.error('Error restoring local order:', error);
    }
  }

  // Test email configuration
  public async testEmail(): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (this.isOnline) {
        const result = await this.makeRequest('/test/email', { method: 'POST' });
        return result;
      } else {
        return { success: false, error: 'Server offline' };
      }
    } catch (error) {
      return { success: false, error: 'Test failed' };
    }
  }

  // Test WhatsApp configuration
  public async testWhatsApp(): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      if (this.isOnline) {
        const result = await this.makeRequest('/test/whatsapp', { method: 'POST' });
        return result;
      } else {
        return { success: false, error: 'Server offline' };
      }
    } catch (error) {
      return { success: false, error: 'Test failed' };
    }
  }

  // Check server status
  public async getServerStatus(): Promise<{ status: string; services: { email: string; whatsapp: string }; storage: string }> {
    try {
      if (this.isOnline) {
        return await this.makeRequest('/health');
      } else {
        return {
          status: 'OFFLINE',
          services: { email: 'unknown', whatsapp: 'unknown' },
          storage: 'local'
        };
      }
    } catch (error) {
      return {
        status: 'ERROR',
        services: { email: 'unknown', whatsapp: 'unknown' },
        storage: 'local'
      };
    }
  }

  // Get server URL
  public getServerUrl(): string {
    return this.apiBaseUrl;
  }

  // Check if server is online
  public isServerOnline(): boolean {
    return this.isOnline;
  }

  // Start periodic connection checking
  public startConnectionCheck(): void {
    setInterval(() => {
      this.checkServerConnection();
    }, 30000); // Check every 30 seconds
  }
}

// Export singleton instance
export const orderStorage = new OrderStorage();

