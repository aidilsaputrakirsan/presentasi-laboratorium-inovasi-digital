// src/components/cards/FacultyCard.js
import React from 'react';
import { Star } from 'lucide-react';

const FacultyCard = ({ faculty, onClick, onCourseInfo }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(faculty)}>
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
        <span className="text-purple-600 font-bold text-lg">
          {faculty.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{faculty.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{faculty.role}</p>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-2">({faculty.rating}/5)</span>
        </div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-2"><strong>Keahlian:</strong></p>
      <div className="flex flex-wrap gap-1">
        {faculty.expertise.slice(0, 3).map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">{skill}</span>
        ))}
        {faculty.expertise.length > 3 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{faculty.expertise.length - 3}</span>
        )}
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-1"><strong>Pengalaman Industri:</strong></p>
      <p className="text-xs text-gray-600">{faculty.industryExp}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
      <div>
        <div className="text-lg font-bold text-purple-600">{faculty.totalSKS}</div>
        <div className="text-xs text-gray-500">Total SKS</div>
      </div>
      <div>
        <div className="text-lg font-bold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</div>
        <div className="text-xs text-gray-500">Honorarium</div>
      </div>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
        Lihat Profil
      </button>
      <button 
        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onCourseInfo(faculty);
        }}
      >
        Info Mata Kuliah
      </button>
    </div>
  </div>
);

export default FacultyCard;