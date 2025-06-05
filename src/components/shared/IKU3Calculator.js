// src/components/shared/IKU3Calculator.js
import React from 'react';
import { Calculator, Target, TrendingUp, Users, CheckCircle } from 'lucide-react';

const IKU3Calculator = ({ 
  externalTeachingData, 
  researchCollaborationData, 
  industryConsultationData,
  facultyData 
}) => {
  // Calculate IKU 3 metrics
  const totalFaculty = facultyData?.length || 4; // Total dosen praktisi
  
  // Count faculty with external teaching
  const facultyWithExternalTeaching = new Set(
    externalTeachingData?.map(item => item.facultyId) || []
  ).size;
  
  // Count faculty with research collaboration
  const facultyWithCollaboration = new Set(
    researchCollaborationData?.map(item => item.leadFaculty) || []
  ).size;
  
  // Count faculty with industry consultation
  const facultyWithConsultation = new Set(
    industryConsultationData?.map(item => item.consultantName) || []
  ).size;
  
  // Calculate percentages
  const externalTeachingPercentage = ((facultyWithExternalTeaching / totalFaculty) * 100).toFixed(1);
  const collaborationPercentage = ((facultyWithCollaboration / totalFaculty) * 100).toFixed(1);
  const consultationPercentage = ((facultyWithConsultation / totalFaculty) * 100).toFixed(1);
  
  // Overall IKU 3 compliance (weighted average)
  const overallIKU3 = (
    (parseFloat(externalTeachingPercentage) * 0.4) + 
    (parseFloat(collaborationPercentage) * 0.4) + 
    (parseFloat(consultationPercentage) * 0.2)
  ).toFixed(1);
  
  const getPercentageColor = (percentage) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getStatusIcon = (percentage) => {
    if (percentage >= 75) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (percentage >= 50) return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    return <Target className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Calculator className="h-6 w-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">IKU 3 - Faculty Activity Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Total Faculty</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalFaculty}</div>
          <div className="text-xs text-blue-600">Dosen Praktisi</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(externalTeachingPercentage))}
            <span className="text-sm font-medium text-purple-800 ml-2">Mengajar Eksternal</span>
          </div>
          <div className={`text-2xl font-bold ${getPercentageColor(parseFloat(externalTeachingPercentage))}`}>
            {externalTeachingPercentage}%
          </div>
          <div className="text-xs text-purple-600">{facultyWithExternalTeaching}/{totalFaculty} dosen</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(collaborationPercentage))}
            <span className="text-sm font-medium text-green-800 ml-2">Kolaborasi Riset</span>
          </div>
          <div className={`text-2xl font-bold ${getPercentageColor(parseFloat(collaborationPercentage))}`}>
            {collaborationPercentage}%
          </div>
          <div className="text-xs text-green-600">{facultyWithCollaboration}/{totalFaculty} dosen</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(consultationPercentage))}
            <span className="text-sm font-medium text-orange-800 ml-2">Konsultasi Industri</span>
          </div>
          <div className={`text-2xl font-bold ${getPercentageColor(parseFloat(consultationPercentage))}`}>
            {consultationPercentage}%
          </div>
          <div className="text-xs text-orange-600">{facultyWithConsultation}/{totalFaculty} dosen</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-1">Skor Kepatuhan IKU 3 Keseluruhan</h4>
            <p className="text-sm text-blue-100">Rata-rata tertimbang: Mengajar Eksternal (40%) + Kolaborasi Riset (40%) + Konsultasi Industri (20%)</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{overallIKU3}%</div>
            <div className="text-sm text-blue-100">
              {parseFloat(overallIKU3) >= 75 ? 'Sangat Baik' : 
               parseFloat(overallIKU3) >= 50 ? 'Baik' : 'Perlu Perbaikan'}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Rincian Persyaratan IKU 3:</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>• Dosen praktisi mengajar di PT lain</span>
            <span className={getPercentageColor(parseFloat(externalTeachingPercentage))}>
              {externalTeachingPercentage}% (Target: ≥50%)
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Kolaborasi riset dengan institusi lain</span>
            <span className={getPercentageColor(parseFloat(collaborationPercentage))}>
              {collaborationPercentage}% (Target: ≥60%)
            </span>
          </div>
          <div className="flex justify-between">
            <span>• Konsultasi dengan industri</span>
            <span className={getPercentageColor(parseFloat(consultationPercentage))}>
              {consultationPercentage}% (Target: ≥40%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IKU3Calculator;