# Pete's Coffee Notification Server

This is a simple Express server that handles order notifications for Pete's Coffee, sending both email and WhatsApp messages when orders are placed.

## Features

- ✅ Email notifications for new orders
- ✅ WhatsApp notifications via Twilio
- ✅ Professional email templates with Pete's Coffee branding
- ✅ WhatsApp messages with formatted text
- ✅ Service status monitoring
- ✅ Test endpoints for both services
- ✅ Simple setup and configuration

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your notification settings:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Pete's Coffee <your-email@gmail.com>
EMAIL_TO=orders@petescoffee.com

# WhatsApp/Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=whatsapp:+14155238886
WHATSAPP_TO=whatsapp:+1234567890

# Server Configuration
PORT=3001
NODE_ENV=development
```

#### Email Setup (Gmail Example)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the app password** in your `.env` file (not your regular Gmail password)

#### WhatsApp Setup (Twilio)

1. **Create a Twilio Account** at [twilio.com](https://www.twilio.com)
2. **Get your Account SID and Auth Token** from the Twilio Console
3. **Set up WhatsApp Sandbox**:
   - Go to Twilio Console → Messaging → Try it out → Send a WhatsApp message
   - Follow the instructions to join the sandbox
   - Use the provided number as `TWILIO_PHONE_NUMBER`
4. **Add your phone number** to `WHATSAPP_TO` (format: `whatsapp:+1234567890`)

### 3. Start the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on port 3001 by default.

### 4. Configure the Frontend

The frontend will automatically connect to `http://localhost:3001/api`. If you need to change the server URL, set the environment variable:

```bash
REACT_APP_API_URL=http://your-server-ip:3001/api
```

### 5. Network Setup (for multiple machines)

To share notifications across multiple machines:

1. **Find your computer's IP address:**
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`

2. **Configure firewall:**
   - Allow incoming connections on port 3001
   - Windows: Add exception in Windows Firewall
   - Mac: Allow in System Preferences > Security & Privacy

3. **Update frontend configuration:**
   - Set `REACT_APP_API_URL=http://YOUR_IP_ADDRESS:3001/api`
   - Replace `YOUR_IP_ADDRESS` with your computer's actual IP

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access from other machines:**
   - Other machines can now submit orders
   - Notifications will be sent to configured email and WhatsApp

## API Endpoints

### Orders
- `POST /api/orders` - Submit a new order (sends notifications)

### Testing
- `POST /api/test/email` - Test email configuration
- `POST /api/test/whatsapp` - Test WhatsApp configuration

### System
- `GET /api/health` - Health check and service status

## Notification Types

### Email Notifications
- **Professional HTML templates** with Pete's Coffee branding
- **Order details** including customer info and items
- **Action required** section for staff
- **Text fallback** for email clients that don't support HTML

### WhatsApp Notifications
- **Formatted messages** with emojis and markdown
- **Order summary** with customer details
- **Itemized list** of ordered items
- **Action reminder** for staff

## Example Notifications

### Email Template
```
Pete's Coffee - New Order Notification

New Order Received!

Order Details:
- Customer: John Doe
- Email: john@example.com
- Order Time: 1/1/2024, 12:00:00 PM

Order Items:
• Cappuccino
• Blueberry Muffin

Action Required:
Please prepare this order for the customer.
```

### WhatsApp Message
```
🍵 Pete's Coffee - New Order

👤 Customer: John Doe
📧 Email: john@example.com
⏰ Time: 1/1/2024, 12:00:00 PM

📋 Order Items:
• Cappuccino
• Blueberry Muffin

🚨 Action Required: Please prepare this order for the customer.

---
Pete's Coffee - Order Management System
```

## Troubleshooting

### Server won't start
- Check if port 3001 is already in use
- Try a different port: `PORT=3002 npm start`

### Email not working
- Verify email credentials in `.env`
- Check if 2FA is enabled and app password is used
- Test email configuration: `POST /api/test/email`
- Check email spam folder

### WhatsApp not working
- Verify Twilio credentials in `.env`
- Check if you've joined the Twilio WhatsApp sandbox
- Test WhatsApp configuration: `POST /api/test/whatsapp`
- Ensure phone numbers are in correct format (`whatsapp:+1234567890`)

### Can't connect from other machines
- Check firewall settings
- Verify IP address is correct
- Ensure all machines are on the same network

### Notifications not sending
- Check browser console for connection errors
- Verify server is running and accessible
- Check network connectivity
- Check health endpoint: `GET /api/health`

## Testing

### Test Email
```bash
curl -X POST http://localhost:3001/api/test/email
```

### Test WhatsApp
```bash
curl -X POST http://localhost:3001/api/test/whatsapp
```

### Health Check
```bash
curl http://localhost:3001/api/health
```

Returns:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": {
    "email": "configured",
    "whatsapp": "configured"
  }
}
```

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- Use app passwords for email, not regular passwords
- Keep Twilio credentials secure
- Consider using HTTPS in production
- Regularly rotate API keys and passwords

## Cost Considerations

### Email
- **Gmail**: Free (with app password setup)
- **Other providers**: Check their pricing

### WhatsApp (Twilio)
- **Sandbox**: Free for testing (limited messages)
- **Production**: Pay-per-message pricing
- **Check Twilio pricing** for your region and volume

## Production Deployment

For production use:

1. **Use a production Twilio account** (not sandbox)
2. **Set up proper domain** for email sending
3. **Use HTTPS** for secure communication
4. **Monitor notification delivery** and costs
5. **Set up proper error handling** and logging
