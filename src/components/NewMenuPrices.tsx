import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee, Utensils, Cake, Star } from "lucide-react";

const NewMenuPrices = () => {
  const menuCategories = [
    {
      title: "Hot Coffee",
      icon: <Coffee className="h-6 w-6" />,
      items: [
        { name: "Espresso", oldPrice: "€2.50", newPrice: "€2.80", popular: false },
        { name: "Cappuccino", oldPrice: "€3.20", newPrice: "€3.50", popular: true },
        { name: "Latte", oldPrice: "€3.50", newPrice: "€3.80", popular: false },
        { name: "Americano", oldPrice: "€2.80", newPrice: "€3.10", popular: false },
        { name: "Flat White", oldPrice: "€3.30", newPrice: "€3.60", popular: false }
      ]
    },
    {
      title: "Cold Drinks",
      icon: <Coffee className="h-6 w-6" />,
      items: [
        { name: "Iced Latte", oldPrice: "€4.00", newPrice: "€4.30", popular: true },
        { name: "Cold Brew", oldPrice: "€3.80", newPrice: "€4.10", popular: false },
        { name: "Frappuccino", oldPrice: "€4.50", newPrice: "€4.80", popular: false }
      ]
    },
    {
      title: "Food & Pastries",
      icon: <Cake className="h-6 w-6" />,
      items: [
        { name: "Croissant", oldPrice: "€2.80", newPrice: "€3.10", popular: false },
        { name: "Sandwich", oldPrice: "€6.50", newPrice: "€6.80", popular: true },
        { name: "Muffin", oldPrice: "€2.50", newPrice: "€2.80", popular: false },
        { name: "Toast", oldPrice: "€4.20", newPrice: "€4.50", popular: false }
      ]
    },
    {
      title: "Specialty Items",
      icon: <Star className="h-6 w-6" />,
      items: [
        { name: "Artisan Coffee", oldPrice: "€4.50", newPrice: "€4.80", popular: true },
        { name: "Signature Blend", oldPrice: "€5.00", newPrice: "€5.30", popular: false },
        { name: "Seasonal Special", oldPrice: "€4.80", newPrice: "€5.10", popular: false }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Updated Prices
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand mb-4 text-pete-brown">
            New Menu Prices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've updated our menu with new prices to continue providing you with the highest quality coffee and food. 
            Check out our refreshed offerings below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {menuCategories.map((category) => (
            <div key={category.title} className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pete-brown rounded-lg flex items-center justify-center mr-4">
                  <div className="text-pete-yellow">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-pete-brown">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          {item.popular && (
                            <Badge className="bg-pete-yellow text-pete-brown text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-sm">{item.oldPrice}</span>
                      <span className="text-pete-brown font-bold text-lg">{item.newPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-pete-brown/5 rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-pete-brown mb-4">
              Why the Price Update?
            </h3>
            <p className="text-gray-600 mb-6">
              We're committed to maintaining the highest quality ingredients and service. 
              The new prices reflect our continued investment in premium coffee beans, 
              fresh ingredients, and exceptional customer experience.
            </p>
            <Button 
              size="lg"
              className="bg-pete-brown text-white hover:bg-pete-brown/90 font-semibold px-8 py-3"
              onClick={() => window.location.href = '/menu'}
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMenuPrices;
