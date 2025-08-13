import Navigation from "@/components/Navigation";
import PetesFranchise from "@/components/PetesFranchise";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, TrendingUp, Award } from "lucide-react";

const Franchise = () => {
  const franchiseStats = [
    {
      icon: <Building className="h-6 w-6" />,
      number: "15+",
      label: "Locations"
    },
    {
      icon: <Users className="h-6 w-6" />,
      number: "50+",
      label: "Team Members"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      number: "10+",
      label: "Years Experience"
    },
    {
      icon: <Award className="h-6 w-6" />,
      number: "95%",
      label: "Success Rate"
    }
  ];

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-pete-brown to-pete-brown/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Franchise Opportunity
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand mb-6">
            Pete's Café Franchise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join the Pete's Coffee family! Own and operate your own Pete's Coffee franchise 
            and be part of our growing community of coffee enthusiasts.
          </p>
          <Button 
            size="lg"
            className="bg-pete-yellow text-pete-brown hover:bg-pete-yellow/90 font-semibold px-8 py-3"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Request Information
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {franchiseStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-pete-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-pete-yellow">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-pete-brown mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PetesFranchise />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pete-brown mb-4">What Our Franchisees Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our successful franchise owners about their experience with Pete's Coffee
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pete-brown rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-pete-brown">Sarah O'Connor</h4>
                  <p className="text-gray-600 text-sm">Dublin City Centre Franchisee</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Opening my Pete's Coffee franchise was the best decision I've made. 
                The support from the team is incredible, and the business model is proven. 
                I love being part of the Pete's family!"
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pete-brown rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-pete-brown">Michael Walsh</h4>
                  <p className="text-gray-600 text-sm">Cork Franchisee</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The training and ongoing support from Pete's Coffee has been outstanding. 
                The brand recognition and quality products make it easy to attract customers. 
                Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Franchise;
