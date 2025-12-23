import React from 'react';
import { 
  Home, 
  FileText, 
  Stethoscope, 
  Pill, 
  Activity, 
  Ambulance, 
  LogOut,
  Bot,
  Heart,
  User as UserIcon
} from 'lucide-react';
import { AppView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView, user, onLogout }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: Home },
    { id: AppView.RECORDS, label: 'Records', icon: FileText },
    { id: AppView.CONSULTATION, label: 'Doctors', icon: Stethoscope },
    { id: AppView.WELLNESS, label: 'Wellness', icon: Heart },
    { id: AppView.PHARMACY, label: 'Pharmacy', icon: Pill },
    { id: AppView.DIAGNOSTICS, label: 'Lab Tests', icon: Activity },
    { id: AppView.AI_ASSISTANT, label: 'AI Help', icon: Bot },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <Activity className="w-8 h-8" />
            MediLink
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === item.id
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
             <button
              onClick={() => onChangeView(AppView.AMBULANCE)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === AppView.AMBULANCE
                  ? 'bg-red-50 text-red-600 font-medium'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <Ambulance className="w-5 h-5" />
              <span>Emergency SOS</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
             onClick={() => onChangeView(AppView.PROFILE)}
             className={`flex items-center space-x-3 mb-4 px-2 w-full text-left rounded-lg p-2 transition-colors ${currentView === AppView.PROFILE ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">My Profile</p>
            </div>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen pb-20 md:pb-0">
        <header className="md:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-20 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
             <Activity className="w-6 h-6" />
             MediLink
          </h1>
          <div className="flex gap-2">
              <button onClick={() => onChangeView(AppView.PROFILE)} className="p-2 rounded-full text-gray-600 bg-gray-50">
                <UserIcon className="w-6 h-6" />
              </button>
              <button onClick={() => onChangeView(AppView.AMBULANCE)} className="bg-red-50 text-red-600 p-2 rounded-full">
                <Ambulance className="w-6 h-6" />
              </button>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                currentView === item.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;