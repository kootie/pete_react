const fs = require('fs-extra');
const path = require('path');

class OrderStorage {
  constructor() {
    this.ordersFile = path.join(__dirname, 'data', 'orders.json');
    this.deliveredOrdersFile = path.join(__dirname, 'data', 'delivered_orders.json');
    this.ensureDataDirectory();
    this.initializeFiles();
  }

  ensureDataDirectory() {
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  initializeFiles() {
    // Initialize orders file if it doesn't exist
    if (!fs.existsSync(this.ordersFile)) {
      fs.writeJsonSync(this.ordersFile, []);
    }
    
    // Initialize delivered orders file if it doesn't exist
    if (!fs.existsSync(this.deliveredOrdersFile)) {
      fs.writeJsonSync(this.deliveredOrdersFile, []);
    }
  }

  // Get all active orders
  getOrders() {
    try {
      const orders = fs.readJsonSync(this.ordersFile);
      return orders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } catch (error) {
      console.error('Error reading orders:', error);
      return [];
    }
  }

  // Get all delivered orders
  getDeliveredOrders() {
    try {
      const orders = fs.readJsonSync(this.deliveredOrdersFile);
      return orders.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } catch (error) {
      console.error('Error reading delivered orders:', error);
      return [];
    }
  }

  // Add a new order
  addOrder(order) {
    try {
      const orders = this.getOrders();
      const newOrder = {
        ...order,
        id: Date.now(),
        time: new Date().toISOString(),
        status: 'pending'
      };
      
      orders.unshift(newOrder);
      fs.writeJsonSync(this.ordersFile, orders, { spaces: 2 });
      
      console.log('✅ Order saved to server:', newOrder.id);
      return newOrder;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }

  // Update order status
  updateOrderStatus(orderId, status) {
    try {
      const orders = this.getOrders();
      const orderIndex = orders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        throw new Error('Order not found');
      }

      if (status === 'delivered') {
        // Move to delivered orders
        const order = orders[orderIndex];
        const deliveredOrder = {
          ...order,
          status: 'delivered',
          deliveredAt: new Date().toISOString()
        };
        
        const deliveredOrders = this.getDeliveredOrders();
        deliveredOrders.unshift(deliveredOrder);
        fs.writeJsonSync(this.deliveredOrdersFile, deliveredOrders, { spaces: 2 });
        
        // Remove from active orders
        orders.splice(orderIndex, 1);
        fs.writeJsonSync(this.ordersFile, orders, { spaces: 2 });
        
        console.log('✅ Order moved to delivered:', orderId);
        return { message: 'Order moved to delivered' };
      } else {
        // Update status in active orders
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        fs.writeJsonSync(this.ordersFile, orders, { spaces: 2 });
        
        console.log('✅ Order status updated:', orderId, status);
        return { message: 'Order status updated' };
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  // Restore delivered order to active
  restoreOrder(orderId) {
    try {
      const deliveredOrders = this.getDeliveredOrders();
      const orderIndex = deliveredOrders.findIndex(order => order.id === orderId);
      
      if (orderIndex === -1) {
        throw new Error('Order not found');
      }

      const order = deliveredOrders[orderIndex];
      const restoredOrder = {
        ...order,
        status: 'pending',
        deliveredAt: undefined,
        updatedAt: new Date().toISOString()
      };
      
      const orders = this.getOrders();
      orders.unshift(restoredOrder);
      fs.writeJsonSync(this.ordersFile, orders, { spaces: 2 });
      
      // Remove from delivered orders
      deliveredOrders.splice(orderIndex, 1);
      fs.writeJsonSync(this.deliveredOrdersFile, deliveredOrders, { spaces: 2 });
      
      console.log('✅ Order restored to active:', orderId);
      return { message: 'Order restored to active' };
    } catch (error) {
      console.error('Error restoring order:', error);
      throw error;
    }
  }

  // Export all data
  exportData() {
    try {
      const orders = this.getOrders();
      const deliveredOrders = this.getDeliveredOrders();
      
      return {
        orders,
        deliveredOrders,
        exportedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      throw error;
    }
  }

  // Get order by ID
  getOrderById(orderId) {
    try {
      const orders = this.getOrders();
      const order = orders.find(order => order.id === orderId);
      
      if (!order) {
        const deliveredOrders = this.getDeliveredOrders();
        return deliveredOrders.find(order => order.id === orderId);
      }
      
      return order;
    } catch (error) {
      console.error('Error getting order by ID:', error);
      return null;
    }
  }
}

module.exports = OrderStorage;
