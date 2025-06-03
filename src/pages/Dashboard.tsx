
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  User,
  Package,
  CreditCard,
  Settings,
  Bell,
  Star,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfile from '../components/UserProfile';
import OrderDetails from '../components/OrderDetails';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Commandes totales",
      value: "12",
      icon: ShoppingBag,
      color: "from-blue-600 to-purple-600",
      change: "+2 ce mois"
    },
    {
      title: "En cours",
      value: "3",
      icon: Clock,
      color: "from-orange-500 to-red-500",
      change: "2 expédiées"
    },
    {
      title: "Livrées",
      value: "9",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      change: "100% succès"
    },
    {
      title: "Points fidélité",
      value: "1,250",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
      change: "+150 ce mois"
    }
  ];

  const recentOrders = [
    {
      id: "CMD-2024-001",
      date: "2024-01-15",
      status: "Livrée",
      total: 1289.90,
      items: 3
    },
    {
      id: "CMD-2024-002", 
      date: "2024-01-20",
      status: "En transit",
      total: 789.50,
      items: 2
    },
    {
      id: "CMD-2024-003",
      date: "2024-01-22",
      status: "Préparation",
      total: 2150.00,
      items: 5
    }
  ];

  const quickActions = [
    {
      title: "Nouvelle commande",
      description: "Parcourir le catalogue",
      icon: Package,
      href: "/catalog",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Mes factures",
      description: "Gérer les paiements",
      icon: CreditCard,
      href: "#",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Paramètres",
      description: "Modifier le profil",
      icon: Settings,
      href: "#",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Support",
      description: "Assistance technique",
      icon: Bell,
      href: "#",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <motion.h1 
                  className="text-3xl font-montserrat font-bold text-electric-blue"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Bonjour, {user?.user_metadata?.name || 'Utilisateur'} !
                </motion.h1>
                <motion.p 
                  className="text-gray-600 font-inter"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Bienvenue dans votre espace personnel ElectroTech
                </motion.p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              Client Professionnel
            </Badge>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1 font-montserrat">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mb-2 font-inter">{stat.title}</p>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    {stat.change}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-electric-blue font-montserrat">
                  <ShoppingBag className="w-5 h-5" />
                  Commandes récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-300"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 font-montserrat">{order.id}</p>
                        <p className="text-sm text-gray-600 font-inter">{order.date} • {order.items} articles</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-electric-blue font-montserrat">{order.total.toFixed(2)}€</p>
                        <Badge 
                          className={`text-xs ${
                            order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                            order.status === 'En transit' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-white/50 hover:bg-white/70 transition-all duration-300">
                  Voir toutes les commandes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-electric-blue font-montserrat">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.a
                      key={index}
                      href={action.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="block p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center shadow-lg`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 font-montserrat">{action.title}</p>
                          <p className="text-sm text-gray-600 font-inter">{action.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* User Profile and Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <UserProfile />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <OrderDetails />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
