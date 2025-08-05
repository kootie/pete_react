import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";

const events = [
  {
    title: "Trade Fairs and Expos",
    description: "Showcasing local businesses, artisans, and the latest in coffee culture. Join our trade fairs and expos for networking and discovery!",
    image: "/whatson/tradefairs.jpg",
  },
  {
    title: "Catering Events",
    description: "Let us cater your next event with our delicious food and drinks. Perfect for meetings, parties, and more!",
    image: "/whatson/catering.jpg",
  },
  {
    title: "Special Events (Jazz Nights, Book Clubs)",
    description: "Experience live jazz performances, book club meetups, and more special gatherings at Pete's Coffee.",
    image: "/whatson/jazz.jpg",
  },
];

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleBook = (eventTitle: string) => {
    setSelectedEvent(eventTitle);
    setShowForm(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Send email via mailto for now
    const subject = `Event Booking Request: ${selectedEvent}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nEvent: ${selectedEvent}\nMessage: ${form.message}`;
    window.location.href = `mailto:info@petescoffee.co.ke?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setShowForm(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-pete-brown">Events</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.title} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded mb-4" />
              <h2 className="text-2xl font-semibold text-pete-brown mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-4 flex-1">{event.description}</p>
              <button
                className="inline-block bg-[#00A28F] hover:bg-[#00A28F]/90 text-white font-medium px-6 py-2 rounded text-center"
                onClick={() => handleBook(event.title)}
              >
                Book Event
              </button>
            </div>
          ))}
        </div>
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl" onClick={() => setShowForm(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-pete-brown">Book: {selectedEvent}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Additional Details (optional)"
                  className="border rounded px-3 py-2 w-full min-h-[100px]"
                  value={form.message}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-[#00A28F] hover:bg-[#00A28F]/90 text-white font-medium px-6 py-2 rounded w-full"
                >
                  Send Booking Request
                </button>
              </form>
            </div>
          </div>
        )}
        {submitted && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
              <h2 className="text-2xl font-bold mb-4 text-pete-brown">Thank you!</h2>
              <p className="text-gray-700">Your booking request has been prepared in your email client. We look forward to hosting you!</p>
              <button className="mt-6 bg-[#00A28F] hover:bg-[#00A28F]/90 text-white font-medium px-6 py-2 rounded" onClick={() => setSubmitted(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events; 