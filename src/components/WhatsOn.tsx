
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const WhatsOn = () => {
  const events = [
    {
      title: "Coffee Cupping Session",
      date: "Every Saturday",
      description: "Join our expert baristas for a guided tasting of our premium coffee blends.",
      location: "The Curve",
      time: "10:00 AM - 12:00 PM",
    },
    {
      title: "Latte Art Workshop",
      date: "Monthly",
      description: "Learn the art of creating beautiful latte designs with our professional team.",
      location: "Bishop Magua",
      time: "2:00 PM - 4:00 PM",
    },
    {
      title: "Business Networking Breakfast",
      date: "First Friday",
      description: "Connect with local professionals over exceptional coffee and pastries.",
      location: "The Curve",
      time: "7:30 AM - 9:00 AM",
    },
  ];

  return (
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
          {events.map((event, index) => (
            <Card 
              key={event.title}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="text-pete-yellow mr-2" size={20} />
                  <span className="text-pete-yellow font-semibold">{event.date}</span>
                </div>
                
                <h3 className="text-xl font-bold font-quicksand mb-3 text-white">
                  {event.title}
                </h3>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Time:</span> {event.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/events">
            <Button 
              variant="outline" 
              size="lg"
              className="border-pete-yellow text-pete-yellow hover:bg-pete-yellow hover:text-pete-brown font-semibold px-8"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatsOn;
