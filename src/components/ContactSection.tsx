
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          company: formData.company || null,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message
        }]);

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Votre demande a été envoyée avec succès. Nous vous recontacterons bientôt.",
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom *</label>
                    <Input 
                      name="name"
                      placeholder="Votre nom" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Société</label>
                    <Input 
                      name="company"
                      placeholder="Nom de votre société" 
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input 
                      name="email"
                      type="email" 
                      placeholder="votre.email@exemple.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <Input 
                      name="phone"
                      placeholder="01 23 45 67 89" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <Textarea 
                    name="message"
                    placeholder="Décrivez votre projet ou vos besoins en matériel électrique..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </Button>
              </form>
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
