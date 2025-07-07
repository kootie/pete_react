import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const events = [
  {
    title: "Winter Menu Launch",
    description: "Try our new cozy classics and seasonal drinks, available all winter!",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    ticketUrl: "#"
  },
  {
    title: "Live Music Fridays",
    description: "Enjoy live acoustic sets every Friday evening at The Curve.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    ticketUrl: "#"
  },
  {
    title: "Coffee Tasting Experience",
    description: "Join us for a guided tasting of our finest beans and blends.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    ticketUrl: "#"
  }
];

const Events = () => {
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
              <a href={event.ticketUrl} className="inline-block bg-[#00A28F] hover:bg-[#00A28F]/90 text-white font-medium px-6 py-2 rounded text-center">Get Ticket</a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events; 