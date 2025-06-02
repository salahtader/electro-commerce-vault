
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserCheck, UserX } from 'lucide-react';
import { useAllUsers, useUpdateUserRole } from '@/hooks/useUserRoles';

interface UserWithRoles {
  id: string;
  name: string | null;
  company: string | null;
  phone: string | null;
  user_roles: Array<{
    role: 'admin' | 'user';
  }>;
}

const UserManagement = () => {
  const { data: users, isLoading } = useAllUsers();
  const updateRoleMutation = useUpdateUserRole();

  const handleRoleChange = (userId: string, newRole: 'admin' | 'user') => {
    updateRoleMutation.mutate({ userId, role: newRole });
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement des utilisateurs...</div>;
  }

  const getUserRole = (user: UserWithRoles): 'admin' | 'user' => {
    return user.user_roles?.[0]?.role || 'user';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gestion des utilisateurs
          </CardTitle>
          <CardDescription>
            Gérez les rôles et permissions des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Rôle actuel</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: UserWithRoles) => {
                const userRole = getUserRole(user);
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || 'Non renseigné'}
                    </TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.company || 'Non renseigné'}</TableCell>
                    <TableCell>{user.phone || 'Non renseigné'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={userRole === 'admin' ? 'default' : 'secondary'}
                      >
                        {userRole === 'admin' ? (
                          <>
                            <UserCheck className="h-3 w-3 mr-1" />
                            Admin
                          </>
                        ) : (
                          <>
                            <UserX className="h-3 w-3 mr-1" />
                            Utilisateur
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={userRole}
                        onValueChange={(value: 'admin' | 'user') => 
                          handleRoleChange(user.id, value)
                        }
                        disabled={updateRoleMutation.isPending}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Utilisateur</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
