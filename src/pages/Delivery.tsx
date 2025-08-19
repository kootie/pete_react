import Navigation from "@/components/Navigation";
import PetesDelivers from "@/components/PetesDelivers";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const Delivery = () => {
  const deliveryInfo = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Delivery Hours",
      details: "Monday - Sunday: 7:00 AM - 10:00 PM"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Delivery Areas",
      details: "Nairobi and environs"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact",
      details: "Call us for special orders or questions"
    }
  ];

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-pete-brown to-pete-brown/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Delivery Service
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand mb-6">
            Pete's Delivers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Get your favorite Pete's Coffee delivered right to your door! 
            We partner with the best delivery platforms to bring you convenience and quality.
          </p>
          <Button 
            size="lg"
            className="bg-pete-yellow text-pete-brown hover:bg-pete-yellow/90 font-semibold px-8 py-3"
            onClick={() => window.location.href = '/menu'}
          >
            Order Now
          </Button>
        </div>
      </section>

      <PetesDelivers />

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pete-brown mb-4">Delivery Information</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our delivery service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {deliveryInfo.map((info) => (
              <div key={info.title} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-pete-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-pete-yellow">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-pete-brown mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.details}</p>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-pete-brown mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-pete-brown mb-2">How long does delivery take?</h4>
                <p className="text-gray-600">Delivery times vary by platform and location, typically 15-45 minutes.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-pete-brown mb-2">Is there a minimum order amount?</h4>
                <p className="text-gray-600">Minimum order amounts are set by each delivery platform.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-bold text-pete-brown mb-2">Can I track my order?</h4>
                <p className="text-gray-600">Yes! All delivery platforms provide real-time order tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Delivery;
