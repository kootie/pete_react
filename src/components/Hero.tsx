
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const heroImages = [
  {
    src: "/banner/WhatsApp Image 2025-07-15 at 12.30.57_b9a3e6a7.jpg",
    alt: "Pete's Coffee - Premium coffee experience"
  },
  {
    src: "/banner/WhatsApp Image 2025-07-15 at 13.12.05_d392785b.jpg",
    alt: "Pete's Coffee - Cozy atmosphere and delicious food"
  },
  {
    src: "/banner/WhatsApp Image 2025-07-15 at 13.21.25_45b7d363.jpg",
    alt: "Pete's Coffee - Fresh coffee and pastries"
  }
];

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pete-swirl-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-pete-teal/5 to-pete-yellow/5"></div>
      {/* Full-width Carousel */}
      <div className="w-full max-h-[500px] overflow-hidden relative z-10">
        <Carousel className="w-full">
          <CarouselContent>
            {heroImages.map((img, idx) => (
              <CarouselItem key={idx}>
                <img src={img.src} alt={img.alt} className="w-full h-[350px] md:h-[500px] object-cover" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20" />
        </Carousel>
      </div>

      {/* Text Content below carousel */}
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-20">
        <div className="w-full max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-bold font-quicksand mb-6">
            <span className="block text-pete-brown">Premium</span>
            <span className="block pete-text-gradient">Coffee</span>
            <span className="block text-pete-brown">Experience</span>
          </h1>
          <p className="text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl mx-auto">
            Discover the perfect blend of exceptional coffee, delicious pastries, and warm hospitality at our two vibrant locations. Whether you're starting your morning, catching up with friends, or looking for a cozy spot to work, Pete's Coffee offers a welcoming atmosphere, expertly crafted drinks, and a menu full of fresh, delicious options. Join us for a memorable coffee experience every day!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  );
};

export default Hero;
