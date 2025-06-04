// src/components/platforms/ShowcasePlatform.js
import React from 'react';
import { 
  Calendar as CalendarIcon, Award, Users, FileText, Video, BarChart3, 
  Plus, Download, Globe, Upload
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../shared/StatCard';
import EventCard from '../cards/EventCard';
import AchievementCard from '../cards/AchievementCard';
import NewsCard from '../cards/NewsCard';

const ShowcasePlatform = ({ 
  activeView,
  setActiveView,
  showcaseMetricsData,
  eventsData,
  achievementsData,
  newsArticlesData,
  setSelectedEvent,
  setSelectedAchievement,
  setSelectedNews,
  setShowEventForm,
  setShowAchievementForm
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={CalendarIcon} title="Events Completed" value="8" subtitle="Tech Talks & Workshops" color="text-pink-600" trend="20" />
        <StatCard icon={Award} title="Prestasi Documented" value="15" subtitle="Achievements Recorded" color="text-purple-600" trend="15" />
        <StatCard icon={Users} title="Total Participants" value="280" subtitle="Event Attendees" color="text-blue-600" trend="25" />
        <StatCard icon={FileText} title="News Published" value="12" subtitle="FSTI Activities" color="text-green-600" trend="30" />
      </div>

      {/* Tab Navigation for Showcase Views */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'events', label: 'Events', icon: CalendarIcon },
            { id: 'achievements', label: 'Prestasi', icon: Award },
            { id: 'news', label: 'Berita', icon: FileText },
            { id: 'gallery', label: 'Gallery', icon: Video }
          ].map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeView === view.id
                    ? 'bg-pink-600 text-white shadow-lg'
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
        {activeView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Events & Participation Growth</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={showcaseMetricsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="events" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="participants" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievement Categories</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Mahasiswa', value: 8, color: '#EC4899' },
                      { name: 'Dosen', value: 4, color: '#8B5CF6' },
                      { name: 'Alumni', value: 2, color: '#10B981' },
                      { name: 'Tim', value: 1, color: '#F59E0B' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {[
                      { name: 'Mahasiswa', value: 8, color: '#EC4899' },
                      { name: 'Dosen', value: 4, color: '#8B5CF6' },
                      { name: 'Alumni', value: 2, color: '#10B981' },
                      { name: 'Tim', value: 1, color: '#F59E0B' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeView === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Event Management FSTI</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowEventForm(true)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Event
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Laporan
                </button>
              </div>
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
              <h3 className="text-lg font-semibold text-gray-800">Documentation Prestasi FSTI</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowAchievementForm(true)}
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Dokumentasi Prestasi
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Generate Certificate
                </button>
              </div>
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
              <h3 className="text-lg font-semibold text-gray-800">FSTI News & Updates</h3>
              <div className="flex space-x-2">
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Publish Article
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Media Release
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {newsArticlesData.map((article) => (
                <NewsCard key={article.id} article={article} onClick={setSelectedNews} />
              ))}
            </div>
          </div>
        )}

        {activeView === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Photo & Video Gallery FSTI</h3>
              <div className="flex space-x-2">
                <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors flex items-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Media
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Create Album
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                  <Video className="h-8 w-8 text-gray-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-xl font-bold mb-2">Platform Pameran Inovasi & Dokumentasi Prestasi FSTI</h3>
            <p className="text-pink-100 mb-4">Memamerkan pencapaian dan inovasi FSTI untuk visibility dan recognition industri Kalimantan</p>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">280+</div>
                <div className="text-sm text-pink-100">Total Participants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-pink-100">Achievements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-pink-100">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">90%</div>
                <div className="text-sm text-pink-100">Satisfaction Rate</div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowEventForm(true)}
            className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcasePlatform;