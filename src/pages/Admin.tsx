
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import StockManagement from '@/components/StockManagement';
import UserManagement from '@/components/UserManagement';
import { useIsAdmin } from '@/hooks/useUserRoles';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (!loading && user && isAdmin === false) {
      navigate('/dashboard');
    }
  }, [user, loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-adaptive">
        <div className="text-lg font-medium text-gray-900 dark:text-gray-100">Chargement...</div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-adaptive">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-electric-blue dark:text-blue-400 font-montserrat">
            Administration
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 font-inter">
            Gérez votre plateforme ElectroTech
          </p>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-electric-blue dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="stock"
              className="data-[state=active]:bg-electric-blue dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
            >
              Gestion des stocks
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-electric-blue dark:data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700 dark:text-gray-300"
            >
              Gestion des utilisateurs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="stock">
            <StockManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
