const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'orders.db');
const db = new sqlite3.Database(dbPath);

console.log('Initializing SQLite database...');

// Create tables
db.serialize(() => {
  // Create orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      items TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating orders table:', err);
    } else {
      console.log('✅ Orders table created successfully');
    }
  });

  // Create delivered_orders table
  db.run(`
    CREATE TABLE IF NOT EXISTS delivered_orders (
      id INTEGER PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      items TEXT NOT NULL,
      status TEXT DEFAULT 'delivered',
      created_at DATETIME,
      delivered_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating delivered_orders table:', err);
    } else {
      console.log('✅ Delivered orders table created successfully');
    }
  });

  // Create email_logs table for tracking sent emails
  db.run(`
    CREATE TABLE IF NOT EXISTS email_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      email_type TEXT NOT NULL,
      recipient TEXT NOT NULL,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'sent',
      error_message TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating email_logs table:', err);
    } else {
      console.log('✅ Email logs table created successfully');
    }
  });

  // Create indexes for better performance
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)
  `, (err) => {
    if (err) {
      console.error('Error creating orders status index:', err);
    } else {
      console.log('✅ Orders status index created');
    }
  });

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at)
  `, (err) => {
    if (err) {
      console.error('Error creating orders created_at index:', err);
    } else {
      console.log('✅ Orders created_at index created');
    }
  });

  db.run(`
    CREATE INDEX IF NOT EXISTS idx_delivered_orders_delivered_at ON delivered_orders(delivered_at)
  `, (err) => {
    if (err) {
      console.error('Error creating delivered_orders delivered_at index:', err);
    } else {
      console.log('✅ Delivered orders delivered_at index created');
    }
  });
});

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('✅ Database initialization completed successfully');
    console.log(`Database file: ${dbPath}`);
  }
});
