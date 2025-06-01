
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  event_data: any;
  user_id: string | null;
  created_at: string;
}

export const useAnalytics = (dateRange?: { from: Date; to: Date }) => {
  return useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false });

      if (dateRange) {
        query = query
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }

      return data as AnalyticsEvent[];
    },
  });
};

export const useSalesStats = () => {
  return useQuery({
    queryKey: ['sales-stats'],
    queryFn: async () => {
      // Get total sales
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount, status, created_at');

      if (ordersError) throw ordersError;

      // Get product sales
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('name, total_sold, price, stock_quantity, low_stock_threshold');

      if (productsError) throw productsError;

      // Calculate stats
      const totalRevenue = ordersData
        .filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + Number(order.total_amount), 0);

      const totalOrders = ordersData.length;
      const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
      const lowStockProducts = productsData.filter(
        product => product.stock_quantity <= product.low_stock_threshold
      ).length;

      // Monthly sales data for chart
      const monthlySales = ordersData.reduce((acc, order) => {
        const month = new Date(order.created_at).toISOString().slice(0, 7); // YYYY-MM
        if (!acc[month]) acc[month] = 0;
        if (order.status === 'delivered') {
          acc[month] += Number(order.total_amount);
        }
        return acc;
      }, {} as Record<string, number>);

      const chartData = Object.entries(monthlySales).map(([month, revenue]) => ({
        month,
        revenue,
      }));

      return {
        totalRevenue,
        totalOrders,
        pendingOrders,
        lowStockProducts,
        chartData,
        topProducts: productsData
          .sort((a, b) => b.total_sold - a.total_sold)
          .slice(0, 5),
      };
    },
  });
};

export const useTrackEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      eventType, 
      eventData, 
      userId 
    }: { 
      eventType: string; 
      eventData?: any; 
      userId?: string 
    }) => {
      const { data, error } = await supabase
        .from('analytics')
        .insert({
          event_type: eventType,
          event_data: eventData,
          user_id: userId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
};
