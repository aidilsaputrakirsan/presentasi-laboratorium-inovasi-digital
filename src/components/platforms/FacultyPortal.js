import React from 'react';
import { 
  Users, Building, DollarSign, Calendar, Plus, Download, Star,
  RefreshCw, ExternalLink, CheckCircle, Clock, AlertCircle, Database, Linkedin,
  UserCheck, FileText, Award, Briefcase, GraduationCap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const facultyData = [
  {
    id: 1,
    name: "Aidil Saputra Kirsan, M.Tr.Kom",
    role: "Dosen Praktisi - Cloud Computing",
    expertise: ["Cloud Computing", "Wireless Sensor Networks", "Mobile Applications"],
    industryExp: "Dosen Tamu di Kanagawa Institute of Technology, Jepang (2022-2023)",
    rating: 4.9,
    honorariumPerSKS: 650000,
    totalSKS: 6,
    totalHonorarium: 3900000,
    activeCourses: 2,
    certifications: ["AWS Certified Solutions Architect", "Cisco CCNA"],
    linkedinProfile: "linkedin.com/in/aidil-saputra",
    industryAffiliation: "Cloud Technology Consultant",
    yearsExperience: 8
  },
  {
    id: 2,
    name: "Dr. Rina Marwanti",
    role: "Dosen Praktisi - Industrial IoT",
    expertise: ["Industrial IoT", "Smart Manufacturing", "Automation Systems"],
    industryExp: "Konsultan Teknologi di PT Pupuk Kalimantan Timur (2019-2022)",
    rating: 4.8,
    honorariumPerSKS: 700000,
    totalSKS: 6,
    totalHonorarium: 4200000,
    activeCourses: 2,
    certifications: ["Certified IoT Professional", "Industrial Automation Expert"],
    linkedinProfile: "linkedin.com/in/rina-marwanti",
    industryAffiliation: "PT Pupuk Kalimantan Timur",
    yearsExperience: 12
  }
];

const facultyActivitiesData = [
  { month: 'Jul', courses: 2, sks: 6, honorarium: 4.5 },
  { month: 'Agu', courses: 5, sks: 15, honorarium: 11.2 },
  { month: 'Sep', courses: 8, sks: 24, honorarium: 16.8 },
  { month: 'Okt', courses: 10, sks: 29, honorarium: 20.3 },
  { month: 'Nov', courses: 12, sks: 32, honorarium: 22.1 },
  { month: 'Des', courses: 14, sks: 36, honorarium: 25.2 },
  { month: 'Jan', courses: 15, sks: 40, honorarium: 28.0 }
];

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
        {/* LinkedIn Integration Indicator */}
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
      <p className="text-xs text-blue-600">{faculty.yearsExperience} tahun pengalaman</p>
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
  const [lastSync, setLastSync] = React.useState(new Date());
  const [syncStatus, setSyncStatus] = React.useState('success');
  const [syncType, setSyncType] = React.useState('siakad'); // siakad, linkedin, manual

  const handleSync = async (type) => {
    setSyncStatus('loading');
    setSyncType(type);
    
    // Simulate API call
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
      
      // Simulate occasional error
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

  return (
    <div className="space-y-6 p-6">
      {/* Realistic Sync Status */}
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
        
        {/* Realistic Demo Mode Warning */}
        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-xs text-blue-800">
            💡 <strong>Integrasi Realistis:</strong> SIAKAD (jadwal mengajar) • LinkedIn (profil industri) • Kemendikbud (data praktisi mengajar) • Manual verification
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Dosen Praktisi" value="4" subtitle="Active Consultants" color="text-purple-600" trend="15" />
        <StatCard icon={Building} title="Mitra Industri" value="3" subtitle="Active Partnerships" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Total Honorarium" value="Rp16 Juta" subtitle="Semester ini" color="text-green-600" trend="15" />
        <StatCard icon={Calendar} title="Total SKS" value="24" subtitle="Semester ini" color="text-orange-600" trend="8" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Dosen Praktisi FSTI</h3>
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
              {/* Integration Badges */}
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Industry Experts</h3>
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
                    <p className="text-xs text-gray-500">{faculty.industryAffiliation}</p>
                    <div className="flex items-center text-xs text-blue-600">
                      <Briefcase className="h-3 w-3 mr-1" />
                      <span>{faculty.yearsExperience} tahun</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">Rp{(faculty.totalHonorarium/1000000).toFixed(1)} Juta</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <Linkedin className="h-3 w-3 text-blue-500 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700">
              🤝 <strong>Industry Integration:</strong> LinkedIn profiles verified, SIAKAD schedules synced, Praktisi Mengajar status updated
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Portal Dosen Praktisi FSTI</h3>
            <p className="text-purple-100 mb-4">Integrasi realistis dengan SIAKAD, LinkedIn, dan sistem Praktisi Mengajar</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">SIAKAD</div>
                <div className="text-sm text-purple-100">Jadwal Mengajar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">LinkedIn</div>
                <div className="text-sm text-purple-100">Profil Industri</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Kemendikbud</div>
                <div className="text-sm text-purple-100">Praktisi Mengajar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Manual</div>
                <div className="text-sm text-purple-100">Verification</div>
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