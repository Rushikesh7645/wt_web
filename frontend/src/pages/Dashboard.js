import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [showRegistrations, setShowRegistrations] = useState(false);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdminData();
    } else {
      fetchStudentData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const { data: eventsData } = await api.get('/events');
      setEvents(eventsData);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async () => {
    try {
      const { data: certData } = await api.get('/registrations/certificates');
      setCertificates(certData);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${eventId}`);
        toast.success('Event deleted successfully');
        fetchAdminData();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleViewRegistrations = async (event) => {
    setSelectedEvent(event);
    setLoadingRegistrations(true);
    setShowRegistrations(true);
    
    try {
      const { data } = await api.get(`/registrations/event/${event._id}`);
      setRegistrations(data);
    } catch (error) {
      toast.error('Failed to fetch registrations');
      setShowRegistrations(false);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const closeRegistrationsModal = () => {
    setShowRegistrations(false);
    setSelectedEvent(null);
    setRegistrations([]);
  };

  if (!user) return <div className="text-center py-8">Please login</div>;

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      {user.role === 'admin' ? (
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Manage Events</h2>
              <Link to="/create-event" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                + Create Event
              </Link>
            </div>
            
            {events.length === 0 ? (
              <p className="text-gray-600">No events created yet. Create your first event!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    {event.image && <img src={`/${event.image}`} alt={event.title} className="w-full h-40 object-cover mb-4 rounded" />}
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.description.substring(0, 80)}...</p>
                    
                    <div className="space-y-1 mb-4 text-sm">
                      <p><strong>📅 Date:</strong> {new Date(event.date).toDateString()}</p>
                      <p><strong>🏷️ Category:</strong> {event.category}</p>
                      <p><strong>👥 Max:</strong> {event.maxParticipants} participants</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewRegistrations(event)}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                      >
                        View Registrations
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event._id)}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">My Certificates</h2>
          
          {certificates.length === 0 ? (
            <div className="bg-blue-50 p-8 rounded-lg text-center">
              <p className="text-gray-700 mb-4">No certificates yet. Register for events and attend them to earn certificates!</p>
              <Link to="/events" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-blue-600">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                      {cert.type === 'winner' ? '🏆 Winner' : '✅ Participation'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3"><strong>Certificate ID:</strong> {cert.certificateId}</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>Issued:</strong> {new Date(cert.issuedAt).toDateString()}</p>
                  <a 
                    href={`/${cert.filePath}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full inline-block text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    📥 Download Certificate
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Registrations Modal */}
      {showRegistrations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                Registrations for {selectedEvent?.title}
              </h3>
              <button 
                onClick={closeRegistrationsModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {loadingRegistrations ? (
              <div className="text-center py-8">Loading registrations...</div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-8 text-gray-600">
                No registrations yet for this event.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  Total Registrations: {registrations.length}
                </div>
                <div className="grid gap-4">
                  {registrations.map((registration) => (
                    <div key={registration._id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-lg">{registration.name}</h4>
                          <p className="text-gray-600">{registration.email}</p>
                          <p className="text-sm text-gray-500">{registration.college}</p>
                          <p className="text-sm text-gray-500">{registration.department}</p>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            registration.attended 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {registration.attended ? '✅ Attended' : '⏳ Registered'}
                          </span>
                          {registration.winner && (
                            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                              🏆 {registration.winner}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500">
                        Registered on: {new Date(registration.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;