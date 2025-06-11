// src/components/platforms/FacultyPortal.js - UPDATED untuk Lab Inovasi Digital FSTI ITK
import React, { useState } from 'react';
import { 
  Users, Building, DollarSign, Calendar, Plus, Download, Star,
  RefreshCw, ExternalLink, CheckCircle, Clock, AlertCircle, Database, Linkedin,
  UserCheck, FileText, Award, Briefcase, GraduationCap, School, Target, TrendingUp,
  Lightbulb, Server, Laptop, BarChart3, Settings
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Import updated components for Lab Digital
import InnovationTracker from '../shared/InnovationTracker';
import ComputingResourceCard from '../cards/ComputingResourceCard';
import DigitalEquipmentCard from '../cards/DigitalEquipmentCard';
import ProjectCard from '../cards/ProjectCard';
import PercentageDisplay from '../shared/PercentageDisplay';

// Import data
import { 
  facultyData, 
  facultyActivitiesData, 
  computingResourcesData,
  digitalEquipmentData,
  innovationProjectsData,
  labUtilizationData,
  softwareLicensesData,
  labBookingData,
  projectsData
} from '../../data/sampleData';

const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <svg className="h-3 w-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs text-green-600">+{trend}% dari bulan lalu</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color.replace('text', 'bg').replace('600', '100')}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  </div>
);

const FacultyCard = ({ faculty }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
        <span className="text-purple-600 font-bold text-lg">
          {faculty.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-800">{faculty.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{faculty.role}</p>
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-2">({faculty.rating}/5)</span>
        </div>
        <div className="flex items-center text-xs text-blue-600">
          <Linkedin className="h-3 w-3 mr-1" />
          <span>LinkedIn Verified</span>
        </div>
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-2"><strong>Keahlian:</strong></p>
      <div className="flex flex-wrap gap-1">
        {faculty.expertise.slice(0, 3).map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">{skill}</span>
        ))}
      </div>
    </div>

    <div className="mb-4">
      <p className="text-sm text-gray-700 mb-1"><strong>Pengalaman Industri:</strong></p>
      <p className="text-xs text-gray-600">{faculty.industryExp}</p>
      <p className="text-xs text-blue-600">{faculty.yearsExperience || 8} tahun pengalaman</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
      <div>
        <div className="text-lg font-bold text-purple-600">{faculty.totalSKS}</div>
        <div className="text-xs text-gray-500">Total SKS</div>
      </div>
      <div>
        <div className="text-lg font-bold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</div>
        <div className="text-xs text-gray-500">Honorarium</div>
      </div>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
        Lihat Profil
      </button>
      <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
        Info Mata Kuliah
      </button>
    </div>
  </div>
);

const FacultyPortal = () => {
  const [lastSync, setLastSync] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('success');
  const [syncType, setSyncType] = useState('siakad');
  const [activeTab, setActiveTab] = useState('overview');

  const handleSync = async (type) => {
    setSyncStatus('loading');
    setSyncType(type);
    
    setTimeout(() => {
      setLastSync(new Date());
      setSyncStatus('success');
      
      const messages = {
        siakad: 'Successfully synced teaching schedules and course data from SIAKAD',
        linkedin: 'Updated 3 faculty LinkedIn profiles and industry experience',
        kemendikbud: 'Synchronized with Praktisi Mengajar database - 4 active lecturers',
        manual: 'Manual data validation completed - all profiles verified'
      };
      
      console.log(`🔄 ${type.toUpperCase()} SYNC:`, messages[type]);
      
      if (Math.random() < 0.05) {
        setSyncStatus('error');
        console.log(`❌ ${type.toUpperCase()} ERROR: Connection timeout (simulated)`);
      }
    }, 1200 + Math.random() * 800);
  };

  const getSyncStatusIcon = () => {
    switch(syncStatus) {
      case 'loading': return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate lab metrics for stats
  const totalProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.totalProjects, 0) || 7;
  const onlineResources = computingResourcesData?.filter(r => r.status === 'Online' || r.status === 'High Load').length || 3;
  const availableEquipment = digitalEquipmentData?.filter(e => e.status === 'Available').length || 3;
  const totalEquipment = digitalEquipmentData?.length || 5;

  return (
    <div className="space-y-6 p-6">
      {/* Sync Status */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getSyncStatusIcon()}
              <span className="text-sm font-medium">
                Last sync: {lastSync.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4" />
                <span>SIAKAD</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-1">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-1">
                <GraduationCap className="h-4 w-4" />
                <span>Praktisi Mengajar</span>
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {syncStatus === 'error' && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                Sync failed - check connection
              </span>
            )}
            <div className="flex space-x-1">
              <button 
                onClick={() => handleSync('siakad')}
                disabled={syncStatus === 'loading'}
                className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                title="Sync jadwal mengajar dari SIAKAD"
              >
                <Database className="h-3 w-3 mr-1 inline" />
                SIAKAD
              </button>
              <button 
                onClick={() => handleSync('linkedin')}
                disabled={syncStatus === 'loading'}
                className="bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
                title="Update profil dari LinkedIn"
              >
                <Linkedin className="h-3 w-3 mr-1 inline" />
                LinkedIn
              </button>
              <button 
                onClick={() => handleSync('kemendikbud')}
                disabled={syncStatus === 'loading'}
                className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                title="Sync dengan database Praktisi Mengajar"
              >
                <GraduationCap className="h-3 w-3 mr-1 inline" />
                Kemendikbud
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-800">
            💡 <strong>Lab Inovasi Digital FSTI ITK:</strong> Computing resources • Digital equipment • Innovation projects • Faculty mentoring
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Dosen Praktisi" value="4" subtitle="Active Mentors" color="text-purple-600" trend="15" />
        <StatCard icon={Laptop} title="Digital Projects" value={totalProjects} subtitle="Innovation Projects" color="text-blue-600" trend="20" />
        <StatCard icon={Server} title="Computing Resources" value={onlineResources} subtitle="Online Resources" color="text-green-600" trend="15" />
        <StatCard icon={Settings} title="Lab Equipment" value={`${availableEquipment}/${totalEquipment}`} subtitle="Available Equipment" color="text-orange-600" trend="8" />
      </div>

      {/* Tab Navigation for Lab Digital Features */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Ringkasan Dosen', icon: Users },
            { id: 'innovation-tracker', label: 'Innovation Tracker', icon: Lightbulb },
            { id: 'computing-resources', label: 'Computing Resources', icon: Server },
            { id: 'digital-equipment', label: 'Digital Equipment', icon: Laptop },
            { id: 'project-dashboard', label: 'Project Dashboard', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Dosen Praktisi FSTI ITK</h3>
                <p className="text-sm text-gray-600">Data real-time dari SIAKAD, LinkedIn, dan sistem Praktisi Mengajar</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Dosen
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Laporan
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {facultyData.map((faculty) => (
                <div key={faculty.id} className="relative">
                  <FacultyCard faculty={faculty} />
                  <div className="absolute top-2 right-2 flex flex-col space-y-1">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Database className="h-3 w-3 mr-1" />
                      SIAKAD
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Linkedin className="h-3 w-3 mr-1" />
                      LinkedIn
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Faculty Growth Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pertumbuhan SKS & Honorarium</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={facultyActivitiesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sks" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="honorarium" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Innovation Tracker Tab */}
        {activeTab === 'innovation-tracker' && (
          <div className="space-y-6">
            <InnovationTracker 
              innovationProjectsData={innovationProjectsData}
              computingResourcesData={computingResourcesData}
              digitalEquipmentData={digitalEquipmentData}
              facultyData={facultyData}
            />
            
            {/* Lab Utilization Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Lab Utilization Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={labUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="workstations" stroke="#8B5CF6" strokeWidth={3} name="Workstations" />
                  <Line type="monotone" dataKey="servers" stroke="#10B981" strokeWidth={3} name="Servers" />
                  <Line type="monotone" dataKey="equipment" stroke="#F59E0B" strokeWidth={3} name="Equipment" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Computing Resources Tab */}
        {activeTab === 'computing-resources' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Computing Resources Management</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {computingResourcesData.map((resource) => (
                <ComputingResourceCard key={resource.id} resource={resource} onClick={(r) => console.log('View resource:', r)} />
              ))}
            </div>
          </div>
        )}

        {/* Digital Equipment Tab */}
        {activeTab === 'digital-equipment' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Digital Equipment Inventory</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Equipment
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {digitalEquipmentData.map((equipment) => (
                <DigitalEquipmentCard key={equipment.id} equipment={equipment} onClick={(e) => console.log('View equipment:', e)} />
              ))}
            </div>
          </div>
        )}

        {/* Project Dashboard Tab */}
        {activeTab === 'project-dashboard' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Innovation Project Dashboard</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projectsData.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project} onClick={(p) => console.log('View project:', p)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Lab Inovasi Digital FSTI ITK</h3>
            <p className="text-purple-100 mb-4">Enabling digital innovation through cutting-edge lab facilities and mentoring excellence</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SIAKAD</div>
                <div className="text-sm text-purple-100">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4 Prodi</div>
                <div className="text-sm text-purple-100">SI • IF • TE • BD</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Digital</div>
                <div className="text-sm text-purple-100">Innovation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">81%</div>
                <div className="text-sm text-purple-100">Lab Utilization</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => handleSync('siakad')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyPortal;