
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
      <div className="min-h-screen flex items-center justify-center">
        <div>Chargement...</div>
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="stock">Gestion des stocks</TabsTrigger>
            <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
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
