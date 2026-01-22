import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import { CONTACT } from "@/constants/contact";

interface ContactBoxProps {
  title?: string;
  description?: string;
  variant?: "default" | "primary";
  showQuoteButton?: boolean;
}

export const ContactBox = ({
  title = "Need Help?",
  description = "Contact our team for more information.",
  variant = "default",
  showQuoteButton = true,
}: ContactBoxProps) => {
  const bgClass = variant === "primary" ? "bg-primary text-white" : "bg-secondary";
  const textClass = variant === "primary" ? "text-white/80" : "text-muted-foreground";

  return (
    <div className={`${bgClass} p-6 rounded-lg`}>
      <h3 className="font-heading font-semibold text-lg mb-4">{title}</h3>
      <p className={`text-sm ${textClass} mb-4`}>{description}</p>
      
      <div className={`space-y-2 text-sm mb-4 ${textClass}`}>
        <a 
          href={CONTACT.primary.phoneHref} 
          className="flex items-center gap-2 hover:underline"
        >
          <Phone className="h-4 w-4 flex-shrink-0" />
          {CONTACT.primary.phone}
        </a>
        <a 
          href={CONTACT.primary.emailHref} 
          className="flex items-center gap-2 hover:underline"
        >
          <Mail className="h-4 w-4 flex-shrink-0" />
          {CONTACT.primary.email}
        </a>
      </div>

      <div className="space-y-3">
        {showQuoteButton && (
          <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
            <Link to="/quote">Request Quote</Link>
          </Button>
        )}
        <Button asChild variant={variant === "primary" ? "secondary" : "outline"} className="w-full">
          <Link to="/contact-us">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactBox;
