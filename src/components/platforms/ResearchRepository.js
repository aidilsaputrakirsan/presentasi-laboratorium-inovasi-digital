// src/components/platforms/ResearchRepository.js
import React from 'react';
import { 
  FileText, Award, Target, TrendingUp, Plus, Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../shared/StatCard';
import ResearchCard from '../cards/ResearchCard';

const ResearchRepository = ({ 
  researchData, 
  researchMetricsData,
  setSelectedResearch, 
  setShowSubmissionForm 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Karya Ilmiah" value="8" subtitle="Publikasi & Laporan" color="text-green-600" trend="20" />
        <StatCard icon={Award} title="HKI Diproses" value="2" subtitle="Via DJKI" color="text-blue-600" trend="15" />
        <StatCard icon={Target} title="Program PkM" value="5" subtitle="Community Impact" color="text-purple-600" trend="30" />
        <StatCard icon={TrendingUp} title="SINTA Score" value="S2" subtitle="FSTI ITK Ranking" color="text-orange-600" trend="5" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Sistem Dokumentasi Riset FSTI</h3>
          <div className="flex space-x-2">
            <button onClick={() => setShowSubmissionForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Submit Karya Ilmiah
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export SISTER
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {researchData.map((research) => (
            <ResearchCard key={research.id} research={research} onClick={setSelectedResearch} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Riset & Dokumentasi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={researchMetricsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={3} name="Submissions" />
              <Line type="monotone" dataKey="processed" stroke="#3B82F6" strokeWidth={3} name="Processed" />
              <Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={3} name="Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori Karya Ilmiah</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Publikasi Jurnal', value: 5, color: '#10B981' },
                  { name: 'HKI & Paten', value: 2, color: '#3B82F6' },
                  { name: 'Laporan PkM', value: 3, color: '#8B5CF6' },
                  { name: 'Penghargaan', value: 1, color: '#F59E0B' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[
                  { name: 'Publikasi Jurnal', value: 5, color: '#10B981' },
                  { name: 'HKI & Paten', value: 2, color: '#3B82F6' },
                  { name: 'Laporan PkM', value: 3, color: '#8B5CF6' },
                  { name: 'Penghargaan', value: 1, color: '#F59E0B' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Sistem Dokumentasi Riset FSTI</h3>
            <p className="text-green-100 mb-4">Terintegrasi dengan SINTA, SISTER, dan DJKI untuk compliance nasional dengan fokus industri Kalimantan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SISTER</div>
                <div className="text-sm text-green-100">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">SINTA</div>
                <div className="text-sm text-green-100">Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">DJKI</div>
                <div className="text-sm text-green-100">HKI Process</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">LPPM</div>
                <div className="text-sm text-green-100">Approval</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSubmissionForm(true)}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            Submit Karya Ilmiah
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchRepository;