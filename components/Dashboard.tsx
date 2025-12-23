import React from 'react';
import { User, AppView } from '../types';
import { Activity, Calendar, Clock, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
  onChangeView: (view: AppView) => void;
}

// Mock health data
const data = [
  { name: 'Mon', bpm: 72 },
  { name: 'Tue', bpm: 75 },
  { name: 'Wed', bpm: 71 },
  { name: 'Thu', bpm: 78 },
  { name: 'Fri', bpm: 74 },
  { name: 'Sat', bpm: 69 },
  { name: 'Sun', bpm: 72 },
];

const Dashboard: React.FC<DashboardProps> = ({ user, onChangeView }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h2>
          <p className="text-gray-500">Here's your health overview for today.</p>
        </div>
        <div className="hidden md:block">
            <button 
                onClick={() => onChangeView(AppView.CONSULTATION)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
                Book Appointment
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vitals Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-rose-100 rounded-lg">
              <Activity className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Heart Rate Trend</h3>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                <Tooltip />
                <Area type="monotone" dataKey="bpm" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBpm)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-end mt-2">
            <div>
              <span className="text-3xl font-bold text-gray-900">72</span>
              <span className="text-sm text-gray-500 ml-1">bpm avg</span>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+2% vs last week</span>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Upcoming</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-xl">
              <div className="bg-white p-2 rounded-lg text-center min-w-[3.5rem] shadow-sm">
                <span className="block text-xs text-gray-500 uppercase">Oct</span>
                <span className="block text-xl font-bold text-gray-900">24</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Dr. Sarah Smith</p>
                <p className="text-sm text-gray-500">Cardiologist Checkup</p>
                <div className="flex items-center mt-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3 mr-1" /> 10:30 AM
                </div>
              </div>
            </div>
            <button 
                onClick={() => onChangeView(AppView.CONSULTATION)}
                className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
                View all doctors
            </button>
          </div>
        </div>

        {/* Alerts / Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-semibold text-gray-900">Actions Needed</h3>
          </div>

          <div className="space-y-3">
            <div className="p-4 border border-amber-100 bg-amber-50 rounded-xl">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-amber-900">Prescription Refill</p>
                        <p className="text-xs text-amber-700 mt-1">Metformin 500mg is running low.</p>
                    </div>
                    <button 
                        onClick={() => onChangeView(AppView.PHARMACY)}
                        className="text-xs bg-white text-amber-600 px-3 py-1 rounded-full font-medium shadow-sm hover:bg-amber-100"
                    >
                        Order
                    </button>
                </div>
            </div>
             <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm font-medium text-blue-900">Lab Results Ready</p>
                        <p className="text-xs text-blue-700 mt-1">Blood work from 2023-10-15</p>
                    </div>
                    <button 
                        onClick={() => onChangeView(AppView.RECORDS)}
                        className="text-xs bg-white text-blue-600 px-3 py-1 rounded-full font-medium shadow-sm hover:bg-blue-100"
                    >
                        View
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>

       {/* Quick Actions Grid for Mobile mostly */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => onChangeView(AppView.PHARMACY)} className="p-4 bg-emerald-50 rounded-xl text-left hover:bg-emerald-100 transition-colors">
                <PillIcon className="w-6 h-6 text-emerald-600 mb-2" />
                <p className="font-medium text-emerald-900">Order Medicine</p>
            </button>
             <button onClick={() => onChangeView(AppView.DIAGNOSTICS)} className="p-4 bg-purple-50 rounded-xl text-left hover:bg-purple-100 transition-colors">
                <TestTubeIcon className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-purple-900">Book Tests</p>
            </button>
             <button onClick={() => onChangeView(AppView.AI_ASSISTANT)} className="p-4 bg-indigo-50 rounded-xl text-left hover:bg-indigo-100 transition-colors">
                <BrainIcon className="w-6 h-6 text-indigo-600 mb-2" />
                <p className="font-medium text-indigo-900">AI Assistant</p>
            </button>
             <button onClick={() => onChangeView(AppView.RECORDS)} className="p-4 bg-orange-50 rounded-xl text-left hover:bg-orange-100 transition-colors">
                <FilesIcon className="w-6 h-6 text-orange-600 mb-2" />
                <p className="font-medium text-orange-900">History</p>
            </button>
       </div>
    </div>
  );
};

// Helper Icons
const PillIcon = ({className}: {className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
)
const TestTubeIcon = ({className}: {className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3"/><path d="m16 2 6 6"/><path d="M12 16H4"/></svg>
)
const BrainIcon = ({className}: {className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
)
const FilesIcon = ({className}: {className: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
)


export default Dashboard;