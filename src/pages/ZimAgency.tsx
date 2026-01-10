import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import zimShip from "@/assets/zim-ship.jpg";

const stats = [
  { value: "60+", label: "Agents Worldwide" },
  { value: "29", label: "Ships" },
  { value: "59", label: "Ports Covered" },
  { value: "25", label: "Lines" },
];

const ZimAgency = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            ZIM Agency
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Official representative of ZIM Integrated Shipping Services Ltd in Cyprus
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="section-title">ZIM Integrated Shipping Services</h2>
            <p className="text-muted-foreground mb-6">
              Shoham is the representative of ZIM Integrated Shipping Services Ltd in Cyprus. 
              ZIM lines offer export and import containerized services to/from Limassol and Europe, 
              Israel, USA and other countries. We can offer competitive freights.
            </p>
            <p className="text-muted-foreground mb-6">
              ZIM remains at the forefront of the carrier industry by rapidly adapting to 
              commercial developments and emerging markets.
            </p>
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <Link to="/quote">Get A Quote</Link>
            </Button>
          </div>
          <div>
            <img src={zimShip} alt="ZIM Container Ship" className="rounded-lg shadow-xl" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-secondary p-8 rounded-lg">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/zim-agency/marketing" className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-semibold text-lg mb-2">Marketing and Sales</h3>
            <p className="text-sm text-muted-foreground">Commercial services and sales support</p>
          </Link>
          <Link to="/zim-agency/containers" className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-semibold text-lg mb-2">Container Types</h3>
            <p className="text-sm text-muted-foreground">View available container options</p>
          </Link>
          <Link to="/zim-agency/schedules" className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-semibold text-lg mb-2">Sailing Schedules</h3>
            <p className="text-sm text-muted-foreground">View ZIM sailing schedules</p>
          </Link>
          <Link to="/zim-agency/track" className="bg-card p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h3 className="font-heading font-semibold text-lg mb-2">Track Container</h3>
            <p className="text-sm text-muted-foreground">Track your shipment</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ZimAgency;
