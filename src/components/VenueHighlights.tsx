
import { Card, CardContent } from "@/components/ui/card";

const VenueHighlights = () => {
  const venues = [
    {
      name: "The Curve",
      location: "Westlands, Nairobi",
      image: "/banner/WhatsApp Image 2025-07-15 at 12.30.57_b9a3e6a7.jpg",
      features: ["Spacious Seating", "Wi-Fi Available", "Meeting Rooms", "Outdoor Terrace"],
      description: "Our flagship location offering a premium coffee experience in the heart of Westlands.",
    },
    {
      name: "Bishop Magua",
      location: "Ngong Road, Nairobi",
      image: "/location/magua.jpg",
      features: ["Cozy Atmosphere", "Quick Service", "Takeaway Options", "Fresh Pastries"],
      description: "A warm, intimate setting perfect for your daily coffee ritual and casual meetings.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 pete-swirl-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand text-pete-brown mb-4">
            Our Venues
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Two unique locations, one exceptional coffee experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {venues.map((venue, index) => (
            <Card 
              key={venue.name} 
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
            >
              <div className="relative">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-pete-yellow text-pete-brown px-3 py-1 rounded-full font-semibold text-sm">
                  {venue.name}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-2">
                    {venue.name}
                  </h3>
                  <p className="text-pete-teal font-medium mb-3">{venue.location}</p>
                  <p className="text-gray-600 leading-relaxed">{venue.description}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-pete-brown">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.features.map((feature) => (
                      <span 
                        key={feature}
                        className="bg-pete-teal/10 text-pete-teal px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueHighlights;
