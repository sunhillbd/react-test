import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}