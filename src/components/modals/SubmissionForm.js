// src/components/modals/SubmissionForm.js
import React from 'react';
import { X, Upload, Send, CheckCircle } from 'lucide-react';

const SubmissionForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Submit Karya Ilmiah</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Karya Ilmiah</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
              <option>Publikasi Jurnal</option>
              <option>Pengajuan HKI/Paten (via DJKI)</option>
              <option>Laporan PkM</option>
              <option>Penghargaan/Recognition</option>
              <option>Laporan Penelitian</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Karya</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Masukkan judul penelitian/karya" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Authors/Inventors</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Nama penulis/inventor (pisahkan dengan koma)" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tahun</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500">
                <option>Published</option>
                <option>Accepted</option>
                <option>Under Review</option>
                <option>Submitted</option>
                <option>Dalam Proses DJKI</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Abstract/Deskripsi</label>
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500" placeholder="Abstrak penelitian atau deskripsi karya..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop PDF atau <span className="text-green-600 cursor-pointer">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF max 50MB • Untuk HKI: sertakan dokumen DJKI</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Sistem Terintegrasi</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Auto SISTER entry</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>SINTA compliance</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>LPPM approval workflow</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>DJKI process tracking</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
              <Send className="h-4 w-4 mr-2" />
              Submit ke Sistem
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SubmissionForm;