
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pete-brown text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-bold font-quicksand mb-4">
              <span className="text-pete-teal">Pete's</span>
              <span className="text-pete-yellow ml-1">Coffee</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Premium coffee experience with two vibrant locations in Nairobi. 
              Join us for exceptional coffee, delicious pastries, and warm hospitality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-pete-yellow transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-pete-yellow transition-colors">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-pete-yellow transition-colors">
                Twitter
              </a>
              <a href="/qr-code" className="text-gray-300 hover:text-pete-yellow transition-colors">
                QR Code
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-bold font-quicksand text-pete-yellow mb-4">
              Locations
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-1">The Curve</h4>
                <p className="text-gray-300 text-sm">Westlands, Nairobi</p>
                <p className="text-gray-300 text-sm">Mon-Sun: 6:30 AM - 10:00 PM</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Bishop Magua</h4>
                <p className="text-gray-300 text-sm">Ngong Road, Nairobi</p>
                <p className="text-gray-300 text-sm">Mon-Sun: 7:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold font-quicksand text-pete-yellow mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">Email:</span><br />
                info@petescoffee.co.ke
              </p>
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">Tel:</span><br />
                +254 020 217 7453
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {currentYear} Pete's Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
