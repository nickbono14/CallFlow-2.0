'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CallChartProps {
  data: any[]
}

export default function CallChart({ data }: CallChartProps) {
  // Sample data if none provided
  const chartData = data.length > 0 ? data : [
    { date: 'Mon', calls: 24 },
    { date: 'Tue', calls: 32 },
    { date: 'Wed', calls: 28 },
    { date: 'Thu', calls: 45 },
    { date: 'Fri', calls: 38 },
    { date: 'Sat', calls: 20 },
    { date: 'Sun', calls: 15 },
  ]

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
