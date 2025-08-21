import react from "react";
import NavBar from "../components/user/NavBar";
import Footer from "../components/user/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always on top */}
      <NavBar />

      {/* Page content in the middle */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
}