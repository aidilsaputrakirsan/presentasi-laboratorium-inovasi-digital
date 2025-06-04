// src/components/platforms/IndustryCollaboration.js
import React from 'react';
import { 
  Building, FileText, DollarSign, Users, Plus, Download
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../shared/StatCard';
import PartnerCard from '../cards/PartnerCard';

const IndustryCollaboration = ({ 
  industryPartnersData, 
  industryRevenueData,
  setSelectedPartner, 
  setShowPartnershipForm 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Building} title="Mitra Aktif" value="3" subtitle="Active Partners" color="text-orange-600" trend="15" />
        <StatCard icon={FileText} title="Program Kolaborasi" value="7" subtitle="Ongoing Programs" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Nilai Kolaborasi" value="Rp120 Juta" subtitle="Program Kerjasama" color="text-green-600" trend="25" />
        <StatCard icon={Users} title="Mahasiswa Terlibat" value="20" subtitle="Magang & Program" color="text-purple-600" trend="30" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Mitra Industri Kalimantan & Program Kerjasama</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowPartnershipForm(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajukan Kerjasama
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Laporan MoU
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {industryPartnersData.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} onClick={setSelectedPartner} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan Kolaborasi & Program</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={industryRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="collaboration" stroke="#F97316" fill="#F97316" fillOpacity={0.6} />
              <Area type="monotone" dataKey="programs" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Program Kolaborasi per Partner</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={industryPartnersData.slice(0, 3)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="activePrograms" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Platform Kerjasama Industri Kalimantan</h3>
            <p className="text-orange-100 mb-4">Membangun ekosistem kolaborasi FSTI-industri Kalimantan yang berkelanjutan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">MoU</div>
                <div className="text-sm text-orange-100">Based Partnership</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">20</div>
                <div className="text-sm text-orange-100">Students Involved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-orange-100">Active Programs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-orange-100">Partnership Success</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowPartnershipForm(true)}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
          >
            Ajukan Kerjasama
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryCollaboration;