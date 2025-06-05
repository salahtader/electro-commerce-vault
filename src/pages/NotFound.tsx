
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-adaptive">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <motion.h1 
              className="text-9xl font-black text-electric-blue dark:text-blue-400 mb-4"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              404
            </motion.h1>
            <motion.h2 
              className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-montserrat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Page introuvable
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 font-inter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </motion.p>
          </div>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button 
              asChild
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="/">
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </a>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full border-2 border-electric-blue dark:border-blue-400 text-electric-blue dark:text-blue-400 hover:bg-electric-blue dark:hover:bg-blue-400 hover:text-white dark:hover:text-white py-3 px-6 rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Page précédente
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
