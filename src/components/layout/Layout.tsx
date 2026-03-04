import { ReactNode } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import ChatWidget from "@/components/chat/ChatWidget";
import CookieConsent from "@/components/CookieConsent";

interface LayoutProps {
  children: ReactNode;
  hideBreadcrumbs?: boolean;
}

const Layout = ({ children, hideBreadcrumbs = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      {!hideBreadcrumbs && (
        <div className="bg-secondary border-b">
          <div className="container-shoham">
            <Breadcrumbs />
          </div>
        </div>
      )}
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
};

export default Layout;
