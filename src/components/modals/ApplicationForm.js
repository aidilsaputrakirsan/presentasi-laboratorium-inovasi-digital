// src/components/modals/ApplicationForm.js
import React from 'react';
import { X, Upload, Send } from 'lucide-react';

const ApplicationForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Formulir Aplikasi MBKM</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Masukkan nama lengkap" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">NIM</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Contoh: 11190910000xxx" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program Studi</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sistem Informasi</option>
                <option>Informatika</option>
                <option>Teknik Elektro</option>
                <option>Bisnis Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Angkatan</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kegiatan MBKM</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Magang Pengembang (3-6 bulan)</option>
              <option>Riset Independen (1 semester)</option>
              <option>Proyek Kemanusiaan (3-4 bulan)</option>
              <option>Studi Independen Bersertifikat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Proyek yang Diinginkan</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Contoh: Sistem E-Commerce untuk UMKM Kalimantan" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi & Motivasi</label>
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Jelaskan mengapa Anda tertarik dengan proyek ini dan bagaimana proyek ini akan memberikan dampak..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV & Portfolio</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop files atau <span className="text-blue-600 cursor-pointer">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOC max 10MB</p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Send className="h-4 w-4 mr-2" />
              Kirim Aplikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ApplicationForm;