import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Plus } from 'lucide-react';

const Achievements = () => {
  const { resumeData, updateFlatArray } = useResume();
  const { achievements } = resumeData;
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !achievements.includes(inputValue.trim())) {
      updateFlatArray('achievements', [...achievements, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (itemToRemove) => {
    updateFlatArray('achievements', achievements.filter(item => item !== itemToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Achievements</h2>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          placeholder="e.g. 1st Place at Global Hackathon 2023"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition">
          <Plus size={18} /> Add
        </button>
      </form>

      <div className="flex flex-col gap-2">
        {achievements.map((ach, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 border border-gray-200 p-3 rounded text-sm text-gray-700">
            <span>{ach}</span>
            <button type="button" onClick={() => handleRemove(ach)} className="text-gray-400 hover:text-red-500 transition ml-2">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {achievements.length === 0 && <p className="text-gray-500 text-sm text-center py-2 italic">No achievements added yet.</p>}
    </div>
  );
};

export default Achievements;