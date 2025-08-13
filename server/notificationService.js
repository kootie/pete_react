const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

class NotificationService {
  constructor() {
    this.emailTransporter = null;
    this.twilioClient = null;
    this.initializeServices();
  }

  initializeServices() {
    // Initialize Email Service
    const emailConfig = {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true' || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };

    // Add TLS options for better compatibility
    if (emailConfig.port === 587) {
      emailConfig.requireTLS = true;
      emailConfig.ignoreTLS = false;
    }

    if (emailConfig.auth.user && emailConfig.auth.pass && emailConfig.host) {
      this.emailTransporter = nodemailer.createTransport(emailConfig);
      console.log('✅ Email service initialized');
      console.log(`📧 Email host: ${emailConfig.host}:${emailConfig.port}`);
    } else {
      console.warn('⚠️ Email credentials not configured. Email notifications will be disabled.');
      console.log('Required: EMAIL_HOST, EMAIL_USER, EMAIL_PASS');
    }

    // Initialize Twilio/WhatsApp Service
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (accountSid && authToken) {
      this.twilioClient = twilio(accountSid, authToken);
      console.log('✅ WhatsApp service initialized');
    } else {
      console.warn('⚠️ Twilio credentials not configured. WhatsApp notifications will be disabled.');
    }
  }

  // Send order notification via email
  async sendEmailNotification(order) {
    if (!this.emailTransporter) {
      console.log('Email service not configured, skipping email notification');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const itemsList = order.items.map(item => `• ${item}`).join('\n');
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Pete\'s Coffee <noreply@petescoffee.com>',
        to: process.env.EMAIL_TO || 'orders@petescoffee.com',
        subject: `New Order Received - ${order.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #FFCF01;">Pete's Coffee</h1>
              <p style="margin: 10px 0 0 0; color: #00A28F;">New Order Notification</p>
            </div>
            
            <div style="padding: 20px; background-color: #f9f9f9;">
              <h2 style="color: #3A2D07;">New Order Received!</h2>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Order Details:</h3>
                <p><strong>Customer:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Order Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Order Items:</h3>
                <div style="white-space: pre-line; font-family: monospace;">${itemsList}</div>
              </div>
              
              <div style="background-color: #FFCF01; color: #3A2D07; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Action Required</h3>
                <p>Please prepare this order for the customer.</p>
              </div>
            </div>
            
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center; font-size: 12px;">
              <p>Pete's Coffee - Order Management System</p>
            </div>
          </div>
        `,
        text: `
          Pete's Coffee - New Order Notification
          
          New Order Received!
          
          Order Details:
          - Customer: ${order.name}
          - Email: ${order.email}
          - Order Time: ${new Date().toLocaleString()}
          
          Order Items:
          ${itemsList}
          
          Action Required:
          Please prepare this order for the customer.
          
          Pete's Coffee - Order Management System
        `
      };

      const result = await this.emailTransporter.sendMail(mailOptions);
      console.log('✅ Email notification sent to:', process.env.EMAIL_TO);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending email notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send order notification via WhatsApp
  async sendWhatsAppNotification(order) {
    if (!this.twilioClient) {
      console.log('WhatsApp service not configured, skipping WhatsApp notification');
      return { success: false, message: 'WhatsApp service not configured' };
    }

    try {
      const itemsList = order.items.map(item => `• ${item}`).join('\n');
      
      const message = `🍵 *Pete's Coffee - New Order*

👤 *Customer:* ${order.name}
📧 *Email:* ${order.email}
⏰ *Time:* ${new Date().toLocaleString()}

📋 *Order Items:*
${itemsList}

🚨 *Action Required:* Please prepare this order for the customer.

---
Pete's Coffee - Order Management System`;

      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.WHATSAPP_TO
      });

      console.log('✅ WhatsApp notification sent to:', process.env.WHATSAPP_TO);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('❌ Error sending WhatsApp notification:', error);
      return { success: false, error: error.message };
    }
  }

  // Send both email and WhatsApp notifications
  async sendOrderNotification(order) {
    console.log('📨 Sending order notifications...');
    
    const results = {
      email: { success: false },
      whatsapp: { success: false }
    };

    // Send email notification
    try {
      results.email = await this.sendEmailNotification(order);
    } catch (error) {
      console.error('Error sending email:', error);
      results.email = { success: false, error: error.message };
    }

    // Send WhatsApp notification
    try {
      results.whatsapp = await this.sendWhatsAppNotification(order);
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      results.whatsapp = { success: false, error: error.message };
    }

    // Log results
    console.log('📊 Notification Results:');
    console.log(`  📧 Email: ${results.email.success ? '✅ Sent' : '❌ Failed'}`);
    console.log(`  📱 WhatsApp: ${results.whatsapp.success ? '✅ Sent' : '❌ Failed'}`);

    return results;
  }

  // Test email configuration
  async testEmail() {
    if (!this.emailTransporter) {
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Pete\'s Coffee <noreply@petescoffee.com>',
        to: process.env.EMAIL_TO || 'test@example.com',
        subject: 'Pete\'s Coffee - Email Test',
        text: 'This is a test email from Pete\'s Coffee order system.',
        html: '<h1>Pete\'s Coffee</h1><p>This is a test email from the order system.</p>'
      };

      const result = await this.emailTransporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Test WhatsApp configuration
  async testWhatsApp() {
    if (!this.twilioClient) {
      return { success: false, message: 'WhatsApp service not configured' };
    }

    try {
      const message = `🍵 *Pete's Coffee - Test Message*

This is a test message from the Pete's Coffee order system.

Time: ${new Date().toLocaleString()}

---
Pete's Coffee - Order Management System`;

      const result = await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.WHATSAPP_TO
      });

      return { success: true, messageId: result.sid };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get service status
  getServiceStatus() {
    return {
      email: this.emailTransporter ? 'configured' : 'not configured',
      whatsapp: this.twilioClient ? 'configured' : 'not configured'
    };
  }
}

module.exports = NotificationService;
