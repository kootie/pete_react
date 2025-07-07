
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VenueHighlights from "@/components/VenueHighlights";
import Testimonials from "@/components/Testimonials";
import WhatsOn from "@/components/WhatsOn";
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
      <VenueHighlights />
      <Testimonials />
      <WhatsOn />
      <GiftCards />
      <Footer />
    </div>
  );
};

export default Index;
