import { useRef, useState, useEffect } from "react";
import zimShip from "@/assets/zim-ship.jpg";

const stats = [
  { value: 90, suffix: "+", label: "Countries" },
  { value: 32, suffix: "K+", label: "Customers" },
  { value: 300, suffix: "", label: "Ports Covered" },
  { value: 80, suffix: "+", label: "Years" },
];

const AnimatedStat = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(easeOutQuart * value);
              
              setCount(currentCount);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(value);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-heading text-3xl md:text-4xl font-bold text-primary tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const ZimSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container-shoham">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">ZIM Integrated Shipping Services</h2>
            <p className="text-muted-foreground mb-6">
              ZIM remains at the forefront of the carrier industry by rapidly adapting 
              to commercial developments and emerging markets. As the official representative 
              of ZIM in Cyprus, Shoham offers competitive freight rates and reliable 
              shipping services.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={zimShip}
              alt="ZIM Container Ship"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-3 rounded font-heading font-semibold">
              Since 1946
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZimSection;
