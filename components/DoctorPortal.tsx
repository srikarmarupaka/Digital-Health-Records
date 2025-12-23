import React, { useState } from 'react';
import { HealthRecord, User } from '../types';
import { Search, User as UserIcon, Calendar, FileText, Plus, Save, Activity } from 'lucide-react';
import { MOCK_USER } from '../constants';

interface DoctorPortalProps {
  user: User; // The doctor
  allRecords: HealthRecord[];
  onAddRecord: (record: HealthRecord) => void;
  onLogout: () => void;
}

const DoctorPortal: React.FC<DoctorPortalProps> = ({ user, allRecords, onAddRecord, onLogout }) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [patient, setPatient] = useState<User | null>(null);
  const [view, setView] = useState<'SEARCH' | 'PATIENT'>('SEARCH');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [newRecordType, setNewRecordType] = useState<HealthRecord['type']>('Prescription');
  const [newRecordTitle, setNewRecordTitle] = useState('');
  const [newRecordSummary, setNewRecordSummary] = useState('');
  const [newRecordDetails, setNewRecordDetails] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, API call. Here we mock finding "Alex Johnson"
    if (searchPhone.includes('555') || searchPhone.length > 3) {
      setPatient(MOCK_USER); // Mock finding the one user we have
      setView('PATIENT');
    } else {
      alert("Patient not found (Try 5550123456)");
    }
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    const newRecord: HealthRecord = {
      id: `r${Date.now()}`,
      patientId: patient.id,
      date: new Date().toISOString().split('T')[0],
      type: newRecordType,
      title: newRecordTitle,
      doctor: user.name,
      hospital: 'City General Hospital', // Derived from Doctor's actual hospital
      summary: newRecordSummary,
      details: newRecordDetails,
    };

    onAddRecord(newRecord);
    setShowAddForm(false);
    // Reset form
    setNewRecordTitle('');
    setNewRecordSummary('');
    setNewRecordDetails('');
  };

  const patientRecords = allRecords.filter(r => r.patientId === patient?.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <div>
                <h1 className="text-xl font-bold text-gray-900">MediLink Doctor Portal</h1>
                <p className="text-xs text-gray-500">Logged in as {user.name}</p>
            </div>
        </div>
        <button onClick={onLogout} className="text-sm text-gray-600 hover:text-red-600 font-medium">
            Sign Out
        </button>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {view === 'SEARCH' ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Lookup</h2>
              <p className="text-gray-500">Enter patient's phone number to view records and prescribe.</p>
            </div>
            
            <form onSubmit={handleSearch} className="w-full max-w-lg relative">
               <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input 
                    type="tel" 
                    placeholder="Patient Phone Number (e.g., 5550123456)"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-lg"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                  />
               </div>
               <button 
                type="submit" 
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
               >
                 Access Patient Records
               </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Patient Header */}
            <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
                        {patient?.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{patient?.name}</h2>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center"><UserIcon className="w-4 h-4 mr-1" /> {patient?.bloodGroup}</span>
                            <span>Ph: {patient?.phoneNumber}</span>
                            <span className="text-red-500">Allergies: {patient?.allergies.join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setView('SEARCH')}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                    >
                        Back to Search
                    </button>
                    <button 
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Record / Prescription
                    </button>
                </div>
            </div>

            {/* Add Record Form */}
            {showAddForm && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 relative">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        New Medical Record
                    </h3>
                    <form onSubmit={handleSaveRecord} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                                <select 
                                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                                    value={newRecordType}
                                    onChange={(e) => setNewRecordType(e.target.value as any)}
                                >
                                    <option value="Prescription">Prescription</option>
                                    <option value="Diagnosis">Diagnosis</option>
                                    <option value="Lab Report">Lab Report</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                                    placeholder="e.g., Viral Fever Treatment"
                                    value={newRecordTitle}
                                    onChange={(e) => setNewRecordTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Short Summary</label>
                             <input 
                                type="text" 
                                required
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                                placeholder="Brief overview for patient dashboard..."
                                value={newRecordSummary}
                                onChange={(e) => setNewRecordSummary(e.target.value)}
                            />
                        </div>
                         <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Notes / Prescription</label>
                             <textarea 
                                required
                                rows={4}
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500 font-mono text-sm"
                                placeholder="Rx: Amoxicillin 500mg - 1 tab TID x 5 days..."
                                value={newRecordDetails}
                                onChange={(e) => setNewRecordDetails(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                             <button 
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 shadow-sm flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save to Patient Record
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Patient History */}
            <div className="grid gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
                {patientRecords.length === 0 ? (
                    <p className="text-gray-500 italic">No previous records found for this patient.</p>
                ) : (
                    patientRecords.map(record => (
                        <div key={record.id} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                                            record.type === 'Prescription' ? 'bg-green-100 text-green-700' :
                                            record.type === 'Diagnosis' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                            {record.type}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" /> {record.date}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-gray-900">{record.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{record.summary}</p>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    <p className="font-medium text-gray-900">{record.doctor}</p>
                                    <p>{record.hospital}</p>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded-lg">
                                {record.details}
                            </div>
                        </div>
                    ))
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPortal;