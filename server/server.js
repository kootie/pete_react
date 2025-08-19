const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const NotificationService = require('./notificationService');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize services
const notificationService = new NotificationService();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes

// Submit a new order (sends email notification)
app.post('/api/orders', async (req, res) => {
  try {
    const { name, email, items } = req.body;
    
    if (!name || !email || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create order object for email
    const order = {
      name,
      email,
      items,
      timestamp: new Date().toISOString(),
      id: Date.now() // Simple ID for reference
    };

    // Send email notification
    const emailResult = await notificationService.sendEmailNotification(order);
    
    if (emailResult.success) {
      res.status(201).json({
        message: 'Order submitted successfully! We will contact you shortly.',
        orderId: order.id
      });
    } else {
      res.status(500).json({
        error: 'Failed to submit order. Please try again or contact us directly.',
        details: emailResult.error || emailResult.message
      });
    }
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

// Submit franchise inquiry
app.post('/api/franchise-inquiry', async (req, res) => {
  try {
    const { name, email, phone, location, experience, investment, details } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required fields' });
    }

    const inquiry = {
      name,
      email,
      phone,
      location,
      experience,
      investment,
      details,
      timestamp: new Date().toISOString()
    };

    // Send franchise inquiry email
    const result = await notificationService.sendFranchiseInquiryNotification(inquiry);
    
    if (result.success) {
      res.status(201).json({
        message: 'Franchise inquiry submitted successfully',
        inquiry,
        notification: result
      });
    } else {
      res.status(500).json({
        error: 'Failed to send franchise inquiry email',
        details: result.error || result.message
      });
    }
  } catch (error) {
    console.error('Error processing franchise inquiry:', error);
    res.status(500).json({ error: 'Failed to process franchise inquiry' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  const serviceStatus = notificationService.getServiceStatus();
  
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: serviceStatus,
    storage: 'email-only'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Pete's Coffee Order Server running on port ${PORT}`);
  console.log(`📧 Email service: ${notificationService.emailTransporter ? 'Configured' : 'Not configured'}`);
  console.log(`📱 WhatsApp service: ${notificationService.twilioClient ? 'Configured' : 'Not configured'}`);
  console.log(`📧 Orders sent to: info@petescoffee.co.ke`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
