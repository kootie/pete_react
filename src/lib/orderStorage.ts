// Order storage utility that works across multiple machines via API
// This connects to a local Express server for shared order storage

export interface Order {
  id: number;
  name: string;
  email: string;
  items: string[];
  time: string;
  status?: string;
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
        console.log('✅ Connected to notification server');
      } else {
        this.isOnline = false;
        console.warn('⚠️ Server health check failed');
      }
    } catch (error) {
      this.isOnline = false;
      console.warn('⚠️ Cannot connect to notification server, using local storage only');
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

  // Submit a new order and send notifications
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
        orders[orderIndex].status = status;
        localStorage.setItem("petes_orders", JSON.stringify(orders));
      }
    } catch (error) {
      console.error('Error updating local order status:', error);
    }
  }

  // Remove order from local storage
  public removeLocalOrder(orderId: number): void {
    try {
      const orders = this.getLocalOrders();
      const filteredOrders = orders.filter(order => order.id !== orderId);
      localStorage.setItem("petes_orders", JSON.stringify(filteredOrders));
    } catch (error) {
      console.error('Error removing local order:', error);
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
  public async getServerStatus(): Promise<{ status: string; services: { email: string; whatsapp: string } }> {
    try {
      if (this.isOnline) {
        return await this.makeRequest('/health');
      } else {
        return {
          status: 'OFFLINE',
          services: { email: 'unknown', whatsapp: 'unknown' }
        };
      }
    } catch (error) {
      return {
        status: 'ERROR',
        services: { email: 'unknown', whatsapp: 'unknown' }
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

