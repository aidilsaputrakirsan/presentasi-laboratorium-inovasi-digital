// src/components/cards/EventCard.js
import React from 'react';
import { Calendar, MapPin, User, Users, Star } from 'lucide-react';

const EventCard = ({ event, onClick }) => {
  const getEventTypeColor = (type) => {
    switch(type) {
      case 'Seminar': return 'bg-blue-100 text-blue-800';
      case 'Workshop': return 'bg-green-100 text-green-800';
      case 'Kompetisi': return 'bg-purple-100 text-purple-800';
      case 'Networking': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-50 text-green-700';
      case 'Upcoming': return 'bg-blue-50 text-blue-700';
      case 'Ongoing': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(event)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2">{event.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
            {event.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('id-ID')} • {event.time}</span>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{event.venue}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{event.speaker}</span>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{event.description}</p>

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">{event.participants}/{event.capacity} peserta</span>
        </div>
        {event.feedback > 0 && (
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">{event.feedback}/5.0</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {event.topics.slice(0, 3).map((topic, i) => (
          <span key={i} className="px-2 py-1 bg-pink-50 text-pink-700 rounded text-xs">{topic}</span>
        ))}
        {event.topics.length > 3 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{event.topics.length - 3}</span>
        )}
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
          Lihat Detail
        </button>
        {event.status === 'Upcoming' && (
          <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Daftar Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;