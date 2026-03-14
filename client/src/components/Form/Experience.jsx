import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, PenTool } from 'lucide-react';
import axios from 'axios';

const Experience = () => {
  const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
  const { experience } = resumeData;
  const [loadingId, setLoadingId] = useState(null);

  const handleAdd = () => {
    addArrayItem('experience', {
      company: '', role: '', startDate: '', endDate: '', description: ''
    });
  };

  const handleChange = (id, field, value) => {
    updateArrayItem('experience', id, { [field]: value });
  };

  const handleGhostwrite = async (id, role, company, currentDesc) => {
    if (!role) {
      alert("Please enter a Job Title first so I know what to write about!");
      return;
    }

    setLoadingId(id);
    try {
      const response = await axios.post('http://localhost:5000/api/generate-description', {
        role,
        company
      });
      
      const newText = currentDesc ? `${currentDesc}\n${response.data.description}` : response.data.description;
      updateArrayItem('experience', id, { description: newText });
    } catch (error) {
      console.error("Ghostwrite failed:", error);
      alert("Failed to generate text. Is your backend running?");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition">
          <Plus size={16} /> Add Job
        </button>
      </div>

      {experience.map((job) => (
        <div key={job.id} className="border border-gray-100 bg-gray-50 p-4 rounded-md mb-4 relative">
          <button onClick={() => removeArrayItem('experience', job.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition">
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" value={job.company} onChange={(e) => handleChange(job.id, 'company', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="Tech Corp Inc." />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" value={job.role} onChange={(e) => handleChange(job.id, 'role', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="Software Engineer" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="text" value={job.startDate} onChange={(e) => handleChange(job.id, 'startDate', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="Jan 2022" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="text" value={job.endDate} onChange={(e) => handleChange(job.id, 'endDate', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="Present" />
            </div>

            <div className="flex flex-col md:col-span-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                
                {/* THE GHOSTWRITE BUTTON */}
                <button 
                  onClick={() => handleGhostwrite(job.id, job.role, job.company, job.description)}
                  disabled={loadingId === job.id}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-200 px-2.5 py-1 rounded hover:bg-slate-300 transition disabled:opacity-50"
                >
                  <PenTool size={14} />
                  {loadingId === job.id ? 'Drafting...' : 'Ghostwrite'}
                </button>
              </div>
              
              <textarea
                value={job.description}
                onChange={(e) => handleChange(job.id, 'description', e.target.value)}
                rows="5"
                className="p-2 border border-gray-300 rounded outline-none bg-white resize-none"
                placeholder="Describe your achievements..."
              />
            </div>
          </div>
        </div>
      ))}
      
      {experience.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-4 italic">No experience added yet.</p>
      )}
    </div>
  );
};

export default Experience;