// src/components/cards/ComputingResourceCard.js
import React from 'react';
import { Server, Cpu, HardDrive, MemoryStick, Wifi, Users, MapPin, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ComputingResourceCard = ({ resource, onClick }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Online': return 'bg-green-100 text-green-800';
      case 'High Load': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-blue-100 text-blue-800';
      case 'Offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Online': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'High Load': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'Maintenance': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Offline': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Server className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getUsageTextColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    if (percentage >= 50) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-blue-500" onClick={() => onClick(resource)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Server className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{resource.name}</h3>
            <p className="text-sm text-gray-600">{resource.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(resource.status)}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
            {resource.status}
          </span>
        </div>
      </div>

      {/* Specs Overview */}
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Specifications:</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center">
            <Cpu className="h-3 w-3 mr-2" />
            <span>{resource.specs.cpu}</span>
          </div>
          <div className="flex items-center">
            <MemoryStick className="h-3 w-3 mr-2" />
            <span>{resource.specs.ram}</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="h-3 w-3 mr-2" />
            <span>{resource.specs.storage}</span>
          </div>
          {resource.specs.gpu && (
            <div className="flex items-center">
              <Server className="h-3 w-3 mr-2" />
              <span>GPU: {resource.specs.gpu}</span>
            </div>
          )}
        </div>
      </div>

      {/* Resource Usage */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-3 text-sm">Current Usage:</h4>
        <div className="space-y-3">
          {Object.entries(resource.currentUsage).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center">
                {key === 'cpu' && <Cpu className="h-4 w-4 text-gray-500 mr-2" />}
                {key === 'memory' && <MemoryStick className="h-4 w-4 text-gray-500 mr-2" />}
                {key === 'storage' && <HardDrive className="h-4 w-4 text-gray-500 mr-2" />}
                {key === 'bandwidth' && <Wifi className="h-4 w-4 text-gray-500 mr-2" />}
                <span className="text-sm text-gray-700 capitalize">{key}</span>
              </div>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getUsageColor(value)}`}
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getUsageTextColor(value)} min-w-[2.5rem] text-right`}>
                  {value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Assignment */}
      {resource.assignedProjects && resource.assignedProjects.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Assigned Projects:</h4>
          <div className="space-y-1">
            {resource.assignedProjects.slice(0, 2).map((project, i) => (
              <div key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {project}
              </div>
            ))}
            {resource.assignedProjects.length > 2 && (
              <div className="text-xs text-gray-500">
                +{resource.assignedProjects.length - 2} more projects
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users */}
      {resource.users && resource.users.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Active Users:</span>
          </div>
          <div className="text-sm text-gray-600">
            {resource.users.slice(0, 2).join(', ')}
            {resource.users.length > 2 && (
              <span className="text-blue-600"> +{resource.users.length - 2} others</span>
            )}
          </div>
        </div>
      )}

      {/* Location & Network */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
          <span>{resource.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Wifi className="h-4 w-4 text-gray-400 mr-2" />
          <span>IP: {resource.ipAddress}</span>
        </div>
      </div>

      {/* Maintenance Info */}
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Last Maintenance: {new Date(resource.lastMaintenance).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Next: {new Date(resource.nextMaintenance).toLocaleDateString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Remote Access
        </button>
        <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
          Monitor
        </button>
        <button className="bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          Settings
        </button>
      </div>
    </div>
  );
};

export default ComputingResourceCard;