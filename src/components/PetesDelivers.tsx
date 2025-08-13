import { Button } from "@/components/ui/button";
import { ExternalLink, Truck, Clock, MapPin } from "lucide-react";

const PetesDelivers = () => {
  const deliveryPartners = [
    {
      name: "Glovo",
      logo: "🟡",
      description: "Fast delivery in minutes",
      link: "https://glovoapp.com",
      color: "bg-yellow-500"
    },
    {
      name: "Uber Eats",
      logo: "⚫",
      description: "Reliable food delivery",
      link: "https://ubereats.com",
      color: "bg-black"
    },
    {
      name: "Bolt Foods",
      logo: "🟢",
      description: "Quick and convenient",
      link: "https://bolt.eu/food",
      color: "bg-green-500"
    }
  ];

  const benefits = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Get your favorite Pete's Coffee delivered in minutes"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time Tracking",
      description: "Track your order from preparation to delivery"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Wide Coverage",
      description: "Available across multiple delivery zones"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pete-brown to-pete-brown/90 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand mb-4">
            Pete's Delivers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Order online with us! We're available on Glovo, Uber Eats, and Bolt Foods for fast, convenient delivery right to your door.
          </p>
        </div>

        {/* Delivery Partners */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
          {deliveryPartners.map((partner) => (
            <div key={partner.name} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <div className={`w-16 h-16 rounded-full ${partner.color} flex items-center justify-center mx-auto mb-4 text-2xl`}>
                {partner.logo}
              </div>
              <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
              <p className="text-gray-300 mb-4">{partner.description}</p>
              <Button 
                variant="outline" 
                className="border-pete-yellow text-pete-yellow hover:bg-pete-yellow hover:text-pete-brown"
                onClick={() => window.open(partner.link, '_blank')}
              >
                Order on {partner.name}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-16 h-16 bg-pete-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-pete-yellow">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Can't decide? Check out our menu first!
          </p>
          <Button 
            size="lg"
            className="bg-pete-yellow text-pete-brown hover:bg-pete-yellow/90 font-semibold px-8 py-3"
            onClick={() => window.location.href = '/menu'}
          >
            View Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PetesDelivers;
