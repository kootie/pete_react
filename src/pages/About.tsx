
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Pete Owiti",
      role: "Founder",
      description: "With over 15 years in the coffee industry, Pete brings passion and expertise to every cup.",
      image: "/team/pete.jpg"
    },
    {
      name: "Chris Owiti",
      role: "Co-Founder",
      description: "Chris's vision and leadership have helped shape Pete's Coffee into a beloved community hub.",
      image: "/team/chris.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-pete-teal to-pete-yellow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand text-white mb-6">
            Our Story
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Born from a passion for exceptional coffee and warm hospitality, 
            Pete's Coffee has been serving Nairobi's finest brews since our journey began.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold font-quicksand text-pete-brown mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Pete's Coffee, we believe that great coffee brings people together. 
                Our mission is to create spaces where community thrives, conversations flow, 
                and every cup tells a story of quality, sustainability, and care.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From our carefully sourced beans to our expertly crafted beverages, 
                we're committed to delivering an exceptional coffee experience that 
                brightens your day and fuels your passions.
              </p>
            </div>
            <div className="lg:order-first">
              <img 
                src="/sites/about.jpg" 
                alt="Pete's Coffee Interior" 
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-quicksand text-pete-brown mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-pete-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">☕</span>
                </div>
                <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-4">Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  We source the finest beans and craft each cup with precision and care, 
                  ensuring every sip meets our highest standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-pete-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-pete-brown">🌱</span>
                </div>
                <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-4">Sustainability</h3>
                <p className="text-gray-600 leading-relaxed">
                  We partner with local farmers and prioritize eco-friendly practices 
                  to protect our planet for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-pete-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl text-white">❤️</span>
                </div>
                <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  We create welcoming spaces where neighbors become friends and 
                  every visit feels like coming home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-quicksand text-pete-brown mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind your perfect cup
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-3xl mx-auto">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-pete-yellow"
                  />
                  <h3 className="text-2xl font-bold font-quicksand text-pete-brown mb-2">
                    {member.name}
                  </h3>
                  <p className="text-pete-teal font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
