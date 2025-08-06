import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PASSWORD = "petescoffee2024"; // Admin password for Pete's Coffee

const statusOptions = ["pending", "left kitchen", "on delivery"];

const OrderHistory = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("petes_orders") || "[]");
    } catch {
      return [];
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const updateStatus = (id: number, status: string) => {
    const updated = orders.map((order: any) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updated);
    localStorage.setItem("petes_orders", JSON.stringify(updated));
  };

  // Pagination calculations
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navigation />
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md mt-24">
          <h2 className="text-2xl font-bold mb-4 text-pete-brown">Admin Access</h2>
          <p className="text-gray-600 mb-4">Enter admin password to view order history</p>
          <input
            type="password"
            className="border rounded px-3 py-2 w-full mb-4"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pete-brown">Order Management</h1>
          <Button 
            onClick={() => setLoggedIn(false)} 
            variant="outline"
            className="text-pete-brown border-pete-brown hover:bg-pete-brown hover:text-white"
          >
            Logout
          </Button>
        </div>
        {orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, orders.length)} of {orders.length} orders
            </div>
            <div className="space-y-6">
              {currentOrders.map((order: any) => (
              <div key={order.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <div className="font-bold text-lg">{order.name} ({order.email})</div>
                    <div className="text-gray-500 text-sm">{new Date(order.time).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="font-medium mr-2">Status:</span>
                    <select
                      value={order.status}
                      onChange={e => updateStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="font-medium">Items:</span>
                  <ul className="list-disc pl-6">
                    {order.items.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <span className="px-3 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory; 