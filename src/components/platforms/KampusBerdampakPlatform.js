// src/components/platforms/KampusBerdampakPlatform.js
import React from 'react';
import { 
  Users, FileText, Award, TrendingUp, Plus, Search, ArrowRight, 
  Globe, BookOpen, Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../shared/StatCard';
import ProjectCard from '../cards/ProjectCard';

const KampusBerdampakPlatform = ({ 
  searchQuery, 
  setSearchQuery, 
  filterProdi, 
  setFilterProdi, 
  filterStatus, 
  setFilterStatus,
  filteredProjects,
  kampusBerdampakProjectsData,
  setSelectedProject,
  setShowApplicationForm,
  setShowPortfolioGenerator
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Mahasiswa Aktif" value="45" subtitle="Peserta Kampus Berdampak" color="text-blue-600" trend="12" />
        <StatCard icon={FileText} title="Proyek Deployed" value="20+" subtitle="Aplikasi Live" color="text-green-600" trend="25" />
        <StatCard icon={Award} title="Sertifikat Diterbitkan" value="12" subtitle="Digital Blockchain" color="text-purple-600" trend="8" />
        <StatCard icon={TrendingUp} title="Tingkat Keberhasilan" value="85%" subtitle="Job Interview Rate" color="text-orange-600" trend="15" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari proyek, mahasiswa, atau teknologi..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={filterProdi} onChange={(e) => setFilterProdi(e.target.value)}>
              <option value="all">Semua Prodi</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Informatika">Informatika</option>
              <option value="Teknik Elektro">Teknik Elektro</option>
              <option value="Bisnis Digital">Bisnis Digital</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">Semua Status</option>
              <option value="Live">Live</option>
              <option value="Development">Development</option>
              <option value="Testing">Testing</option>
              <option value="Research">Research</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => setShowApplicationForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Daftar Kampus Berdampak
          </button>
          <button onClick={() => setShowPortfolioGenerator(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Buat Portfolio
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Sertifikat Digital
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan Proyek & Aplikasi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={kampusBerdampakProjectsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="projects" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="applications" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kategori Proyek Populer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Web Development', value: 8, color: '#3B82F6' },
                  { name: 'Mobile Development', value: 5, color: '#10B981' },
                  { name: 'IoT & Hardware', value: 4, color: '#F59E0B' },
                  { name: 'AI & Machine Learning', value: 3, color: '#8B5CF6' }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[
                  { name: 'Web Development', value: 8, color: '#3B82F6' },
                  { name: 'Mobile Development', value: 5, color: '#10B981' },
                  { name: 'IoT & Hardware', value: 4, color: '#F59E0B' },
                  { name: 'AI & Machine Learning', value: 3, color: '#8B5CF6' }
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Program Kampus Berdampak FSTI</h3>
            <p className="text-blue-100 mb-4">Magang 3-6 bulan dengan proyek industri Kalimantan dan mentoring intensif</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-blue-100">Slot Tersedia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-blue-100">Mentor Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">90%</div>
                <div className="text-sm text-blue-100">Job Placement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.7/5</div>
                <div className="text-sm text-blue-100">Rating Alumni</div>
              </div>
            </div>
          </div>
          <button onClick={() => setShowApplicationForm(true)} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center">
            <ArrowRight className="h-4 w-4 mr-2" />
            Daftar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default KampusBerdampakPlatform;