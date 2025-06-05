// src/components/shared/ImpactAnalytics.js
import React from 'react';
import { BarChart3, TrendingUp, Award, DollarSign, Users, Target, Star, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const ImpactAnalytics = ({ 
  publicationImpactData, 
  patentCommercializationData, 
  researchAdoptionData 
}) => {
  // Calculate comprehensive IKU 5 metrics
  const totalPublications = publicationImpactData?.reduce((sum, faculty) => sum + faculty.totalPublications, 0) || 0;
  const totalCitations = publicationImpactData?.reduce((sum, faculty) => sum + faculty.totalCitations, 0) || 0;
  const averageHIndex = publicationImpactData?.length > 0 
    ? (publicationImpactData.reduce((sum, faculty) => sum + faculty.hIndex, 0) / publicationImpactData.length).toFixed(1)
    : 0;

  const totalPatentRevenue = patentCommercializationData?.reduce((sum, patent) => sum + patent.totalRevenue, 0) || 0;
  const commercializedPatents = patentCommercializationData?.filter(p => p.commercializationStatus === 'Licensed').length || 0;
  const totalPatents = patentCommercializationData?.length || 0;

  const totalAdoptions = researchAdoptionData?.reduce((sum, adoption) => sum + adoption.totalAdoptions, 0) || 0;
  const totalBeneficiaryOrgs = researchAdoptionData?.reduce((sum, adoption) => {
    return sum + (adoption.adoptingOrganizations?.length || 0);
  }, 0) || 0;

  // Calculate IKU 5 compliance scores
  const publicationImpactScore = Math.min(100, (totalCitations / 300) * 100); // Target: 300 citations
  const commercializationScore = totalPatents > 0 ? (commercializedPatents / totalPatents) * 100 : 0;
  const adoptionScore = Math.min(100, (totalAdoptions / 5) * 100); // Target: 5 adoptions
  
  // Overall IKU 5 score (weighted average)
  const overallIKU5Score = (
    (publicationImpactScore * 0.4) + 
    (commercializationScore * 0.3) + 
    (adoptionScore * 0.3)
  ).toFixed(1);

  // Data for charts
  const impactTrendData = [
    { month: 'Jul', publications: 8, citations: 120, patents: 1, adoptions: 2 },
    { month: 'Agu', publications: 10, citations: 135, patents: 1, adoptions: 3 },
    { month: 'Sep', publications: 12, citations: 155, patents: 2, adoptions: 4 },
    { month: 'Okt', publications: 14, citations: 180, patents: 2, adoptions: 5 },
    { month: 'Nov', publications: 15, citations: 200, patents: 3, adoptions: 6 },
    { month: 'Des', publications: 15, citations: 220, patents: 3, adoptions: 6 },
    { month: 'Jan', publications: 15, citations: 240, patents: 3, adoptions: 6 }
  ];

  const impactDistributionData = [
    { name: 'Publication Citations', value: publicationImpactScore, color: '#10B981' },
    { name: 'Patent Commercialization', value: commercializationScore, color: '#3B82F6' },
    { name: 'Research Adoption', value: adoptionScore, color: '#8B5CF6' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">IKU 5 - Research Impact Analytics</h3>
      </div>

      {/* Overall Score */}
      <div className={`${getScoreBgColor(parseFloat(overallIKU5Score))} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Overall IKU 5 Research Impact Score</h4>
            <p className="text-sm text-gray-600">Weighted: Publication Impact (40%) + Patent Commercialization (30%) + Research Adoption (30%)</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(parseFloat(overallIKU5Score))}`}>
              {overallIKU5Score}%
            </div>
            <div className="text-sm text-gray-600">
              {parseFloat(overallIKU5Score) >= 80 ? 'Excellent Impact' : 
               parseFloat(overallIKU5Score) >= 60 ? 'Good Impact' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Publications</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalPublications}</div>
          <div className="text-xs text-blue-600">Total Papers</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Citations</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{totalCitations}</div>
          <div className="text-xs text-green-600">H-Index: {averageHIndex}</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">Patents</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{commercializedPatents}/{totalPatents}</div>
          <div className="text-xs text-purple-600">Commercialized</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Lightbulb className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-800">Adoptions</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{totalAdoptions}</div>
          <div className="text-xs text-orange-600">{totalBeneficiaryOrgs} Organizations</div>
        </div>
      </div>

      {/* Impact Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Publication Impact</h4>
          <div className={`text-xl font-bold ${getScoreColor(publicationImpactScore)} mb-1`}>
            {publicationImpactScore.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600">Target: 300 total citations</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(publicationImpactScore, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Patent Commercialization</h4>
          <div className={`text-xl font-bold ${getScoreColor(commercializationScore)} mb-1`}>
            {commercializationScore.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600">Rp{(totalPatentRevenue/1000000).toFixed(0)} Juta revenue</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(commercializationScore, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Research Adoption</h4>
          <div className={`text-xl font-bold ${getScoreColor(adoptionScore)} mb-1`}>
            {adoptionScore.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-600">Target: 5 industry adoptions</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(adoptionScore, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Impact Growth Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={impactTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="citations" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Citations" />
              <Area type="monotone" dataKey="patents" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Patents" />
              <Area type="monotone" dataKey="adoptions" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Adoptions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-4">Impact Score Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={impactDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${value.toFixed(0)}%`}
              >
                {impactDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Action Items */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">IKU 5 Improvement Recommendations:</h4>
        <div className="space-y-2 text-sm text-blue-700">
          {publicationImpactScore < 80 && (
            <div>• Increase publication citations through international collaboration and Q1/Q2 journal targeting</div>
          )}
          {commercializationScore < 70 && (
            <div>• Accelerate patent commercialization through industry partnerships and licensing agreements</div>
          )}
          {adoptionScore < 80 && (
            <div>• Promote research adoption by strengthening industry engagement and technology transfer</div>
          )}
          <div>• Target: Achieve 80%+ overall IKU 5 score for research excellence recognition</div>
        </div>
      </div>
    </div>
  );
};

export default ImpactAnalytics;