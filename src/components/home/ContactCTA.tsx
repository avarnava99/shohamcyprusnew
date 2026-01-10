import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container-shoham text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
          Not sure which solution fits your business needs?
        </h2>
        <Button asChild size="lg" className="bg-accent hover:bg-shoham-orange-dark text-white font-semibold uppercase tracking-wide">
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;
