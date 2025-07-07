import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PASSWORD = "petescoffee"; // Simple hardcoded password

const statusOptions = ["pending", "left kitchen", "on delivery"];

const OrderHistory = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
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

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Navigation />
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md mt-24">
          <h2 className="text-2xl font-bold mb-4">Order History Login</h2>
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
        <h1 className="text-4xl font-bold mb-8">Order History</h1>
        {orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory; 