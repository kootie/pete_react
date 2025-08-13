const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const NotificationService = require('./notificationService');
const OrderStorage = require('./orderStorage');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize services
const notificationService = new NotificationService();
const orderStorage = new OrderStorage();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Get all active orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = orderStorage.getOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get all delivered orders
app.get('/api/orders/delivered', async (req, res) => {
  try {
    const orders = orderStorage.getDeliveredOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    res.status(500).json({ error: 'Failed to fetch delivered orders' });
  }
});

// Submit a new order (saves to server and sends notifications)
app.post('/api/orders', async (req, res) => {
  try {
    const { name, email, items } = req.body;
    
    if (!name || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save order to server
    const newOrder = orderStorage.addOrder({ name, email, items });

    // Send notifications (email and WhatsApp)
    const notificationResults = await notificationService.sendOrderNotification(newOrder);
    
    res.status(201).json({
      message: 'Order submitted successfully',
      order: newOrder,
      notifications: notificationResults
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = orderStorage.updateOrderStatus(parseInt(id), status);
    res.json(result);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Restore delivered order to active
app.post('/api/orders/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
    const result = orderStorage.restoreOrder(parseInt(id));
    res.json(result);
  } catch (error) {
    console.error('Error restoring order:', error);
    res.status(500).json({ error: 'Failed to restore order' });
  }
});

// Export all data
app.get('/api/export', async (req, res) => {
  try {
    const data = orderStorage.exportData();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=orders_backup.json');
    res.json(data);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Test email configuration
app.post('/api/test/email', async (req, res) => {
  try {
    const result = await notificationService.testEmail();
    res.json(result);
  } catch (error) {
    console.error('Error testing email:', error);
    res.status(500).json({ error: 'Failed to test email' });
  }
});

// Test WhatsApp configuration
app.post('/api/test/whatsapp', async (req, res) => {
  try {
    const result = await notificationService.testWhatsApp();
    res.json(result);
  } catch (error) {
    console.error('Error testing WhatsApp:', error);
    res.status(500).json({ error: 'Failed to test WhatsApp' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const serviceStatus = notificationService.getServiceStatus();
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: serviceStatus,
    storage: 'file-based'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pete's Coffee Order Server running on port ${PORT}`);
  console.log(`📧 Email service: ${notificationService.emailTransporter ? 'Configured' : 'Not configured'}`);
  console.log(`📱 WhatsApp service: ${notificationService.twilioClient ? 'Configured' : 'Not configured'}`);
  console.log(`💾 Order storage: File-based (data/orders.json)`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
