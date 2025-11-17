'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import StatsCard from '@/components/StatsCard';
import CallChart from '@/components/CallChart';
import ClientsList from '@/components/ClientsList';
import ROICalculator from '@/components/ROICalculator';

interface DashboardData {
  client: {
    name: string;
    displayName: string;
  };
  totalCalls: number;
  newPatients: number;
  totalRevenue: number;
  calls: any[];
}

export default function DashboardPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/sheets?clientId=${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (clientId) {
      fetchData();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {data.client.displayName} - Call Dashboard
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatsCard
            title="Total Calls"
            value={data.totalCalls}
            icon="📞"
            trend="+12%"
          />
          <StatsCard
            title="New Appointments"
            value={data.newPatients}
            icon="📅"
            trend="+8%"
          />
          <StatsCard
            title="Revenue"
            value={`$${data.totalRevenue.toLocaleString()}`}
            icon="💰"
            trend="+15%"
          />
        </div>

        {/* Call Trends Chart */}
        <div className="mb-8">
          <CallChart data={data.calls} />
        </div>

        {/* Recent Calls List */}
        <div className="mb-8">
          <ClientsList calls={data.calls} />
        </div>

        {/* ROI Calculator */}
        <div>
          <ROICalculator />
        </div>
      </main>
    </div>
  );
}
