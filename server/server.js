const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const NotificationService = require('./notificationService');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize notification service
const notificationService = new NotificationService();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Submit a new order (sends notifications only)
app.post('/api/orders', async (req, res) => {
  try {
    const { name, email, items } = req.body;
    
    if (!name || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = {
      id: Date.now(),
      name,
      email,
      items,
      time: new Date().toISOString()
    };

    // Send notifications (email and WhatsApp)
    const notificationResults = await notificationService.sendOrderNotification(order);
    
    res.status(201).json({
      message: 'Order submitted successfully',
      order,
      notifications: notificationResults
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Failed to process order' });
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
    services: serviceStatus
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pete's Coffee Notification Server running on port ${PORT}`);
  console.log(`📧 Email service: ${notificationService.emailTransporter ? 'Configured' : 'Not configured'}`);
  console.log(`📱 WhatsApp service: ${notificationService.twilioClient ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
