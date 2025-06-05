// src/components/cards/ResearchAdoptionCard.js
import React from 'react';
import { Lightbulb, Building, Users, TrendingUp, Star, CheckCircle, DollarSign, Target } from 'lucide-react';

const ResearchAdoptionCard = ({ adoption, onClick }) => {
  const getAdaptationTypeColor = (type) => {
    switch(type) {
      case 'Direct Implementation': return 'bg-green-100 text-green-800';
      case 'Modified Implementation': return 'bg-blue-100 text-blue-800';
      case 'Inspired Implementation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrganizationTypeIcon = (type) => {
    switch(type) {
      case 'Private Company': return '🏢';
      case 'State-Owned Enterprise': return '🏛️';
      case 'Regional Bank': return '🏦';
      case 'Cooperative': return '🤝';
      case 'Government Agency': return '📋';
      default: return '🏢';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-purple-500" onClick={() => onClick(adoption)}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-gray-800 flex-1 mr-2 line-clamp-2">{adoption.researchTitle}</h3>
        <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
          IKU 5 - Research Adoption
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">{adoption.researchers.join(', ')}</span>
        </div>
        <div className="flex items-center">
          <Building className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">{adoption.totalAdoptions} adopting organizations</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-purple-600">{adoption.totalAdoptions}</div>
          <div className="text-xs text-gray-500">Total Adoptions</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">{adoption.adoptionRate}</div>
          <div className="text-xs text-gray-500">Success Rate</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Recent Adoptions:</h4>
        <div className="space-y-2">
          {adoption.adoptingOrganizations?.slice(0, 2).map((org, i) => (
            <div key={i} className="border border-gray-200 rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center">
                  <span className="mr-2">{getOrganizationTypeIcon(org.type)}</span>
                  <p className="font-medium text-sm text-gray-800">{org.name}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getAdaptationTypeColor(org.adaptationType)}`}>
                  {org.adaptationType}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{org.sector} • {new Date(org.adoptionDate).toLocaleDateString('id-ID')}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-600">{org.implementationScale}</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{org.satisfaction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-green-800 mb-1 text-sm">Impact Summary:</h4>
        <p className="text-sm text-green-700 mb-1"><strong>Economic:</strong> {adoption.economicImpact}</p>
        <p className="text-sm text-green-700"><strong>Social:</strong> {adoption.socialImpact}</p>
        <p className="text-xs text-green-600 mt-1">Beneficiaries: {adoption.totalBeneficiaries}</p>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
          <TrendingUp className="h-4 w-4 mr-1" />
          Impact Report
        </button>
      </div>
    </div>
  );
};

export default ResearchAdoptionCard;