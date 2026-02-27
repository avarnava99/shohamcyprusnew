import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-zim-ship.webp";

const Hero = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="ZIM LNG container ship sailing through Panama Canal"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-shoham-navy/90 to-shoham-blue/70" />
      
      <div className="relative container-shoham h-full flex items-center">
        <div className="max-w-2xl text-white animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            You Can Rely On Our Experience
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Shipping and freight forwarding agent in Cyprus since 1946. 
            Your trusted partner for maritime logistics solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-shoham-orange-dark text-white font-semibold uppercase tracking-wide">
              <Link to="/contact-us">Get In Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="!bg-transparent !border-white !text-white hover:!bg-white hover:!text-shoham-navy font-semibold uppercase tracking-wide">
              <Link to="/quote">Online Rates</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
