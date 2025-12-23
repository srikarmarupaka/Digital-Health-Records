import React, { useState } from 'react';
import { MOCK_MEDICINES, MOCK_TESTS, MOCK_DOCTORS, MOCK_HOSPITALS } from '../constants';
import { Pill, Check, Video, Calendar, Star, MapPin, Building2, Stethoscope, Clock, AlertCircle } from 'lucide-react';
import { Doctor } from '../types';

interface ServicesProps {
  type: 'PHARMACY' | 'DIAGNOSTICS' | 'CONSULTATION';
  onBookAppointment?: (doctorId: string, date: string, time: string, reason: string) => void;
}

const Services: React.FC<ServicesProps> = ({ type, onBookAppointment }) => {
  const [cart, setCart] = useState<string[]>([]);
  const [booked, setBooked] = useState<string[]>([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string | null>(null);
  
  // Booking Modal State
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const toggleCart = (id: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter(i => i !== id));
    } else {
      setCart([...cart, id]);
    }
  };
  
  const toggleBook = (id: string) => {
      if(booked.includes(id)) return;
      setBooked([...booked, id]);
  }

  const handleBookClick = (doctor: Doctor) => {
      setSelectedDoctor(doctor);
      setShowBookingModal(true);
      // Reset form
      setBookingDate('');
      setBookingTime('');
      setBookingReason('');
  };

  const submitBooking = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedDoctor && onBookAppointment) {
          onBookAppointment(selectedDoctor.id, bookingDate, bookingTime, bookingReason);
          setShowBookingModal(false);
          alert(`Appointment booked successfully with ${selectedDoctor.name}!`);
      }
  };

  if (type === 'PHARMACY') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Pharmacy Store</h2>
          <div className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {cart.length} items in cart
          </div>
        </div>
        <p className="text-gray-500">Order medicines linked to your prescriptions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MEDICINES.map((med) => (
            <div key={med.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{med.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{med.requiresPrescription ? 'Rx' : 'OTC'}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{med.dosage}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="font-bold text-lg text-gray-900">${med.price.toFixed(2)}</span>
                <button
                  onClick={() => toggleCart(med.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    cart.includes(med.id)
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {cart.includes(med.id) ? (
                    <>
                      <Check className="w-4 h-4 mr-2" /> Added
                    </>
                  ) : (
                    <>
                      <Pill className="w-4 h-4 mr-2" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'DIAGNOSTICS') {
    return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Diagnostic Labs</h2>
        </div>
        <p className="text-gray-500">Book home sample collection or lab visits.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {MOCK_TESTS.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg mb-1">{test.name}</h3>
                <p className="text-sm text-gray-500 mb-2">Report in: {test.tat}</p>
                <span className="font-bold text-gray-900">${test.price}</span>
              </div>
              <button
                 onClick={() => toggleBook(test.id)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    booked.includes(test.id) 
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {booked.includes(test.id) ? 'Booked' : 'Book Test'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Consultation View (Hospitals & Doctors)
  const displayedDoctors = selectedHospitalId 
    ? MOCK_DOCTORS.filter(d => d.hospitalId === selectedHospitalId)
    : MOCK_DOCTORS;

  return (
    <div className="space-y-8 relative">
      {/* Booking Modal Overlay */}
      {showBookingModal && selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="bg-blue-600 p-6 text-white">
                      <h3 className="text-xl font-bold">Book Appointment</h3>
                      <p className="text-blue-100 text-sm">with {selectedDoctor.name}</p>
                  </div>
                  <form onSubmit={submitBooking} className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                              <input 
                                type="date" 
                                required
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                              />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                              <input 
                                type="time" 
                                required
                                className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                              />
                          </div>
                      </div>
                      <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit / Symptoms</label>
                           <textarea 
                              required
                              rows={3}
                              className="w-full border-gray-300 rounded-lg focus:ring-blue-500"
                              placeholder="Describe your symptoms..."
                              value={bookingReason}
                              onChange={(e) => setBookingReason(e.target.value)}
                           />
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg flex items-start text-sm text-blue-800">
                          <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <p>Your medical history will be shared with the doctor upon confirmation.</p>
                      </div>
                      <div className="flex gap-3 pt-2">
                           <button 
                              type="button" 
                              onClick={() => setShowBookingModal(false)}
                              className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg"
                           >
                               Cancel
                           </button>
                           <button 
                              type="submit" 
                              className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-sm"
                           >
                               Confirm Booking
                           </button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Care</h2>
          
          {/* Hospital Filter / List */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-600" />
                Browse Hospitals & Departments
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                <button
                    onClick={() => setSelectedHospitalId(null)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl border transition-all ${
                        selectedHospitalId === null 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                    }`}
                >
                    All Hospitals
                </button>
                {MOCK_HOSPITALS.map(hospital => (
                    <button
                        key={hospital.id}
                        onClick={() => setSelectedHospitalId(hospital.id)}
                        className={`flex-shrink-0 w-72 text-left rounded-xl border transition-all overflow-hidden snap-center ${
                             selectedHospitalId === hospital.id
                             ? 'ring-2 ring-blue-500 border-transparent shadow-lg'
                             : 'bg-white border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        <div className="h-24 bg-gray-200 relative">
                            <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                                <span className="text-white font-bold text-sm">{hospital.name}</span>
                            </div>
                        </div>
                        <div className="p-3 bg-white">
                             <p className="text-xs text-gray-500 flex items-center mb-2">
                                <MapPin className="w-3 h-3 mr-1" /> {hospital.address}
                             </p>
                             <div className="flex flex-wrap gap-1">
                                 {hospital.departments.slice(0, 3).map(dept => (
                                     <span key={dept} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                         {dept}
                                     </span>
                                 ))}
                             </div>
                        </div>
                    </button>
                ))}
            </div>
          </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
             <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
             Available Doctors {selectedHospitalId && `at ${MOCK_HOSPITALS.find(h => h.id === selectedHospitalId)?.name}`}
        </h3>
        
        {displayedDoctors.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl">
                <p className="text-gray-500">No doctors currently available matching criteria.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedDoctors.map((doc: Doctor) => (
                    <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                                    <p className="text-sm text-blue-600 font-medium">{doc.specialty}</p>
                                    <div className="flex items-center text-xs text-amber-500 mt-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="ml-1 text-gray-600">{doc.rating} • {doc.available ? 'Available Today' : 'Next: Mon'}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-4 flex items-center">
                                <Building2 className="w-3 h-3 mr-1" />
                                {doc.hospitalName}
                            </p>
                            <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                                    <Video className="w-4 h-4 mr-2" />
                                    Video
                                </button>
                                <button 
                                    onClick={() => handleBookClick(doc)}
                                    className="flex-1 flex items-center justify-center py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                                >
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Book
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Services;