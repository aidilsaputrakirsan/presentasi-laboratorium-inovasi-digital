// src/components/cards/ResearchCollaborationCard.js
import React from 'react';
import { Users, Building2, DollarSign, Target, Calendar, FileText, Globe, TrendingUp } from 'lucide-react';

const ResearchCollaborationCard = ({ collaboration, onClick }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'Riset Multi-Institusi': return 'bg-blue-100 text-blue-800';
      case 'Industri-Akademik': return 'bg-green-100 text-green-800';
      case 'Internasional': return 'bg-purple-100 text-purple-800';
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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-green-500" onClick={() => onClick(collaboration)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{collaboration.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(collaboration.type)}`}>
            {collaboration.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(collaboration.status)}`}>
            {collaboration.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{collaboration.leadFaculty}</span>
        </div>
        <div className="flex items-center mb-2">
          <Building2 className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{collaboration.institutions.join(', ')}</span>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{new Date(collaboration.startDate).toLocaleDateString('id-ID')} - {new Date(collaboration.endDate).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">Rp{(collaboration.funding/1000000).toFixed(0)} Juta</span>
          <span className="text-xs text-gray-500 ml-2">({collaboration.fundingSource})</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2"><strong>Kolaborator:</strong></p>
        <div className="text-sm text-gray-600">
          {collaboration.collaborators.slice(0, 2).join(', ')}
          {collaboration.collaborators.length > 2 && (
            <span className="text-blue-600"> +{collaboration.collaborators.length - 2} lainnya</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-green-600">{collaboration.currentProgress}%</div>
          <div className="text-xs text-gray-500">Progress</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">{collaboration.publications?.length || 0}</div>
          <div className="text-xs text-gray-500">Publikasi</div>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-1 text-sm">Target Outcome:</h4>
        <p className="text-sm text-gray-700">{collaboration.targetOutcome}</p>
      </div>

      {collaboration.siskaRisetId && (
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500">
            SISKA Riset ID: {collaboration.siskaRisetId}
          </div>
          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            IKU 3 - Research Collaboration
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
          Lihat Detail
        </button>
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          View Publications
        </button>
      </div>
    </div>
  );
};

export default ResearchCollaborationCard;