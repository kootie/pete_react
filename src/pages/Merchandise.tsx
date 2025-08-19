import Navigation from "@/components/Navigation";
import PetesMerchandise from "@/components/PetesMerchandise";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Shield, Heart } from "lucide-react";

const Merchandise = () => {
  const shopFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "Premium quality products guaranteed"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Customer Support",
      description: "Dedicated support for all your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Official Store
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand mb-6 text-pete-brown">
            Pete's Merchandise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Take Pete's Coffee home with you! From travel mugs to brewing equipment, 
            we have everything you need to enjoy the perfect cup of coffee anywhere.
          </p>
          <Button 
            size="lg"
            className="bg-pete-brown text-white hover:bg-pete-brown/90 font-semibold px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop Now
          </Button>
        </div>
      </section>

      <PetesMerchandise />

      {/* Shop Features */}
      <section className="py-20 bg-pete-brown/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pete-brown mb-4">Why Shop with Pete's?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {shopFeatures.map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-pete-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-pete-yellow">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-pete-brown mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Merchandise;
