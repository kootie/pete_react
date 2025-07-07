
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const GiftCards = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pete-yellow/10 to-pete-teal/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="grid md:grid-cols-2">
              {/* Text Content */}
              <CardContent className="p-8 lg:p-12 flex items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold font-quicksand text-pete-brown mb-4">
                    Perfect Gifts for Coffee Lovers
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Share the Pete's Coffee experience with your loved ones. Our gift cards are perfect for birthdays, holidays, or any special occasion.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">Valid at both locations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">No expiration date</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-pete-teal rounded-full mr-3"></div>
                      <span className="text-gray-700">Digital and physical options</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-pete-teal hover:bg-pete-teal/90 text-white font-semibold px-8"
                    >
                      Buy Gift Card
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-pete-yellow text-pete-brown hover:bg-pete-yellow hover:text-pete-brown font-semibold px-8"
                    >
                      Check Balance
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              {/* Image */}
              <div className="relative h-64 md:h-full">
                <img 
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=400&fit=crop&crop=center" 
                  alt="Pete's Coffee gift cards"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pete-brown/20 to-transparent"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GiftCards;
