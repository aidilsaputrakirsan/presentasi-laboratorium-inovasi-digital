// src/components/cards/IndustryConsultationCard.js
import React from 'react';
import { Building, User, DollarSign, Clock, Star, Target, CheckCircle, FileText } from 'lucide-react';

const IndustryConsultationCard = ({ consultation, onClick }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'Konsultasi Teknologi': return 'bg-blue-100 text-blue-800';
      case 'Konsultasi Strategis': return 'bg-purple-100 text-purple-800';
      case 'Konsultasi Implementasi': return 'bg-green-100 text-green-800';
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

  const getIndustryIcon = (industry) => {
    switch(industry) {
      case 'Pertanian': return '🌾';
      case 'Minyak & Gas': return '⚡';
      case 'Perbankan': return '🏦';
      case 'Manufaktur': return '🏭';
      default: return '🏢';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-orange-500" onClick={() => onClick(consultation)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{consultation.projectTitle}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(consultation.type)}`}>
            {consultation.type}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
            {consultation.status}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Building className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{consultation.clientCompany}</span>
          <span className="text-sm ml-2">{getIndustryIcon(consultation.industry)}</span>
        </div>
        <div className="flex items-center mb-2">
          <User className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{consultation.consultantName}</span>
        </div>
        <div className="flex items-center mb-2">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{consultation.duration} • {new Date(consultation.startDate).toLocaleDateString('id-ID')} - {new Date(consultation.endDate).toLocaleDateString('id-ID')}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">Rp{(consultation.totalValue/1000000).toFixed(0)} Juta</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2"><strong>Keahlian:</strong></p>
        <div className="flex flex-wrap gap-1">
          {consultation.expertise.slice(0, 3).map((skill, i) => (
            <span key={i} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">{skill}</span>
          ))}
          {consultation.expertise.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{consultation.expertise.length - 3}</span>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Deliverables:</h4>
        <div className="space-y-1">
          {consultation.deliverables.slice(0, 2).map((deliverable, i) => (
            <div key={i} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
              <span>{deliverable}</span>
            </div>
          ))}
          {consultation.deliverables.length > 2 && (
            <div className="text-xs text-gray-500">+{consultation.deliverables.length - 2} deliverables lainnya</div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-blue-800 mb-1 text-sm">Outcomes:</h4>
        <p className="text-sm text-blue-700">{consultation.outcomes}</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600">Kepuasan: {consultation.clientSatisfaction}/5.0</span>
        </div>
        <div className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
          IKU 3 - Industry Consultation
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
          Lihat Detail
        </button>
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          View Contract
        </button>
      </div>
    </div>
  );
};

export default IndustryConsultationCard;