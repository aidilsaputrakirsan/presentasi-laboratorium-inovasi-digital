// src/App.js
import React, { useState } from 'react';
import { 
  Users, BookOpen, Award, Building, Star, Globe, Shield, Zap,
  Search, Plus, Eye, Download, Clock, CheckCircle, User, Filter, Target,
  GitBranch, X, ArrowRight, Mail, Phone, ExternalLink, Upload, Send, Code,
  Edit, Save, Trash2, Settings, Bell, MessageCircle, DollarSign, MapPin,
  Video, FileCheck, AlertCircle, PlayCircle, PauseCircle, BarChart3,
  Database, Smartphone, Monitor, Wifi, CreditCard, Calendar as CalendarIcon,
  FileText, TrendingUp
} from 'lucide-react';

// Import all data
import { 
  projectsData, 
  facultyData, 
  researchData, 
  industryPartnersData, 
  eventsData, 
  achievementsData, 
  newsArticlesData,
  kampusBerdampakProjectsData,
  facultyActivitiesData,
  researchMetricsData,
  showcaseMetricsData,
  industryRevenueData,
  tabs 
} from './data/sampleData';

// Import shared components
import StatCard from './components/shared/StatCard';

// Import card components
import ProjectCard from './components/cards/ProjectCard';
import FacultyCard from './components/cards/FacultyCard';

// Import platform components
import KampusBerdampakPlatform from './components/platforms/KampusBerdampakPlatform';
import FacultyPortal from './components/platforms/FacultyPortal';
import ResearchRepository from './components/platforms/ResearchRepository';
import IndustryCollaboration from './components/platforms/IndustryCollaboration';
import ShowcasePlatform from './components/platforms/ShowcasePlatform';

// Import modal components
import ApplicationForm from './components/modals/ApplicationForm';
import PortfolioGenerator from './components/modals/PortfolioGenerator';
import ProjectDetailModal from './components/modals/ProjectDetailModal';
import CourseInfoForm from './components/modals/CourseInfoForm';
import SubmissionForm from './components/modals/SubmissionForm';
import PartnershipForm from './components/modals/PartnershipForm';
import FacultyDetailModal from './components/modals/FacultyDetailModal';
import AddEventForm from './components/modals/AddEventForm';
import AddAchievementForm from './components/modals/AddAchievementForm';

const App = () => {
  // Main app states
  const [activeTab, setActiveTab] = useState('kampus-berdampak');
  const [activeView, setActiveView] = useState('dashboard');
  
  // Selected items states
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  
  // Modal states
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showPortfolioGenerator, setShowPortfolioGenerator] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [showPartnershipForm, setShowPartnershipForm] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProdi, setFilterProdi] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter functions
  const filteredProjects = projectsData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProdi = filterProdi === 'all' || project.prodi === filterProdi;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesProdi && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lab Inovasi Digital</h1>
                  <p className="text-sm text-gray-600">FSTI - Institut Teknologi Kalimantan</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 font-medium">Sistem Online</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-lg font-bold text-green-600">99.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-4">
            {tabs.map((tab) => {
              const iconMap = {
                Users, BookOpen, Award, Building, Star
              };
              const Icon = iconMap[tab.icon] || Users;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:block">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* URL Display */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              https://{tabs.find(tab => tab.id === activeTab)?.url}
            </span>
            <div className="flex items-center space-x-1 ml-4">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs text-green-400">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'kampus-berdampak' && 'Memberdayakan mahasiswa FSTI dengan pengalaman deployment aplikasi untuk industri Kalimantan (IKU 2)'}
            {activeTab === 'faculty' && 'Mengelola dosen praktisi dengan pengalaman industri untuk pembelajaran berkualitas di FSTI (IKU 3)'}
            {activeTab === 'research' && 'Membuat riset FSTI dapat diakses secara global dan berdampak untuk Kalimantan (IKU 5)'}
            {activeTab === 'industry' && 'Memfasilitasi kerjasama FSTI-industri Kalimantan yang berkelanjutan dan saling menguntungkan (IKU 3)'}
            {activeTab === 'showcase' && 'Memamerkan pencapaian dan inovasi FSTI untuk visibility dan recognition (IKU 2, 5)'}
          </p>
        </div>

        {/* Platform Content */}
        {activeTab === 'kampus-berdampak' && (
          <KampusBerdampakPlatform 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterProdi={filterProdi}
            setFilterProdi={setFilterProdi}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filteredProjects={filteredProjects}
            kampusBerdampakProjectsData={kampusBerdampakProjectsData}
            setSelectedProject={setSelectedProject}
            setShowApplicationForm={setShowApplicationForm}
            setShowPortfolioGenerator={setShowPortfolioGenerator}
          />
        )}
        {activeTab === 'faculty' && (
          <FacultyPortal 
            facultyData={facultyData}
            facultyActivitiesData={facultyActivitiesData}
            setSelectedFaculty={setSelectedFaculty}
            setShowBookingForm={setShowBookingForm}
          />
        )}
        {activeTab === 'research' && (
          <ResearchRepository 
            researchData={researchData}
            researchMetricsData={researchMetricsData}
            setSelectedResearch={setSelectedResearch}
            setShowSubmissionForm={setShowSubmissionForm}
          />
        )}
        {activeTab === 'industry' && (
          <IndustryCollaboration 
            industryPartnersData={industryPartnersData}
            industryRevenueData={industryRevenueData}
            setSelectedPartner={setSelectedPartner}
            setShowPartnershipForm={setShowPartnershipForm}
          />
        )}
        {activeTab === 'showcase' && (
          <ShowcasePlatform 
            activeView={activeView}
            setActiveView={setActiveView}
            showcaseMetricsData={showcaseMetricsData}
            eventsData={eventsData}
            achievementsData={achievementsData}
            newsArticlesData={newsArticlesData}
            setSelectedEvent={setSelectedEvent}
            setSelectedAchievement={setSelectedAchievement}
            setSelectedNews={setSelectedNews}
            setShowEventForm={setShowEventForm}
            setShowAchievementForm={setShowAchievementForm}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">
                © 2025 Lab Inovasi Digital FSTI ITK. Mendukung pencapaian IKU 2, 3, dan 5.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Powered by:</span>
              <span className="text-sm bg-blue-600 px-2 py-1 rounded">Biznet VPS</span>
              <span className="text-sm bg-purple-600 px-2 py-1 rounded">React</span>
              <span className="text-sm bg-green-600 px-2 py-1 rounded">Node.js</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showApplicationForm && <ApplicationForm onClose={() => setShowApplicationForm(false)} />}
      {showPortfolioGenerator && (
        <PortfolioGenerator 
          onClose={() => setShowPortfolioGenerator(false)} 
          filteredProjects={filteredProjects} 
        />
      )}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
      {selectedFaculty && (
        <FacultyDetailModal 
          faculty={selectedFaculty} 
          onClose={() => setSelectedFaculty(null)} 
        />
      )}
      {showBookingForm && (
        <CourseInfoForm 
          faculty={selectedFaculty} 
          onClose={() => setShowBookingForm(false)} 
        />
      )}
      {showSubmissionForm && (
        <SubmissionForm 
          onClose={() => setShowSubmissionForm(false)} 
        />
      )}
      {showPartnershipForm && (
        <PartnershipForm 
          onClose={() => setShowPartnershipForm(false)} 
        />
      )}
      {showEventForm && (
        <AddEventForm 
          onClose={() => setShowEventForm(false)} 
        />
      )}
      {showAchievementForm && (
        <AddAchievementForm 
          onClose={() => setShowAchievementForm(false)} 
        />
      )}
    </div>
  );
};

export default App;