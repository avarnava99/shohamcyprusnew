import limassolMarinaImg from "@/assets/limassol-marina.webp";
import { Badge } from "@/components/ui/badge";

const facilities = [
  "Spa & Fitness Club",
  "Travel Lift",
  "Fuel Station",
  "Yacht Club",
  "Harbour Master",
  "Shower Facilities",
  "Shopping & Dining",
  "Helipad",
  "Boatyard",
  "Chandlery",
  "Slipway",
  "Car Park",
];

const LimassolMarinaSection = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h3 className="font-heading font-semibold text-xl">Limassol Marina</h3>
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
          Blue Flag Marina
        </Badge>
        <Badge variant="default">Port of Entry</Badge>
      </div>

      <figure className="mb-6">
        <img
          src={limassolMarinaImg}
          alt="Limassol Marina aerial view showing the marina, berths, and surrounding facilities"
          className="w-full rounded-lg shadow-lg"
        />
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          Limassol Marina — Cyprus's premier superyacht destination
        </figcaption>
      </figure>

      <p className="text-muted-foreground mb-6">
        Limassol Marina is an exciting superyacht destination in the
        Mediterranean. Visitors and berth holders benefit from an unrivalled
        combination of service, facilities and technical support. Designed by a
        world-renowned team of architects and engineers, it combines elegant
        residences and a full service marina with an enticing mix of restaurants
        and shops, to create a lifestyle uniquely shaped by 'living on the sea'.
      </p>

      <h4 className="font-semibold mb-3">Marina Facilities</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {facilities.map((facility) => (
          <div
            key={facility}
            className="flex items-center gap-2 bg-secondary p-2 rounded text-sm"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            <span>{facility}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimassolMarinaSection;
