import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Engagement Table Component
 * Displays campaign engagement metrics in a table format
 */
const EngagementTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'campaignName', direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'string') {
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <span className="text-gray-300">↕</span>;
    }
    return <span className="text-black">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <h3 className="text-lg font-semibold text-black mb-4">Campaign Engagement</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('campaignName')}
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  Campaign <SortIcon column="campaignName" />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('channel')}
                  className="flex items-center gap-2 hover:text-black transition"
                >
                  Channel <SortIcon column="channel" />
                </button>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('opens')}
                  className="flex items-center gap-2 hover:text-black transition w-full justify-center"
                >
                  Opens <SortIcon column="opens" />
                </button>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('clicks')}
                  className="flex items-center gap-2 hover:text-black transition w-full justify-center"
                >
                  Clicks <SortIcon column="clicks" />
                </button>
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                <button
                  onClick={() => handleSort('engagementRate')}
                  className="flex items-center gap-2 hover:text-black transition w-full justify-center"
                >
                  Engagement <SortIcon column="engagementRate" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                  {row.campaignName}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      row.channel === 'Email'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {row.channel}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 font-semibold">
                  {row.opens.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-center text-gray-700 font-semibold">
                  {row.clicks.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      parseFloat(row.engagementRate) > 35
                        ? 'bg-green-100 text-green-800'
                        : parseFloat(row.engagementRate) > 25
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {row.engagementRate}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EngagementTable;
