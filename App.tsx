import React, { useState } from 'react';
import { AppView, UserRole, User, HealthRecord, Appointment } from './types';
import { MOCK_USER, MOCK_DOCTOR_USER, MOCK_RECORDS, MOCK_HOSPITALS } from './constants';
import Layout from './components/Layout';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Records from './components/Records';
import Services from './components/Services';
import Ambulance from './components/Ambulance';
import AIHealthAssistant from './components/AIHealthAssistant';
import DoctorPortal from './components/DoctorPortal';
import Wellness from './components/Wellness';
import Profile from './components/Profile';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [records, setRecords] = useState<HealthRecord[]>(MOCK_RECORDS);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleLogin = (role: UserRole) => {
      // In a real app, this would be determined by the authenticated user's profile
      if (role === 'DOCTOR') {
          setCurrentUser(MOCK_DOCTOR_USER);
      } else {
          setCurrentUser(MOCK_USER);
      }
      setIsAuthenticated(true);
      setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentUser(MOCK_USER);
  };

  const handleUpdateUser = (updatedUser: User) => {
      setCurrentUser(updatedUser);
      // In a real app, you would make an API PUT request here.
  };

  const handleBookAppointment = (doctorId: string, date: string, time: string, reason: string) => {
      // In real app, fetch doctor details
      const newAppointment: Appointment = {
          id: `appt_${Date.now()}`,
          patientId: currentUser.id,
          doctorId,
          doctorName: 'Dr. Selected', // In real app, look up from ID
          hospitalName: 'Selected Hospital', // In real app, look up
          date,
          time,
          reason,
          status: 'Scheduled'
      };
      setAppointments([...appointments, newAppointment]);
  };

  const handleRefillRequest = (recordId: string) => {
      setRecords(prev => prev.map(r => 
          r.id === recordId ? { ...r, status: 'Refill Requested' } : r
      ));
      alert("Refill request sent to pharmacy!");
  };

  // If Doctor logs in, show Doctor Portal immediately
  if (isAuthenticated && currentUser.role === 'DOCTOR') {
      return (
          <DoctorPortal 
            user={currentUser} 
            allRecords={records}
            onAddRecord={(newRecord) => setRecords(prev => [newRecord, ...prev])}
            onLogout={handleLogout}
          />
      );
  }

  // Generate User Context for AI
  const userContextString = `User: ${currentUser.name}, Age: ${currentUser.age}, Gender: ${currentUser.gender}, 
  Blood Group: ${currentUser.bloodGroup}, Allergies: ${currentUser.allergies.join(', ')}. 
  Chronic Conditions: ${currentUser.chronicConditions?.join(', ')}.
  Wellness: ${currentUser.wellness?.weight}kg, ${currentUser.wellness?.height}cm.
  Recent Medical History: ${records.filter(r => r.patientId === currentUser.id).slice(0, 3).map(r => r.title).join(', ')}.`;

  // Patient Views
  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard user={currentUser} onChangeView={setCurrentView} />;
      case AppView.RECORDS:
        // Filter records for the logged-in patient
        const patientRecords = records.filter(r => r.patientId === currentUser.id);
        return <Records records={patientRecords} onRequestRefill={handleRefillRequest} />;
      case AppView.CONSULTATION:
        return <Services type="CONSULTATION" onBookAppointment={handleBookAppointment} />;
      case AppView.PHARMACY:
        return <Services type="PHARMACY" />;
      case AppView.DIAGNOSTICS:
        return <Services type="DIAGNOSTICS" />;
      case AppView.AMBULANCE:
        return <Ambulance />;
      case AppView.AI_ASSISTANT:
        return <AIHealthAssistant userContext={userContextString} />;
      case AppView.WELLNESS:
        return <Wellness user={currentUser} />;
      case AppView.PROFILE:
        return <Profile user={currentUser} onUpdateUser={handleUpdateUser} />;
      default:
        return <Dashboard user={currentUser} onChangeView={setCurrentView} />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onChangeView={setCurrentView}
      user={currentUser}
      onLogout={handleLogout}
    >
      {renderView()}
    </Layout>
  );
};

export default App;