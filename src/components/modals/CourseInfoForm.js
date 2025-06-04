// src/components/modals/CourseInfoForm.js
import React from 'react';
import { X } from 'lucide-react';

const CourseInfoForm = ({ faculty, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-lg w-full">
      <div className="border-b p-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Informasi Mata Kuliah</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold">{faculty?.name}</h3>
          <p className="text-sm text-gray-600">{faculty?.role}</p>
          <p className="text-sm text-green-600 font-medium">Honorarium: Rp {faculty?.honorariumPerSKS?.toLocaleString()}/SKS</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mata Kuliah yang Diminati</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
              {faculty?.teachingCourses?.map((course, i) => (
                <option key={i}>{course.code} - {course.name} ({course.sks} SKS)</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                <option>Ganjil 2024</option>
                <option>Genap 2024</option>
                <option>Ganjil 2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hari</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                <option>Senin</option>
                <option>Selasa</option>
                <option>Rabu</option>
                <option>Kamis</option>
                <option>Jumat</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Waktu Tersedia</label>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {faculty?.availability}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Program Praktisi Mengajar</label>
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p><strong>Tahun:</strong> {faculty?.practisiMengajarProgram?.year}</p>
              <p><strong>Kategori:</strong> {faculty?.practisiMengajarProgram?.category}</p>
              <p><strong>Pendanaan:</strong> {faculty?.practisiMengajarProgram?.funding}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Tutup
            </button>
            <button type="submit" className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Download Silabus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CourseInfoForm;