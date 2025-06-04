// src/components/modals/AddEventForm.js
import React from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';

const AddEventForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tambah Event FSTI Baru</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Judul Event</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Masukkan judul event" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Event</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Seminar</option>
                <option>Workshop</option>
                <option>Tech Talk</option>
                <option>Kompetisi</option>
                <option>Networking</option>
                <option>Training</option>
                <option>Industry Visit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Waktu</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="09:00-17:00" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500">
                <option>Auditorium FSTI ITK</option>
                <option>Ruang Serbaguna FSTI</option>
                <option>Lab IoT FSTI ITK</option>
                <option>Lab Komputer FSTI</option>
                <option>Online (Zoom/Teams)</option>
                <option>Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas</label>
              <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="100" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Speaker/Pemateri</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Nama speaker dan afiliasinya" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Event</label>
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Deskripsi lengkap tentang event yang relevan dengan industri Kalimantan..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topics/Keywords (fokus industri Kalimantan)</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Kelapa Sawit, IoT, Smart Manufacturing, Fintech (pisahkan dengan koma)" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Peserta</label>
            <div className="grid grid-cols-2 gap-2">
              {['Mahasiswa FSTI', 'Dosen FSTI', 'Industri Kalimantan', 'Alumni FSTI', 'Startup Local', 'Government'].map((target) => (
                <label key={target} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">{target}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg">
            <h4 className="font-medium text-pink-800 mb-2">Event FSTI ITK</h4>
            <p className="text-sm text-pink-700 mb-2">Event yang mendukung ekosistem inovasi FSTI dengan fokus:</p>
            <ul className="text-sm text-pink-600 space-y-1">
              <li>• Kolaborasi dengan industri Kalimantan</li>
              <li>• Pengembangan skill mahasiswa FSTI</li>
              <li>• Knowledge sharing dengan praktisi</li>
              <li>• Networking akademik-industri</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Batal
            </button>
            <button type="submit" className="flex-1 bg-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Tambah Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default AddEventForm;