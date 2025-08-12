const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // Email configuration from environment variables
    const config = {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };

    // Only create transporter if email credentials are provided
    if (config.auth.user && config.auth.pass) {
      this.transporter = nodemailer.createTransporter(config);
      console.log('✅ Email service initialized');
    } else {
      console.warn('⚠️ Email credentials not configured. Email notifications will be disabled.');
    }
  }

  // Send order confirmation email
  async sendOrderConfirmation(order) {
    if (!this.transporter) {
      console.log('Email service not configured, skipping order confirmation email');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const itemsList = order.items.map(item => `• ${item}`).join('\n');
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Pete\'s Coffee <noreply@petescoffee.com>',
        to: order.email,
        subject: `Order Confirmation - Pete's Coffee`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #FFCF01;">Pete's Coffee</h1>
              <p style="margin: 10px 0 0 0; color: #00A28F;">Order Confirmation</p>
            </div>
            
            <div style="padding: 20px; background-color: #f9f9f9;">
              <h2 style="color: #3A2D07;">Thank you for your order, ${order.name}!</h2>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Order Details:</h3>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Order Date:</strong> ${new Date(order.time).toLocaleString()}</p>
                <p><strong>Status:</strong> <span style="color: #00A28F; font-weight: bold;">${order.status}</span></p>
              </div>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Your Items:</h3>
                <div style="white-space: pre-line; font-family: monospace;">${itemsList}</div>
              </div>
              
              <div style="background-color: #00A28F; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">What's Next?</h3>
                <p>We're preparing your order and will notify you when it's ready for pickup or delivery.</p>
                <p>If you have any questions, please contact us.</p>
              </div>
            </div>
            
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center; font-size: 12px;">
              <p>Pete's Coffee - Bringing you the best coffee experience</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        `,
        text: `
          Pete's Coffee - Order Confirmation
          
          Thank you for your order, ${order.name}!
          
          Order Details:
          - Order ID: #${order.id}
          - Order Date: ${new Date(order.time).toLocaleString()}
          - Status: ${order.status}
          
          Your Items:
          ${itemsList}
          
          What's Next?
          We're preparing your order and will notify you when it's ready for pickup or delivery.
          
          If you have any questions, please contact us.
          
          Pete's Coffee - Bringing you the best coffee experience
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Order confirmation email sent to:', order.email);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending order confirmation email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send notification email to staff
  async sendStaffNotification(order) {
    if (!this.transporter) {
      console.log('Email service not configured, skipping staff notification email');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const itemsList = order.items.map(item => `• ${item}`).join('\n');
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Pete\'s Coffee <noreply@petescoffee.com>',
        to: process.env.EMAIL_TO || 'orders@petescoffee.com',
        subject: `New Order Received - #${order.id}`,
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
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Customer:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Order Date:</strong> ${new Date(order.time).toLocaleString()}</p>
                <p><strong>Status:</strong> <span style="color: #00A28F; font-weight: bold;">${order.status}</span></p>
              </div>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Order Items:</h3>
                <div style="white-space: pre-line; font-family: monospace;">${itemsList}</div>
              </div>
              
              <div style="background-color: #FFCF01; color: #3A2D07; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Action Required</h3>
                <p>Please prepare this order and update the status in the order management system.</p>
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
          - Order ID: #${order.id}
          - Customer: ${order.name}
          - Email: ${order.email}
          - Order Date: ${new Date(order.time).toLocaleString()}
          - Status: ${order.status}
          
          Order Items:
          ${itemsList}
          
          Action Required:
          Please prepare this order and update the status in the order management system.
          
          Pete's Coffee - Order Management System
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Staff notification email sent to:', process.env.EMAIL_TO);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending staff notification email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send order status update email
  async sendStatusUpdate(order, newStatus) {
    if (!this.transporter) {
      console.log('Email service not configured, skipping status update email');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      const statusMessages = {
        'left kitchen': 'Your order has left the kitchen and is being prepared for delivery/pickup.',
        'on delivery': 'Your order is on its way to you!',
        'delivered': 'Your order has been delivered. Enjoy!'
      };

      const statusMessage = statusMessages[newStatus] || 'Your order status has been updated.';
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Pete\'s Coffee <noreply@petescoffee.com>',
        to: order.email,
        subject: `Order Status Update - #${order.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #FFCF01;">Pete's Coffee</h1>
              <p style="margin: 10px 0 0 0; color: #00A28F;">Order Status Update</p>
            </div>
            
            <div style="padding: 20px; background-color: #f9f9f9;">
              <h2 style="color: #3A2D07;">Order Status Updated</h2>
              
              <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="color: #3A2D07; margin-top: 0;">Order Details:</h3>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Customer:</strong> ${order.name}</p>
                <p><strong>New Status:</strong> <span style="color: #00A28F; font-weight: bold;">${newStatus}</span></p>
                <p><strong>Updated:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background-color: #00A28F; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Status Update</h3>
                <p>${statusMessage}</p>
              </div>
            </div>
            
            <div style="background-color: #3A2D07; color: white; padding: 20px; text-align: center; font-size: 12px;">
              <p>Pete's Coffee - Bringing you the best coffee experience</p>
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        `,
        text: `
          Pete's Coffee - Order Status Update
          
          Order Status Updated
          
          Order Details:
          - Order ID: #${order.id}
          - Customer: ${order.name}
          - New Status: ${newStatus}
          - Updated: ${new Date().toLocaleString()}
          
          Status Update:
          ${statusMessage}
          
          Pete's Coffee - Bringing you the best coffee experience
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Status update email sent to:', order.email);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('❌ Error sending status update email:', error);
      return { success: false, error: error.message };
    }
  }

  // Test email configuration
  async testEmail() {
    if (!this.transporter) {
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

      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailService;
