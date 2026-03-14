import React from 'react';
import { useResume } from '../../context/ResumeContext';

const MinimalistTemplate = () => {
  const { resumeData } = useResume();
  const { 
    personalInfo, 
    education = [], 
    skills = [], 
    experience = [], 
    projects = [], 
    achievements = [], 
    hobbies = [] 
  } = resumeData;

  return (
    <div className="w-full h-full bg-white text-slate-800 p-12 font-sans leading-relaxed shadow-lg" style={{ minHeight: '29.7cm', fontSize: '10pt' }}>
      
      {/* MINIMAL HEADER */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 border-l-4 border-gray-900 pl-4 mb-2 uppercase">
            {personalInfo.firstName || 'First'} {personalInfo.lastName || 'Last'}
            </h1>
        <p className="text-lg text-gray-500 font-medium mb-4">{personalInfo.jobTitle}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-400 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN - MAIN CONTENT */}
        <div className="col-span-8 space-y-8">
          
          {/* OVERVIEW */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">Profile</h2>
              <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map((job) => (
                  <div key={job.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-gray-800">{job.role}</h3>
                      <span className="text-xs text-gray-400 uppercase">{job.startDate} — {job.endDate}</span>
                    </div>
                    <p className="text-gray-500 mb-2">{job.company}</p>
                    <ul className="space-y-1.5">
                      {job.description?.split('\n').filter(l => l.trim()).map((bullet, i) => (
                        <li key={i} className="text-gray-600 flex gap-2">
                          <span className="text-gray-300">•</span>
                          {bullet.replace(/^[-•]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4"> Projects</h2>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      {proj.title}
                      {proj.link && <span className="font-normal text-xs text-blue-500">{proj.link}</span>}
                    </h3>
                    <div className="mt-1 space-y-1 text-gray-600">
                      {proj.description?.split('\n').filter(l => l.trim()).map((bullet, i) => (
                        <p key={i} className="flex gap-2">
                           <span className="text-gray-300">›</span>
                           {bullet.replace(/^[-•]\s*/, '')}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="col-span-4 space-y-8">
          
          {/* SKILLS */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-gray-800 text-sm">{edu.degree}</p>
                    <p className="text-gray-500 text-sm">{edu.school}</p>
                    <p className="text-[9pt] text-gray-400 uppercase mt-1">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACHIEVEMENTS */}
          {achievements.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">Honors</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {achievements.map((ach, i) => (
                  <li key={i} className="leading-tight border-l-2 border-gray-100 pl-2">{ach}</li>
                ))}
              </ul>
            </section>
          )}

          {/* HOBBIES */}
          {hobbies.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">Interests</h2>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                {hobbies.join(', ')}
              </p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;