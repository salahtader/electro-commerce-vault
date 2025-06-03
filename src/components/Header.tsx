
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, User, LogOut, UserCircle, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import CartSidebar from './CartSidebar';
import AdminLink from './AdminLink';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/catalog' },
    { name: 'Basse Tension', href: '/catalog?category=bt' },
    { name: 'Moyenne Tension', href: '/catalog?category=mt' },
    { name: 'Expertise', href: '/about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 glass-effect shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ElectroTech
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium rounded-lg hover:bg-blue-50 group"
              >
                {item.name}
                <span className="absolute inset-x-2 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden md:block font-medium">
                  Bonjour, {user.user_metadata?.name || 'Utilisateur'}
                </span>
                <AdminLink />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-blue-50">
                    <a href="/dashboard">
                      <UserCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full hover:bg-red-50 hover:text-red-600">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-blue-50">
                  <a href="/auth">
                    <User className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            )}
            
            <CartSidebar />

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-blue-50">
                    <Menu className="h-6 w-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 glass-card">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 p-3 rounded-lg hover:bg-blue-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  {user ? (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-4 font-medium">
                        Connecté en tant que {user.user_metadata?.name || 'Utilisateur'}
                      </p>
                      <div className="space-y-3">
                        <AdminLink />
                        <Button 
                          asChild 
                          variant="outline"
                          className="w-full rounded-lg"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <a href="/dashboard">Mon tableau de bord</a>
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            signOut();
                            setIsMenuOpen(false);
                          }}
                          className="w-full rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                        >
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        asChild 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <a href="/auth">Se connecter</a>
                      </Button>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
