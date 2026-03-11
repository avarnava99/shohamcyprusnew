import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoadingSpinner from "@/components/PageLoadingSpinner";

// Lazy-loaded page components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const ZimAgency = lazy(() => import("./pages/ZimAgency"));
const ZimSectionPage = lazy(() => import("./pages/zim/ZimSectionPage"));
const PortAgency = lazy(() => import("./pages/PortAgency"));
const PortAgencySectionPage = lazy(() => import("./pages/port-agency/PortAgencySectionPage"));
const Ports = lazy(() => import("./pages/Ports"));
const PortPage = lazy(() => import("./pages/ports/PortPage"));
const Services = lazy(() => import("./pages/Services"));
const ServicePage = lazy(() => import("./pages/services/ServicePage"));
const ContainerTracking = lazy(() => import("./pages/services/ContainerTracking"));
const CustomsSubpage = lazy(() => import("./pages/services/CustomsSubpage"));
const DutyCalculator = lazy(() => import("./pages/services/DutyCalculator"));
const FreightForwarderCyprus = lazy(() => import("./pages/services/FreightForwarderCyprus"));
const CarShippingUK = lazy(() => import("./pages/services/CarShippingUK"));
const AirFreightCyprus = lazy(() => import("./pages/services/AirFreightCyprus"));
const ParcelForwardingCyprus = lazy(() => import("./pages/services/ParcelForwardingCyprus"));
const Chartering = lazy(() => import("./pages/Chartering"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetailPage = lazy(() => import("./pages/projects/ProjectDetailPage"));
const Contact = lazy(() => import("./pages/Contact"));
const Quote = lazy(() => import("./pages/Quote"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ContainerTypes = lazy(() => import("./pages/ContainerTypes"));
const TravelAgency = lazy(() => import("./pages/TravelAgency"));
const ContainerHomes = lazy(() => import("./pages/ContainerHomes"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ContactSubmissions = lazy(() => import("./pages/admin/ContactSubmissions"));
const ContainerOrders = lazy(() => import("./pages/admin/ContainerOrders"));
const DutyCalculatorLeads = lazy(() => import("./pages/admin/DutyCalculatorLeads"));
const LiveChat = lazy(() => import("./pages/admin/LiveChat"));
const NewsCrawler = lazy(() => import("./pages/admin/NewsCrawler"));
const UsedContainers = lazy(() => import("./pages/UsedContainers"));
const Account = lazy(() => import("./pages/Account"));
const ExnessPartnership = lazy(() => import("./pages/ExnessPartnership"));
const AmazonUK = lazy(() => import("./pages/AmazonUK"));
const EcommerceGermany = lazy(() => import("./pages/EcommerceGermany"));
const EcommerceUSA = lazy(() => import("./pages/EcommerceUSA"));
const CyprusShippingAssociation = lazy(() => import("./pages/CyprusShippingAssociation"));
const MouWithCustoms = lazy(() => import("./pages/MouWithCustoms"));
const Fonasba = lazy(() => import("./pages/Fonasba"));
const Cymepa = lazy(() => import("./pages/Cymepa"));
const IcsBranchCyprus = lazy(() => import("./pages/IcsBranchCyprus"));
const YoungShipCyprus = lazy(() => import("./pages/YoungShipCyprus"));
const ChangeOfOwnership = lazy(() => import("./pages/ChangeOfOwnership"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoadingSpinner />}>
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
            <Route path="/services/freight-forwarding" element={<FreightForwarderCyprus />} />
            <Route path="/services/car-shipping-from-uk-to-cyprus" element={<CarShippingUK />} />
            <Route path="/services/air-freight-cyprus" element={<AirFreightCyprus />} />
            <Route path="/services/parcel-forwarding" element={<ParcelForwardingCyprus />} />
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
            <Route path="/exness" element={<ExnessPartnership />} />

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
            <Route path="/account" element={<Account />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/live-chat" element={<LiveChat />} />
            <Route path="/admin/contacts" element={<ContactSubmissions />} />
            <Route path="/admin/container-orders" element={<ContainerOrders />} />
            <Route path="/admin/duty-leads" element={<DutyCalculatorLeads />} />
            <Route path="/admin/news-crawler" element={<NewsCrawler />} />

            {/* ============================================= */}
            {/* SEO REDIRECTS - WordPress URL preservation     */}
            {/* Production redirects handled by vercel.json    */}
            {/* These remain as fallbacks for local dev        */}
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
            <Route path="/services/air-freight" element={<Navigate to="/services/air-freight-cyprus" replace />} />
            <Route path="/services/travel-agency" element={<Navigate to="/travel-agency" replace />} />
            <Route path="/services/marine-logistics" element={<Navigate to="/port-agency" replace />} />
            <Route path="/services/cross-shipments-and-dropshipping" element={<Navigate to="/services" replace />} />
            <Route path="/services/freight-forwarder-cyprus" element={<Navigate to="/services/freight-forwarding" replace />} />
            <Route path="/services/sea-freight-cyprus" element={<Navigate to="/services/sea-freight" replace />} />
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
            <Route path="/port-agency/change-of-ownership" element={<ChangeOfOwnership />} />
            <Route path="/port-agency/owners-protecting-agency" element={<Navigate to="/port-agency" replace />} />

            {/* About & ZIM redirects */}
            <Route path="/about-us/general-information/cyprus-shipping-association" element={<CyprusShippingAssociation />} />
            <Route path="/about-us/general-information/mou-with-customs" element={<MouWithCustoms />} />
            <Route path="/about-us/general-information/fonasba" element={<Fonasba />} />
            <Route path="/about-us/general-information/cymepa" element={<Cymepa />} />
            <Route path="/about-us/general-information/ics-branch-cyprus" element={<IcsBranchCyprus />} />
            <Route path="/about-us/general-information/youngship-cyprus" element={<YoungShipCyprus />} />
            <Route path="/about-us/general-information/*" element={<Navigate to="/about-us" replace />} />
            <Route path="/zim-agency-in-cyprus/zim-sailing-schedules/*" element={<Navigate to="/zim-agency-in-cyprus/zim-sailing-schedules" replace />} />
            <Route path="/zim-agency-in-cyprus/track-your-cargo" element={<Navigate to="/services/container-tracking" replace />} />

            {/* Blog post redirects (high impressions) */}
            <Route path="/why-ispm-15-certification-matters-for-your-cargo" element={<Navigate to="/blog" replace />} />
            <Route path="/moving-to-cyprus-reliefs-for-transferring-your-normal-residence" element={<Navigate to="/services/customs-clearing" replace />} />
            <Route path="/what-is-an-eur1-certificate" element={<Navigate to="/services/customs-clearing" replace />} />
            <Route path="/opl-limassol-services-*" element={<Navigate to="/port-agency" replace />} />

            {/* GSC high-traffic broken URLs */}
            <Route path="/zim-agency-in-cyprus/track-container-eurogate-limassol-cyprus" element={<Navigate to="/services/container-tracking" replace />} />
            <Route path="/direct-container-service-from-uk-and-europe-to-limassol-port-zim" element={<Navigate to="/zim-agency-in-cyprus" replace />} />
            <Route path="/shipping-rates-from-germany-to-cyprus" element={<Navigate to="/ecommerce-purchases-from-germany" replace />} />
            <Route path="/list-of-vessels-calling-limassol" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
            <Route path="/pallet-load-calculator" element={<Navigate to="/quote" replace />} />
            <Route path="/ship-a-parcel-to-cyprus" element={<Navigate to="/services/parcel-forwarding" replace />} />
            <Route path="/flight-schedule-larnaca-to-athens" element={<Navigate to="/travel-agency" replace />} />

            {/* Sub-path catches */}
            <Route path="/services/car-shipping-from-uk-to-cyprus/*" element={<Navigate to="/services/car-shipping-from-uk-to-cyprus" replace />} />
            <Route path="/services/customs-clearing/transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus" element={<Navigate to="/services/customs-clearing" replace />} />

            {/* Medium impression indexed URLs */}
            <Route path="/ecommerce-shopify-cyprus-store" element={<Navigate to="/services" replace />} />
            <Route path="/shipping-rates-for-pallets-to-cyprus" element={<Navigate to="/quote" replace />} />
            <Route path="/40-foot-container-dimensions" element={<Navigate to="/container-types" replace />} />
            <Route path="/20-foot-container-dimensions" element={<Navigate to="/container-types" replace />} />
            <Route path="/airline-representation" element={<Navigate to="/travel-agency" replace />} />
            <Route path="/container-equipment" element={<Navigate to="/container-types" replace />} />
            <Route path="/warehousing" element={<Navigate to="/services" replace />} />
            <Route path="/car-rates" element={<Navigate to="/services/car-shipping-from-uk-to-cyprus" replace />} />
            <Route path="/searates" element={<Navigate to="/quote" replace />} />
            <Route path="/location" element={<Navigate to="/contact-us" replace />} />
            <Route path="/moni-anchorage" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
            <Route path="/limassol-anchorage" element={<Navigate to="/port-agency/ports-in-cyprus/limassol-port" replace />} />
            <Route path="/sea-freight-import-to-cyprus" element={<Navigate to="/services/sea-freight" replace />} />
            <Route path="/sea-freight-exports-from-cyprus" element={<Navigate to="/services/sea-freight" replace />} />
            <Route path="/container-shipping-from-cyprus" element={<Navigate to="/services/sea-freight" replace />} />
            <Route path="/car-export-from-cyprus" element={<Navigate to="/services/car-shipping-from-uk-to-cyprus" replace />} />
            <Route path="/exporting-from-cyprus" element={<Navigate to="/services" replace />} />

            {/* WordPress pattern catch-all redirects */}
            <Route path="/tag/*" element={<Navigate to="/blog" replace />} />
            <Route path="/category/*" element={<Navigate to="/blog" replace />} />
            <Route path="/product-tag/*" element={<Navigate to="/services" replace />} />
            <Route path="/product-category/*" element={<Navigate to="/services" replace />} />
            <Route path="/news/*" element={<Navigate to="/blog" replace />} />
            <Route path="/shop/*" element={<Navigate to="/services/used-containers" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
