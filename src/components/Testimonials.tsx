
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "Pete's Coffee has become my daily ritual. The quality is exceptional and the atmosphere at The Curve is perfect for work meetings.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Coffee Enthusiast",
      content: "Best coffee in Nairobi! The baristas really know their craft. I love the cozy vibe at Bishop Magua - perfect for weekend mornings.",
      rating: 5,
    },
    {
      name: "Amina Hassan",
      role: "Local Business Owner",
      content: "Pete's Coffee caters all our corporate events. Professional service, delicious coffee, and the pastries are absolutely divine!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand text-pete-brown mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Pete's Coffee for their daily dose of excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50"
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-pete-yellow text-xl">★</span>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-pete-brown">{testimonial.name}</h4>
                  <p className="text-pete-teal text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
