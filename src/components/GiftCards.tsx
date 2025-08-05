
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const GiftCards = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    recipientName: "",
    recipientEmail: "",
    amount: "",
    message: "",
    deliveryType: "digital"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email with gift card request
    const subject = "Gift Card Purchase Request";
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Recipient Name: ${formData.recipientName}
Recipient Email: ${formData.recipientEmail}
Amount: ${formData.amount}
Delivery Type: ${formData.deliveryType}
Message: ${formData.message}
    `;
    window.location.href = `mailto:info@petescoffee.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      recipientName: "",
      recipientEmail: "",
      amount: "",
      message: "",
      deliveryType: "digital"
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-pete-yellow/10 to-pete-teal/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="grid md:grid-cols-2">
              {/* Text Content */}
              <CardContent className="p-8 lg:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold font-quicksand text-pete-brown mb-4">
                    Perfect Gifts for Coffee Lovers
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Share the Pete's Coffee experience with your loved ones. Our gift cards are perfect for birthdays, holidays, or any special occasion.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">Valid at both locations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">No expiration date</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">Digital and physical options</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-pete-teal hover:bg-pete-teal/90 text-white font-semibold px-8"
                      onClick={() => setShowForm(true)}
                    >
                      Buy Gift Card
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              {/* Image */}
              <div className="relative h-64 md:h-full">
                <img 
                  src="/location/gift.jpg" 
                  alt="Pete's Coffee gift cards"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pete-brown/20 to-transparent"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Gift Card Purchase Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-pete-brown">Purchase Gift Card</h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gift Card Amount (KES) *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    min="100"
                    step="50"
                    placeholder="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Type *</label>
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  >
                    <option value="digital">Digital (Email)</option>
                    <option value="physical">Physical (Pickup)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Add a personal message to your gift card..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pete-teal"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-pete-teal hover:bg-pete-teal/90"
                  >
                    Send Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftCards;
