// src/components/shared/PercentageDisplay.js
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PercentageDisplay = ({ 
  percentage, 
  label, 
  target, 
  previousValue, 
  size = 'medium',
  showTrend = true,
  showTarget = true 
}) => {
  const getPercentageColor = (value, targetValue) => {
    if (value >= targetValue) return 'text-green-600';
    if (value >= targetValue * 0.75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBackgroundColor = (value, targetValue) => {
    if (value >= targetValue) return 'bg-green-50';
    if (value >= targetValue * 0.75) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getBorderColor = (value, targetValue) => {
    if (value >= targetValue) return 'border-green-200';
    if (value >= targetValue * 0.75) return 'border-yellow-200';
    return 'border-red-200';
  };

  const getTrendIcon = () => {
    if (!showTrend || previousValue === undefined) return null;
    
    const diff = percentage - previousValue;
    if (diff > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (diff < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendValue = () => {
    if (!showTrend || previousValue === undefined) return null;
    
    const diff = (percentage - previousValue).toFixed(1);
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff}%`;
  };

  const sizeClasses = {
    small: {
      container: 'p-3',
      percentage: 'text-lg font-bold',
      label: 'text-xs',
      target: 'text-xs'
    },
    medium: {
      container: 'p-4',
      percentage: 'text-2xl font-bold',
      label: 'text-sm',
      target: 'text-sm'
    },
    large: {
      container: 'p-6',
      percentage: 'text-3xl font-bold',
      label: 'text-base',
      target: 'text-base'
    }
  };

  const classes = sizeClasses[size];

  return (
    <div className={`${getBackgroundColor(percentage, target)} ${getBorderColor(percentage, target)} border rounded-lg ${classes.container} text-center transition-all duration-200 hover:shadow-md`}>
      <div className={`${getPercentageColor(percentage, target)} ${classes.percentage} mb-1`}>
        {percentage.toFixed(1)}%
      </div>
      
      <div className={`text-gray-700 ${classes.label} font-medium mb-1`}>
        {label}
      </div>

      {showTarget && (
        <div className={`text-gray-500 ${classes.target} mb-2`}>
          Target: {target}%
        </div>
      )}

      {showTrend && previousValue !== undefined && (
        <div className="flex items-center justify-center space-x-1">
          {getTrendIcon()}
          <span className={`text-xs ${
            percentage > previousValue ? 'text-green-600' : 
            percentage < previousValue ? 'text-red-600' : 'text-gray-600'
          }`}>
            {getTrendValue()}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
        <div 
          className={`h-1.5 rounded-full transition-all duration-500 ${
            percentage >= target ? 'bg-green-500' : 
            percentage >= target * 0.75 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>

      {/* Status badge */}
      <div className="mt-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          percentage >= target ? 'bg-green-100 text-green-800' :
          percentage >= target * 0.75 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {percentage >= target ? 'Target Tercapai' :
           percentage >= target * 0.75 ? 'Mendekati Target' :
           'Di Bawah Target'}
        </span>
      </div>
    </div>
  );
};

export default PercentageDisplay;