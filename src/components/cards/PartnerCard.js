// src/components/cards/PartnerCard.js
import React from 'react';
import { Building } from 'lucide-react';

const PartnerCard = ({ partner, onClick }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => onClick(partner)}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
          <Building className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{partner.name}</h3>
          <p className="text-sm text-gray-600">{partner.type}</p>
          <p className="text-xs text-gray-500">{partner.location}</p>
        </div>
      </div>
      <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
        Since {partner.established}
      </span>
    </div>

    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
      <div>
        <div className="text-lg font-bold text-orange-600">{partner.activePrograms}</div>
        <div className="text-xs text-gray-500">Program Aktif</div>
      </div>
      <div>
        <div className="text-lg font-bold text-green-600">Rp{(partner.collaborationValue/1000000).toFixed(0)} Juta</div>
        <div className="text-xs text-gray-500">Nilai Kolaborasi</div>
      </div>
      <div>
        <div className="text-lg font-bold text-blue-600">{partner.studentInternships}</div>
        <div className="text-xs text-gray-500">Mahasiswa</div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-2"><strong>Jenis Kolaborasi:</strong></p>
      <div className="flex flex-wrap gap-1">
        {partner.collaborationTypes.slice(0, 2).map((type, i) => (
          <span key={i} className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs">{type}</span>
        ))}
        {partner.collaborationTypes.length > 2 && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">+{partner.collaborationTypes.length - 2}</span>
        )}
      </div>
    </div>

    <div className="mb-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">MoU Status:</span>
        <span className={`text-xs px-2 py-1 rounded ${
          partner.mouStatus === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {partner.mouStatus}
        </span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">Berlaku hingga:</span>
        <span className="text-xs text-gray-600">{new Date(partner.mouExpiry).toLocaleDateString('id-ID')}</span>
      </div>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
        Lihat Program
      </button>
      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        Ajukan Kerjasama
      </button>
    </div>
  </div>
);

export default PartnerCard;