
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "123 Avenue de l'Industrie\n69000 Lyon, France",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "04 78 95 45 67",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@electrotech.fr",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven : 8h00 - 18h00\nSam : 9h00 - 12h00",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-montserrat font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contactez nos Experts
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Besoin d'un conseil technique ? Une question sur nos produits ? 
            Notre équipe d'experts est à votre disposition.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat font-bold text-white">
                  Demande de devis ou d'information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Nom *</label>
                      <Input 
                        name="name"
                        placeholder="Votre nom" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Société</label>
                      <Input 
                        name="company"
                        placeholder="Nom de votre société" 
                        value={formData.company}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Email *</label>
                      <Input 
                        name="email"
                        type="email" 
                        placeholder="votre.email@exemple.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white/90">Téléphone</label>
                      <Input 
                        name="phone"
                        placeholder="01 23 45 67 89" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white/90">Message *</label>
                    <Textarea 
                      name="message"
                      placeholder="Décrivez votre projet ou vos besoins en matériel électrique..."
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-400"
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={loading}
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-montserrat font-bold text-white mb-6">
                  Informations de contact
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white mb-1">{info.title}</p>
                        <p className="text-gray-300 whitespace-pre-line">{info.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-red-600 to-orange-600 border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-montserrat font-bold mb-4 text-white">
                    Urgence 24h/7j
                  </h3>
                  <p className="mb-6 font-inter text-white/90">
                    Pour vos urgences techniques et dépannages
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-white text-red-600 hover:bg-gray-100 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      06 12 34 56 78
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
