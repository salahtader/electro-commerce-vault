
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CompanyOverview from '../components/CompanyOverview';
import BrandPartners from '../components/BrandPartners';
import FeaturedProducts from '../components/FeaturedProducts';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <CompanyOverview />
      <BrandPartners />
      <FeaturedProducts />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
