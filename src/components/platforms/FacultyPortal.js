// src/components/platforms/FacultyPortal.js
import React from 'react';
import { 
  Users, Building, DollarSign, Calendar as CalendarIcon, Plus, Download, Star,
  RefreshCw, ExternalLink, CheckCircle, Clock, AlertCircle, Database
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../shared/StatCard';
import FacultyCard from '../cards/FacultyCard';

const FacultyPortal = ({ 
  facultyData, 
  facultyActivitiesData,
  setSelectedFaculty, 
  setShowBookingForm 
}) => {
  const [lastSync, setLastSync] = React.useState(new Date());
  const [syncStatus, setSyncStatus] = React.useState('success');

  const handleSyncSINTA = async () => {
    setSyncStatus('loading');
    // DUMMY SINTA API SIMULATION
    setTimeout(() => {
      setLastSync(new Date());
      setSyncStatus('success');
      
      // Dummy console log for testing
      console.log('🎓 DUMMY SINTA SYNC: Updated faculty profiles', {
        faculty_count: 4,
        h_index_updates: 2,
        new_publications: 3,
        sinta_scores_updated: true
      });
      
      // Simulate occasional error
      if (Math.random() < 0.05) {
        setSyncStatus('error');
        console.log('❌ DUMMY SINTA ERROR: Rate limit exceeded (simulated)');
      }
    }, 1000 + Math.random() * 500);
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
      {/* SINTA Sync Status */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getSyncStatusIcon()}
              <span className="text-sm font-medium">
                SINTA Sync: {lastSync.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Database className="h-4 w-4" />
              <span>Faculty profiles auto-synchronized</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {syncStatus === 'error' && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                SINTA sync failed
              </span>
            )}
            <button 
              onClick={handleSyncSINTA}
              disabled={syncStatus === 'loading'}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${syncStatus === 'loading' ? 'animate-spin' : ''}`} />
              {syncStatus === 'loading' ? 'Syncing...' : 'Sync SINTA'}
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" />
              View SINTA
            </button>
          </div>
        </div>
        
        {/* Demo Mode Warning */}
        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-800">
            🧪 <strong>Demo Mode:</strong> SINTA integration is simulated. Production will sync real faculty data from SINTA database.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Dosen Praktisi" value="4" subtitle="Active Consultants" color="text-purple-600" trend="15" />
        <StatCard icon={Building} title="Mitra Industri" value="3" subtitle="Active Partnerships" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Total Honorarium" value="Rp16 Juta" subtitle="Semester ini" color="text-green-600" trend="15" />
        <StatCard icon={CalendarIcon} title="Total SKS" value="24" subtitle="Semester ini" color="text-orange-600" trend="8" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Dosen Praktisi FSTI</h3>
            <p className="text-sm text-gray-600">Data real-time dari SINTA dan sistem ITK</p>
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
              <FacultyCard 
                faculty={faculty} 
                onClick={setSelectedFaculty}
                onCourseInfo={(faculty) => {
                  setSelectedFaculty(faculty);
                  setShowBookingForm(true);
                }}
              />
              {/* SINTA Badge */}
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Database className="h-3 w-3 mr-1" />
                SINTA
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Researchers (SINTA Data)</h3>
          <div className="space-y-4">
            {facultyData.slice(0, 3).map((faculty, index) => (
              <div key={faculty.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{faculty.name}</p>
                    <p className="text-xs text-gray-500">{faculty.totalSKS} SKS mengajar</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <Database className="h-3 w-3 text-blue-500 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              📊 <strong>Last Sync Results:</strong> Updated H-index for 2 faculty, added 3 new publications, refreshed SINTA scores
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Portal Dosen Praktisi FSTI</h3>
            <p className="text-purple-100 mb-4">Real-time integration dengan SINTA untuk profil dosen dan research metrics</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-purple-100">Total SKS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-purple-100">Mata Kuliah</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm text-purple-100">Student Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Auto</div>
                <div className="text-sm text-purple-100">SINTA Sync</div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSyncSINTA}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync SINTA Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyPortal;