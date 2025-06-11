// src/components/shared/LabAnalytics.js
import React from 'react';
import { BarChart3, TrendingUp, Server, Laptop, Users, Target, Zap, Monitor } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const LabAnalytics = ({ 
  labUtilizationData,
  computingResourcesData, 
  digitalEquipmentData,
  innovationProjectsData,
  facultyData 
}) => {
  // Calculate comprehensive lab metrics
  const totalResources = computingResourcesData?.length || 0;
  const onlineResources = computingResourcesData?.filter(r => r.status === 'Online' || r.status === 'High Load').length || 0;
  const resourceUptime = totalResources > 0 ? ((onlineResources / totalResources) * 100).toFixed(1) : 0;

  const totalEquipment = digitalEquipmentData?.length || 0;
  const availableEquipment = digitalEquipmentData?.filter(e => e.status === 'Available').length || 0;
  const inUseEquipment = digitalEquipmentData?.filter(e => e.status === 'In Use').length || 0;
  const equipmentUtilization = totalEquipment > 0 ? ((inUseEquipment / totalEquipment) * 100).toFixed(1) : 0;

  const totalProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.totalProjects, 0) || 0;
  const completedProjects = innovationProjectsData?.reduce((sum, prodi) => sum + prodi.completedProjects, 0) || 0;
  const projectSuccessRate = totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(1) : 0;

  // Calculate average resource usage
  const avgCpuUsage = computingResourcesData?.length > 0 
    ? (computingResourcesData.reduce((sum, r) => sum + r.currentUsage.cpu, 0) / computingResourcesData.length).toFixed(1)
    : 0;
  const avgMemoryUsage = computingResourcesData?.length > 0 
    ? (computingResourcesData.reduce((sum, r) => sum + r.currentUsage.memory, 0) / computingResourcesData.length).toFixed(1)
    : 0;

  // Calculate lab efficiency score
  const labEfficiencyScore = (
    (parseFloat(resourceUptime) * 0.3) + 
    (parseFloat(equipmentUtilization) * 0.3) + 
    (parseFloat(projectSuccessRate) * 0.4)
  ).toFixed(1);

  // Data for charts
  const utilizationTrendData = labUtilizationData || [
    { month: 'Jul', workstations: 65, servers: 45, equipment: 70, overall: 60 },
    { month: 'Agu', workstations: 72, servers: 52, equipment: 75, overall: 66 },
    { month: 'Sep', workstations: 78, servers: 58, equipment: 80, overall: 72 },
    { month: 'Okt', workstations: 85, servers: 67, equipment: 85, overall: 79 },
    { month: 'Nov', workstations: 89, servers: 74, equipment: 88, overall: 84 },
    { month: 'Des', workstations: 82, servers: 69, equipment: 82, overall: 78 },
    { month: 'Jan', workstations: 87, servers: 71, equipment: 85, overall: 81 }
  ];

  const resourceDistributionData = [
    { name: 'Computing Resources', value: parseFloat(resourceUptime), color: '#3B82F6' },
    { name: 'Equipment Utilization', value: parseFloat(equipmentUtilization), color: '#8B5CF6' },
    { name: 'Project Success', value: parseFloat(projectSuccessRate), color: '#10B981' }
  ];

  const equipmentCategoryData = [
    { name: 'Computing', value: digitalEquipmentData?.filter(e => e.category === 'Computing').length || 1, color: '#3B82F6' },
    { name: 'Prototyping', value: digitalEquipmentData?.filter(e => e.category === 'Prototyping').length || 1, color: '#8B5CF6' },
    { name: 'IoT Development', value: digitalEquipmentData?.filter(e => e.category === 'IoT Development').length || 2, color: '#10B981' },
    { name: 'Testing Equipment', value: digitalEquipmentData?.filter(e => e.category === 'Testing Equipment').length || 1, color: '#F59E0B' }
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
        <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Lab Inovasi Digital - Performance Analytics</h3>
      </div>

      {/* Overall Efficiency Score */}
      <div className={`${getScoreBgColor(parseFloat(labEfficiencyScore))} rounded-lg p-6 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Overall Lab Efficiency Score</h4>
            <p className="text-sm text-gray-600">Weighted: Resource Uptime (30%) + Equipment Utilization (30%) + Project Success (40%)</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(parseFloat(labEfficiencyScore))}`}>
              {labEfficiencyScore}%
            </div>
            <div className="text-sm text-gray-600">
              {parseFloat(labEfficiencyScore) >= 80 ? 'Excellent Performance' : 
               parseFloat(labEfficiencyScore) >= 60 ? 'Good Performance' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Server className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">Resource Uptime</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">{resourceUptime}%</div>
          <div className="text-xs text-blue-600">{onlineResources}/{totalResources} online</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Laptop className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-800">Equipment Usage</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">{equipmentUtilization}%</div>
          <div className="text-xs text-purple-600">{inUseEquipment}/{totalEquipment} in use</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-800">Project Success</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{projectSuccessRate}%</div>
          <div className="text-xs text-green-600">{completedProjects}/{totalProjects} completed</div>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-5 w-5 text-orange-600 mr-2" />
            <span className="text-sm font-medium text-orange-800">Active Mentors</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{facultyData?.length || 4}</div>
          <div className="text-xs text-orange-600">Faculty mentors</div>
        </div>
      </div>

      {/* Resource Performance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Avg CPU Usage</h4>
          <div className={`text-xl font-bold ${getScoreColor(100 - parseFloat(avgCpuUsage))} mb-1`}>
            {avgCpuUsage}%
          </div>
          <div className="text-xs text-gray-600">Across all servers</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${avgCpuUsage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Avg Memory Usage</h4>
          <div className={`text-xl font-bold ${getScoreColor(100 - parseFloat(avgMemoryUsage))} mb-1`}>
            {avgMemoryUsage}%
          </div>
          <div className="text-xs text-gray-600">Across all servers</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${avgMemoryUsage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2 text-sm">Equipment Availability</h4>
          <div className={`text-xl font-bold ${getScoreColor(parseFloat(equipmentUtilization))} mb-1`}>
            {availableEquipment}
          </div>
          <div className="text-xs text-gray-600">Equipment ready to use</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(availableEquipment/totalEquipment)*100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Lab Utilization Trends</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={utilizationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="workstations" stroke="#3B82F6" strokeWidth={2} name="Workstations" />
              <Line type="monotone" dataKey="servers" stroke="#10B981" strokeWidth={2} name="Servers" />
              <Line type="monotone" dataKey="equipment" stroke="#8B5CF6" strokeWidth={2} name="Equipment" />
              <Line type="monotone" dataKey="overall" stroke="#F59E0B" strokeWidth={3} name="Overall" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-4">Performance Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={resourceDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${value}%`}
              >
                {resourceDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Equipment Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-4">Equipment by Category</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={equipmentCategoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {equipmentCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-4">Lab Performance Metrics</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Monitor className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-800">Workstation Utilization</span>
              </div>
              <span className="text-lg font-bold text-blue-600">
                {utilizationTrendData[utilizationTrendData.length - 1]?.workstations || 87}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm font-medium text-gray-800">Server Performance</span>
              </div>
              <span className="text-lg font-bold text-green-600">
                {utilizationTrendData[utilizationTrendData.length - 1]?.servers || 71}%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm font-medium text-gray-800">Overall Efficiency</span>
              </div>
              <span className="text-lg font-bold text-purple-600">
                {utilizationTrendData[utilizationTrendData.length - 1]?.overall || 81}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Lab Optimization Recommendations:</h4>
        <div className="space-y-2 text-sm text-blue-700">
          {parseFloat(resourceUptime) < 85 && (
            <div>• Schedule regular maintenance to improve resource uptime and reliability</div>
          )}
          {parseFloat(equipmentUtilization) < 70 && (
            <div>• Increase equipment utilization through training workshops and project assignments</div>
          )}
          {parseFloat(avgCpuUsage) > 80 && (
            <div>• Consider load balancing or additional computing resources for high-demand periods</div>
          )}
          {parseFloat(projectSuccessRate) < 75 && (
            <div>• Enhance project mentoring and provide additional technical support for students</div>
          )}
          <div>• Target: Achieve 85%+ overall lab efficiency for optimal innovation output</div>
        </div>
      </div>
    </div>
  );
};

export default LabAnalytics;