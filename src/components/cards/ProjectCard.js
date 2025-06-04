// src/components/cards/ProjectCard.js
import React from 'react';
import { Clock, Globe, Eye, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Testing': return 'bg-yellow-100 text-yellow-800';
      case 'Research': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 cursor-pointer transform hover:scale-102" onClick={() => onClick(project)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 flex-1 mr-2">{project.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Oleh: <span className="font-medium">{project.student}</span></p>
        <p className="text-xs text-gray-500 mb-2">{project.prodi} • Angkatan {project.angkatan}</p>
        
        <div className="flex items-center mb-2">
          <Clock className="h-3 w-3 text-gray-400 mr-1" />
          <span className="text-xs text-gray-500">Durasi: {project.timeline.duration}</span>
          <div className="ml-auto">
            <div className="flex items-center">
              <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{project.progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 3).map((tech, i) => (
          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{tech}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{project.tech.length - 3}</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          <Globe className="h-4 w-4 mr-1" />
          {project.url}
        </button>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Eye className="h-4 w-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ExternalLink className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;