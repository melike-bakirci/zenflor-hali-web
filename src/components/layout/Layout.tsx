import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "../ui/BackToTop";
import FloatingContact from "../ui/FloatingContact";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main" id="main-content" role="main">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <BackToTop />
    </div>
  );
};

export default Layout;
