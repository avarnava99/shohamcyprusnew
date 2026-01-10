import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Chartering from "./pages/Chartering";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/zim-agency" element={<ZimAgency />} />
          <Route path="/zim-agency/:section" element={<ZimSectionPage />} />
          <Route path="/port-agency" element={<PortAgency />} />
          <Route path="/port-agency/:section" element={<PortAgencySectionPage />} />
          <Route path="/ports" element={<Ports />} />
          <Route path="/ports/:slug" element={<PortPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/chartering" element={<Chartering />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
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
