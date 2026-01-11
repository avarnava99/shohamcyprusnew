import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import ZimAgency from "./pages/ZimAgency";
import ZimSectionPage from "./pages/zim/ZimSectionPage";
import PortAgency from "./pages/PortAgency";
import PortAgencySectionPage from "./pages/port-agency/PortAgencySectionPage";
import Ports from "./pages/Ports";
import PortPage from "./pages/ports/PortPage";
import Services from "./pages/Services";
import ServicePage from "./pages/services/ServicePage";
import CustomsSubpage from "./pages/services/CustomsSubpage";
import Chartering from "./pages/Chartering";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ContainerTypes from "./pages/ContainerTypes";
import TravelAgency from "./pages/TravelAgency";
import ContainerHomes from "./pages/ContainerHomes";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* About Us */}
          <Route path="/about-us" element={<About />} />
          
          {/* ZIM Agency - Original URLs */}
          <Route path="/zim-agency-in-cyprus" element={<ZimAgency />} />
          <Route path="/zim-agency-in-cyprus/:section" element={<ZimSectionPage />} />
          
          {/* Port Agency - Original URLs */}
          <Route path="/port-agency" element={<PortAgency />} />
          <Route path="/port-agency/:section" element={<PortAgencySectionPage />} />
          <Route path="/port-agency/ports-in-cyprus" element={<Ports />} />
          <Route path="/port-agency/ports-in-cyprus/:slug" element={<PortPage />} />
          
          {/* Services - Original URLs */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/services/customs-clearing/:subpage" element={<CustomsSubpage />} />
          <Route path="/iso-tank" element={<ServicePage />} />
          
          {/* Standalone Pages */}
          <Route path="/container-types" element={<ContainerTypes />} />
          <Route path="/travel-agency" element={<TravelAgency />} />
          <Route path="/container-homes" element={<ContainerHomes />} />
          <Route path="/frequently-asked-questions" element={<FAQ />} />
          <Route path="/about-us/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Other Pages */}
          <Route path="/chartering" element={<Chartering />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
