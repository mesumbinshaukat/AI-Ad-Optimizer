
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-slate-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};
