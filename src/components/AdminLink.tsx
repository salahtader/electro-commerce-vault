
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useUserRoles';

const AdminLink = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return null;

  return (
    <Link to="/admin">
      <Button variant="outline" size="sm" className="gap-2">
        <Shield className="h-4 w-4" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminLink;
