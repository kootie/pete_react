# Pete's Coffee Order Server

This is a simple Express server that handles order storage and sharing across multiple machines for Pete's Coffee, using SQLite database and email notifications.

## Features

- ✅ Shared order storage across multiple machines
- ✅ SQLite database for reliable data storage
- ✅ Real-time order status updates
- ✅ Automatic order archiving when delivered
- ✅ Email notifications for new orders and status updates
- ✅ Email logging and tracking
- ✅ Backup and restore functionality
- ✅ Fallback to localStorage when server is offline

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

Edit `.env` with your email settings:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=Pete's Coffee <your-email@gmail.com>
EMAIL_TO=orders@petescoffee.com

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DB_PATH=./data/orders.db
```

#### Email Setup (Gmail Example)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Use the app password** in your `.env` file (not your regular Gmail password)

### 3. Initialize Database

```bash
npm run init-db
```

This creates the SQLite database with the required tables.

### 4. Start the Server

```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on port 3001 by default.

### 5. Configure the Frontend

The frontend will automatically connect to `http://localhost:3001/api`. If you need to change the server URL, set the environment variable:

```bash
REACT_APP_API_URL=http://your-server-ip:3001/api
```

### 6. Network Setup (for multiple machines)

To share orders across multiple machines:

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
   - Other machines can now access the order system
   - Orders will be shared in real-time

## API Endpoints

### Orders
- `GET /api/orders` - Get all active orders
- `GET /api/orders/delivered` - Get all delivered orders
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/status` - Update order status
- `POST /api/orders/:id/restore` - Restore delivered order to active

### Emails
- `GET /api/emails` - Get email logs
- `POST /api/emails/test` - Test email configuration

### System
- `GET /api/export` - Export all data (backup)
- `POST /api/import` - Import data (restore)
- `GET /api/health` - Health check

## Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  items TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Delivered Orders Table
```sql
CREATE TABLE delivered_orders (
  id INTEGER PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  items TEXT NOT NULL,
  status TEXT DEFAULT 'delivered',
  created_at DATETIME,
  delivered_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Email Logs Table
```sql
CREATE TABLE email_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'sent',
  error_message TEXT
);
```

## Email Notifications

The system sends the following emails:

1. **Order Confirmation** - Sent to customer when order is placed
2. **Staff Notification** - Sent to staff when new order is received
3. **Status Updates** - Sent to customer when order status changes

### Email Templates

All emails use Pete's Coffee branding with:
- Professional HTML and text versions
- Order details and status information
- Branded styling with Pete's Coffee colors

## Data Storage

Orders are stored in SQLite database:
- `data/orders.db` - SQLite database file
- Automatically created on first run
- Includes indexes for better performance

## Troubleshooting

### Server won't start
- Check if port 3001 is already in use
- Try a different port: `PORT=3002 npm start`
- Ensure database is initialized: `npm run init-db`

### Database errors
- Check if `data/` directory exists
- Run `npm run init-db` to recreate database
- Check file permissions on `data/orders.db`

### Email not working
- Verify email credentials in `.env`
- Check if 2FA is enabled and app password is used
- Test email configuration: `POST /api/emails/test`
- Check email logs: `GET /api/emails`

### Can't connect from other machines
- Check firewall settings
- Verify IP address is correct
- Ensure all machines are on the same network

### Orders not syncing
- Check browser console for connection errors
- Verify server is running and accessible
- Check network connectivity
- Check health endpoint: `GET /api/health`

## Fallback Mode

If the server is unavailable, the frontend will automatically fall back to localStorage. This ensures the system continues to work even when the server is down.

## Backup and Restore

You can export all data for backup:
```bash
curl http://localhost:3001/api/export > backup.json
```

The export includes:
- Active orders
- Delivered orders
- Email logs
- Export timestamp

## Monitoring

### Health Check
```bash
curl http://localhost:3001/api/health
```

Returns:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "database": "connected",
  "email": "configured"
}
```

### Email Logs
```bash
curl http://localhost:3001/api/emails
```

Shows all sent emails with status and error messages.

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- Use app passwords for email, not regular passwords
- Consider using HTTPS in production
- Regularly backup the SQLite database file
