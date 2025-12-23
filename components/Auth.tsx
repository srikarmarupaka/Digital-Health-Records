import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, ArrowRight, Loader2, Stethoscope, User, Timer } from 'lucide-react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (role: UserRole) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>('PATIENT');
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = window.setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    setError('');
    setLoading(true);
    // Simulate API call for OTP
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
      setTimer(30); // 30 second cooldown
      // In a real app, this would be sent via SMS
      alert(`Secure Login Code for ${phone}: 123456`);
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456') {
        onLogin(role);
      } else {
        setError('Invalid code. Please try again.');
      }
    }, 1000);
  };

  const resendCode = () => {
    setTimer(30);
    alert(`New Secure Login Code: 123456`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-700 opacity-20 transform -skew-y-12 translate-y-10"></div>
          <div className="relative z-10">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-4 shadow-lg border-2 border-blue-400">
                <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">MediLink AI</h1>
            <p className="text-blue-100 font-medium">Secure Digital Health Records</p>
          </div>
        </div>

        <div className="p-8">
            {/* Role Switcher */}
            <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
                <button 
                    onClick={() => { setRole('PATIENT'); setStep('PHONE'); setError(''); setOtp(''); }}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === 'PATIENT' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <User className="w-4 h-4 mr-2" />
                    Patient
                </button>
                <button 
                    onClick={() => { setRole('DOCTOR'); setStep('PHONE'); setError(''); setOtp(''); }}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-md transition-all duration-200 ${role === 'DOCTOR' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Stethoscope className="w-4 h-4 mr-2" />
                    Doctor
                </button>
            </div>

          {step === 'PHONE' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {role === 'DOCTOR' ? 'Doctor ID or Phone' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder={role === 'PATIENT' ? "+1 (555) 000-0000" : "Enter Doctor ID"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
                  <>
                    {role === 'DOCTOR' ? 'Verify Credentials' : 'Send Secure Code'} <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400 mt-4">
                  <ShieldCheck className="w-3 h-3" />
                  <span>256-bit Encryption Enabled</span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-6">
                <p className="text-gray-600">Enter the 6-digit code sent to</p>
                <p className="font-semibold text-gray-900">{phone}</p>
                <button 
                  type="button" 
                  onClick={() => setStep('PHONE')}
                  className="text-blue-600 text-sm hover:underline mt-1"
                >
                  Change Number
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  One-Time Password
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="block w-full text-center tracking-[0.5em] text-2xl py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono"
                  placeholder="------"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  required
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                 {timer > 0 ? (
                     <span className="text-gray-400 flex items-center">
                         <Timer className="w-3 h-3 mr-1" /> Resend in {timer}s
                     </span>
                 ) : (
                     <button type="button" onClick={resendCode} className="text-blue-600 font-medium hover:underline">
                         Resend Code
                     </button>
                 )}
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : `Verify & Access ${role === 'DOCTOR' ? 'Portal' : 'Records'}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;