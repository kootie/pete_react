const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'orders.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('✅ Connected to SQLite database');
      }
    });
  }

  // Get all active orders
  getOrders() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          id,
          customer_name as name,
          customer_email as email,
          items,
          status,
          created_at as time,
          updated_at
        FROM orders 
        ORDER BY created_at DESC
      `;
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Parse items JSON
          const orders = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items),
            time: row.time
          }));
          resolve(orders);
        }
      });
    });
  }

  // Get all delivered orders
  getDeliveredOrders() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          id,
          customer_name as name,
          customer_email as email,
          items,
          status,
          created_at as time,
          delivered_at
        FROM delivered_orders 
        ORDER BY delivered_at DESC
      `;
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          // Parse items JSON
          const orders = rows.map(row => ({
            ...row,
            items: JSON.parse(row.items),
            time: row.time
          }));
          resolve(orders);
        }
      });
    });
  }

  // Add a new order
  addOrder(order) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO orders (customer_name, customer_email, items, status)
        VALUES (?, ?, ?, ?)
      `;
      
      const params = [
        order.name,
        order.email,
        JSON.stringify(order.items),
        'pending'
      ];
      
      this.db.run(query, params, function(err) {
        if (err) {
          reject(err);
        } else {
          // Get the inserted order
          this.getOrderById(this.lastID).then(resolve).catch(reject);
        }
      }.bind(this));
    });
  }

  // Get order by ID
  getOrderById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          id,
          customer_name as name,
          customer_email as email,
          items,
          status,
          created_at as time,
          updated_at
        FROM orders 
        WHERE id = ?
      `;
      
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('Order not found'));
        } else {
          const order = {
            ...row,
            items: JSON.parse(row.items),
            time: row.time
          };
          resolve(order);
        }
      });
    });
  }

  // Update order status
  updateOrderStatus(id, status) {
    return new Promise((resolve, reject) => {
      if (status === 'delivered') {
        // Move to delivered orders
        this.moveToDelivered(id).then(resolve).catch(reject);
      } else {
        // Update status in active orders
        const query = `
          UPDATE orders 
          SET status = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `;
        
        this.db.run(query, [status, id], function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ message: 'Order status updated' });
          }
        });
      }
    });
  }

  // Move order to delivered
  moveToDelivered(id) {
    return new Promise((resolve, reject) => {
      // First get the order
      this.getOrderById(id).then(order => {
        // Insert into delivered_orders
        const insertQuery = `
          INSERT INTO delivered_orders (id, customer_name, customer_email, items, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const params = [
          order.id,
          order.name,
          order.email,
          JSON.stringify(order.items),
          'delivered',
          order.time
        ];
        
        this.db.run(insertQuery, params, function(err) {
          if (err) {
            reject(err);
          } else {
            // Delete from active orders
            const deleteQuery = `DELETE FROM orders WHERE id = ?`;
            this.db.run(deleteQuery, [id], function(err) {
              if (err) {
                reject(err);
              } else {
                resolve({ message: 'Order moved to delivered' });
              }
            });
          }
        });
      }).catch(reject);
    });
  }

  // Restore delivered order to active
  restoreOrder(id) {
    return new Promise((resolve, reject) => {
      // Get the delivered order
      const getQuery = `
        SELECT 
          id,
          customer_name as name,
          customer_email as email,
          items,
          status,
          created_at as time,
          delivered_at
        FROM delivered_orders 
        WHERE id = ?
      `;
      
      this.db.get(getQuery, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('Order not found'));
        } else {
          // Insert back into active orders
          const insertQuery = `
            INSERT INTO orders (id, customer_name, customer_email, items, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          
          const params = [
            row.id,
            row.name,
            row.email,
            row.items,
            'pending',
            row.time
          ];
          
          this.db.run(insertQuery, params, function(err) {
            if (err) {
              reject(err);
            } else {
              // Delete from delivered orders
              const deleteQuery = `DELETE FROM delivered_orders WHERE id = ?`;
              this.db.run(deleteQuery, [id], function(err) {
                if (err) {
                  reject(err);
                } else {
                  resolve({ message: 'Order restored to active' });
                }
              });
            }
          });
        }
      });
    });
  }

  // Log email sent
  logEmail(orderId, emailType, recipient, status = 'sent', errorMessage = null) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO email_logs (order_id, email_type, recipient, status, error_message)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      this.db.run(query, [orderId, emailType, recipient, status, errorMessage], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ message: 'Email logged' });
        }
      });
    });
  }

  // Get email logs
  getEmailLogs() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM email_logs 
        ORDER BY sent_at DESC
      `;
      
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Export all data
  exportData() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getOrders(),
        this.getDeliveredOrders(),
        this.getEmailLogs()
      ]).then(([orders, deliveredOrders, emailLogs]) => {
        resolve({
          orders,
          deliveredOrders,
          emailLogs,
          exportedAt: new Date().toISOString()
        });
      }).catch(reject);
    });
  }

  // Close database connection
  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Database;
