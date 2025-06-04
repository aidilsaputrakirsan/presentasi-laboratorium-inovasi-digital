// src/components/modals/PartnershipForm.js
import React from 'react';
import { X, Send } from 'lucide-react';

const PartnershipForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pengajuan Kerjasama Akademik FSTI</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Perusahaan</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="PT/CV Nama Perusahaan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Industri</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                <option>Kelapa Sawit & Agrikultur</option>
                <option>Pertambangan & Energi</option>
                <option>Teknologi Informasi</option>
                <option>Manufacturing</option>
                <option>Banking & Finance</option>
                <option>Maritime & Logistics</option>
                <option>Petrochemical</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi Perusahaan</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                <option>Balikpapan, Kalimantan Timur</option>
                <option>Samarinda, Kalimantan Timur</option>
                <option>Bontang, Kalimantan Timur</option>
                <option>Tarakan, Kalimantan Utara</option>
                <option>Pontianak, Kalimantan Barat</option>
                <option>Palangkaraya, Kalimantan Tengah</option>
                <option>Banjarmasin, Kalimantan Selatan</option>
                <option>Jakarta/Luar Kalimantan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skala Perusahaan</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500">
                <option>UMKM ({'<'} 50 karyawan)</option>
                <option>Medium (50-200 karyawan)</option>
                <option>Large (200-1000 karyawan)</option>
                <option>Enterprise ({'>'} 1000 karyawan)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kerjasama yang Diinginkan</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Magang Mahasiswa FSTI', 
                'Hibah Penelitian', 
                'Program Beasiswa', 
                'Guest Lecture', 
                'Donasi Lab/Software', 
                'Program CSR', 
                'Job Fair & Recruitment', 
                'Training Program',
                'Konsultasi Teknologi',
                'Digital Transformation',
                'IoT Implementation',
                'AI/ML Solutions'
              ].map((type) => (
                <label key={type} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fokus Program Studi FSTI</label>
            <div className="grid grid-cols-2 gap-2">
              {['Sistem Informasi', 'Informatika', 'Teknik Elektro', 'Bisnis Digital'].map((prodi) => (
                <label key={prodi} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{prodi}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program/Layanan yang Dapat Disediakan</label>
            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Jelaskan program kerjasama atau kontribusi yang dapat perusahaan berikan untuk pengembangan FSTI dan mahasiswa..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tantangan Industri yang Ingin Diselesaikan</label>
            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Deskripsi tantangan teknologi/bisnis yang dapat menjadi fokus kolaborasi dengan FSTI..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Nama & Jabatan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="contact@company.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
              <input type="tel" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="+62 541-555-xxxx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website Perusahaan</label>
              <input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="https://company.com" />
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Kerjasama Industri Kalimantan - FSTI ITK</h4>
            <p className="text-sm text-orange-700 mb-2">FSTI ITK berkomitmen membangun ekosistem teknologi Kalimantan melalui:</p>
            <ul className="text-sm text-orange-600 space-y-1">
              <li>• Solusi teknologi untuk tantangan industri lokal</li>
              <li>• Pengembangan SDM teknologi berkualitas</li>
              <li>• Transfer knowledge dan teknologi</li>
              <li>• Penelitian berbasis kebutuhan industri</li>
              <li>• Program magang dan job placement</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center">
              <Send className="h-4 w-4 mr-2" />
              Ajukan Kerjasama
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default PartnershipForm;