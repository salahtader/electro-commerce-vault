
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CompanyOverview = () => {
  const features = [
    {
      icon: "⚡",
      title: "Expertise BT/MT",
      description: "Plus de 20 ans d'expérience dans la distribution de matériel électrique basse et moyenne tension"
    },
    {
      icon: "🏭",
      title: "Solutions Industrielles",
      description: "Partenaire de confiance pour vos projets industriels et installations électriques complexes"
    },
    {
      icon: "📋",
      title: "Certifications",
      description: "Produits certifiés CE, conformes aux normes européennes et françaises en vigueur"
    },
    {
      icon: "🚚",
      title: "Livraison Express",
      description: "Stock permanent et livraison rapide partout en France pour vos urgences"
    }
  ];

  return (
    <section className="py-20 bg-electric-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6">
            Votre Partenaire Électrique de Confiance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter">
            ElectroTech est spécialisé dans la fourniture de matériel électrique professionnel 
            pour les secteurs du BTP, de l'industrie et des infrastructures. 
            Notre expertise technique et notre service client font la différence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-montserrat font-bold text-electric-blue mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="/about">
            <Button 
              size="lg" 
              className="bg-electric-blue hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
            >
              En savoir plus sur notre expertise
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
