import React, { useState } from 'react';
import axios from 'axios';
import { useResume } from '../../context/ResumeContext';
import { Sparkles, Loader2 } from 'lucide-react';

const ResumeUpload = () => {
  const { setResumeData } = useResume();
  const [pasteText, setPasteText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAutoFill = async () => {
    if (!pasteText.trim()) {
      alert("Please paste some text first!");
      return;
    }

    setIsParsing(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/parse-resume`, {
        resumeText: pasteText
      });

      let parsedData = response.data;

      const addIds = (arr) =>
        arr.map(item => ({ ...item, id: item.id || crypto.randomUUID() }));

      if (parsedData.experience) parsedData.experience = addIds(parsedData.experience);
      if (parsedData.education) parsedData.education = addIds(parsedData.education);
      if (parsedData.projects) parsedData.projects = addIds(parsedData.projects);

      setResumeData(prev => ({
        ...prev,
        ...parsedData,
        settings: prev.settings
      }));

      setPasteText('');
      setIsOpen(false);

      alert("Resume auto-filled successfully!");

    } catch (error) {
      console.error('Parsing failed:', error);
      alert("Failed to parse resume. Make sure your backend and Gemini API are running.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="bg-teal-50 border-2 border-teal-900 p-6 rounded-2xl shadow-[6px_6px_0px_0px_rgba(13,148,136,1)] mb-10">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-lg font-black text-teal-900 flex items-center gap-2 uppercase tracking-tight">
            <Sparkles size={20} className="text-teal-600" />
            AI Auto-Fill
          </h2>

          <p className="text-xs text-teal-700 font-bold mt-1 uppercase tracking-widest opacity-70">
            Power up your profile
          </p>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-teal-900 text-white px-5 py-2 rounded-lg text-xs font-black hover:bg-teal-800 transition-all active:translate-y-0.5"
        >
          {isOpen ? 'CLOSE' : 'START PARSING'}
        </button>

      </div>

      {isOpen && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">

          <textarea
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            rows="6"
            className="w-full p-3 border-2 border-teal-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 bg-white text-sm"
            placeholder="Paste your plain text resume here..."
          />

          <button
            onClick={handleAutoFill}
            disabled={isParsing}
            className="mt-3 w-full bg-teal-900 text-white py-2.5 rounded-lg font-bold hover:bg-teal-800 transition flex justify-center items-center gap-2 disabled:bg-teal-500"
          >
            {isParsing ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Reading and Categorizing... (5-10 seconds)
              </>
            ) : (
              'AUTO-FILL MY RESUME'
            )}
          </button>

        </div>
      )}

    </div>
  );
};

export default ResumeUpload;