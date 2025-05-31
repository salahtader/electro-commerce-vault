
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  name: string;
  phone: string;
  company: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    id: '',
    name: '',
    phone: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create initial profile
        setProfile(prev => ({
          ...prev,
          id: user.id,
          name: user.user_metadata?.name || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          phone: profile.phone,
          company: profile.company,
        });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre profil.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="bg-gray-100"
            />
            <p className="text-sm text-gray-500 mt-1">
              L'email ne peut pas être modifié
            </p>
          </div>

          <div>
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="company">Entreprise (optionnel)</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
            />
          </div>

          <Button 
            type="submit" 
            className="bg-electric-orange hover:bg-orange-600 text-black font-semibold"
            disabled={loading}
          >
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
