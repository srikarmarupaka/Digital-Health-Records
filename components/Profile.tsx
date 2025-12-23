import React, { useState } from 'react';
import { User, WellnessMetrics } from '../types';
import { User as UserIcon, Save, Phone, MapPin, AlertTriangle, Activity } from 'lucide-react';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState<User>(user);
  const [wellnessData, setWellnessData] = useState<WellnessMetrics>(user.wellness || {
      height: 0, weight: 0, steps: 0, waterIntake: 0, sleepHours: 0, activityLevel: 'Sedentary'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWellnessChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setWellnessData(prev => ({ ...prev, [name]: name === 'activityLevel' ? value : Number(value) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      onUpdateUser({ ...formData, wellness: wellnessData });
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
            {user.name.charAt(0)}
        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            <p className="text-gray-500">Manage your personal and medical information.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full pl-9 border-gray-300 rounded-lg focus:ring-blue-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input type="text" name="address" value={formData.address || ''} onChange={handleChange} className="w-full pl-9 border-gray-300 rounded-lg focus:ring-blue-500" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
        </div>

        {/* Medical Profile */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-red-600" />
                Medical Profile & Wellness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input type="number" name="height" value={wellnessData.height} onChange={handleWellnessChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input type="number" name="weight" value={wellnessData.weight} onChange={handleWellnessChange} className="w-full border-gray-300 rounded-lg focus:ring-blue-500" />
                </div>
            </div>
            
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (comma separated)</label>
                    <input 
                        type="text" 
                        value={formData.allergies.join(', ')} 
                        onChange={(e) => setFormData(prev => ({...prev, allergies: e.target.value.split(',').map(s => s.trim())}))} 
                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chronic Conditions (comma separated)</label>
                    <input 
                        type="text" 
                        value={formData.chronicConditions?.join(', ') || ''} 
                        onChange={(e) => setFormData(prev => ({...prev, chronicConditions: e.target.value.split(',').map(s => s.trim())}))} 
                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500" 
                    />
                </div>
            </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                Emergency Contact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                    <input 
                        type="text" 
                        value={formData.emergencyContact?.name || ''} 
                        onChange={(e) => setFormData(prev => ({...prev, emergencyContact: { ...prev.emergencyContact!, name: e.target.value }}))}
                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                    <input 
                        type="text" 
                        value={formData.emergencyContact?.relation || ''} 
                        onChange={(e) => setFormData(prev => ({...prev, emergencyContact: { ...prev.emergencyContact!, relation: e.target.value }}))}
                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                        type="tel" 
                        value={formData.emergencyContact?.phone || ''} 
                        onChange={(e) => setFormData(prev => ({...prev, emergencyContact: { ...prev.emergencyContact!, phone: e.target.value }}))}
                        className="w-full border-gray-300 rounded-lg focus:ring-blue-500" 
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end">
             <button 
                type="submit" 
                disabled={isSaving}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center disabled:opacity-70"
            >
                <Save className="w-5 h-5 mr-2" />
                {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
        </div>

      </form>
    </div>
  );
};

export default Profile;