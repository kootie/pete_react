
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VenueHighlights from "@/components/VenueHighlights";
import Testimonials from "@/components/Testimonials";
// import WhatsOn from "@/components/WhatsOn";
import GiftCards from "@/components/GiftCards";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Catering",
    description: "Let us cater your next event with our delicious food and drinks. Perfect for meetings, parties, and more!",
    icon: "🍽️"
  },
  {
    title: "Events",
    description: "Join us for live music, workshops, and special gatherings at Pete's Coffee.",
    icon: "🎉"
  },
  {
    title: "Takeaway",
    description: "Order ahead for pickup or get your favorites delivered to your door.",
    icon: "🥡"
  },
  {
    title: "WiFi",
    description: "Enjoy fast, free internet while you sip and relax in our cozy spaces.",
    icon: "📶"
  },
];

const whatsOnEvents = [
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
    title: "Jazz Nights (Special Events)",
    description: "Experience live jazz performances in a cozy, intimate setting. Perfect for music lovers and a relaxing evening out.",
    image: "/whatson/jazz.jpg",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      <Hero />

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pete-brown mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-pete-brown mb-2">{service.title}</h3>
                <p className="text-gray-700">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's On Section (Events) */}
      <section className="py-20 bg-pete-brown text-white pete-swirl-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-quicksand mb-4">
              What's On
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for exciting events and experiences beyond great coffee
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whatsOnEvents.map((event) => (
              <div key={event.title} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300 rounded-xl shadow p-6 flex flex-col">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="text-xl font-bold font-quicksand mb-3 text-white">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed flex-1">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/events">
              <button className="border border-pete-yellow text-pete-yellow hover:bg-pete-yellow hover:text-pete-brown font-semibold px-8 py-3 rounded text-lg transition-colors">
                View All Events
              </button>
            </a>
          </div>
        </div>
      </section>
      <VenueHighlights />
      <Testimonials />
      <GiftCards />
      <Footer />
    </div>
  );
};

export default Index;
