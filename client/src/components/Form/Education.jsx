import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const Education = () => {
  const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    addArrayItem('education', { school: '', degree: '', startDate: '', endDate: '' });
  };

  const handleChange = (id, field, value) => {
    updateArrayItem('education', id, { [field]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Education</h2>
        <button onClick={handleAdd} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition">
          <Plus size={16} /> Add Education
        </button>
      </div>

      {education.map((edu) => (
        <div key={edu.id} className="border border-gray-100 bg-gray-50 p-4 rounded-md mb-4 relative">
          <button onClick={() => removeArrayItem('education', edu.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition">
            <Trash2 size={18} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">School / University</label>
              <input type="text" value={edu.school} onChange={(e) => handleChange(edu.id, 'school', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="Harvard University" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Degree / Field of Study</label>
              <input type="text" value={edu.degree} onChange={(e) => handleChange(edu.id, 'degree', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="B.S. Computer Science" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="text" value={edu.startDate} onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="2018" />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="text" value={edu.endDate} onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)} className="p-2 border border-gray-300 rounded outline-none bg-white" placeholder="2022" />
            </div>
          </div>
        </div>
      ))}
      
      {education.length === 0 && <p className="text-gray-500 text-sm text-center py-4 italic">No education added yet.</p>}
    </div>
  );
};

export default Education;