
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-electric-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6">
            Contactez nos Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
            Besoin d'un conseil technique ? Une question sur nos produits ? 
            Notre équipe d'experts est à votre disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-montserrat font-bold text-electric-blue">
                Demande de devis ou d'information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom *</label>
                  <Input placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Société</label>
                  <Input placeholder="Nom de votre société" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input type="email" placeholder="votre.email@exemple.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone</label>
                  <Input placeholder="01 23 45 67 89" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea 
                  placeholder="Décrivez votre projet ou vos besoins en matériel électrique..."
                  rows={4}
                />
              </div>
              <Button 
                size="lg" 
                className="w-full bg-electric-orange hover:bg-orange-600 text-black font-semibold"
              >
                Envoyer ma demande
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-montserrat font-bold text-electric-blue mb-6">
                  Informations de contact
                </h3>
                <div className="space-y-4 text-gray-600 font-inter">
                  <div className="flex items-start space-x-3">
                    <span className="text-electric-orange font-bold">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p>123 Avenue de l'Industrie<br />69000 Lyon, France</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-electric-orange font-bold">📞</span>
                    <div>
                      <p className="font-semibold text-gray-900">Téléphone</p>
                      <p>04 78 95 45 67</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-electric-orange font-bold">✉️</span>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p>contact@electrotech.fr</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-electric-orange font-bold">🕒</span>
                    <div>
                      <p className="font-semibold text-gray-900">Horaires</p>
                      <p>Lun-Ven : 8h00 - 18h00<br />Sam : 9h00 - 12h00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-electric-blue text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-montserrat font-bold mb-4">
                  Urgence 24h/7j
                </h3>
                <p className="mb-6 font-inter">
                  Pour vos urgences techniques et dépannages
                </p>
                <Button 
                  size="lg" 
                  className="bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                >
                  06 12 34 56 78
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
