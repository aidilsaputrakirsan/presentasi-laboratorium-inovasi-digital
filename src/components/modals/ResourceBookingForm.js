// src/components/modals/ResourceBookingForm.js
import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Users, Server, Laptop } from 'lucide-react';

const ResourceBookingForm = ({ onClose, computingResourcesData, digitalEquipmentData, facultyData }) => {
  const [formData, setFormData] = useState({
    title: '',
    bookedBy: '',
    prodi: 'Sistem Informasi',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    participants: 1,
    supervisor: '',
    resourceType: 'computing', // computing or equipment
    selectedResources: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const prodiOptions = [
    'Sistem Informasi',
    'Informatika', 
    'Teknik Elektro',
    'Bisnis Digital'
  ];

  const availableResources = formData.resourceType === 'computing' 
    ? computingResourcesData?.filter(r => r.status === 'Online') || []
    : digitalEquipmentData?.filter(e => e.status === 'Available') || [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleResourceSelection = (resourceId) => {
    setFormData(prev => ({
      ...prev,
      selectedResources: prev.selectedResources.includes(resourceId)
        ? prev.selectedResources.filter(id => id !== resourceId)
        : [...prev.selectedResources, resourceId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Judul kegiatan harus diisi';
    if (!formData.bookedBy.trim()) newErrors.bookedBy = 'Nama pemohon harus diisi';
    if (!formData.date) newErrors.date = 'Tanggal harus dipilih';
    if (!formData.startTime) newErrors.startTime = 'Waktu mulai harus dipilih';
    if (!formData.endTime) newErrors.endTime = 'Waktu selesai harus dipilih';
    if (!formData.purpose.trim()) newErrors.purpose = 'Tujuan kegiatan harus diisi';
    if (formData.selectedResources.length === 0) newErrors.selectedResources = 'Minimal pilih satu resource';
    
    // Validate time range
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = 'Waktu selesai harus setelah waktu mulai';
    }

    // Validate date (must be future date)
    if (formData.date && new Date(formData.date) < new Date().setHours(0,0,0,0)) {
      newErrors.date = 'Tanggal tidak boleh di masa lalu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Booking data:', formData);
      
      // Simulate successful booking
      alert('Booking berhasil diajukan! Menunggu persetujuan dari Kalab.');
      onClose();
    }
  };

  const getResourceIcon = (type) => {
    return type === 'computing' ? Server : Laptop;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Booking Lab Resources</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Informasi Dasar</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Kegiatan *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Workshop IoT Development"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pemohon *
                </label>
                <input
                  type="text"
                  name="bookedBy"
                  value={formData.bookedBy}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.bookedBy ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nama lengkap"
                />
                {errors.bookedBy && <p className="text-red-500 text-sm mt-1">{errors.bookedBy}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Studi
                </label>
                <select
                  name="prodi"
                  value={formData.prodi}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {prodiOptions.map(prodi => (
                    <option key={prodi} value={prodi}>{prodi}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosen Pembimbing
                </label>
                <select
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Pilih Dosen Pembimbing</option>
                  {facultyData?.map(faculty => (
                    <option key={faculty.id} value={faculty.name}>{faculty.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Jadwal</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Tanggal *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Waktu Mulai *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.startTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Waktu Selesai *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.endTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
              </div>
            </div>
          </div>

          {/* Resource Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Pilih Resources</h3>
            
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, resourceType: 'computing', selectedResources: [] }))}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.resourceType === 'computing'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Server className="h-4 w-4 mr-2" />
                Computing Resources
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, resourceType: 'equipment', selectedResources: [] }))}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  formData.resourceType === 'equipment'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Laptop className="h-4 w-4 mr-2" />
                Digital Equipment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
              {availableResources.map((resource) => {
                const Icon = getResourceIcon(formData.resourceType);
                const isSelected = formData.selectedResources.includes(resource.id);
                
                return (
                  <div
                    key={resource.id}
                    onClick={() => handleResourceSelection(resource.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 mr-3 ${isSelected ? 'text-purple-600' : 'text-gray-500'}`} />
                      <div>
                        <h4 className="font-medium text-gray-800">{resource.name}</h4>
                        <p className="text-sm text-gray-600">
                          {formData.resourceType === 'computing' ? resource.type : resource.category}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.selectedResources && <p className="text-red-500 text-sm mt-1">{errors.selectedResources}</p>}
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Detail Tambahan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  Jumlah Peserta
                </label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="h-4 w-4 inline mr-1" />
                Tujuan Kegiatan *
              </label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                rows="3"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.purpose ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Jelaskan tujuan dan kegiatan yang akan dilakukan..."
              />
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan Tambahan
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="2"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Catatan atau permintaan khusus (opsional)..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceBookingForm;