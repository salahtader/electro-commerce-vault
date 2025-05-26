
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Users, Clock, MapPin, Phone, Mail, Zap, Shield, Truck, HeartHandshake } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  const stats = [
    { icon: Clock, label: "Années d'expérience", value: "20+" },
    { icon: Users, label: "Clients satisfaits", value: "5000+" },
    { icon: Truck, label: "Livraisons par mois", value: "1200+" },
    { icon: Zap, label: "Références produits", value: "10000+" }
  ];

  const expertise = [
    {
      icon: Zap,
      title: "Basse Tension (BT)",
      description: "Expertise complète en distribution BT : disjoncteurs, contacteurs, relais, armoires de distribution jusqu'à 1000V.",
      specialties: ["Disjoncteurs modulaires", "Contacteurs et relais", "Protection différentielle", "Armoires de distribution"]
    },
    {
      icon: Shield,
      title: "Moyenne Tension (MT)",
      description: "Solutions MT pour l'industrie et les infrastructures : transformateurs, cellules MT, protection numérique.",
      specialties: ["Transformateurs de puissance", "Cellules MT", "Protection numérique", "Appareillage MT"]
    },
    {
      icon: HeartHandshake,
      title: "Conseil & Expertise",
      description: "Notre équipe d'ingénieurs vous accompagne dans le choix et la mise en œuvre de vos solutions électriques.",
      specialties: ["Audit électrique", "Dimensionnement", "Mise en conformité", "Formation technique"]
    },
    {
      icon: Truck,
      title: "Logistique & Service",
      description: "Service de livraison express et support technique pour répondre à vos urgences et besoins spécifiques.",
      specialties: ["Livraison express", "Stock permanent", "Support 24h/7j", "Service après-vente"]
    }
  ];

  const certifications = [
    { name: "ISO 9001", description: "Système de management qualité" },
    { name: "CE", description: "Conformité européenne" },
    { name: "RGE Qualibat", description: "Reconnu Garant de l'Environnement" },
    { name: "NF C 15-100", description: "Norme française installations BT" }
  ];

  const timeline = [
    { year: "2004", event: "Création d'ElectroTech à Lyon" },
    { year: "2008", event: "Extension vers la moyenne tension" },
    { year: "2012", event: "Certification ISO 9001" },
    { year: "2016", event: "Ouverture de l'agence de Marseille" },
    { year: "2020", event: "Digitalisation complète des processus" },
    { year: "2024", event: "Leader régional en distribution électrique" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-electric-blue to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-montserrat font-bold mb-6">
              Notre Expertise
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-inter">
              Plus de 20 ans d'expérience au service des professionnels du secteur électrique
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-electric-orange" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-montserrat font-bold text-electric-blue mb-6">
                Notre Histoire
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Fondée en 2004 à Lyon, ElectroTech s'est imposée comme un acteur majeur 
                de la distribution de matériel électrique en France. Notre expertise 
                technique et notre service client irréprochable nous ont permis de 
                fidéliser plus de 5000 clients professionnels.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Spécialisés dans les solutions basse et moyenne tension, nous 
                accompagnons les électriciens, les entreprises du BTP et les 
                industriels dans leurs projets les plus exigeants.
              </p>
              <Button size="lg" className="bg-electric-orange hover:bg-orange-600 text-black">
                Contactez nos experts
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
                alt="Équipe ElectroTech"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-electric-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-montserrat font-bold text-electric-blue text-center mb-16">
            Nos Étapes Clés
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-electric-blue"></div>
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-electric-blue mb-2">
                          {item.year}
                        </div>
                        <p className="text-gray-700">{item.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-electric-orange rounded-full border-4 border-white"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-electric-blue mb-6">
              Nos Domaines d'Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une expertise technique approfondie dans tous les domaines du matériel électrique
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center mr-4">
                      <area.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-montserrat font-bold text-gray-900">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {area.description}
                  </p>
                  <div className="space-y-2">
                    {area.specialties.map((specialty, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="w-2 h-2 bg-electric-orange rounded-full mr-3"></span>
                        <span className="text-gray-600">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-electric-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold text-electric-blue mb-6">
              Certifications & Qualité
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos certifications garantissent la qualité de nos produits et services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-electric-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-gray-900 mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-electric-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-montserrat font-bold mb-6">
            Prêt à travailler avec nous ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de vos besoins en matériel électrique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-electric-orange hover:bg-orange-600 text-black px-8">
              <Phone className="h-5 w-5 mr-2" />
              04 78 95 45 67
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-electric-blue px-8">
              <Mail className="h-5 w-5 mr-2" />
              contact@electrotech.fr
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
