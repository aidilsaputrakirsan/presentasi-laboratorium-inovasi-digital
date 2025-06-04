// src/components/cards/ResearchCard.js
import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';

const ResearchCard = ({ research, onClick }) => {
  const getTypeColor = (type) => {
    switch(type) {
      case 'Publikasi': return 'bg-blue-100 text-blue-800';
      case 'HKI': return 'bg-purple-100 text-purple-800';
      case 'PkM': return 'bg-green-100 text-green-800';
      case 'Penghargaan': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Published': return 'bg-green-50 text-green-700';
      case 'Dalam Proses DJKI': return 'bg-orange-50 text-orange-700';
      case 'Completed': return 'bg-blue-50 text-blue-700';
      case 'Received': return 'bg-purple-50 text-purple-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 cursor-pointer" onClick={() => onClick(research)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 flex-1 mr-2 line-clamp-2">{research.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(research.type)}`}>
          {research.type}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">Authors: {research.authors.join(', ')}</p>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500">Tahun: {research.year}</span>
        {research.sintaScore && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">SINTA {research.sintaScore}</span>
        )}
        {research.sisterEntry && (
          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">SISTER</span>
        )}
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(research.status)}`}>
          {research.status}
        </span>
      </div>

      {research.funding && (
        <div className="mb-2">
          <span className="text-xs text-gray-500">Funding: </span>
          <span className="text-xs text-green-700 font-medium">
            {research.funding.split(' - ')[0]}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {research.keywords?.slice(0, 3).map((keyword, i) => (
          <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">{keyword}</span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          Lihat Detail
        </button>
        <div className="flex space-x-2">
          {research.reportUrl && (
            <button className="p-1 hover:bg-gray-100 rounded" title="Download Report">
              <Download className="h-4 w-4 text-gray-500" />
            </button>
          )}
          {(research.googleScholarUrl || research.sintaUrl) && (
            <button className="p-1 hover:bg-gray-100 rounded" title="External Link">
              <ExternalLink className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchCard;