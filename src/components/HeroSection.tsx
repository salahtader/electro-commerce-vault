
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://videos.pexels.com/video-files/2845487/2845487-uhd_2560_1440_30fps.mp4" 
            type="video/mp4" 
          />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-montserrat font-bold mb-6 animate-fade-in">
          Votre Expert en 
          <span className="text-electric-orange"> Matériel Électrique</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-inter max-w-2xl mx-auto animate-slide-up">
          Solutions complètes BT/MT pour professionnels et industriels. 
          Qualité, fiabilité et expertise depuis plus de 20 ans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <a href="/catalog">
            <Button 
              size="lg" 
              className="bg-electric-orange hover:bg-orange-600 text-black font-semibold px-8 py-4 text-lg"
            >
              Voir nos produits
            </Button>
          </a>
          <a href="#contact">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
            >
              Demander un devis
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
