
const Footer = () => {
  return (
    <footer className="bg-electric-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-montserrat font-bold text-electric-orange mb-4">
              ElectroTech
            </h3>
            <p className="text-gray-300 font-inter mb-4">
              Votre partenaire de confiance pour tous vos besoins en matériel électrique 
              basse et moyenne tension.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 font-inter">
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Accueil</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Catalogue</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Basse Tension</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Moyenne Tension</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-4">Services</h4>
            <ul className="space-y-2 font-inter">
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Conseil technique</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Devis personnalisé</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Livraison express</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Support 24h/7j</a></li>
              <li><a href="#" className="text-gray-300 hover:text-electric-orange transition-colors">Formation</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-4">Certifications</h4>
            <div className="space-y-2 text-gray-300 font-inter">
              <p>✓ Norme ISO 9001</p>
              <p>✓ Certification CE</p>
              <p>✓ RGE Qualibat</p>
              <p>✓ Norme NF C 15-100</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 font-inter">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 ElectroTech. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-electric-orange transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-electric-orange transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-electric-orange transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
