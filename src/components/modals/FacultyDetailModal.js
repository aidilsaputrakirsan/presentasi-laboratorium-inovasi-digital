// src/components/modals/FacultyDetailModal.js
import React from 'react';
import { 
  X, Star, CheckCircle, Mail, Phone, Clock, Calendar as CalendarIcon, 
  MessageCircle, Download 
} from 'lucide-react';

const FacultyDetailModal = ({ faculty, onClose }) => {
  if (!faculty) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Profil Dosen Praktisi</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mr-6">
                    <span className="text-purple-600 font-bold text-2xl">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{faculty.name}</h3>
                    <p className="text-gray-600 mb-2">{faculty.role}</p>
                    <p className="text-sm text-gray-500">{faculty.prodi}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < faculty.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({faculty.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{faculty.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Keahlian & Sertifikasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Areas of Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {faculty.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Sertifikasi</h4>
                    <div className="space-y-1">
                      {faculty.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-700">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Mata Kuliah yang Diampu</h3>
                <div className="space-y-3">
                  {faculty.teachingCourses.map((course, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{course.name}</h4>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.sks} SKS
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Kode:</strong> {course.code}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Mahasiswa:</strong> {course.students} orang • <strong>Semester:</strong> {course.semester}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Program Praktisi Mengajar</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Kemendikbud-Ristek Program</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tahun:</span>
                      <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Kategori:</span>
                      <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Durasi:</span>
                      <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pendanaan:</span>
                      <span className="ml-2 font-medium">{faculty.practisiMengajarProgram.funding}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Kontak</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{faculty.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{faculty.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{faculty.availability}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Statistik Pengajaran</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total SKS</span>
                    <span className="text-sm font-medium">{faculty.totalSKS} SKS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Honorarium Total</span>
                    <span className="text-sm font-medium">Rp {(faculty.totalHonorarium/1000000).toFixed(1)} Juta</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Mata Kuliah Aktif</span>
                    <span className="text-sm font-medium">{faculty.activeCourses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Honorarium per SKS</span>
                    <span className="text-sm font-medium">Rp {(faculty.honorariumPerSKS/1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Lihat Jadwal Mengajar
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Kontak Dosen
                </button>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Silabus Mata Kuliah
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailModal;