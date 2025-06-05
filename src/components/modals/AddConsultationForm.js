// src/components/modals/AddConsultationForm.js
import React, { useState } from 'react';
import { X, Building, Upload, Plus } from 'lucide-react';

const AddConsultationForm = ({ onClose, facultyData }) => {
  const [formData, setFormData] = useState({
    consultantId: '',
    clientCompany: '',
    projectTitle: '',
    industry: 'Teknologi',
    type: 'Konsultasi Teknologi',
    startDate: '',
    endDate: '',
    totalValue: 25000000,
    expertise: [],
    deliverables: [],
    description: '',
    contractNumber: ''
  });

  const [newExpertise, setNewExpertise] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');

  const industries = [
    'Pertanian', 'Minyak & Gas', 'Perbankan', 'Manufaktur', 
    'Teknologi', 'Pertambangan', 'Logistik', 'Pendidikan'
  ];

  const consultationTypes = [
    'Konsultasi Teknologi',
    'Konsultasi Strategis', 
    'Konsultasi Implementasi',
    'Konsultasi Riset'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Industry Consultation Data:', formData);
    // Here you would normally save to database
    alert('Data konsultasi industri berhasil ditambahkan!');
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !formData.expertise.includes(newExpertise.trim())) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const addDeliverable = () => {
    if (newDeliverable.trim() && !formData.deliverables.includes(newDeliverable.trim())) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()]
      }));
      setNewDeliverable('');
    }
  };

  const removeDeliverable = (index) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Tambah Industry Consultation - IKU 3</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultant (Dosen)</label>
                <select 
                  name="consultantId"
                  value={formData.consultantId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Pilih Dosen Consultant</option>
                  {facultyData?.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Company</label>
                <input 
                  type="text"
                  name="clientCompany"
                  value={formData.clientCompany}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  placeholder="PT Astra Agro Lestari"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
              <input 
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Cloud Infrastructure Migration for Plantation Management"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select 
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                >
                  {consultationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Value (Rp)</label>
                <input 
                  type="number"
                  name="totalValue"
                  value={formData.totalValue}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  min="0"
                  step="1000000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract Number</label>
              <input 
                type="text"
                name="contractNumber"
                value={formData.contractNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="KONSUL-ITK-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expertise Areas</label>
              <div className="flex space-x-2 mb-2">
                <input 
                  type="text"
                  value={newExpertise}
                  onChange={(e) => setNewExpertise(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  placeholder="Cloud Computing"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
                />
                <button 
                  type="button"
                  onClick={addExpertise}
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={() => removeExpertise(index)}
                      className="ml-2 hover:text-orange-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deliverables</label>
              <div className="flex space-x-2 mb-2">
                <input 
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                  placeholder="Cloud architecture blueprint"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDeliverable())}
                />
                <button 
                  type="button"
                  onClick={addDeliverable}
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1">
                {formData.deliverables.map((deliverable, index) => (
                  <div 
                    key={index}
                    className="bg-gray-100 px-3 py-2 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-sm">{deliverable}</span>
                    <button 
                      type="button"
                      onClick={() => removeDeliverable(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Deskripsi lengkap tentang project konsultasi dan outcomes yang diharapkan..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Contract/Agreement</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload kontrak atau agreement konsultasi</p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOC max 10MB</p>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                <button type="button" className="mt-2 bg-orange-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-700 transition-colors">
                  Pilih File
                </button>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium text-orange-800 mb-2">IKU 3 - Industry Consultation Tracker</h4>
              <p className="text-sm text-orange-700 mb-2">Kegiatan konsultasi ini mendukung IKU 3 FSTI ITK:</p>
              <ul className="text-sm text-orange-600 space-y-1">
                <li>• Dosen praktisi memberikan konsultasi ke industri (target ≥40% faculty)</li>
                <li>• Transfer teknologi dan knowledge ke industri Kalimantan</li>
                <li>• Dokumentasi revenue generation dari konsultasi</li>
                <li>• Strengthening industry-academic collaboration</li>
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
                className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Consultation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddConsultationForm;