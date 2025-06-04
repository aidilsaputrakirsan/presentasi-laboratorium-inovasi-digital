// src/components/platforms/FacultyPortal.js
import React from 'react';
import { 
  Users, Building, DollarSign, Calendar as CalendarIcon, Plus, Download, Star
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
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Dosen Praktisi" value="12" subtitle="Active Consultants" color="text-purple-600" trend="15" />
        <StatCard icon={Building} title="Mitra Industri" value="7" subtitle="Active Partnerships" color="text-blue-600" trend="20" />
        <StatCard icon={DollarSign} title="Total Honorarium" value="Rp22 Juta" subtitle="Semester ini" color="text-green-600" trend="15" />
        <StatCard icon={CalendarIcon} title="Total SKS" value="29" subtitle="Semester ini" color="text-orange-600" trend="8" />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Dosen Praktisi Aktif</h3>
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
            <FacultyCard 
              key={faculty.id} 
              faculty={faculty} 
              onClick={setSelectedFaculty}
              onCourseInfo={(faculty) => {
                setSelectedFaculty(faculty);
                setShowBookingForm(true);
              }}
            />
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Teaching Faculty</h3>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Program Praktisi Mengajar</h3>
            <p className="text-purple-100 mb-4">Dosen berpengalaman industri untuk pembelajaran yang relevan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">29</div>
                <div className="text-sm text-purple-100">Total SKS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10</div>
                <div className="text-sm text-purple-100">Mata Kuliah</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-purple-100">Student Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Rp22 Juta</div>
                <div className="text-sm text-purple-100">Honorarium Semester</div>
              </div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Daftar Praktisi
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyPortal;