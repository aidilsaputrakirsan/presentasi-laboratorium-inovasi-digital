// src/components/modals/AddAchievementForm.js
import React from 'react';
import { X, Upload, Award } from 'lucide-react';

const AddAchievementForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Dokumentasi Prestasi FSTI Baru</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Prestasi</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Masukkan judul prestasi" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Prestasi</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Prestasi Mahasiswa</option>
                <option>Prestasi Dosen</option>
                <option>Prestasi Alumni</option>
                <option>Prestasi Tim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level Prestasi</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Internasional</option>
                <option>Nasional</option>
                <option>Regional</option>
                <option>Institutional</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Penerima/Tim</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Nama orang atau tim yang meraih prestasi" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program Studi</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Sistem Informasi</option>
                <option>Informatika</option>
                <option>Teknik Elektro</option>
                <option>Bisnis Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Penyelenggara</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Institusi penyelenggara" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Prestasi</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
              <option>Academic Competition</option>
              <option>Research Award</option>
              <option>Innovation Award</option>
              <option>Industry Recognition</option>
              <option>Fintech Innovation</option>
              <option>Smart City Solutions</option>
              <option>IoT & Hardware</option>
              <option>AI & Machine Learning</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Prestasi</label>
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Deskripsi lengkap tentang prestasi yang diraih dan relevansinya dengan industri Kalimantan..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Penghargaan/Hadiah</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Nominal hadiah atau bentuk penghargaan" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dampak/Impact untuk Kalimantan</label>
            <textarea rows="3" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Jelaskan dampak atau impact dari prestasi ini untuk industri/masyarakat Kalimantan..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mentor/Pembimbing FSTI</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
              <option>Aidil Saputra Kirsan, M.Tr.Kom</option>
              <option>Dr. Rina Marwanti</option>
              <option>Dr. Yohanes Khoirul</option>
              <option>Dr. Linda Permata</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Sertifikat/Dokumen</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drag & drop sertifikat atau <span className="text-pink-600 cursor-pointer">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG max 10MB</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-medium text-pink-800 mb-2">Dokumentasi Prestasi FSTI</h4>
            <p className="text-sm text-pink-700 mb-2">Prestasi yang mendukung visi FSTI ITK:</p>
            <ul className="text-sm text-pink-600 space-y-1">
              <li>• Pengakuan kemampuan mahasiswa/dosen FSTI</li>
              <li>• Kontribusi solusi teknologi untuk Kalimantan</li>
              <li>• Peningkatan reputation FSTI di tingkat nasional/internasional</li>
              <li>• Strengthening industry-academic collaboration</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center">
              <Award className="h-4 w-4 mr-2" />
              Dokumentasi Prestasi
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default AddAchievementForm;