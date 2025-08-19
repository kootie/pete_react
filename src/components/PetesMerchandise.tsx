import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Heart } from "lucide-react";

const PetesMerchandise = () => {
  const merchandiseCategories = [
    {
      title: "Travel Mugs",
      items: [
        {
          name: "Pete's Insulated Travel Mug",
          price: "KES 2,500",
          image: "/merchandise/merch3.jpg",
          description: "Keep your coffee hot for hours with our premium insulated travel mug",
          featured: true,
          rating: 4.8
        },
        {
          name: "Classic Pete's Mug",
          price: "KES 2,500",
          image: "/merchandise/merch4.jpg",
          description: "Traditional ceramic travel mug with Pete's branding",
          featured: false,
          rating: 4.6
        }
      ]
    },
    {
      title: "Apparel",
      items: [
        {
          name: "Pete's Coffee T-Shirt",
          price: "KES 1,400",
          image: "👕",
          description: "Comfortable cotton t-shirt with Pete's Coffee logo",
          featured: true,
          rating: 4.7
        },
        {
          name: "Pete's Hoodie",
          price: "KES 2,500",
          image: "🧥",
          description: "Warm and cozy hoodie perfect for coffee lovers",
          featured: true,
          rating: 4.9
        }
      ]
    },
    {
      title: "Coffee Mugs",
      items: [
        {
          name: "Ceramic Coffee Mug",
          price: "KES 2,500",
          image: "/merchandise/merch5.jpg",
          description: "Classic ceramic mug with Pete's signature design",
          featured: false,
          rating: 4.5
        },
        {
          name: "Premium Stoneware Mug",
          price: "KES 2,500",
          image: "/merchandise/merch6.jpg",
          description: "High-quality stoneware mug for the perfect coffee experience",
          featured: false,
          rating: 4.7
        }
      ]
    },
    {
      title: "Brewing Equipment",
      items: [
        {
          name: "Pete's Pour-Over Kit",
          price: "KES 2,500",
          image: "/merchandise/merch3.jpg",
          description: "Complete pour-over coffee brewing kit with Pete's beans",
          featured: true,
          rating: 4.9
        },
        {
          name: "French Press",
          price: "KES 2,500",
          image: "/merchandise/merch4.jpg",
          description: "Classic French press for rich, full-bodied coffee",
          featured: false,
          rating: 4.6
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Official Merchandise
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand mb-4 text-pete-brown">
            Pete's Merchandise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take Pete's Coffee home with you! From travel mugs to brewing equipment, 
            we have everything you need to enjoy the perfect cup of coffee anywhere.
          </p>
        </div>

        <div className="space-y-16">
          {merchandiseCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-3xl font-bold text-pete-brown mb-8 text-center">
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {category.items.map((item) => (
                  <div key={item.name} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center">
                        {item.image.startsWith('/') ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl">{item.image}</div>
                        )}
                      </div>
                      {item.featured && (
                        <Badge className="bg-pete-yellow text-pete-brown">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <span className="text-2xl font-bold text-pete-brown">{item.price}</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-pete-brown text-white hover:bg-pete-brown/90"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-pete-brown/5 rounded-xl p-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-pete-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-pete-yellow" />
              </div>
              <h4 className="text-lg font-bold text-pete-brown mb-2">Premium Quality</h4>
              <p className="text-gray-600">All products meet our high standards</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pete-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pete-yellow" />
              </div>
              <h4 className="text-lg font-bold text-pete-brown mb-2">Customer Love</h4>
              <p className="text-gray-600">Join thousands of satisfied customers</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-pete-brown text-white hover:bg-pete-brown/90 font-semibold px-8 py-3"
            onClick={() => window.location.href = '/merchandise'}
          >
            Shop All Merchandise
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PetesMerchandise;
