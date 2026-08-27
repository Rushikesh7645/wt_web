import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events', error);
        setError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="container mx-auto py-8 text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-center text-red-600">{error}</div>;
  }

  if (!events.length) {
    return <div className="container mx-auto py-8 text-center text-gray-600">No events available yet.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id || event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            {event.image && <img src={`/${event.image}`} alt={event.title} className="w-full h-48 object-cover mb-4 rounded" />}
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-3 text-sm">{event.description.substring(0, 100)}...</p>
            <div className="space-y-1 mb-4">
              <p className="text-sm"><strong>📅 Date:</strong> {new Date(event.date).toDateString()}</p>
              <p className="text-sm"><strong>📍 Venue:</strong> {event.venue}</p>
              <p className="text-sm"><strong>🏷️ Category:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{event.category}</span></p>
              <p className="text-sm"><strong>👥 Participants:</strong> {event.maxParticipants}</p>
            </div>
            <Link to={`/events/${event._id || event.id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;