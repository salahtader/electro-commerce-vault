
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
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/30 hover:text-blue-800 dark:hover:text-blue-200 transition-all duration-300"
        >
          <Settings className="h-4 w-4" />
          Admin
        </Button>
      </Link>
    </motion.div>
  );
};

export default AdminLink;
