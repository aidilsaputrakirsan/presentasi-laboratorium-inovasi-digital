// src/components/modals/PortfolioGenerator.js
import React from 'react';
import { X, Download, User, Mail, Phone, Globe } from 'lucide-react';

const PortfolioGenerator = ({ onClose, filteredProjects }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Generator Portfolio Digital</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informasi Personal</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="Tagline/Bio" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
                <input type="text" placeholder="No. Telepon" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Proyek Kampus Berdampak</h3>
              <div className="space-y-3">
                {(filteredProjects || []).slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <input type="checkbox" className="mr-3" defaultChecked />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-gray-500">{project.tech.join(', ')}</p>
                      <p className="text-xs text-blue-600">{project.url}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Fokus Industri</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Kelapa Sawit', 'Teknologi Maritim', 'Smart City', 'Fintech', 'E-Commerce', 'IoT Industry'].map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Template</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Modern', 'Minimalis', 'Kreatif', 'Profesional'].map((template) => (
                  <div key={template} className="border border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                    <p className="text-sm font-medium">{template}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Preview Portfolio</h3>
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold">Nama Mahasiswa FSTI</h4>
                <p className="text-gray-600">Full Stack Developer | Kampus Berdampak Alumni</p>
                <div className="flex justify-center space-x-4 mt-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <Phone className="h-4 w-4 text-gray-500" />
                  <Globe className="h-4 w-4 text-gray-500" />
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Proyek Unggulan</h5>
                <div className="space-y-2">
                  {(filteredProjects || []).slice(0, 2).map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded p-2">
                      <p className="font-medium text-sm">{project.title}</p>
                      <p className="text-xs text-gray-500">{project.tech.slice(0, 3).join(', ')}</p>
                      <p className="text-xs text-blue-500">{project.url}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Fokus Industri</h5>
                <div className="flex flex-wrap gap-1">
                  {['Kelapa Sawit', 'IoT', 'Smart City', 'Fintech'].map((focus) => (
                    <span key={focus} className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">{focus}</span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2">Keahlian Teknis</h5>
                <div className="flex flex-wrap gap-1">
                  {['React', 'Node.js', 'Python', 'IoT', 'AI'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-xs text-blue-700">
                  <strong>Program Kampus Berdampak FSTI ITK</strong><br/>
                  Lulusan program magang 6 bulan dengan deployment aplikasi nyata untuk industri Kalimantan
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mt-6">
          <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Batal
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Download Portfolio
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default PortfolioGenerator;