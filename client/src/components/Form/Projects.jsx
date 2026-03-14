import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Projects = () => {
  const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
  const { projects } = resumeData;

  const handleAdd = () => {
    addArrayItem('projects', { title: '', link: '', description: '' });
  };

  const handleChange = (id, field, value) => {
    updateArrayItem('projects', id, { [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Projects</h2>
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.map((proj) => (
        <div key={proj.id} className="border border-gray-100 bg-gray-50 p-4 rounded-md mb-4 relative">
          <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition">
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Project Title</label>
              <input type="text" value={proj.title} onChange={(e) => handleChange(proj.id, 'title', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="E-commerce Platform" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
              <input type="text" value={proj.link} onChange={(e) => handleChange(proj.id, 'link', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="github.com/yourname/repo" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Description / Key Features</label>
              <textarea
                value={proj.description}
                onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                rows="4"
                className="p-2 border border-gray-300 rounded outline-none bg-white resize-none"
                placeholder="Describe the tech stack and what you built (use hyphens for bullet points)..."
              />
            </div>
          </div>
        </div>
      ))}
      
      {projects.length === 0 && <p className="text-gray-500 text-sm text-center py-4 italic">No projects added yet.</p>}
    </div>
  );
};

export default Projects;
