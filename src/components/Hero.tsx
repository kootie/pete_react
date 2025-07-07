
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pete-swirl-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-pete-teal/5 to-pete-yellow/5"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold font-quicksand mb-6">
              <span className="block text-pete-brown">Premium</span>
              <span className="block pete-text-gradient">Coffee</span>
              <span className="block text-pete-brown">Experience</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Discover the perfect blend of exceptional coffee, delicious pastries, and warm hospitality at our two vibrant locations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/menu">
                <Button 
                  size="lg" 
                  className="bg-pete-teal hover:bg-pete-teal/90 text-white font-semibold px-8 py-3 text-lg"
                >
                  Explore Menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-pete-yellow text-pete-brown hover:bg-pete-yellow hover:text-pete-brown font-semibold px-8 py-3 text-lg"
                >
                  Find Locations
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative animate-slide-in-left">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=600&fit=crop&crop=center" 
                alt="Premium coffee and pastries at Pete's Coffee"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pete-brown/20 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pete-yellow rounded-full flex items-center justify-center">
                  <span className="text-pete-brown font-bold text-xl">★</span>
                </div>
                <div>
                  <p className="font-semibold text-pete-brown">4.9/5 Rating</p>
                  <p className="text-sm text-gray-600">From 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
