// src/components/cards/ExternalTeachingCard.js
import React from 'react';
import { School, Star, MapPin, Calendar, Clock, Users, DollarSign } from 'lucide-react';

const ExternalTeachingCard = ({ teaching, onClick }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'Dosen Tamu': return 'bg-blue-100 text-blue-800';
      case 'Profesor Tamu': return 'bg-purple-100 text-purple-800';
      case 'Koordinator Mata Kuliah': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Aktif': return 'bg-green-50 text-green-700';
      case 'Selesai': return 'bg-blue-50 text-blue-700';
      case 'Direncanakan': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-purple-500" onClick={() => onClick(teaching)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2">{teaching.course}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(teaching.type)}`}>
            {teaching.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teaching.status)}`}>
            {teaching.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <School className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{teaching.institution}</span>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{teaching.location}</span>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{teaching.semester}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{new Date(teaching.startDate).toLocaleDateString('id-ID')} - {new Date(teaching.endDate).toLocaleDateString('id-ID')}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-purple-600">{teaching.sks}</div>
          <div className="text-xs text-gray-500">SKS</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">{teaching.students}</div>
          <div className="text-xs text-gray-500">Mahasiswa</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">Rp{(teaching.honorarium/1000000).toFixed(0)} Juta</div>
          <div className="text-xs text-gray-500">Honorarium</div>
        </div>
      </div>

      {teaching.evaluation && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm text-gray-600">Evaluasi: {teaching.evaluation}/5.0</span>
          </div>
          <div className="text-xs text-gray-500">
            IKU 3 - External Teaching
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          Lihat Detail
        </button>
        {teaching.certificateUrl && (
          <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Download Sertifikat
          </button>
        )}
      </div>
    </div>
  );
};

export default ExternalTeachingCard;