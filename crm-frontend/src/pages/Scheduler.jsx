import React from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const schedules = [
    { id: 1, title: 'Newsletter Blast', date: 'Today', time: '2:00 PM', status: 'Pending' },
    { id: 2, title: 'Campaign Email', date: 'Tomorrow', time: '10:00 AM', status: 'Scheduled' },
    { id: 3, title: 'Social Media Posts', date: 'Jun 15', time: '9:00 AM', status: 'Scheduled' },
    { id: 4, title: 'Follow-up Email', date: 'Jun 20', time: '3:00 PM', status: 'Scheduled' },
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = new Date();

  return (
    <PageWrapper
      title="Campaign Scheduler"
      description="Plan and schedule your campaigns."
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-black text-white rounded-lg font-semibold mb-8 hover:bg-gray-900"
      >
        + Schedule Campaign
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Mini View */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg border p-6"
          style={{ borderColor: theme.ui.border }}
        >
          <h3 className="text-lg font-bold text-black mb-6">June 2024</h3>
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {days.map((day) => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
            {/* Calendar days */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`aspect-square rounded-lg font-medium text-sm transition-colors ${
                  i === 14
                    ? 'bg-black text-white'
                    : 'bg-gray-50 text-black hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Schedule List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="space-y-3">
            {schedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: -5 }}
                className="bg-white rounded-lg border p-4 cursor-pointer"
                style={{ borderColor: theme.ui.border }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-black">{schedule.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {schedule.date} at {schedule.time}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor:
                        schedule.status === 'Pending' ? '#FEE2E2' :
                        '#DBEAFE',
                      color:
                        schedule.status === 'Pending' ? '#991B1B' :
                        '#0C4A6E',
                    }}
                  >
                    {schedule.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 px-3 py-2 text-xs font-medium border rounded hover:bg-gray-50 transition-colors"
                    style={{ borderColor: theme.ui.border }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex-1 px-3 py-2 text-xs font-medium border rounded hover:bg-gray-50 transition-colors"
                    style={{ borderColor: theme.ui.border }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Scheduler;
