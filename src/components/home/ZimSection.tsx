import zimShip from "@/assets/zim-ship.jpg";

const stats = [
  { value: "90+", label: "Countries" },
  { value: "32K+", label: "Customers" },
  { value: "300", label: "Ports Covered" },
  { value: "80+", label: "Years" },
];

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
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
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
