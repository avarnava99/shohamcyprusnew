import { Toaster } from "@/components/ui/toaster";
import AmazonUK from "./pages/AmazonUK";
import EcommerceGermany from "./pages/EcommerceGermany";
import EcommerceUSA from "./pages/EcommerceUSA";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import ContainerTracking from "./pages/services/ContainerTracking";
import CustomsSubpage from "./pages/services/CustomsSubpage";
import DutyCalculator from "./pages/services/DutyCalculator";
import Chartering from "./pages/Chartering";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./pages/projects/ProjectDetailPage";
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
import TermsOfService from "./pages/TermsOfService";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import ContainerOrders from "./pages/admin/ContainerOrders";
import DutyCalculatorLeads from "./pages/admin/DutyCalculatorLeads";
import LiveChat from "./pages/admin/LiveChat";
import UsedContainers from "./pages/UsedContainers";

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
          <Route path="/services/container-tracking" element={<ContainerTracking />} />
          <Route path="/services/used-containers" element={<UsedContainers />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/services/customs-clearing/duty-calculator-for-cyprus" element={<DutyCalculator />} />
          <Route path="/services/customs-clearing/:subpage" element={<CustomsSubpage />} />
          <Route path="/iso-tank" element={<ServicePage />} />
          
          {/* Standalone Pages */}
          <Route path="/container-types" element={<ContainerTypes />} />
          <Route path="/travel-agency" element={<TravelAgency />} />
          <Route path="/container-homes" element={<ContainerHomes />} />
          <Route path="/frequently-asked-questions" element={<FAQ />} />
          <Route path="/about-us/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about-us/terms-of-service" element={<TermsOfService />} />
          <Route path="/online-purchases-shipped-to-cyprus-from-amazon-uk" element={<AmazonUK />} />
          <Route path="/ecommerce-purchases-from-germany" element={<EcommerceGermany />} />
          <Route path="/ecommerce-purchases-from-usa" element={<EcommerceUSA />} />
          
          {/* Other Pages */}
          <Route path="/chartering" element={<Chartering />} />
          <Route path="/project-cargo" element={<Projects />} />
          <Route path="/project-cargo/:slug" element={<ProjectDetailPage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/live-chat" element={<LiveChat />} />
          <Route path="/admin/contacts" element={<ContactSubmissions />} />
          <Route path="/admin/container-orders" element={<ContainerOrders />} />
          <Route path="/admin/duty-leads" element={<DutyCalculatorLeads />} />

          {/* ============================================= */}
          {/* SEO REDIRECTS - WordPress URL preservation     */}
          {/* ============================================= */}

          {/* High-traffic page redirects */}
          <Route path="/car-import-duty-calculation" element={<Navigate to="/services/customs-clearing/duty-calculator-for-cyprus" replace />} />
          <Route path="/car-registration" element={<Navigate to="/services/customs-clearing" replace />} />
          <Route path="/about-us/contact-us/careers" element={<Navigate to="/contact-us" replace />} />
          <Route path="/about-us/contact-us" element={<Navigate to="/contact-us" replace />} />
          <Route path="/home-2" element={<Navigate to="/" replace />} />
          <Route path="/tracking" element={<Navigate to="/services/container-tracking" replace />} />
          <Route path="/container-tracking-platform" element={<Navigate to="/services/container-tracking" replace />} />
          <Route path="/drydock-service" element={<Navigate to="/port-agency" replace />} />

          {/* Service page redirects */}
          <Route path="/services/air-freight-cyprus" element={<Navigate to="/services/air-freight" replace />} />
          <Route path="/services/travel-agency" element={<Navigate to="/travel-agency" replace />} />
          <Route path="/services/marine-logistics" element={<Navigate to="/port-agency" replace />} />
          <Route path="/services/marine-insurance" element={<Navigate to="/services" replace />} />
          <Route path="/services/cross-shipments-and-dropshipping" element={<Navigate to="/services" replace />} />
          <Route path="/services/freight-forwarder-cyprus" element={<Navigate to="/services/freight-forwarding" replace />} />
          <Route path="/services/sea-freight-cyprus" element={<Navigate to="/services/sea-freight" replace />} />
          <Route path="/services/car-shipping-from-uk-to-cyprus/*" element={<Navigate to="/services/car-shipping-from-uk-to-cyprus" replace />} />
          <Route path="/services/find-online-shipping-rates-cyprus" element={<Navigate to="/quote" replace />} />
          <Route path="/services/ship-parcel-to-cyprus" element={<Navigate to="/services/parcel-forwarding" replace />} />
          <Route path="/services/customs-clearing/transfer-of-normal-residence-to-cyprus" element={<Navigate to="/services/customs-clearing" replace />} />
          <Route path="/services/container-tracking-for-multiple-shipping-lines" element={<Navigate to="/services/container-tracking" replace />} />

          {/* Parcel forwarding sub-page redirects */}
          <Route path="/services/parcel-forwarding/online-purchases-from-uk" element={<Navigate to="/online-purchases-shipped-to-cyprus-from-amazon-uk" replace />} />
          <Route path="/services/parcel-forwarding/e-commerce-purchases-from-germany-amazon-de" element={<Navigate to="/ecommerce-purchases-from-germany" replace />} />
          <Route path="/services/parcel-forwarding/online-purchases-shipped-from-usa-to-cyprus" element={<Navigate to="/ecommerce-purchases-from-usa" replace />} />

          {/* Port agency redirects */}
          <Route path="/port-agency/ports-in-cyprus/limassol-port/limassol-port-eurogate-schedule" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
          <Route path="/port-agency/ports-in-cyprus/limassol-port/*" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
          <Route path="/port-agency/ports-in-cyprus/limassol-port-cruise-terminal" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
          <Route path="/port-agency/ports-in-cyprus/limassol-port-anchorage" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
          <Route path="/port-agency/ports-in-cyprus/dhekelia-oil-terminal" element={<Navigate to="/port-agency/ports-in-cyprus/vassiliko-oil-terminal" replace />} />
          <Route path="/port-agency/ports-in-cyprus/larnaca-oil-terminal" element={<Navigate to="/port-agency/ports-in-cyprus/larnaca-port" replace />} />
          <Route path="/port-agency/ports-in-cyprus/raf-akrotiri-oil-terminal" element={<Navigate to="/port-agency/ports-in-cyprus" replace />} />
          <Route path="/port-agency/yacht-agency/*" element={<Navigate to="/port-agency" replace />} />
          <Route path="/port-agency/vessel-repairs" element={<Navigate to="/port-agency" replace />} />
          <Route path="/port-agency/change-of-ownership" element={<Navigate to="/port-agency" replace />} />
          <Route path="/port-agency/owners-protecting-agency" element={<Navigate to="/port-agency" replace />} />

          {/* About & ZIM redirects */}
          <Route path="/about-us/general-information/*" element={<Navigate to="/about-us" replace />} />
          <Route path="/zim-agency-in-cyprus/zim-sailing-schedules/*" element={<Navigate to="/zim-agency-in-cyprus/zim-sailing-schedules" replace />} />
          <Route path="/zim-agency-in-cyprus/track-your-cargo" element={<Navigate to="/services/container-tracking" replace />} />

          {/* Blog post redirects (high impressions) */}
          <Route path="/why-ispm-15-certification-matters-for-your-cargo" element={<Navigate to="/blog" replace />} />
          <Route path="/moving-to-cyprus-reliefs-for-transferring-your-normal-residence" element={<Navigate to="/services/customs-clearing" replace />} />
          <Route path="/what-is-an-eur1-certificate" element={<Navigate to="/services/customs-clearing" replace />} />
          <Route path="/opl-limassol-services-*" element={<Navigate to="/port-agency" replace />} />

          {/* WordPress pattern catch-all redirects */}
          <Route path="/tag/*" element={<Navigate to="/blog" replace />} />
          <Route path="/category/*" element={<Navigate to="/blog" replace />} />
          <Route path="/product-tag/*" element={<Navigate to="/services" replace />} />
          <Route path="/product-category/*" element={<Navigate to="/services" replace />} />
          <Route path="/news/*" element={<Navigate to="/blog" replace />} />
          <Route path="/shop/*" element={<Navigate to="/services/used-containers" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
