
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'user';
  created_at: string;
}

export const useUserRole = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user role:', error);
        throw error;
      }

      return data as UserRole | null;
    },
    enabled: !!user,
  });
};

export const useIsAdmin = () => {
  const { data: userRole } = useUserRole();
  return userRole?.role === 'admin';
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          user_roles(role)
        `);

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }

      return data;
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: 'admin' | 'user' }) => {
      // First, try to update existing role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingRole) {
        const { data, error } = await supabase
          .from('user_roles')
          .update({ role })
          .eq('user_id', userId)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Create new role entry
        const { data, error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users'] });
      queryClient.invalidateQueries({ queryKey: ['user-role'] });
    },
  });
};
