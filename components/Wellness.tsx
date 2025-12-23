import React, { useState } from 'react';
import { User, DietItem } from '../types';
import { Activity, Droplets, Moon, Scale, TrendingUp, Utensils, Plus, Minus, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface WellnessProps {
  user: User;
}

const Wellness: React.FC<WellnessProps> = ({ user }) => {
  const [waterIntake, setWaterIntake] = useState(user.wellness?.waterIntake || 0);

  // Calculate BMI
  const heightM = (user.wellness?.height || 170) / 100;
  const bmi = (user.wellness?.weight || 70) / (heightM * heightM);
  const bmiCategory = bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal' : bmi < 29.9 ? 'Overweight' : 'Obese';
  const bmiColor = bmi < 18.5 ? 'text-blue-600' : bmi < 24.9 ? 'text-green-600' : bmi < 29.9 ? 'text-orange-600' : 'text-red-600';

  // Mock Activity Data
  const activityData = [
    { day: 'Mon', steps: 6500 },
    { day: 'Tue', steps: 8200 },
    { day: 'Wed', steps: 7800 },
    { day: 'Thu', steps: 9500 },
    { day: 'Fri', steps: 5400 },
    { day: 'Sat', steps: 10200 },
    { day: 'Sun', steps: 8500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Wellness & Fitness</h2>
            <p className="text-gray-500">Track your daily vitals and nutrition.</p>
        </div>
        <div className="text-right hidden sm:block">
            <p className="text-sm text-gray-500">Daily Goal</p>
            <p className="text-2xl font-bold text-blue-600">10,000 Steps</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  <Scale className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-sm text-gray-500">BMI Score</p>
                  <p className={`text-xl font-bold ${bmiColor}`}>{bmi.toFixed(1)}</p>
                  <p className="text-xs text-gray-400">{bmiCategory}</p>
              </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                  <Flame className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-sm text-gray-500">Calories Burned</p>
                  <p className="text-xl font-bold text-gray-900">~{Math.round(user.wellness?.steps || 0 * 0.04)} kcal</p>
                  <p className="text-xs text-gray-400">Based on activity</p>
              </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                  <Moon className="w-6 h-6" />
              </div>
              <div>
                  <p className="text-sm text-gray-500">Sleep</p>
                  <p className="text-xl font-bold text-gray-900">{user.wellness?.sleepHours}h</p>
                  <p className="text-xs text-gray-400">Last Night</p>
              </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
              <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600">
                  <Droplets className="w-6 h-6" />
              </div>
              <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-gray-500">Water</p>
                      <span className="text-sm font-bold text-gray-900">{waterIntake}/8</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <button onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))} className="p-1 hover:bg-gray-100 rounded">
                          <Minus className="w-3 h-3" />
                      </button>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${(waterIntake / 8) * 100}%` }}></div>
                      </div>
                      <button onClick={() => setWaterIntake(waterIntake + 1)} className="p-1 hover:bg-gray-100 rounded">
                          <Plus className="w-3 h-3" />
                      </button>
                  </div>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                  <Activity className="w-5 h-5 text-green-500" />
                  <h3 className="font-bold text-gray-900">Activity Trends</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                            {activityData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 5 ? '#2563eb' : '#cbd5e1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* Diet Plan */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center space-x-2 mb-6">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-gray-900">Diet Plan</h3>
              </div>
              <div className="space-y-6">
                  {user.dietPlan?.map((item, idx) => (
                      <div key={idx} className="relative pl-6 pb-2 border-l border-gray-200 last:border-0">
                          <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                          <div className="flex justify-between items-start">
                              <div>
                                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.meal} • {item.time}</p>
                                  <p className="text-sm font-medium text-gray-900 mt-1">{item.description}</p>
                              </div>
                              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full whitespace-nowrap">
                                  {item.calories} cal
                              </span>
                          </div>
                      </div>
                  ))}
                  {!user.dietPlan && (
                      <p className="text-gray-500 text-sm text-center">No diet plan assigned.</p>
                  )}
              </div>
              <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Generate Meal Plan with AI
              </button>
          </div>
      </div>
    </div>
  );
};

export default Wellness;