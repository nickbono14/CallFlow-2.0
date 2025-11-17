'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function ROICalculator() {
  const [calls, setCalls] = useState(100)
  const [conversionRate, setConversionRate] = useState(30)
  const [avgValue, setAvgValue] = useState(500)

  const newPatients = Math.round((calls * conversionRate) / 100)
  const totalRevenue = newPatients * avgValue
  const roi = ((totalRevenue - 1000) / 1000) * 100 // Assuming $1000 marketing cost

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center mb-4">
        <Calculator className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">ROI Calculator</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Calls: {calls}
          </label>
          <input
            type="range"
            min="0"
            max="500"
            value={calls}
            onChange={(e) => setCalls(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conversion Rate: {conversionRate}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={conversionRate}
            onChange={(e) => setConversionRate(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avg Patient Value: ${avgValue}
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={avgValue}
            onChange={(e) => setAvgValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">New Patients</p>
              <p className="text-2xl font-bold text-blue-600">{newPatients}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">ROI</p>
            <p className="text-3xl font-bold text-purple-600">{roi.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
