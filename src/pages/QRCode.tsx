import { useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const QRCode = () => {
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate QR code using qrcode.js library
    const loadQRCode = async () => {
      try {
        const QRCode = (await import('qrcode')).default;
        const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
        if (canvas) {
          const menuUrl = `${window.location.origin}/menu`;
          await QRCode.toCanvas(canvas, menuUrl, {
            width: 300,
            margin: 2,
            color: {
              dark: '#00A28F', // Pete's teal
              light: '#FFFFFF'
            }
          });
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    loadQRCode();
  }, []);

  useEffect(() => {
    const handlePrint = () => {
      if (printRef.current) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Pete's Coffee - QR Code Menu</title>
                <style>
                  @media print {
                    @page {
                      size: A4;
                      margin: 20mm;
                    }
                    body {
                      margin: 0;
                      padding: 0;
                    }
                  }
                  body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: white;
                  }
                  .qr-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    text-align: center;
                  }
                  .logo {
                    font-size: 48px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #3A2D07;
                  }
                  .logo span:first-child {
                    color: #00A28F;
                  }
                  .logo span:last-child {
                    color: #FFCF01;
                  }
                  .qr-code {
                    border: 3px solid #00A28F;
                    border-radius: 15px;
                    padding: 20px;
                    background: white;
                    margin: 30px 0;
                    box-shadow: 0 4px 20px rgba(0, 162, 143, 0.2);
                  }
                  .title {
                    font-size: 32px;
                    font-weight: bold;
                    color: #00A28F;
                    margin-bottom: 10px;
                  }
                  .subtitle {
                    font-size: 18px;
                    color: #666;
                    margin-bottom: 30px;
                  }
                  .instructions {
                    font-size: 16px;
                    color: #00A28F;
                    margin-top: 20px;
                    max-width: 400px;
                    line-height: 1.5;
                  }
                  .footer {
                    margin-top: 40px;
                    font-size: 14px;
                    color: #666;
                  }
                  @media print {
                    .no-print {
                      display: none;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="qr-container">
                  <div class="logo">
                    <span>Pete's</span><span>Coffee</span>
                  </div>
                  <div class="title">Digital Menu</div>
                  <div class="subtitle">Scan to view our complete menu online</div>
                  <div class="qr-code">
                    <canvas id="qr-canvas" width="300" height="300"></canvas>
                  </div>
                  <div class="instructions">
                    <strong>How to use:</strong><br>
                    1. Open your phone's camera<br>
                    2. Point it at this QR code<br>
                    3. Tap the notification to open our menu
                  </div>
                  <div class="footer">
                    <strong>Pete's Coffee</strong><br>
                    The Curve<br>
                    info@petescoffee.co.ke
                  </div>
                </div>
                <script>
                  // Generate QR code for print
                  fetch('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + '/menu')}')
                    .then(response => response.blob())
                    .then(blob => {
                      const img = new Image();
                      img.onload = function() {
                        const canvas = document.getElementById('qr-canvas');
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, 300, 300);
                      };
                      img.src = URL.createObjectURL(blob);
                    });
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 1000);
        }
      }
    };

    // Add print button event listener
    const printButton = document.getElementById('print-button');
    if (printButton) {
      printButton.addEventListener('click', handlePrint);
    }

    return () => {
      if (printButton) {
        printButton.removeEventListener('click', handlePrint);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pete-yellow/10 to-pete-teal/10">
      <Navigation />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div ref={printRef} className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl font-bold font-quicksand mb-4">
              <span className="text-pete-teal">Pete's</span>
              <span className="text-pete-yellow ml-2">Coffee</span>
            </div>
            <h1 className="text-4xl font-bold text-pete-brown mb-4">Digital Menu</h1>
            <p className="text-xl text-gray-600">Scan to view our complete menu online</p>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 border-4 border-pete-teal">
            <div className="flex justify-center">
              <canvas 
                id="qr-canvas" 
                width="300" 
                height="300"
                className="border-2 border-pete-teal rounded-lg"
              ></canvas>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-pete-brown mb-4 text-center">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pete-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <h3 className="font-semibold text-pete-brown mb-2">1. Open Camera</h3>
                <p className="text-gray-600 text-sm">Open your phone's camera app</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pete-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-pete-brown">🎯</span>
                </div>
                <h3 className="font-semibold text-pete-brown mb-2">2. Point & Scan</h3>
                <p className="text-gray-600 text-sm">Point camera at this QR code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pete-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📋</span>
                </div>
                <h3 className="font-semibold text-pete-brown mb-2">3. View Menu</h3>
                <p className="text-gray-600 text-sm">Tap notification to open menu</p>
              </div>
            </div>
          </div>

          {/* Print Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-pete-brown mb-4">Print This Page</h2>
            <p className="text-gray-600 mb-6">
              Print this page to display in your location or share with customers
            </p>
            <button
              id="print-button"
              className="bg-pete-teal hover:bg-pete-teal/90 text-white font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
            >
              🖨️ Print QR Code
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Optimized for A4 paper size
            </p>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 text-gray-600">
            <p className="font-semibold text-pete-brown">Pete's Coffee</p>
            <p>The Curve</p>
            <p>info@petescoffee.co.ke</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QRCode; 