// src/components/modals/AddEventForm.js
import React from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';

const AddEventForm = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Tambah Event Baru</h2>
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
                <option>Kompetisi</option>
                <option>Networking</option>
                <option>Tech Talk</option>
                <option>Training</option>
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
              <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Lokasi event" />
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
            <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="Deskripsi lengkap tentang event..."></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Topics/Keywords</label>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500" placeholder="AI, Machine Learning, Technology (pisahkan dengan koma)" />
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