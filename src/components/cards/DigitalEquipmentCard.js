// src/components/cards/DigitalEquipmentCard.js
import React from 'react';
import { Monitor, Printer, Cpu, HardDrive, MapPin, Calendar, User, FileText, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const DigitalEquipmentCard = ({ equipment, onClick }) => {
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Computing': return Monitor;
      case 'Prototyping': return Printer;
      case 'IoT Development': return Cpu;
      case 'Testing Equipment': return HardDrive;
      default: return Monitor;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Order': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Available': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'In Use': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Maintenance': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Out of Order': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConditionColor = (condition) => {
    switch(condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getWarrantyStatus = (warrantyExpiry) => {
    const today = new Date();
    const expiry = new Date(warrantyExpiry);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { status: 'Expired', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (daysLeft < 90) return { status: 'Expiring Soon', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'Valid', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

  const CategoryIcon = getCategoryIcon(equipment.category);
  const warrantyInfo = getWarrantyStatus(equipment.warrantyExpiry);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-purple-500" onClick={() => onClick(equipment)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <CategoryIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{equipment.name}</h3>
            <p className="text-sm text-gray-600">{equipment.brand}</p>
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs mt-1">
              {equipment.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="flex items-center">
            {getStatusIcon(equipment.status)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ml-1 ${getStatusColor(equipment.status)}`}>
              {equipment.status}
            </span>
          </div>
          <span className={`text-xs font-medium ${getConditionColor(equipment.condition)}`}>
            {equipment.condition} Condition
          </span>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-gray-50 p-3 rounded-lg mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Specifications:</h4>
        <p className="text-sm text-gray-700">{equipment.specs}</p>
      </div>

      {/* Assignment Info */}
      {equipment.assignedTo && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <h4 className="font-medium text-blue-800 mb-2 text-sm">Currently Assigned:</h4>
          <div className="flex items-center mb-1">
            <User className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-700 font-medium">{equipment.assignedTo}</span>
          </div>
          {equipment.assignedProject && (
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm text-blue-700">{equipment.assignedProject}</span>
            </div>
          )}
        </div>
      )}

      {/* Location */}
      <div className="flex items-center mb-3">
        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-600">{equipment.location}</span>
      </div>

      {/* Financial & Administrative Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-xs text-gray-500">Value</span>
          </div>
          <div className="text-sm font-bold text-gray-800">
            Rp{(equipment.value/1000000).toFixed(1)}M
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-xs text-gray-500">Purchase</span>
          </div>
          <div className="text-sm font-bold text-gray-800">
            {new Date(equipment.purchaseDate).getFullYear()}
          </div>
        </div>
      </div>

      {/* Warranty Status */}
      <div className={`p-3 rounded-lg mb-4 ${warrantyInfo.bgColor}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">Warranty Status</span>
          <span className={`text-sm font-bold ${warrantyInfo.color}`}>
            {warrantyInfo.status}
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          Expires: {new Date(equipment.warrantyExpiry).toLocaleDateString('id-ID')}
        </div>
      </div>

      {/* Serial Number */}
      <div className="bg-gray-50 p-2 rounded mb-4">
        <div className="text-xs text-gray-500">Serial Number</div>
        <div className="text-sm font-mono text-gray-700">{equipment.serialNumber}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {equipment.status === 'Available' ? (
          <>
            <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
              Reserve
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </>
        ) : equipment.status === 'In Use' ? (
          <>
            <button className="flex-1 bg-gray-400 text-white py-2 px-3 rounded-lg text-sm font-medium cursor-not-allowed" disabled>
              In Use
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Check Status
            </button>
          </>
        ) : (
          <>
            <button className="flex-1 bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
              Schedule Repair
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Report Issue
            </button>
          </>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>ID: {equipment.id.toString().padStart(3, '0')}</span>
          <span className="text-green-600">• Lab Inovasi Digital</span>
        </div>
      </div>
    </div>
  );
};

export default DigitalEquipmentCard;