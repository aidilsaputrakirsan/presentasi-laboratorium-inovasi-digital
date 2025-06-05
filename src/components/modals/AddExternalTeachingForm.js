// src/components/modals/AddExternalTeachingForm.js
import React, { useState } from 'react';
import { X, School, Upload, Plus } from 'lucide-react';

const AddExternalTeachingForm = ({ onClose, facultyData }) => {
  const [formData, setFormData] = useState({
    facultyId: '',
    institution: '',
    course: '',
    type: 'Dosen Tamu',
    semester: 'Ganjil 2024',
    sks: 2,
    students: 30,
    startDate: '',
    endDate: '',
    location: '',
    honorarium: 5000000,
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('External Teaching Data:', formData);
    // Here you would normally save to database
    alert('Data external teaching berhasil ditambahkan!');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Tambah External Teaching - IKU 3</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosen Praktisi</label>
                <select 
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Pilih Dosen</option>
                  {facultyData?.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institusi Tujuan</label>
                <input 
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Universitas Mulawarman"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Kuliah</label>
                <input 
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Cloud Computing Architecture"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kegiatan</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Dosen Tamu">Dosen Tamu</option>
                  <option value="Profesor Tamu">Profesor Tamu</option>
                  <option value="Koordinator Mata Kuliah">Koordinator Mata Kuliah</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Semester</label>
                <select 
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Ganjil 2024">Ganjil 2024</option>
                  <option value="Genap 2024">Genap 2024</option>
                  <option value="Ganjil 2025">Ganjil 2025</option>
                  <option value="Genap 2025">Genap 2025</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKS</label>
                <input 
                  type="number"
                  name="sks"
                  value={formData.sks}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  min="1"
                  max="6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Mahasiswa</label>
                <input 
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                <input 
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai</label>
                <input 
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                <input 
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  placeholder="Samarinda, Kaltim"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Honorarium (Rp)</label>
                <input 
                  type="number"
                  name="honorarium"
                  value={formData.honorarium}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  min="0"
                  step="100000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Kegiatan</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                placeholder="Deskripsi singkat tentang kegiatan mengajar eksternal..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen Pendukung</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload surat tugas atau kontrak mengajar</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC max 10MB</p>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                <button type="button" className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                  Pilih File
                </button>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">IKU 3 - External Teaching Tracker</h4>
              <p className="text-sm text-purple-700 mb-2">Kegiatan ini mendukung IKU 3 FSTI ITK:</p>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Dosen praktisi mengajar di PT lain (target ≥50% faculty)</li>
                <li>• Dokumentasi resmi untuk pelaporan IKU</li>
                <li>• Kolaborasi akademik antar institusi</li>
                <li>• Sharing expertise FSTI ke institusi lain</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah External Teaching
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExternalTeachingForm;