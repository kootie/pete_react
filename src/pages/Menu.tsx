
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import emailjs from 'emailjs-com';

// Add a simple modal component for the order form
const OrderModal = ({ open, onClose, onSubmit, items }: { open: boolean, onClose: () => void, onSubmit: (name: string, email: string) => void, items: string[] }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 320, maxWidth: 400, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <h2 className="text-xl font-bold mb-4">Complete Your Order</h2>
        <div className="mb-2">
          <label className="block mb-1 font-medium">Name</label>
          <input className="border rounded px-3 py-2 w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input className="border rounded px-3 py-2 w-full" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" type="email" />
        </div>
        <div className="mb-4">
          <div className="font-medium mb-1">Items:</div>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(name, email)} disabled={!name || !email}>Submit Order</Button>
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [showOrderModal, setShowOrderModal] = useState(false);

  const menuCategories = {
    coffee: {
      title: "Coffee",
      items: [
        { name: "Espresso", price: "KES 180", description: "Rich, bold shot of premium coffee" },
        { name: "Americano", price: "KES 220", description: "Espresso with hot water, smooth and strong" },
        { name: "Cappuccino", price: "KES 280", description: "Espresso with steamed milk and foam" },
        { name: "Latte", price: "KES 320", description: "Espresso with steamed milk and latte art" },
        { name: "Macchiato", price: "KES 300", description: "Espresso 'marked' with steamed milk foam" },
        { name: "Mocha", price: "KES 350", description: "Espresso with chocolate and steamed milk" },
        { name: "Cold Brew", price: "KES 280", description: "Smooth, cold-extracted coffee" },
        { name: "Iced Latte", price: "KES 340", description: "Chilled espresso with cold milk over ice" }
      ]
    },
    pastries: {
      title: "Pastries & Snacks",
      items: [
        { name: "Croissant", price: "KES 250", description: "Buttery, flaky French pastry" },
        { name: "Chocolate Muffin", price: "KES 220", description: "Rich chocolate chip muffin" },
        { name: "Blueberry Scone", price: "KES 280", description: "Fresh baked with real blueberries" },
        { name: "Cinnamon Roll", price: "KES 320", description: "Warm, glazed cinnamon pastry" },
        { name: "Banana Bread", price: "KES 200", description: "Homemade with fresh bananas" },
        { name: "Cheesecake Slice", price: "KES 450", description: "Creamy New York style cheesecake" },
        { name: "Cookies (3pc)", price: "KES 180", description: "Assorted fresh-baked cookies" },
        { name: "Sandwich", price: "KES 380", description: "Gourmet sandwich with fresh ingredients" }
      ]
    },
    meals: {
      title: "Light Meals",
      items: [
        { name: "Avocado Toast", price: "KES 420", description: "Smashed avocado on artisan bread" },
        { name: "Chicken Wrap", price: "KES 480", description: "Grilled chicken with fresh vegetables" },
        { name: "Caesar Salad", price: "KES 450", description: "Crisp romaine with classic Caesar dressing" },
        { name: "Quiche Lorraine", price: "KES 380", description: "Traditional French quiche with bacon" },
        { name: "Soup of the Day", price: "KES 320", description: "Ask your server for today's selection" },
        { name: "Panini", price: "KES 420", description: "Grilled Italian sandwich, choice of fillings" },
        { name: "Acai Bowl", price: "KES 520", description: "Superfruit bowl with granola and berries" },
        { name: "Breakfast Plate", price: "KES 580", description: "Eggs, bacon, toast, and hash browns" }
      ]
    }
  };

  const toggleItem = (itemName: string) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    );
  };

  const handleOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to order");
      return;
    }
    setShowOrderModal(true);
  };

  const handleOrderSubmit = (name: string, email: string) => {
    const order = {
      id: Date.now(),
      name,
      email,
      items: selectedItems,
      time: new Date().toISOString(),
      status: "pending"
    };
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem("petes_orders") || "[]");
    orders.push(order);
    localStorage.setItem("petes_orders", JSON.stringify(orders));
    // TODO: Send via EmailJS here
    // Send via EmailJS
    // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID with your actual EmailJS credentials
    /*
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        name,
        email,
        items: selectedItems.join(', '),
        time: order.time,
      },
      'YOUR_USER_ID'
    ).then(
      (result) => {
        alert('Order email sent!');
      },
      (error) => {
        alert('Failed to send order email.');
      }
    );
    */
    setShowOrderModal(false);
    setSelectedItems([]);
    alert("Order placed! You will receive a confirmation email soon.");
  };

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <OrderModal open={showOrderModal} onClose={() => setShowOrderModal(false)} onSubmit={handleOrderSubmit} items={selectedItems} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-pete-brown to-pete-teal">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand text-white mb-6">
            Our Menu
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium coffee, 
            fresh pastries, and delicious light meals.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            {Object.entries(menuCategories).map(([key, category]) => (
              <Button
                key={key}
                onClick={() => setActiveCategory(key)}
                variant={activeCategory === key ? "default" : "outline"}
                className={`px-6 py-3 font-medium ${
                  activeCategory === key 
                    ? "bg-pete-teal hover:bg-pete-teal/90 text-white" 
                    : "border-pete-teal text-pete-teal hover:bg-pete-teal hover:text-white"
                }`}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-quicksand text-pete-brown mb-4">
              {menuCategories[activeCategory as keyof typeof menuCategories].title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {menuCategories[activeCategory as keyof typeof menuCategories].items.map((item) => (
              <Card 
                key={item.name}
                className={`shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedItems.includes(item.name) ? 'ring-2 ring-pete-teal bg-pete-teal/5' : ''
                }`}
                onClick={() => toggleItem(item.name)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold font-quicksand text-pete-brown">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-pete-teal">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      selectedItems.includes(item.name) 
                        ? 'text-pete-teal' 
                        : 'text-gray-400'
                    }`}>
                      {selectedItems.includes(item.name) ? 'Selected' : 'Click to select'}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedItems.includes(item.name)
                        ? 'bg-pete-teal border-pete-teal'
                        : 'border-gray-300'
                    }`}>
                      {selectedItems.includes(item.name) && (
                        <span className="text-white text-sm">✓</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Summary */}
      {selectedItems.length > 0 && (
        <section className="py-8 bg-pete-teal/10 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-4">
                  Your Order ({selectedItems.length} items)
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {selectedItems.map((item) => (
                    <div key={item} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">{item}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleItem(item)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button 
                    onClick={handleOrder}
                    className="bg-pete-teal hover:bg-pete-teal/90 text-white px-8 py-3 text-lg font-medium"
                  >
                    Place Order via Email
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Menu;
