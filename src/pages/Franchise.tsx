import Navigation from "@/components/Navigation";
import PetesFranchise from "@/components/PetesFranchise";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, TrendingUp, Award, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";

const Franchise = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    investment: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/api/franchise-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your interest! We have received your franchise inquiry and will contact you within 48 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          experience: '',
          investment: '',
          details: ''
        });
      } else {
        throw new Error(result.error || 'Failed to submit franchise inquiry');
      }
    } catch (error) {
      console.error('Error submitting franchise inquiry:', error);
      alert('Sorry, there was an error submitting your inquiry. Please try again or contact us directly at franchise@petescoffee.co.ke');
    }
  };



  return (
    <div className="min-h-screen bg-white/80 relative">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/franchise/franchise.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-pete-brown/80"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="bg-pete-yellow text-pete-brown mb-4 px-4 py-2 text-sm font-semibold">
            Franchise Opportunity
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold font-quicksand mb-6 text-white">
            Pete's Café Franchise
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join the Pete's Coffee family! Own and operate your own Pete's Coffee franchise 
            and be part of our growing community of coffee enthusiasts.
          </p>
          <Button 
            size="lg"
            className="bg-pete-yellow text-pete-brown hover:bg-pete-yellow/90 font-semibold px-8 py-3"
            onClick={() => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Request Information
          </Button>
        </div>
      </section>



      <PetesFranchise />



      {/* Franchise Inquiry Form */}
      <section id="franchise-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pete-brown mb-4">Start Your Franchise Journey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to become a Pete's Coffee franchise owner? Fill out the form below and our team will contact you with detailed information about franchise opportunities in your area.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-pete-brown">Why Choose Pete's Coffee?</CardTitle>
                    <CardDescription>
                      Join Kenya's favorite coffee brand with proven success
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Award className="h-5 w-5 text-pete-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold text-pete-brown">Proven Business Model</h4>
                        <p className="text-gray-600 text-sm">Established business model with proven track record</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="h-5 w-5 text-pete-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold text-pete-brown">Comprehensive Training</h4>
                        <p className="text-gray-600 text-sm">Full training program and ongoing support</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-pete-yellow mt-1" />
                      <div>
                        <h4 className="font-semibold text-pete-brown">Marketing Support</h4>
                        <p className="text-gray-600 text-sm">National advertising and local marketing assistance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-pete-brown">Get In Touch</CardTitle>
                    <CardDescription>
                      Have questions? Contact our franchise team directly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-pete-yellow" />
                      <span className="text-gray-700">+254 020 217 7453</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-pete-yellow" />
                      <span className="text-gray-700">franchise@petescoffee.co.ke</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-pete-yellow" />
                      <span className="text-gray-700">Nairobi, Kenya</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Franchise Inquiry Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-pete-brown">Franchise Inquiry Form</CardTitle>
                  <CardDescription>
                    Tell us about yourself and your franchise goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Preferred Location</Label>
                        <Input
                          id="location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="City/Area of interest"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="experience">Business Experience</Label>
                        <Input
                          id="experience"
                          name="experience"
                          type="text"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="Years in business/management"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investment">Investment Budget</Label>
                        <Input
                          id="investment"
                          name="investment"
                          type="text"
                          value={formData.investment}
                          onChange={handleInputChange}
                          placeholder="Available investment amount"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your interest in franchising with Pete's Coffee, your background, and any specific questions you have..."
                        rows={5}
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-pete-brown hover:bg-pete-brown/90 text-white font-semibold py-3"
                    >
                      Submit Franchise Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Franchise;
