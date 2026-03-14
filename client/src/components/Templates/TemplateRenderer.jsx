import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ProfessionalTemplate from './ProfessionalTemplate';
import MinimalistTemplate from './MinimalistTemplate';

const TemplateRenderer = () => {
  const { resumeData } = useResume();
  
  // Read the current template string from settings (defaults to 'professional')
  const currentTemplate = resumeData.settings?.template || 'professional';

  // Map the string to the actual React component
  const templates = {
    professional: <ProfessionalTemplate />,
    minimalist: <MinimalistTemplate />
  };

  // Render the selected template, or fallback to Professional if something breaks
  return templates[currentTemplate] || <ProfessionalTemplate />;
};

export default TemplateRenderer;