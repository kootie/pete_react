const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const Database = require('./database');
const EmailService = require('./emailService');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize services
const db = new Database();
const emailService = new EmailService();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Get all active orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db.getOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get all delivered orders
app.get('/api/orders/delivered', async (req, res) => {
  try {
    const orders = await db.getDeliveredOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    res.status(500).json({ error: 'Failed to fetch delivered orders' });
  }
});

// Add a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { name, email, items } = req.body;
    
    if (!name || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Add order to database
    const newOrder = await db.addOrder({ name, email, items });
    
    // Send emails
    const emailPromises = [];
    
    // Send confirmation email to customer
    emailPromises.push(
      emailService.sendOrderConfirmation(newOrder)
        .then(result => db.logEmail(newOrder.id, 'confirmation', newOrder.email, result.success ? 'sent' : 'failed', result.error))
    );
    
    // Send notification email to staff
    emailPromises.push(
      emailService.sendStaffNotification(newOrder)
        .then(result => db.logEmail(newOrder.id, 'staff_notification', process.env.EMAIL_TO || 'orders@petescoffee.com', result.success ? 'sent' : 'failed', result.error))
    );
    
    // Wait for emails to be sent (but don't block the response)
    Promise.all(emailPromises).catch(error => {
      console.error('Error sending emails:', error);
    });
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
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

    // Update order status
    const result = await db.updateOrderStatus(parseInt(id), status);
    
    // If status was updated (not moved to delivered), send status update email
    if (status !== 'delivered') {
      try {
        const order = await db.getOrderById(parseInt(id));
        emailService.sendStatusUpdate(order, status)
          .then(emailResult => db.logEmail(parseInt(id), 'status_update', order.email, emailResult.success ? 'sent' : 'failed', emailResult.error))
          .catch(error => {
            console.error('Error sending status update email:', error);
            db.logEmail(parseInt(id), 'status_update', 'unknown', 'failed', error.message);
          });
      } catch (error) {
        console.error('Error getting order for status update email:', error);
      }
    }
    
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
    const result = await db.restoreOrder(parseInt(id));
    res.json(result);
  } catch (error) {
    console.error('Error restoring order:', error);
    res.status(500).json({ error: 'Failed to restore order' });
  }
});

// Get email logs
app.get('/api/emails', async (req, res) => {
  try {
    const emailLogs = await db.getEmailLogs();
    res.json(emailLogs);
  } catch (error) {
    console.error('Error fetching email logs:', error);
    res.status(500).json({ error: 'Failed to fetch email logs' });
  }
});

// Test email configuration
app.post('/api/emails/test', async (req, res) => {
  try {
    const result = await emailService.testEmail();
    res.json(result);
  } catch (error) {
    console.error('Error testing email:', error);
    res.status(500).json({ error: 'Failed to test email' });
  }
});

// Export all data
app.get('/api/export', async (req, res) => {
  try {
    const data = await db.exportData();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=orders_backup.json');
    res.json(data);
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

// Import data (for backup restore)
app.post('/api/import', async (req, res) => {
  try {
    const { orders, deliveredOrders } = req.body;
    
    if (!Array.isArray(orders) || !Array.isArray(deliveredOrders)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    // This would need to be implemented in the Database class
    // For now, we'll return an error
    res.status(501).json({ error: 'Import functionality not yet implemented' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ error: 'Failed to import data' });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Test database connection
    await db.getOrders();
    
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      email: emailService.transporter ? 'configured' : 'not configured'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      timestamp: new Date().toISOString(),
      error: error.message 
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  try {
    await db.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pete's Coffee Order Server running on port ${PORT}`);
  console.log(`📧 Email service: ${emailService.transporter ? 'Configured' : 'Not configured'}`);
  console.log(`💾 Database: SQLite`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
