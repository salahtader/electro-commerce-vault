
import { motion } from 'framer-motion';
import { Zap, Building, Cpu, Wrench, Settings, Globe, Battery, Box } from 'lucide-react';

const BrandPartners = () => {
  const brands = [
    { name: "Schneider Electric", icon: Zap, color: "from-green-500 to-emerald-600" },
    { name: "ABB", icon: Building, color: "from-red-500 to-rose-600" },
    { name: "Siemens", icon: Cpu, color: "from-cyan-500 to-blue-600" },
    { name: "Legrand", icon: Wrench, color: "from-orange-500 to-amber-600" },
    { name: "Hager", icon: Settings, color: "from-purple-500 to-violet-600" },
    { name: "General Electric", icon: Globe, color: "from-blue-500 to-indigo-600" },
    { name: "Eaton", icon: Battery, color: "from-yellow-500 to-orange-600" },
    { name: "Rockwell", icon: Box, color: "from-gray-500 to-slate-600" }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
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
            className="text-3xl md:text-4xl font-montserrat font-bold text-electric-blue mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Nos Marques Partenaires
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Nous travaillons avec les leaders mondiaux du matériel électrique
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-32 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group-hover:border-blue-200">
                <div className={`w-12 h-12 bg-gradient-to-r ${brand.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <brand.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-electric-blue transition-colors duration-300 text-center px-2">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPartners;
