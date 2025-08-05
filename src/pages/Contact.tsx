import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
// import emailjs from 'emailjs-com';

const locations = [
  {
    name: "The Curve",
    address: "Westlands, Nairobi",
    description: "Located at The Curve, offering a cozy atmosphere and great views.",
    hours: "Mon-Sun: 7:00 AM - 10:00 PM",
    map: "https://www.google.com/maps?q=The+Curve+Nairobi&output=embed"
  },
  {
    name: "Bishop Magua",
    address: "Ngong Road, Nairobi",
    description: "Find us at Bishop Magua, the perfect spot for coffee lovers in the city.",
    hours: "Mon-Sun: 8:00 AM - 6:00 PM",
    map: "https://www.google.com/maps?q=Bishop+Magua+Nairobi&output=embed"
  }
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send via EmailJS
    // Replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID with your actual EmailJS credentials
    /*
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      'YOUR_USER_ID'
    ).then(
      (result) => {
        setSubmitted(true);
      },
      (error) => {
        alert('Failed to send message.');
      }
    );
    */
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <p className="text-lg text-pete-brown font-semibold">Email: <a href="mailto:info@petescoffee.co.ke" className="underline">info@petescoffee.co.ke</a></p>
          <p className="text-lg text-pete-brown font-semibold">Tel: <a href="tel:+2540202177453" className="underline">+254 020 217 7453</a></p>
        </div>
        <h1 className="text-4xl font-bold mb-8 text-pete-brown">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border rounded px-3 py-2 w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border rounded px-3 py-2 w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="border rounded px-3 py-2 w-full min-h-[120px]"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-[#00A28F] hover:bg-[#00A28F]/90 text-white font-medium px-6 py-2 rounded"
              disabled={submitted}
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </button>
            
            {/* Contact Image */}
            <div className="mt-6">
              <img 
                src="/sites/contact.jpg" 
                alt="Pete's Coffee Contact" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </form>
          {/* Locations Map and Description */}
          <div className="space-y-8">
            {locations.map((loc) => (
              <div key={loc.name} className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold text-pete-brown mb-2">{loc.name}</h3>
                <p className="mb-2 text-gray-700">{loc.description}</p>
                <p className="mb-2 text-gray-500 text-sm">{loc.address}</p>
                <p className="mb-2 text-gray-500 text-sm font-semibold">{loc.hours}</p>
                <div className="w-full h-48 rounded overflow-hidden">
                  <iframe
                    src={loc.map}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={loc.name + " map"}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 