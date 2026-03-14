import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, X, BrainCircuit, MessageSquare } from 'lucide-react';

const Skills = () => {
  const { resumeData, updateSkillsCategory } = useResume();
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  // Extract skills safely with fallbacks to avoid the "undefined" map error
  const technicalSkills = resumeData.skills?.technical || [];
  const softSkills = resumeData.skills?.soft || [];

  const addSkill = (category, value, setInput) => {
    if (!value.trim()) return;
    const currentSkills = resumeData.skills[category] || [];
    if (!currentSkills.includes(value.trim())) {
      updateSkillsCategory(category, [...currentSkills, value.trim()]);
    }
    setInput('');
  };

  const removeSkill = (category, skillToRemove) => {
    const currentSkills = resumeData.skills[category] || [];
    const updated = currentSkills.filter(s => s !== skillToRemove);
    updateSkillsCategory(category, updated);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TECHNICAL SKILLS SECTION */}
      <div className="bg-white border-2 border-teal-900 p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(13,148,136,1)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-teal-900 flex items-center gap-2 uppercase tracking-tighter">
            <BrainCircuit size={18} className="text-teal-600" />
            Technical Prowess
          </h2>
          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Hard Skills</span>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill('technical', techInput, setTechInput)}
            placeholder="e.g. React, Python, AWS..."
            className="flex-1"
          />
          <button 
            onClick={() => addSkill('technical', techInput, setTechInput)}
            className="px-4 bg-teal-900 text-white rounded-lg hover:bg-teal-800 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Technical Chips */}
        <div className="flex flex-wrap gap-2">
          {technicalSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-1 bg-teal-50 border-2 border-teal-900 rounded-lg text-xs font-black text-teal-900 uppercase">
              {skill}
              <X 
                size={14} 
                className="cursor-pointer text-teal-400 hover:text-red-600 transition-colors" 
                onClick={() => removeSkill('technical', skill)} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. SOFT SKILLS SECTION */}
      <div className="bg-white border-2 border-teal-900 p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(13,148,136,1)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-teal-900 flex items-center gap-2 uppercase tracking-tighter">
            <MessageSquare size={18} className="text-teal-600" />
            Core Strengths
          </h2>
          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Soft Skills</span>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill('soft', softInput, setSoftInput)}
            placeholder="e.g. Leadership, Teamwork..."
            className="flex-1 italic" 
          />
          <button 
            onClick={() => addSkill('soft', softInput, setSoftInput)}
            className="px-4 bg-teal-900 text-white rounded-lg hover:bg-teal-800 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Soft Skills Chips */}
        <div className="flex flex-wrap gap-2">
          {softSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-teal-900 rounded-lg text-xs font-bold text-teal-900 italic">
              {skill}
              <X 
                size={14} 
                className="cursor-pointer text-teal-400 hover:text-red-600 transition-colors" 
                onClick={() => removeSkill('soft', skill)} 
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Skills;