import Navbar from "@/components/shared/Navbar";
import Hero from '@/components/home/Hero';
import TrustedBrands from '@/components/home/TrustedBrands';
import Statistics from '@/components/home/Statistics';
import LatestReviews from '@/components/home/LatestReviews';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStories from '@/components/home/SuccessStories';
import CorporateMembership from '@/components/home/CorporateMembership';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <TrustedBrands /> */}
      <HowItWorks />
      <LatestReviews />
      <Statistics />
      <SuccessStories />
      <CorporateMembership />
      <Footer />
    </>
  );
}
