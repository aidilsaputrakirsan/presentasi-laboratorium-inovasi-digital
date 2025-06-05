// src/components/platforms/ResearchAnalytics.js - UPDATED with IKU 5 Features
import React, { useState } from 'react';
import { 
  FileText, Award, Target, TrendingUp, RefreshCw, Download, BarChart3,
  ExternalLink, Calendar as CalendarIcon, Globe, Database,
  CheckCircle, Clock, AlertCircle, Plus, Star, DollarSign, Users, Lightbulb
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar 
} from 'recharts';

// Import existing components
import StatCard from '../shared/StatCard';
import ResearchCard from '../cards/ResearchCard';
import EventCard from '../cards/EventCard';
import AchievementCard from '../cards/AchievementCard';
import NewsCard from '../cards/NewsCard';

// Import new IKU 5 components
import PublicationImpactCard from '../cards/PublicationImpactCard';
import PatentCommercializationCard from '../cards/PatentCommercializationCard';
import ResearchAdoptionCard from '../cards/ResearchAdoptionCard';
import PercentageDisplay from '../shared/PercentageDisplay';

// Import data
import { 
  researchData, 
  researchMetricsData,
  showcaseMetricsData,
  eventsData,
  achievementsData,
  newsArticlesData,
  publicationImpactData,
  patentCommercializationData,
  researchAdoptionData,
  iku5MetricsData
} from '../../data/sampleData';

const ResearchAnalytics = ({ 
  activeView,
  setActiveView,
  setSelectedResearch,
  setSelectedEvent,
  setSelectedAchievement,
  setSelectedNews,
  setShowEventForm,
  setShowAchievementForm
}) => {
  const [lastSync, setLastSync] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('success');
  const [syncCount, setSyncCount] = useState(0);

  const handleSyncData = async () => {
    setSyncStatus('loading');
    
    setTimeout(() => {
      setLastSync(new Date());
      setSyncStatus('success');
      setSyncCount(prev => prev + 1);
      
      const messages = [
        'Successfully synced 15 publications from SISTER',
        'Updated 4 faculty profiles from SINTA', 
        'Retrieved 3 patent applications from DJKI',
        'All research data synchronized'
      ];
      
      console.log(`🔄 DUMMY SYNC #${syncCount + 1}:`, messages[Math.floor(Math.random() * messages.length)]);
      
      if (Math.random() < 0.1) {
        setSyncStatus('error');
        console.log('❌ DUMMY ERROR: Connection timeout (simulated)');
      }
    }, 1500 + Math.random() * 1000);
  };

  const getSyncStatusIcon = () => {
    switch(syncStatus) {
      case 'loading': return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate IKU 5 metrics
  const totalCitations = publicationImpactData.reduce((sum, faculty) => sum + faculty.totalCitations, 0);
  const totalPatentRevenue = patentCommercializationData.reduce((sum, patent) => sum + patent.totalRevenue, 0);
  const totalAdoptions = researchAdoptionData.reduce((sum, adoption) => sum + adoption.totalAdoptions, 0);

  return (
    <div className="space-y-6">
      {/* Sync Status Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getSyncStatusIcon()}
              <span className="text-sm font-medium">
                Last sync: {lastSync.toLocaleString('id-ID')}
              </span>
              {syncCount > 0 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {syncCount} syncs today
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4" />
                <span>SISTER</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>SINTA</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>DJKI</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {syncStatus === 'error' && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                Sync failed - check connection
              </span>
            )}
            <button 
              onClick={handleSyncData}
              disabled={syncStatus === 'loading'}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${syncStatus === 'loading' ? 'animate-spin' : ''}`} />
              {syncStatus === 'loading' ? 'Syncing...' : 'Sync Data'}
            </button>
          </div>
        </div>
        
        <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-xs text-yellow-800">
            🧪 <strong>Demo Mode:</strong> This is dummy data for testing. Real API integration with SISTER/SINTA/DJKI will be implemented in production.
          </p>
        </div>
      </div>

      {/* Main Stats - Enhanced with IKU 5 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Total Publikasi" value="15" subtitle="SISTER Database" color="text-green-600" trend="20" />
        <StatCard icon={Award} title="HKI Aktif" value="3" subtitle="DJKI Registry" color="text-blue-600" trend="15" />
        <StatCard icon={Target} title="SINTA Score" value="S2" subtitle="FSTI ITK Ranking" color="text-purple-600" trend="5" />
        <StatCard icon={TrendingUp} title="H-Index" value="18" subtitle="Average Faculty" color="text-orange-600" trend="10" />
      </div>

      {/* NEW: IKU 5 Impact Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">IKU 5 - Dashboard Dampak Riset</h3>
          <span className="text-xs bg-green-100 text-green-700 px-3 py-2 rounded-full font-medium">
            Pelacak Keunggulan Riset
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PercentageDisplay 
            percentage={85.3}
            label="Dampak Publikasi"
            target={75}
            previousValue={82.1}
            size="medium"
          />
          <PercentageDisplay 
            percentage={66.7}
            label="Komersialisasi Paten"
            target={50}
            previousValue={60.0}
            size="medium"
          />
          <PercentageDisplay 
            percentage={100}
            label="Adopsi Riset"
            target={70}
            previousValue={85.0}
            size="medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{totalCitations}</div>
            <div className="text-sm text-blue-800">Total Sitasi</div>
            <div className="text-xs text-blue-600 mt-1">Google Scholar + Scopus</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">Rp{(totalPatentRevenue/1000000).toFixed(0)} Juta</div>
            <div className="text-sm text-green-800">Pendapatan Paten</div>
            <div className="text-xs text-green-600 mt-1">Pendapatan Komersialisasi</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">{totalAdoptions}</div>
            <div className="text-sm text-purple-800">Adopsi Riset</div>
            <div className="text-xs text-purple-600 mt-1">Implementasi Industri</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Enhanced */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Ringkasan Riset', icon: BarChart3 },
            { id: 'publications', label: 'Publikasi', icon: FileText },
            { id: 'publication-impact', label: 'Dampak Publikasi', icon: TrendingUp }, // NEW
            { id: 'patent-commercialization', label: 'Komersialisasi Paten', icon: DollarSign }, // NEW
            { id: 'research-adoption', label: 'Adopsi Riset', icon: Lightbulb }, // NEW
            { id: 'events', label: 'Acara', icon: CalendarIcon },
            { id: 'achievements', label: 'Prestasi', icon: Award },
            { id: 'news', label: 'Berita', icon: Globe }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-xs ${
                  activeView === view.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:block">{view.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Content */}
        {activeView === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Research Growth Trend</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={researchMetricsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="submissions" stroke="#10B981" strokeWidth={3} name="Publications" />
                    <Line type="monotone" dataKey="processed" stroke="#3B82F6" strokeWidth={3} name="Citations" />
                    <Line type="monotone" dataKey="completed" stroke="#8B5CF6" strokeWidth={3} name="Patents" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Publication Categories</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Jurnal Internasional', value: 8, color: '#10B981' },
                        { name: 'Jurnal Nasional', value: 5, color: '#3B82F6' },
                        { name: 'Conference', value: 7, color: '#8B5CF6' },
                        { name: 'Book Chapter', value: 2, color: '#F59E0B' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {[
                        { name: 'Jurnal Internasional', value: 8, color: '#10B981' },
                        { name: 'Jurnal Nasional', value: 5, color: '#3B82F6' },
                        { name: 'Conference', value: 7, color: '#8B5CF6' },
                        { name: 'Book Chapter', value: 2, color: '#F59E0B' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* NEW: IKU 5 Trends Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">IKU 5 Impact Trends</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={iku5MetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="citations" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Citations" />
                  <Area type="monotone" dataKey="patents" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Patents" />
                  <Area type="monotone" dataKey="adoptions" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Adoptions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Faculty Research */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Researchers (SINTA Data)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Dr. Aidil Saputra', publications: 12, hIndex: 8, sintaScore: 'S2' },
                  { name: 'Dr. Rina Marwanti', publications: 10, hIndex: 6, sintaScore: 'S3' },
                  { name: 'Dr. Yohanes Khoirul', publications: 15, hIndex: 10, sintaScore: 'S2' },
                  { name: 'Dr. Linda Permata', publications: 8, hIndex: 5, sintaScore: 'S3' }
                ].map((faculty, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h4 className="font-medium text-gray-800 mb-2">{faculty.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Publications:</span>
                        <span className="font-medium">{faculty.publications}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>H-Index:</span>
                        <span className="font-medium">{faculty.hIndex}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SINTA:</span>
                        <span className="font-medium text-blue-600">{faculty.sintaScore}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'publications' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Research Publications (SISTER Integration)</h3>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View in SISTER
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {researchData.map((research) => (
                <ResearchCard key={research.id} research={research} onClick={setSelectedResearch} />
              ))}
            </div>
          </div>
        )}

        {/* NEW: Publication Impact Tab */}
        {activeView === 'publication-impact' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Analitik Dampak Publikasi - IKU 5</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Sinkron SINTA/Scholar
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {publicationImpactData.map((faculty) => (
                <PublicationImpactCard key={faculty.id} faculty={faculty} onClick={(f) => console.log('View faculty impact:', f)} />
              ))}
            </div>
          </div>
        )}

        {/* NEW: Patent Commercialization Tab */}
        {activeView === 'patent-commercialization' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Komersialisasi Paten - IKU 5</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Paten
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {patentCommercializationData.map((patent) => (
                <PatentCommercializationCard key={patent.id} patent={patent} onClick={(p) => console.log('View patent:', p)} />
              ))}
            </div>
          </div>
        )}

        {/* NEW: Research Adoption Tab */}
        {activeView === 'research-adoption' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Pelacak Adopsi Riset - IKU 5</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Adopsi
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {researchAdoptionData.map((adoption) => (
                <ResearchAdoptionCard key={adoption.id} adoption={adoption} onClick={(a) => console.log('View adoption:', a)} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Research Events & Activities</h3>
              <button 
                onClick={() => setShowEventForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {eventsData.map((event) => (
                <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'achievements' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Research Achievements</h3>
              <button 
                onClick={() => setShowAchievementForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <Award className="h-4 w-4 mr-2" />
                Add Achievement
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {achievementsData.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} onClick={setSelectedAchievement} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'news' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Research News & Updates</h3>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Publish News
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {newsArticlesData.map((article) => (
                <NewsCard key={article.id} article={article} onClick={setSelectedNews} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Integration Status Footer - Enhanced */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Dashboard Analitik Riset FSTI - Keunggulan IKU 5</h3>
            <p className="text-green-100 mb-4">Integrasi real-time dengan database nasional untuk research excellence dan pelacakan dampak</p>
            <div className="grid grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SISTER</div>
                <div className="text-sm text-green-100">Publikasi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">SINTA</div>
                <div className="text-sm text-green-100">Peringkat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">DJKI</div>
                <div className="text-sm text-green-100">Paten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">IKU 5</div>
                <div className="text-sm text-green-100">Dampak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-green-100">Keunggulan</div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSyncData}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Semua Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchAnalytics;