// src/components/modals/PartnershipForm.js
import React from 'react';
import { X, Send } from 'lucide-react';

const PartnershipForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pengajuan Kerjasama Akademik</h2>
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
                <option>Technology</option>
                <option>Manufacturing</option>
                <option>Energy</option>
                <option>Finance</option>
                <option>Healthcare</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kerjasama yang Diinginkan</label>
            <div className="grid grid-cols-2 gap-2">
              {['Magang Mahasiswa', 'Hibah Penelitian', 'Program Beasiswa', 'Guest Lecture', 'Donasi Lab/Software', 'Program CSR', 'Job Fair & Recruitment', 'Training Program'].map((type) => (
                <label key={type} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program/Layanan yang Dapat Disediakan</label>
            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500" placeholder="Jelaskan program kerjasama atau kontribusi yang dapat perusahaan berikan untuk pengembangan akademik..."></textarea>
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