import React, { useState } from 'react';
import { 
  Users, FileText, Award, TrendingUp, Plus, Search, ArrowRight, 
  Globe, BookOpen, Calendar, Upload, Server, Monitor, Settings,
  CheckCircle, Clock, AlertCircle, ExternalLink, Download, Code,
  Database, Zap, Shield, CloudUpload, Terminal, FolderOpen,
  Eye, GitBranch, PlayCircle, PauseCircle, RefreshCw, HardDrive,
  Wifi, CreditCard, FileCode, Package, Layers, Activity, X
} from 'lucide-react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import PortfolioGenerator from '../modals/PortfolioGenerator';
import { projectsData as importedProjectsData, deploymentStatsData, serverResourcesData, serverInfoData, kampusBerdampakProjectsData } from '../../data/sampleData';

// Components
const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, onClick }) => (
  <div 
    className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-105' : ''}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
        {trend && (
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
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

const ProjectCard = ({ project, onClick, onDeploy }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return 'bg-green-100 text-green-800';
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Testing': return 'bg-yellow-100 text-yellow-800';
      case 'Research': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeployStatusColor = (status) => {
    switch(status) {
      case 'Deployed': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-800 flex-1 mr-2">{project.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${getDeployStatusColor(project.status === 'Live' ? 'Deployed' : 'Pending')} mr-1`}></div>
            <span className="text-xs text-gray-600">{project.status === 'Live' ? 'Deployed' : 'Pending'}</span>
          </div>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Oleh: <span className="font-medium">{project.student}</span></p>
        <p className="text-xs text-gray-500 mb-2">{project.prodi} • Angkatan {project.angkatan}</p>
        
        <div className="flex items-center mb-2">
          <Globe className="h-3 w-3 text-gray-400 mr-1" />
          <span className="text-xs text-blue-600">{project.url}</span>
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

      {project.status === 'Live' && project.resourceUsage && (
        <div className="bg-gray-50 rounded p-2 mb-3">
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="text-center">
              <div className="font-medium text-blue-600">{project.resourceUsage.cpu}%</div>
              <div className="text-gray-500">CPU</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-600">{project.resourceUsage.memory}%</div>
              <div className="text-gray-500">RAM</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-orange-600">{project.resourceUsage.storage}GB</div>
              <div className="text-gray-500">Storage</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-purple-600">{project.resourceUsage.bandwidth}%</div>
              <div className="text-gray-500">Traffic</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        {project.status === 'Live' ? (
          <>
            <button 
              onClick={() => window.open(`https://${project.url}`, '_blank')}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Live Site
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Settings className="h-4 w-4 mr-1" />
              cPanel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => onDeploy(project)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CloudUpload className="h-4 w-4 mr-1" />
              Deploy Now
            </button>
            <button 
              onClick={() => onClick(project)}
              className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Deployment Modal - COMPLETE VERSION
const DeploymentModal = ({ project, onClose }) => {
  const [deployStep, setDeployStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleDeploy = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDeployStep(4);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Deploy ke VPS Biznet + cPanel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Steps Progress */}
          <div className="flex items-center mb-8">
            {[1,2,3,4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= deployStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < deployStep ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && <div className={`w-16 h-1 ${step < deployStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Preparation */}
          {deployStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">1. Persiapan Aplikasi</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Project: {project?.title}</h4>
                <p className="text-sm text-gray-600 mb-4">Pastikan aplikasi sudah siap deploy dari localhost ke production</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Build aplikasi berhasil</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Environment variables dikonfigurasi</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Database migration siap</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Subdomain yang akan dibuat:</h4>
                <p className="text-blue-700 font-mono">{project?.url.split('.')[0]}.kampus-berdampak.fsti-itk.ac.id</p>
              </div>

              <button 
                onClick={() => setDeployStep(2)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lanjut ke Upload
              </button>
            </div>
          )}

          {/* Step 2: Upload */}
          {deployStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">2. Upload File ke cPanel</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <CloudUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">Upload aplikasi Anda</p>
                <p className="text-sm text-gray-500 mb-4">Drag & drop file .zip atau klik untuk browse</p>
                <input type="file" accept=".zip" className="hidden" id="app-upload" />
                <button 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={() => document.getElementById('app-upload')?.click()}
                >
                  Pilih File .zip
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Struktur File yang Direkomendasikan:</h4>
                  <div className="text-sm font-mono text-gray-600 space-y-1">
                    <div>📁 {project?.title.toLowerCase().replace(/\s+/g, '-')}/</div>
                    <div className="ml-4">📁 public/</div>
                    <div className="ml-4">📁 src/</div>
                    <div className="ml-4">📁 node_modules/</div>
                    <div className="ml-4">📄 package.json</div>
                    <div className="ml-4">📄 .env.production</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Info Server:</h4>
                  <div className="text-sm space-y-2">
                    <div><strong>Provider:</strong> Biznet Gio</div>
                    <div><strong>Panel:</strong> cPanel</div>
                    <div><strong>PHP:</strong> 8.1</div>
                    <div><strong>Node.js:</strong> 18.x</div>
                    <div><strong>Database:</strong> MySQL 8.0</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setDeployStep(1)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => setDeployStep(3)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload & Deploy
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Deployment Process */}
          {deployStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">3. Proses Deployment</h3>
              
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="flex items-center mb-2">
                  <Terminal className="h-4 w-4 mr-2" />
                  <span>Deployment Console</span>
                </div>
                <div className="space-y-1">
                  <div>✓ Connecting to Biznet VPS...</div>
                  <div>✓ Extracting application files...</div>
                  <div>✓ Installing dependencies...</div>
                  <div className={uploading ? "animate-pulse" : ""}>
                    {uploading ? "⏳ Configuring cPanel subdomain..." : "✓ Subdomain configured"}
                  </div>
                  {!uploading && <div>✓ SSL certificate installed</div>}
                  {!uploading && <div>✓ Database connection tested</div>}
                  {!uploading && <div>✓ Application deployed successfully!</div>}
                </div>
              </div>

              {uploading && (
                <div className="flex items-center justify-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mr-3" />
                  <span className="text-lg">Deploying aplikasi...</span>
                </div>
              )}

              {!uploading && (
                <button 
                  onClick={handleDeploy}
                  disabled={uploading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Deploying...' : 'Start Deployment'}
                </button>
              )}
            </div>
          )}

          {/* Step 4: Success */}
          {deployStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-green-600">Deployment Berhasil! 🎉</h3>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-4">Aplikasi Anda telah live di:</h4>
                <a 
                  href={`https://${project?.url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg text-blue-600 hover:text-blue-800 underline break-all"
                >
                  https://{project?.url}
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-800 mb-2">cPanel Access</h5>
                  <p className="text-sm text-blue-600">Kelola aplikasi via cPanel dashboard</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-800 mb-2">SSL Enabled</h5>
                  <p className="text-sm text-purple-600">HTTPS otomatis diaktifkan</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => window.open(`https://${project?.url}`, '_blank')}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Buka Aplikasi
                </button>
                <button 
                  onClick={onClose}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Selesai
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Application Modal
const ApplicationModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Daftar Program Kampus Berdampak</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="Nama lengkap mahasiswa" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NIM</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="11190910000xxx" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program Studi</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option>Sistem Informasi</option>
                <option>Informatika</option>
                <option>Teknik Elektro</option>
                <option>Bisnis Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Angkatan</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subdomain yang Diinginkan</label>
            <div className="flex">
              <input type="text" className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="nama-aplikasi" />
              <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-sm text-gray-600">
                .kampus-berdampak.fsti-itk.ac.id
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Yang Akan Anda Dapatkan:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Subdomain .kampus-berdampak.fsti-itk.ac.id</li>
              <li>✓ Hosting di VPS Biznet dengan cPanel</li>
              <li>✓ SSL Certificate otomatis</li>
              <li>✓ Mentoring deployment oleh tim lab</li>
              <li>✓ Portfolio website yang dapat digunakan untuk melamar kerja</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={onClose} 
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={() => {
                console.log('Form submitted');
                onClose();
              }}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Daftar Program
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 🔧 FIXED: Main Platform Component
const KampusBerdampakPlatform = () => {  // ← Removed setShowPortfolioGenerator prop
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProdi, setFilterProdi] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showDeploymentModal, setShowDeploymentModal] = useState(false);
  
  // 🔧 FIXED: Consistent state name
  const [showPortfolioGenerator, setShowPortfolioGenerator] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = importedProjectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.student.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProdi = filterProdi === 'all' || project.prodi === filterProdi;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesProdi && matchesStatus;
  });

  const handleDeploy = (project) => {
    setSelectedProject(project);
    setShowDeploymentModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Mahasiswa Aktif" value="45" subtitle="Peserta Program" color="text-blue-600" trend="12" />
        <StatCard icon={Server} title="Apps Deployed" value={importedProjectsData.filter(p => p.status === 'Live').length} subtitle="Live Applications" color="text-green-600" trend="25" />
        <StatCard icon={Globe} title="Subdomains" value={`${importedProjectsData.length}+`} subtitle="Active Subdomains" color="text-purple-600" trend="15" />
        <StatCard icon={Shield} title="SSL Enabled" value="100%" subtitle="Secure Connections" color="text-orange-600" trend="0" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'projects', label: 'Projects & Apps', icon: Code },
            { id: 'deployment', label: 'Deployment Center', icon: CloudUpload },
            { id: 'monitoring', label: 'Server Monitoring', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari proyek atau mahasiswa..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select className="border border-gray-300 rounded-lg px-3 py-2" value={filterProdi} onChange={(e) => setFilterProdi(e.target.value)}>
                  <option value="all">Semua Prodi</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Informatika">Informatika</option>
                  <option value="Teknik Elektro">Teknik Elektro</option>
                  <option value="Bisnis Digital">Bisnis Digital</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">Semua Status</option>
                  <option value="Live">Live</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="Research">Research</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button 
                onClick={() => setShowApplicationForm(true)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Daftar Program
              </button>
              <button 
                onClick={() => setShowDeploymentModal(true)} 
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <CloudUpload className="h-4 w-4 mr-2" />
                Deploy App
              </button>
              {/* 🔧 FIXED: Consistent state name */}
              <button 
                onClick={() => setShowPortfolioGenerator(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Buat Portfolio
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={setSelectedProject}
                  onDeploy={handleDeploy}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'deployment' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Deployment Stats</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={deploymentStatsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deployed" fill="#10B981" name="Deployed" />
                    <Bar dataKey="pending" fill="#F59E0B" name="Pending" />
                    <Bar dataKey="failed" fill="#EF4444" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">VPS Biznet + cPanel</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Server Info</h4>
                    <div className="text-sm space-y-1">
                      <div>💾 <strong>Storage:</strong> {serverInfoData.storage}</div>
                      <div>🔧 <strong>RAM:</strong> {serverInfoData.ram}</div>
                      <div>⚡ <strong>CPU:</strong> {serverInfoData.cpu}</div>
                      <div>🌐 <strong>Bandwidth:</strong> {serverInfoData.bandwidth}</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">cPanel Features</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      {serverInfoData.cpanelFeatures.map((feature, index) => (
                        <div key={index}>✓ {feature}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Growth Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={kampusBerdampakProjectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="projects" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Projects" />
                  <Area type="monotone" dataKey="applications" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Applications" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Deployment Guide</h3>
              <p className="text-blue-100 mb-4">Panduan lengkap deploy aplikasi dari localhost ke VPS production</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">1. Upload Files</div>
                </div>
                <div className="text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">2. Configure</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">3. Set Subdomain</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">4. Go Live</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Server Resources</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={serverResourcesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {serverResourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Applications</h3>
                <div className="space-y-3">
                  {importedProjectsData.filter(p => p.status === 'Live').map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{project.title}</p>
                        <p className="text-xs text-gray-500">{project.url}</p>
                      </div>
                      <div className="text-right">
                        <div className={`w-2 h-2 rounded-full ${project.serverStatus === 'Online' ? 'bg-green-500' : 'bg-red-500'} mb-1`}></div>
                        <span className={`text-xs ${project.serverStatus === 'Online' ? 'text-green-600' : 'text-red-600'}`}>{project.serverStatus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔧 FIXED: All modals with consistent state names */}
      {showApplicationForm && <ApplicationModal onClose={() => setShowApplicationForm(false)} />}
      
      {showDeploymentModal && (
        <DeploymentModal 
          project={selectedProject} 
          onClose={() => {
            setShowDeploymentModal(false);
            setSelectedProject(null);
          }} 
        />
      )}
      
      {/* 🔧 FIXED: Correct state name in conditional */}
      {showPortfolioGenerator && (
        <PortfolioGenerator 
          filteredProjects={filteredProjects}
          onClose={() => setShowPortfolioGenerator(false)}
        />
      )}
    </div>
  );
};

export default KampusBerdampakPlatform;