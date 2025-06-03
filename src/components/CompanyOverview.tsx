
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Zap, Building2, Shield, Truck } from 'lucide-react';

const CompanyOverview = () => {
  const features = [
    {
      icon: Zap,
      title: "Expertise BT/MT",
      description: "Plus de 20 ans d'expérience dans la distribution de matériel électrique basse et moyenne tension"
    },
    {
      icon: Building2,
      title: "Solutions Industrielles",
      description: "Partenaire de confiance pour vos projets industriels et installations électriques complexes"
    },
    {
      icon: Shield,
      title: "Certifications",
      description: "Produits certifiés CE, conformes aux normes européennes et françaises en vigueur"
    },
    {
      icon: Truck,
      title: "Livraison Express",
      description: "Stock permanent et livraison rapide partout en France pour vos urgences"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
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
            className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Votre Partenaire Électrique de Confiance
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto font-inter leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            ElectroTech est spécialisé dans la fourniture de matériel électrique professionnel 
            pour les secteurs du BTP, de l'industrie et des infrastructures. 
            Notre expertise technique et notre service client font la différence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="text-white w-8 h-8" />
                  </motion.div>
                  <h3 className="text-xl font-montserrat font-bold text-electric-blue mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-inter leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/about">En savoir plus sur notre expertise</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverview;
