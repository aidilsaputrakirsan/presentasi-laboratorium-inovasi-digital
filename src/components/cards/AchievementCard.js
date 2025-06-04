// src/components/cards/AchievementCard.js
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const AchievementCard = ({ achievement, onClick }) => {
  const getLevelColor = (level) => {
    switch(level) {
      case 'Internasional': return 'bg-purple-100 text-purple-800';
      case 'Nasional': return 'bg-blue-100 text-blue-800';
      case 'Regional': return 'bg-green-100 text-green-800';
      case 'Institutional': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Prestasi Mahasiswa': return 'bg-blue-50 text-blue-700';
      case 'Prestasi Dosen': return 'bg-purple-50 text-purple-700';
      case 'Prestasi Alumni': return 'bg-green-50 text-green-700';
      case 'Prestasi Tim': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-pink-500" onClick={() => onClick(achievement)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{achievement.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(achievement.level)}`}>
          {achievement.level}
        </span>
      </div>

      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700">{achievement.achiever}</p>
        <p className="text-xs text-gray-500">{achievement.prodi} • {new Date(achievement.date).toLocaleDateString('id-ID')}</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(achievement.type)}`}>
          {achievement.type}
        </span>
        <span className="text-xs text-gray-500">{achievement.organizer}</span>
      </div>

      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{achievement.description}</p>

      {achievement.prize && (
        <div className="bg-yellow-50 p-3 rounded-lg mb-4">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-yellow-800">Penghargaan</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">{achievement.prize}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-pink-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors">
          Lihat Detail
        </button>
        <button className="p-2 hover:bg-gray-100 rounded">
          <ExternalLink className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default AchievementCard;