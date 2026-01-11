import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Project images imports
import italyTanks1 from "@/assets/projects/italy-tanks-1.jpg";
import italyTanks2 from "@/assets/projects/italy-tanks-2.jpg";
import italyTanks3 from "@/assets/projects/italy-tanks-3.jpg";
import italyTanks4 from "@/assets/projects/italy-tanks-4.jpg";

interface Project {
  title: string;
  description: string;
  year: string;
  location: string;
  category: string;
  images?: string[];
}

const projects: Project[] = [
  {
    title: "Door to Door Delivery from Italy to Cyprus - Out of Gauge Tank Units",
    description: "Transportation of tanks from ex-works Italy to door delivery Larnaca, Cyprus for a development in the Electricity Authority station. The project involved handling oversized tank units requiring specialized flat rack containers and coordinated logistics from factory to final destination.",
    year: "2019",
    location: "Italy → Larnaca",
    category: "Project Cargo",
    images: [italyTanks1, italyTanks2, italyTanks3, italyTanks4],
  },
  {
    title: "Heavy Lift Project - Industrial Equipment",
    description: "Successful coordination of heavy lift operations for industrial equipment delivery to major manufacturing facility in Cyprus.",
    year: "2024",
    location: "Limassol Port",
    category: "Heavy Lift",
  },
  {
    title: "Offshore Support Operations",
    description: "Comprehensive logistics support for offshore drilling operations including crew changes, supply vessel coordination, and cargo handling.",
    year: "2024",
    location: "Cyprus Offshore",
    category: "Oil & Gas",
  },
  {
    title: "Power Plant Equipment Transport",
    description: "Transport and handling of power plant components including transformers and heavy machinery from port to installation site.",
    year: "2023",
    location: "Vassiliko",
    category: "Project Cargo",
  },
  {
    title: "Breakbulk Cargo Operations",
    description: "Efficient handling of oversized machinery and equipment for construction projects throughout Cyprus.",
    year: "2023",
    location: "Limassol Port",
    category: "Breakbulk",
  },
  {
    title: "Offshore Cargo Baskets for ENI",
    description: "Coordination of offshore cargo basket operations for ENI's drilling operations in Cyprus waters. We provided full logistics support including cargo handling and vessel coordination.",
    year: "2019",
    location: "Cyprus Offshore",
    category: "Oil & Gas",
  },
  {
    title: "Loading Mobile Generators",
    description: "In March 2013, we arranged the loading of mobile generators which were used by the Electricity of Cyprus during shortages. The project involved coordination of heavy lift operations and vessel loading at Limassol port.",
    year: "2013",
    location: "Limassol Port",
    category: "Heavy Lift",
  },
  {
    title: "Vassilikos Desalination Plant",
    description: "In August 2012 we were assigned with the task of unloading from a vessel and installing 13 desalination tanks. This major project required careful planning and coordination with multiple stakeholders.",
    year: "2012",
    location: "Vassiliko",
    category: "Project Cargo",
  },
];

const ProjectImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-t-lg">
      <img
        src={images[currentIndex]}
        alt={`Project image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      
      {images.length > 1 && (
        <>
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Projects = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Projects
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Have a look at our projects listed in chronological order. Our experienced team has successfully delivered complex logistics projects across Cyprus.
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg shadow border hover:shadow-lg transition-shadow overflow-hidden"
            >
              {project.images && project.images.length > 0 && (
                <ProjectImageCarousel images={project.images} />
              )}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-secondary p-8 rounded-lg">
          <h2 className="font-heading font-semibold text-xl mb-4">
            Have a project that needs our expertise?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Our experienced team can handle complex logistics projects of any scale. From heavy lift operations to offshore support, we have the expertise to deliver.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
              <Link to="/quote">Request A Quote</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
