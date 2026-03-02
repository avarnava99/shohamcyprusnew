import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import MainServices from "@/components/home/MainServices";
import ZimSection from "@/components/home/ZimSection";
import MoreServices from "@/components/home/MoreServices";
import BlogPreview from "@/components/home/BlogPreview";
import ContactCTA from "@/components/home/ContactCTA";
import SEO, { organizationJsonLd } from "@/components/SEO";

const Index = () => {
  return (
    <Layout hideBreadcrumbs>
      <Hero />
      <MainServices />
      <ZimSection />
      <MoreServices />
      <BlogPreview />
      <ContactCTA />
    </Layout>
  );
};

export default Index;
