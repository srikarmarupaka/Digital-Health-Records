import React, { useEffect, useState } from 'react';
import { AlertTriangle, MapPin, Phone, CheckCircle2, Navigation } from 'lucide-react';
import { MOCK_HOSPITALS } from '../constants';

const Ambulance: React.FC = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'LOCATING' | 'REQUESTING' | 'DISPATCHED'>('IDLE');
  const [error, setError] = useState('');

  useEffect(() => {
    // Attempt to get location immediately on mount for readiness
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.warn("Location pre-fetch failed", err)
      );
    }
  }, []);

  const handleRequestSOS = () => {
    setStatus('LOCATING');
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setStatus('IDLE');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setStatus('REQUESTING');
        
        // Simulate API Dispatch
        setTimeout(() => {
            setStatus('DISPATCHED');
        }, 2000);
      },
      (err) => {
        setError('Unable to retrieve your location. Please call 911 immediately.');
        setStatus('IDLE');
      }
    );
  };

  if (status === 'DISPATCHED') {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Ambulance Dispatched</h2>
              <p className="text-xl text-gray-600 max-w-md">
                  Help is on the way to your location.
                  <br/>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                      {location?.lat.toFixed(4)}, {location?.lng.toFixed(4)}
                  </span>
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full max-w-md">
                  <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="text-left">
                          <p className="font-semibold">Driver: Mike R.</p>
                          <p className="text-sm text-gray-500">Vehicle: Ambulance #42</p>
                      </div>
                      <div className="flex-1 text-right">
                          <span className="text-lg font-bold text-blue-600">5 min</span>
                      </div>
                  </div>
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" /> Call Driver
                  </button>
              </div>
          </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pt-6">
      <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex p-4 rounded-full bg-red-100 mb-4 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Emergency Ambulance Service</h2>
            <p className="text-gray-600 max-w-md mx-auto">
                Press the SOS button to instantly share your location and request an ambulance to your current coordinates.
            </p>
          </div>

          <div className="relative inline-block">
              <button
                onClick={handleRequestSOS}
                disabled={status !== 'IDLE'}
                className={`w-48 h-48 rounded-full text-white font-bold text-2xl shadow-xl transform transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 ${
                    status === 'IDLE' ? 'bg-gradient-to-br from-red-500 to-red-700 hover:shadow-red-500/50 hover:-translate-y-1' : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {status === 'IDLE' ? 'SOS' : status === 'LOCATING' ? 'Locating...' : 'Requesting...'}
              </button>
              {status === 'IDLE' && (
                 <span className="absolute top-0 left-0 w-48 h-48 rounded-full bg-red-500 opacity-20 animate-ping pointer-events-none"></span>
              )}
          </div>

          {error && (
            <div className="max-w-md mx-auto p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
            </div>
          )}

          {location && status === 'IDLE' && (
              <div className="flex items-center justify-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Last known: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </div>
          )}
      </div>

      <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Navigation className="w-6 h-6 mr-2 text-blue-600" />
              Nearest Hospitals
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_HOSPITALS.map(hospital => (
                  <div key={hospital.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                      <div className="relative h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                           <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                           <span className="absolute bottom-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded">
                               {hospital.distance}
                           </span>
                      </div>
                      <h4 className="font-bold text-gray-900">{hospital.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                      <p className="text-xs text-gray-500 mb-4">{hospital.phone}</p>
                      <div className="mt-auto grid grid-cols-2 gap-2">
                           <button className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100">
                               <Phone className="w-3 h-3 mr-1" /> Call
                           </button>
                           <button className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700">
                               <Navigation className="w-3 h-3 mr-1" /> Navigate
                           </button>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Ambulance;