import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [text, setText] = useState("https://example.com");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(256);
  const { toast } = useToast();

  const downloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast({
        title: "QR Code Downloaded!",
        description: "Your QR code has been saved successfully.",
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 gradient-text">
            QR Code Generator
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create beautiful, customizable QR codes instantly. Perfect for URLs, text, or any data.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-start animate-slide-up">
          {/* Controls */}
          <Card className="p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-2 shadow-lg hover:shadow-xl transition-shadow">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text" className="text-base font-semibold">
                  Content
                </Label>
                <Input
                  id="text"
                  type="text"
                  placeholder="Enter URL or text..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="text-base h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fgColor" className="text-base font-semibold">
                    Foreground
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="fgColor"
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="h-12 w-16 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="h-12 flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bgColor" className="text-base font-semibold">
                    Background
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="bgColor"
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-12 w-16 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-12 flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-base font-semibold">
                  Size: {size}px
                </Label>
                <input
                  id="size"
                  type="range"
                  min="128"
                  max="512"
                  step="64"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <Button
                onClick={downloadQR}
                className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download QR Code
              </Button>
            </div>
          </Card>

          {/* QR Code Display */}
          <Card className="p-6 sm:p-8 backdrop-blur-sm bg-card/80 border-2 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-center">
              <div
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: bgColor,
                  boxShadow: "var(--shadow-strong)",
                }}
              >
                <QRCodeSVG
                  id="qr-code"
                  value={text || "https://example.com"}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in">
          <p>Made with ❤️ for creating beautiful QR codes</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
