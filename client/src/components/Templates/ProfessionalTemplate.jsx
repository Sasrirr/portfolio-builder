import React from 'react';
import { useResume } from '../../context/ResumeContext';

const ProfessionalTemplate = () => {
  const { resumeData } = useResume();
  
  // Destructuring with specific fallbacks for the new skills object structure
  const { 
    personalInfo, 
    education = [], 
    skills = { technical: [], soft: [] }, 
    experience = [], 
    projects = [], 
    achievements = [], 
    hobbies = [] 
  } = resumeData;

  return (
    <div className="w-full h-full bg-white text-gray-900 p-10 font-sans leading-snug shadow-lg" style={{ minHeight: '29.7cm', fontSize: '11pt' }}>
      
      {/* HEADER */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">
          {personalInfo.firstName || 'First'} {personalInfo.lastName || 'Last'}
        </h1>
        <div className="text-[10pt] flex justify-center flex-wrap gap-2 items-center">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {(personalInfo.phone || personalInfo.email) && personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <><span>|</span><span>{personalInfo.linkedin}</span></>
          )}
          {personalInfo.github && (
            <><span>|</span><span>{personalInfo.github}</span></>
          )}
        </div>
      </header>

      {/* OVERVIEW */}
      {personalInfo.summary && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Overview</h2>
          <p className="text-[10.5pt] text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-1.5">
              <div className="flex justify-between items-baseline font-bold text-[10.5pt]">
                <span>{edu.school || 'School Name'}</span>
                <span className="font-normal">{edu.startDate} {edu.startDate && edu.endDate && '–'} {edu.endDate}</span>
              </div>
              <div className="flex justify-between items-baseline text-[10.5pt]">
                <span className="italic">{edu.degree || 'Degree/Major'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SKILLS - UPDATED TO HANDLE CATEGORIES */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0) && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Skills</h2>
          
          {/* Technical Skills Row */}
          {skills.technical?.length > 0 && (
            <div className="text-[10.5pt] mb-1">
              <span className="font-bold">Technical Skills: </span> 
              {skills.technical.join(', ')}
            </div>
          )}

          {/* Soft Skills Row */}
          {skills.soft?.length > 0 && (
            <div className="text-[10.5pt]">
              <span className="font-bold italic">Core Strengths: </span> 
              <span className="italic text-gray-700">{skills.soft.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Experience</h2>
          {experience.map((job) => (
            <div key={job.id} className="mb-2.5">
              <div className="flex justify-between items-baseline text-[10.5pt]">
                <span className="font-bold">{job.company || 'Company Name'}</span>
                <span>{job.startDate} {job.startDate && job.endDate && '–'} {job.endDate}</span>
              </div>
              <div className="text-[10.5pt] italic mb-1">{job.role || 'Job Title'}</div>
              {job.description && (
                <ul className="list-disc list-outside ml-4 text-[10.5pt]">
                  {job.description.split('\n').filter(line => line.trim() !== '').map((bullet, i) => (
                    <li key={i} className="mb-0.5 pl-1">{bullet.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <div className="flex justify-between items-baseline text-[10.5pt]">
                <span className="font-bold">
                  {proj.title || 'Project Name'} {proj.link && <span className="font-normal italic">({proj.link})</span>}
                </span>
              </div>
              {proj.description && (
                <ul className="list-disc list-outside ml-4 text-[10.5pt]">
                  {proj.description.split('\n').filter(line => line.trim() !== '').map((bullet, i) => (
                    <li key={i} className="mb-0.5 pl-1">{bullet.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ACHIEVEMENTS */}
      {achievements.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Achievements</h2>
          <ul className="list-disc list-outside ml-4 text-[10.5pt]">
            {achievements.map((ach, i) => (
              <li key={i} className="mb-0.5 pl-1">{ach}</li>
            ))}
          </ul>
        </div>
      )}

      {/* HOBBIES */}
      {hobbies.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-1.5 pb-0.5">Hobbies</h2>
          <div className="text-[10.5pt]">
            {hobbies.join(', ')}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfessionalTemplate;