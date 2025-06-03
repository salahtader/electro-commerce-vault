
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';
import { useIsAdmin } from '@/hooks/useUserRoles';
import { motion } from 'framer-motion';

const AdminLink = () => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/admin">
        <Button variant="outline" size="sm" className="gap-2 bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-300">
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      </Link>
    </motion.div>
  );
};

export default AdminLink;
