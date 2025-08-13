import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Users, TrendingUp, Award, Phone, Mail, MapPin } from "lucide-react";

const PetesFranchise = () => {
  const franchiseBenefits = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "Proven Business Model",
      description: "Join a successful coffee brand with a track record of excellence"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Comprehensive Support",
      description: "Full training, marketing support, and ongoing operational guidance"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Potential",
      description: "Expand your business with multiple location opportunities"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Maintain Pete's high standards with our quality control systems"
    }
  ];

  const franchiseRequirements = [
    "Minimum investment: €150,000",
    "Liquid capital: €50,000",
    "Net worth: €300,000",
    "Passion for coffee and customer service",
    "Business experience preferred",
    "Commitment to Pete's values and standards"
  ];

  const franchiseProcess = [
    {
      step: "1",
      title: "Initial Inquiry",
      description: "Submit your franchise application and discuss opportunities"
    },
    {
      step: "2",
      title: "Discovery Day",
      description: "Visit our headquarters and meet the team"
    },
    {
      step: "3",
      title: "Location Selection",
      description: "Work with our team to find the perfect location"
    },
    {
      step: "4",
      title: "Training & Setup",
      description: "Complete comprehensive training and prepare for opening"
    },
    {
      step: "5",
      title: "Grand Opening",
      description: "Launch your Pete's Coffee franchise with full support"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pete-brown to-pete-brown/90 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Franchise Opportunity
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold font-quicksand mb-4">
            Pete's Café Franchise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the Pete's Coffee family! Own and operate your own Pete's Coffee franchise 
            and be part of our growing community of coffee enthusiasts.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
          {franchiseBenefits.map((benefit) => (
            <div key={benefit.title} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-pete-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-pete-yellow">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Requirements & Process */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {/* Requirements */}
          <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Franchise Requirements</h3>
            <ul className="space-y-4">
              {franchiseRequirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-pete-yellow rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-300">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Franchise Process</h3>
            <div className="space-y-6">
              {franchiseProcess.map((process) => (
                <div key={process.step} className="flex items-start">
                  <div className="w-8 h-8 bg-pete-yellow rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-pete-brown font-bold text-sm">{process.step}</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{process.title}</h4>
                    <p className="text-gray-300 text-sm">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Pete's */}
        <div className="bg-white/10 backdrop-blur-sm border-white/20 rounded-xl p-8 mb-16 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Why Choose Pete's Coffee Franchise?</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-pete-yellow">Our Success Story</h4>
              <p className="text-gray-300 mb-4">
                Pete's Coffee has been serving exceptional coffee and creating memorable experiences 
                for over a decade. Our commitment to quality, community, and customer satisfaction 
                has made us a beloved brand.
              </p>
              <p className="text-gray-300">
                As a franchisee, you'll benefit from our established reputation, proven systems, 
                and ongoing support to help you succeed.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-pete-yellow">What We Provide</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Complete business setup and training</li>
                <li>• Marketing and branding support</li>
                <li>• Supply chain and inventory management</li>
                <li>• Ongoing operational support</li>
                <li>• Technology and POS systems</li>
                <li>• Quality control and standards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Ready to Start Your Journey?</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact our franchise development team to learn more about becoming a Pete's Coffee franchisee. 
            We're here to answer your questions and guide you through the process.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-center">
              <Phone className="h-5 w-5 text-pete-yellow mr-2" />
              <span className="text-gray-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="h-5 w-5 text-pete-yellow mr-2" />
              <span className="text-gray-300">franchise@petescoffee.com</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="h-5 w-5 text-pete-yellow mr-2" />
              <span className="text-gray-300">Dublin, Ireland</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-pete-yellow text-pete-brown hover:bg-pete-yellow/90 font-semibold px-8 py-3"
            >
              Request Franchise Info
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-pete-yellow text-pete-yellow hover:bg-pete-yellow hover:text-pete-brown font-semibold px-8 py-3"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetesFranchise;
