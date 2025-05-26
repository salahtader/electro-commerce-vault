
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, User } from 'lucide-react';
import CartSidebar from './CartSidebar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Catalogue', href: '/catalog' },
    { name: 'Basse Tension', href: '/catalog?category=bt' },
    { name: 'Moyenne Tension', href: '/catalog?category=mt' },
    { name: 'Expertise', href: '/about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-montserrat font-bold text-electric-blue">
              ElectroTech
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-electric-blue transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <CartSidebar />

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className="w-5 h-0.5 bg-gray-600 mb-1"></span>
                    <span className="w-5 h-0.5 bg-gray-600 mb-1"></span>
                    <span className="w-5 h-0.5 bg-gray-600"></span>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-electric-blue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
