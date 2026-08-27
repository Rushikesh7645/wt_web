import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    department: user?.department || ''
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch event', error);
        setError('Unable to load this event. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post('/registrations', { eventId: id, ...form });
      toast.success('Registration successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  if (loading) return <div className="container mx-auto py-8 text-center">Loading event details...</div>;
  if (error) return <div className="container mx-auto py-8 text-center text-red-600">{error}</div>;
  if (!event) return <div className="container mx-auto py-8 text-center text-gray-600">Event not found.</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {event.image && <img src={`/${event.image}`} alt={event.title} className="w-full h-64 object-cover mb-6" />}
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
        <p><strong>Time:</strong> {event.time}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Max Participants:</strong> {event.maxParticipants}</p>

        {user && (
          <form onSubmit={handleRegister} className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 mb-4 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="College"
              value={form.college}
              onChange={(e) => setForm({ ...form, college: e.target.value })}
              className="w-full p-3 mb-4 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="w-full p-3 mb-4 border rounded"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventDetails;