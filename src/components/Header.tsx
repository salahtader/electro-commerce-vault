import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, User, LogOut, UserCircle, Menu, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import CartSidebar from './CartSidebar';
import AdminLink from './AdminLink';
import ThemeToggle from './ThemeToggle';
import CategorySubmenu from './CategorySubmenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/catalog', hasSubmenu: true, categoryId: 'catalog' },
    { name: 'Expertise', href: '/about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 shadow-xl"
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
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-300 bg-clip-text text-transparent">
                ElectroTech
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.hasSubmenu ? (
                  <CategorySubmenu
                    categoryId="catalog"
                    categoryName={item.name}
                    href={item.href}
                  />
                ) : (
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 group backdrop-blur-sm"
                  >
                    {item.name}
                    <span className="absolute inset-x-2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                )}
              </motion.div>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
            
            {/* Theme Toggle - moved to the right */}
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden md:block font-medium">
                  Bonjour, {user.user_metadata?.name || 'Utilisateur'}
                </span>
                <AdminLink />
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
                    <a href="/dashboard">
                      <UserCircle className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
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
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
                    <Menu className="h-6 w-6" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white dark:bg-gray-900 backdrop-blur-xl border-l border-gray-200 dark:border-gray-700">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.hasSubmenu ? (
                        <CategorySubmenu
                          categoryId="catalog"
                          categoryName={item.name}
                          href={item.href}
                          onItemClick={() => setIsMenuOpen(false)}
                          isMobile={true}
                        />
                      ) : (
                        <a
                          href={item.href}
                          className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )}
                    </motion.div>
                  ))}
                  
                  {user ? (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 font-medium">
                        Connecté en tant que {user.user_metadata?.name || 'Utilisateur'}
                      </p>
                      <div className="space-y-3">
                        <AdminLink />
                        <Button 
                          asChild 
                          variant="outline"
                          className="w-full rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 backdrop-blur-sm"
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
                          className="w-full rounded-lg bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
                        >
                          Se déconnecter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
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
