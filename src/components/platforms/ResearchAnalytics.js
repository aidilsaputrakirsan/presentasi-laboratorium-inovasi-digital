// src/components/platforms/ResearchAnalytics.js
import React from 'react';
import { 
  FileText, Award, Target, TrendingUp, RefreshCw, Download, BarChart3,
  ExternalLink, Calendar as CalendarIcon, Globe, Database,
  CheckCircle, Clock, AlertCircle, Plus
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../shared/StatCard';
import ResearchCard from '../cards/ResearchCard';
import EventCard from '../cards/EventCard';
import AchievementCard from '../cards/AchievementCard';
import NewsCard from '../cards/NewsCard';

const ResearchAnalytics = ({ 
  activeView,
  setActiveView,
  researchData, 
  researchMetricsData,
  showcaseMetricsData,
  eventsData,
  achievementsData,
  newsArticlesData,
  setSelectedResearch,
  setSelectedEvent,
  setSelectedAchievement,
  setSelectedNews,
  setShowEventForm,
  setShowAchievementForm
}) => {
  const [lastSync, setLastSync] = React.useState(new Date());
  const [syncStatus, setSyncStatus] = React.useState('success'); // success, loading, error
  const [syncCount, setSyncCount] = React.useState(0);

  const handleSyncData = async () => {
    setSyncStatus('loading');
    
    // DUMMY API SIMULATION - NOT REAL SYNC
    setTimeout(() => {
      setLastSync(new Date());
      setSyncStatus('success');
      setSyncCount(prev => prev + 1);
      
      // Simulate random sync results
      const messages = [
        'Successfully synced 15 publications from SISTER',
        'Updated 4 faculty profiles from SINTA', 
        'Retrieved 3 patent applications from DJKI',
        'All research data synchronized'
      ];
      
      console.log(`🔄 DUMMY SYNC #${syncCount + 1}:`, messages[Math.floor(Math.random() * messages.length)]);
      
      // Simulate occasional "error" for testing
      if (Math.random() < 0.1) {
        setSyncStatus('error');
        console.log('❌ DUMMY ERROR: Connection timeout (simulated)');
      }
    }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s
  };

  const getSyncStatusIcon = () => {
    switch(syncStatus) {
      case 'loading': return <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

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
        
        {/* Dummy API Status */}
        <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
          <p className="text-xs text-yellow-800">
            🧪 <strong>Demo Mode:</strong> This is dummy data for testing. Real API integration with SISTER/SINTA/DJKI will be implemented in production.
          </p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={FileText} title="Total Publikasi" value="15" subtitle="SISTER Database" color="text-green-600" trend="20" />
        <StatCard icon={Award} title="HKI Aktif" value="3" subtitle="DJKI Registry" color="text-blue-600" trend="15" />
        <StatCard icon={Target} title="SINTA Score" value="S2" subtitle="FSTI ITK Ranking" color="text-purple-600" trend="5" />
        <StatCard icon={TrendingUp} title="H-Index" value="18" subtitle="Average Faculty" color="text-orange-600" trend="10" />
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Research Overview', icon: BarChart3 },
            { id: 'publications', label: 'Publications', icon: FileText },
            { id: 'events', label: 'Events', icon: CalendarIcon },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'news', label: 'News', icon: Globe }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === view.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{view.label}</span>
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

      {/* Integration Status Footer */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Research Analytics Dashboard FSTI</h3>
            <p className="text-green-100 mb-4">Real-time integration dengan database nasional untuk research excellence</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SISTER</div>
                <div className="text-sm text-green-100">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">SINTA</div>
                <div className="text-sm text-green-100">Rankings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">DJKI</div>
                <div className="text-sm text-green-100">Patents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Auto</div>
                <div className="text-sm text-green-100">Sync</div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSyncData}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchAnalytics;