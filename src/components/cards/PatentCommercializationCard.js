// src/components/cards/PatentCommercializationCard.js
import React from 'react';
import { Award, Building, DollarSign, TrendingUp, Calendar, Users, Target, Zap } from 'lucide-react';

const PatentCommercializationCard = ({ patent, onClick }) => {
  const getCommercializationStatusColor = (status) => {
    switch(status) {
      case 'Licensed': return 'bg-green-100 text-green-800';
      case 'In Negotiation': return 'bg-yellow-100 text-yellow-800';
      case 'Pre-Commercial': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLicenseTypeColor = (type) => {
    switch(type) {
      case 'Exclusive License': return 'bg-purple-100 text-purple-800';
      case 'Non-Exclusive License': return 'bg-blue-100 text-blue-800';
      case 'Royalty-Free': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTechnologyIcon = (tech) => {
    if (tech.includes('IoT')) return '📡';
    if (tech.includes('Blockchain')) return '🔗';
    if (tech.includes('AI')) return '🤖';
    if (tech.includes('Software')) return '💻';
    return '⚙️';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-blue-500" onClick={() => onClick(patent)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{patent.patentTitle}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCommercializationStatusColor(patent.commercializationStatus)}`}>
            {patent.commercializationStatus}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Award className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">
            {patent.patentNumber || 'Patent Pending'}
          </span>
          <span className="text-sm ml-2">{getTechnologyIcon(patent.technology)}</span>
        </div>
        <div className="flex items-center mb-2">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{patent.inventors.join(', ')}</span>
        </div>
        {patent.grantDate && (
          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">Granted: {new Date(patent.grantDate).toLocaleDateString('id-ID')}</span>
          </div>
        )}
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{patent.industry}</span>
        </div>
      </div>

      {patent.licensee && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <h4 className="font-medium text-blue-800 mb-1 text-sm">License Agreement:</h4>
          <p className="text-sm text-blue-700 mb-1"><strong>Licensee:</strong> {patent.licensee}</p>
          {patent.licenseType && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${getLicenseTypeColor(patent.licenseType)}`}>
              {patent.licenseType}
            </span>
          )}
          {patent.licenseDuration && (
            <p className="text-xs text-blue-600 mt-1">Duration: {patent.licenseDuration}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-green-600">Rp{(patent.totalRevenue/1000000).toFixed(0)} Juta</div>
          <div className="text-xs text-gray-500">Total Revenue</div>
        </div>
        <div>
          <div className="text-lg font-bold text-blue-600">Rp{(patent.projectedRevenue/1000000).toFixed(0)} Juta</div>
          <div className="text-xs text-gray-500">Projected</div>
        </div>
      </div>

      {patent.royaltyRate > 0 && (
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Royalty Rate:</span> {patent.royaltyRate}%
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">TRL:</span> {patent.technologyReadinessLevel}/9
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-1 text-sm">Implementation Status:</h4>
        <p className="text-sm text-gray-700">{patent.implementationStatus}</p>
        <p className="text-xs text-gray-600 mt-1">Market: {patent.marketPotential}</p>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-xs text-gray-500">
          Team: {patent.commercializationTeam}
        </div>
        <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          IKU 5 - Patent Commercialization
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          Revenue Analytics
        </button>
      </div>
    </div>
  );
};

export default PatentCommercializationCard;