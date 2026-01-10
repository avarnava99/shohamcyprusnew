import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Heavy Lift Project - Limassol",
    description: "Successful coordination of heavy lift operations for industrial equipment.",
    year: "2024",
  },
  {
    title: "Offshore Support Operations",
    description: "Comprehensive logistics support for offshore drilling operations.",
    year: "2024",
  },
  {
    title: "Project Cargo - Power Plant Equipment",
    description: "Transport and handling of power plant components.",
    year: "2023",
  },
  {
    title: "Breakbulk Cargo Operations",
    description: "Efficient handling of oversized machinery and equipment.",
    year: "2023",
  },
];

const Projects = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container-shoham">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Projects
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Have a look at our projects listed in chronological order
          </p>
        </div>
      </div>

      <div className="container-shoham py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow">
              <div className="text-sm text-accent font-semibold mb-2">{project.year}</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have a project that needs our expertise?
          </p>
          <Button asChild className="bg-accent hover:bg-shoham-orange-dark">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
