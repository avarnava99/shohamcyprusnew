import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ChevronLeft, ChevronRight, X, ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return <Navigate to="/project-cargo" replace />;
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    if (project.images) {
      setLightboxIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1));
    }
  };

  const goToNext = () => {
    if (project.images) {
      setLightboxIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1));
    }
  };

  // Get other projects (exclude current)
  const otherProjects = projects.filter(p => p.slug !== project.slug).slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-primary py-12">
        <div className="container-shoham">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/80 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/project-cargo" className="hover:text-white">Project Cargo</Link>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </nav>
          
          <h1 className="font-heading text-2xl md:text-4xl font-bold text-white uppercase tracking-wide">
            Transport of Transformers
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-shoham py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Back Link */}
            <Link 
              to="/project-cargo" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Project Cargo
            </Link>

            {/* Project Title */}
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-6">
              {project.subtitle || project.title}
            </h2>

            {/* Project Description */}
            <div className="prose prose-lg max-w-none mb-8">
              {project.fullDescription ? (
                project.fullDescription.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground">{project.description}</p>
              )}
            </div>

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-heading text-xl font-semibold">Project Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="aspect-video overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Details Card */}
            <div className="bg-card border rounded-lg p-6 mb-6 sticky top-24">
              <h3 className="font-heading font-semibold text-lg mb-4 pb-3 border-b">
                Project Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-medium">{project.year}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <span className="bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-6 pt-4 border-t space-y-3">
                <Button asChild className="w-full bg-accent hover:bg-shoham-orange-dark">
                  <Link to="/quote">Request A Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>

            {/* Other Projects */}
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Other Projects</h3>
              <ul className="space-y-3">
                {otherProjects.map((p) => (
                  <li key={p.slug}>
                    <Link 
                      to={`/project-cargo/${p.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && project.images && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/30 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images[lightboxIndex]}
              alt={`${project.title} - Image ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
            
            {/* Image Counter */}
            <p className="text-white/80 text-center mt-4">
              {lightboxIndex + 1} / {project.images.length}
            </p>
          </div>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 bg-black/30 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetailPage;
