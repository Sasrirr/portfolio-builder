import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Plus } from 'lucide-react';

const Hobbies = () => {
  const { resumeData, updateFlatArray } = useResume();
  const { hobbies } = resumeData;
  const [inputValue, setInputValue] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !hobbies.includes(inputValue.trim())) {
      updateFlatArray('hobbies', [...hobbies, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemove = (itemToRemove) => {
    updateFlatArray('hobbies', hobbies.filter(item => item !== itemToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Hobbies & Interests</h2>
      
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          placeholder="e.g. Photography, Open Source Contributing..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700 transition">
          <Plus size={18} /> Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex items-center gap-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-700">
            {hobby}
            <button type="button" onClick={() => handleRemove(hobby)} className="text-gray-400 hover:text-red-500 transition ml-1">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      
      {hobbies.length === 0 && <p className="text-gray-500 text-sm text-center py-2 italic">No hobbies added yet.</p>}
    </div>
  );
};

export default Hobbies;