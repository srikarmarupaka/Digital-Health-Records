import React, { useState } from 'react';
import { HealthRecord } from '../types';
import { FileText, Calendar, User, Sparkles, ChevronDown, ChevronUp, MapPin, Pill, RefreshCw, CheckCircle2 } from 'lucide-react';
import { analyzeHealthRecord } from '../services/geminiService';

interface RecordsProps {
  records: HealthRecord[];
  onRequestRefill?: (recordId: string) => void;
}

const Records: React.FC<RecordsProps> = ({ records, onRequestRefill }) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRESCRIPTIONS'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [loadingAnalysis, setLoadingAnalysis] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAnalyze = async (record: HealthRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiAnalysis[record.id]) return; // Already analyzed

    setLoadingAnalysis(prev => ({ ...prev, [record.id]: true }));
    const analysis = await analyzeHealthRecord(record);
    setAiAnalysis(prev => ({ ...prev, [record.id]: analysis }));
    setLoadingAnalysis(prev => ({ ...prev, [record.id]: false }));
  };

  const handleRefillClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onRequestRefill) onRequestRefill(id);
  };

  const filteredRecords = activeTab === 'ALL' 
    ? records 
    : records.filter(r => r.type === 'Prescription');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Health Records</h2>
            <p className="text-gray-500 text-sm">Manage your medical history and prescriptions</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'ALL' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
                All Records
            </button>
            <button 
                onClick={() => setActiveTab('PRESCRIPTIONS')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'PRESCRIPTIONS' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Prescriptions
            </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
           <div className="text-center py-12 bg-gray-50 rounded-xl">
               <p className="text-gray-500">No records found in this category.</p>
           </div>
        ) : (
            filteredRecords.map((record) => (
            <div 
                key={record.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
            >
                <div 
                onClick={() => toggleExpand(record.id)}
                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                >
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                    record.type === 'Prescription' ? 'bg-green-100 text-green-600' :
                    record.type === 'Diagnosis' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                    }`}>
                        {record.type === 'Prescription' ? <Pill className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                    </div>
                    <div>
                    <h3 className="font-semibold text-gray-900">{record.title}</h3>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-3">
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {record.date}</span>
                        <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {record.doctor}</span>
                        {record.type === 'Prescription' && record.status && (
                             <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                                 record.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 
                                 record.status === 'Refill Requested' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                 'bg-gray-50 text-gray-600 border-gray-200'
                             }`}>
                                 {record.status}
                             </span>
                        )}
                    </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                     {record.type === 'Prescription' && record.status === 'Active' && (
                        <button 
                            onClick={(e) => handleRefillClick(e, record.id)}
                            className="hidden sm:flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Refill
                        </button>
                    )}
                    <button 
                    onClick={(e) => handleAnalyze(record, e)}
                    className="hidden sm:flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full hover:bg-indigo-100 transition-colors"
                    >
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Summary
                    </button>
                    {expandedId === record.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>
                </div>

                {expandedId === record.id && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                             <MapPin className="w-3 h-3 mr-1" />
                             {record.hospital}
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Original Details</h4>
                        <p className="text-sm text-gray-600 mb-2">{record.summary}</p>
                        <p className="text-sm text-gray-600 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-gray-200 shadow-sm">{record.details}</p>
                        
                        {record.type === 'Prescription' && (
                            <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">Refills Remaining:</span>
                                    <span className="text-sm font-bold text-gray-900">{record.refillsRemaining ?? 0}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(((record.refillsRemaining || 0) / 5) * 100, 100)}%` }}></div>
                                </div>
                                {record.status === 'Refill Requested' && (
                                    <div className="mt-2 text-xs text-amber-600 flex items-center">
                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Refill request sent to pharmacy.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-indigo-900 flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
                                AI Insights
                            </h4>
                            {!aiAnalysis[record.id] && !loadingAnalysis[record.id] && (
                                <button 
                                    onClick={(e) => handleAnalyze(record, e)}
                                    className="text-xs text-indigo-600 underline"
                                >
                                    Generate
                                </button>
                            )}
                        </div>
                        
                        {loadingAnalysis[record.id] ? (
                            <div className="space-y-2 animate-pulse">
                                <div className="h-4 bg-indigo-50 rounded w-3/4"></div>
                                <div className="h-4 bg-indigo-50 rounded w-full"></div>
                                <div className="h-4 bg-indigo-50 rounded w-5/6"></div>
                            </div>
                        ) : aiAnalysis[record.id] ? (
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {aiAnalysis[record.id]}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400 italic">
                                Click 'Generate' to get a simplified explanation of this record using Gemini AI.
                            </p>
                        )}
                    </div>
                    </div>
                </div>
                )}
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Records;