// src/components/cards/PublicationImpactCard.js
import React from 'react';
import { User, FileText, TrendingUp, Target, ExternalLink, Globe, Award, BarChart3 } from 'lucide-react';

const PublicationImpactCard = ({ faculty, onClick }) => {
  const getQuartileColor = (quartile) => {
    switch(quartile) {
      case 'Q1': return 'bg-green-100 text-green-800';
      case 'Q2': return 'bg-blue-100 text-blue-800';
      case 'Q3': return 'bg-yellow-100 text-yellow-800';
      case 'Q4': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-green-500" onClick={() => onClick(faculty)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{faculty.facultyName}</h3>
            <p className="text-sm text-gray-600">Last updated: {new Date(faculty.lastUpdated).toLocaleDateString('id-ID')}</p>
          </div>
        </div>
        <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
          IKU 5 - Publication Impact
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4 text-center">
        <div>
          <div className="text-lg font-bold text-blue-600">{faculty.totalPublications}</div>
          <div className="text-xs text-gray-500">Publications</div>
        </div>
        <div>
          <div className="text-lg font-bold text-green-600">{faculty.totalCitations}</div>
          <div className="text-xs text-gray-500">Citations</div>
        </div>
        <div>
          <div className="text-lg font-bold text-purple-600">{faculty.hIndex}</div>
          <div className="text-xs text-gray-500">H-Index</div>
        </div>
        <div>
          <div className="text-lg font-bold text-orange-600">{faculty.i10Index}</div>
          <div className="text-xs text-gray-500">i10-Index</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Recent Publications:</h4>
        <div className="space-y-2">
          {faculty.recentPublications?.slice(0, 2).map((pub, i) => (
            <div key={i} className="border border-gray-200 rounded p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm text-gray-800 line-clamp-1">{pub.title}</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getQuartileColor(pub.quartile)}`}>
                  {pub.quartile}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{pub.journal} • {pub.year}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-blue-600">{pub.citations} citations</span>
                <span className="text-gray-500">IF: {pub.impactFactor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Research Profiles:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <Globe className="h-3 w-3 text-blue-500 mr-1" />
            <span>Google Scholar</span>
          </div>
          <div className="flex items-center">
            <Target className="h-3 w-3 text-orange-500 mr-1" />
            <span>Scopus</span>
          </div>
          <div className="flex items-center">
            <Award className="h-3 w-3 text-purple-500 mr-1" />
            <span>SINTA</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-3 w-3 text-green-500 mr-1" />
            <span>ORCID</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
          View Analytics
        </button>
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
          <ExternalLink className="h-4 w-4 mr-1" />
          Profiles
        </button>
      </div>
    </div>
  );
};

export default PublicationImpactCard;