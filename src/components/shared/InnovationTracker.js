// src/components/shared/InnovationTracker.js
import React from 'react';
import { Lightbulb, Target, TrendingUp, Users, CheckCircle, Rocket, Award, Cpu, Code } from 'lucide-react';

const InnovationTracker = ({ 
  innovationProjectsData, 
  computingResourcesData, 
  digitalEquipmentData,
  facultyData 
}) => {
  // Calculate innovation metrics
  const totalProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.totalProjects, 0) || 0;
  const completedProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.completedProjects, 0) || 0;
  const activeProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.activeProjects, 0) || 0;
  
  // Calculate resource utilization
  const totalResources = computingResourcesData?.length || 0;
  const onlineResources = computingResourcesData?.filter(r => r.status === 'Online' || r.status === 'High Load').length || 0;
  const avgResourceUtilization = computingResourcesData?.length > 0 
    ? (computingResourcesData.reduce((sum, r) => {
        const avgUsage = (r.currentUsage.cpu + r.currentUsage.memory + r.currentUsage.storage) / 3;
        return sum + avgUsage;
      }, 0) / computingResourcesData.length).toFixed(1)
    : 0;

  // Calculate equipment metrics
  const totalEquipment = digitalEquipmentData?.length || 0;
  const availableEquipment = digitalEquipmentData?.filter(e => e.status === 'Available').length || 0;
  const inUseEquipment = digitalEquipmentData?.filter(e => e.status === 'In Use').length || 0;

  // Calculate success metrics
  const completionRate = totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(1) : 0;
  const resourceEfficiency = totalResources > 0 ? ((onlineResources / totalResources) * 100).toFixed(1) : 0;
  const equipmentUtilization = totalEquipment > 0 ? ((inUseEquipment / totalEquipment) * 100).toFixed(1) : 0;
  
  // Overall innovation score (weighted average)
  const overallInnovationScore = (
    (parseFloat(completionRate) * 0.4) + 
    (parseFloat(resourceEfficiency) * 0.3) + 
    (parseFloat(equipmentUtilization) * 0.3)
  ).toFixed(1);
  
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
  
  const getStatusIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 60) return <TrendingUp className="h-4 w-4 text-yellow-500" />;
    return <Target className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Lightbulb className="h-6 w-6 text-purple-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Lab Inovasi Digital - Innovation Tracker</h3>
      </div>

      {/* Overall Innovation Score */}
      <div className={`${getScoreBgColor(parseFloat(overallInnovationScore))} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Overall Innovation Performance</h4>
            <p className="text-sm text-gray-600">Weighted: Project Success (40%) + Resource Efficiency (30%) + Equipment Utilization (30%)</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(parseFloat(overallInnovationScore))}`}>
              {overallInnovationScore}%
            </div>
            <div className="text-sm text-gray-600">
              {parseFloat(overallInnovationScore) >= 80 ? 'Excellent Performance' : 
               parseFloat(overallInnovationScore) >= 60 ? 'Good Performance' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Rocket className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Total Projects</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{totalProjects}</div>
          <div className="text-xs text-blue-600">{activeProjects} active, {completedProjects} completed</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(completionRate))}
            <span className="text-sm font-medium text-purple-800 ml-2">Success Rate</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(parseFloat(completionRate))}`}>
            {completionRate}%
          </div>
          <div className="text-xs text-purple-600">Project completion rate</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(resourceEfficiency))}
            <span className="text-sm font-medium text-green-800 ml-2">Resource Efficiency</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(parseFloat(resourceEfficiency))}`}>
            {resourceEfficiency}%
          </div>
          <div className="text-xs text-green-600">{onlineResources}/{totalResources} resources online</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            {getStatusIcon(parseFloat(equipmentUtilization))}
            <span className="text-sm font-medium text-orange-800 ml-2">Equipment Usage</span>
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(parseFloat(equipmentUtilization))}`}>
            {equipmentUtilization}%
          </div>
          <div className="text-xs text-orange-600">{inUseEquipment}/{totalEquipment} equipment in use</div>
        </div>
      </div>

      {/* Per-Prodi Breakdown */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Innovation Projects by Program Study</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {innovationProjectsData?.map((prodi) => (
            <div key={prodi.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-800">{prodi.prodi}</h5>
                <div className="flex items-center">
                  {prodi.prodi === 'Sistem Informasi' && <Code className="h-4 w-4 text-blue-500 mr-1" />}
                  {prodi.prodi === 'Informatika' && <Cpu className="h-4 w-4 text-green-500 mr-1" />}
                  {prodi.prodi === 'Teknik Elektro' && <Target className="h-4 w-4 text-orange-500 mr-1" />}
                  {prodi.prodi === 'Bisnis Digital' && <Award className="h-4 w-4 text-purple-500 mr-1" />}
                  <span className="text-sm text-gray-600">{prodi.totalProjects} projects</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{prodi.totalProjects}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{prodi.completedProjects}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{prodi.activeProjects}</div>
                  <div className="text-xs text-gray-500">Active</div>
                </div>
              </div>

              {/* Recent Projects Preview */}
              {prodi.projects && prodi.projects.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-gray-600 mb-1">Latest Project:</div>
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {prodi.projects[0].title}
                  </div>
                  <div className="text-xs text-gray-500">
                    by {prodi.projects[0].student} • {prodi.projects[0].progress}% complete
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Computing Resources Status</h4>
          <div className="space-y-3">
            {computingResourcesData?.slice(0, 3).map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800 text-sm">{resource.name}</div>
                  <div className="text-xs text-gray-600">{resource.type}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    resource.status === 'Online' ? 'text-green-600' : 
                    resource.status === 'High Load' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {resource.status}
                  </div>
                  <div className="text-xs text-gray-500">
                    CPU: {resource.currentUsage.cpu}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-4">Lab Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Average Resource Utilization</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${avgResourceUtilization}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-blue-600">{avgResourceUtilization}%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Equipment Availability</span>
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(availableEquipment/totalEquipment)*100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {availableEquipment}/{totalEquipment}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Active Faculty Mentors</span>
              <span className="text-sm font-medium text-purple-600">{facultyData?.length || 0} mentors</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Innovation Output (Monthly)</span>
              <span className="text-sm font-medium text-orange-600">{activeProjects} active outputs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Lab Optimization Recommendations:</h4>
        <div className="space-y-2 text-sm text-blue-700">
          {parseFloat(completionRate) < 80 && (
            <div>• Increase project mentoring support to improve completion rates</div>
          )}
          {parseFloat(resourceEfficiency) < 80 && (
            <div>• Optimize resource allocation and schedule maintenance for better efficiency</div>
          )}
          {parseFloat(equipmentUtilization) < 60 && (
            <div>• Promote equipment usage through workshops and training sessions</div>
          )}
          {parseFloat(avgResourceUtilization) < 50 && (
            <div>• Consider consolidating workloads to improve resource utilization</div>
          )}
          <div>• Target: Achieve 80%+ overall innovation performance for excellence recognition</div>
        </div>
      </div>
    </div>
  );
};

export default InnovationTracker;