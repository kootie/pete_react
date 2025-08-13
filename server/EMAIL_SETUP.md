# Email Setup Guide for Pete's Coffee Order System

## 📧 **Email Configuration for Any Provider**

The system now supports any email provider, not just Gmail. Here's how to configure it:

### **1. Create/Update `.env` file**

Create a file called `.env` in the `server/` directory with your email settings:

```env
# Email Configuration (Any Email Provider)
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@your-domain.com
EMAIL_PASS=your-email-password
EMAIL_FROM=Pete's Coffee <your-email@your-domain.com>
EMAIL_TO=info@petescoffee.co.ke
EMAIL_SECURE=false

# WhatsApp/Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
WHATSAPP_TO=whatsapp:+254721948852

# Server Configuration
PORT=3001
NODE_ENV=development
```

### **2. Common Email Provider Settings**

#### **Gmail**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_SECURE=false
```

#### **Outlook/Hotmail**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_SECURE=false
```

#### **Yahoo**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
EMAIL_SECURE=false
```

#### **Custom Domain (cPanel)**
```env
EMAIL_HOST=mail.your-domain.com
EMAIL_PORT=587
EMAIL_USER=your-email@your-domain.com
EMAIL_PASS=your-email-password
EMAIL_SECURE=false
```

#### **Office 365**
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=your-email@your-domain.com
EMAIL_PASS=your-password
EMAIL_SECURE=false
```

### **3. Testing Your Email Configuration**

After setting up your `.env` file, restart the server and test:

```bash
# Test email configuration
curl -X POST http://localhost:3001/api/test/email

# Test complete order with notifications
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Customer","email":"test@example.com","items":["Cappuccino","Croissant"]}'
```

### **4. Troubleshooting**

#### **Authentication Failed**
- Check your email and password
- For Gmail: Use App Password (not regular password)
- For other providers: Check if SMTP is enabled

#### **Connection Timeout**
- Verify the SMTP host and port
- Check if your email provider allows SMTP access
- Try different ports (587, 465, 25)

#### **SSL/TLS Issues**
- Set `EMAIL_SECURE=true` for port 465
- Set `EMAIL_SECURE=false` for port 587

### **5. Security Notes**

- **Never commit `.env` file to Git** (it's already in `.gitignore`)
- Use strong passwords
- For Gmail: Enable 2FA and use App Passwords
- Consider using environment variables in production

### **6. Example Complete Setup**

For a typical business email setup:

```env
# Business Email (e.g., info@petescoffee.co.ke)
EMAIL_HOST=mail.petescoffee.co.ke
EMAIL_PORT=587
EMAIL_USER=info@petescoffee.co.ke
EMAIL_PASS=your-secure-password
EMAIL_FROM=Pete's Coffee <info@petescoffee.co.ke>
EMAIL_TO=info@petescoffee.co.ke
EMAIL_SECURE=false

# WhatsApp (already working)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
WHATSAPP_TO=whatsapp:+254721948852

PORT=3001
NODE_ENV=development
```

## ✅ **Current Status**

- ✅ **WhatsApp notifications** - Working perfectly
- ✅ **Order storage** - Saving to server files  
- ✅ **Cross-machine access** - Orders visible from any device
- ⚠️ **Email notifications** - Ready to configure with any provider

Once you configure your email settings in the `.env` file, both email and WhatsApp notifications will be sent to `info@petescoffee.co.ke` for every order!
