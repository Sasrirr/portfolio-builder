import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonalInfo from './components/Form/PersonalInfo';
import Education from './components/Form/Education';
import Skills from './components/Form/Skills';
import Experience from './components/Form/Experience';
import Projects from './components/Form/Projects';
import Achievements from './components/Form/Achievements';
import Hobbies from './components/Form/Hobbies';
import TemplateRenderer from './components/Templates/TemplateRenderer';
import { useResume } from './context/ResumeContext';
import ResumeUpload from './components/Form/ResumeUpload';
import { RotateCcw, Download, Cloud } from 'lucide-react';
import ConfirmModal from './components/UI/ConfirmModal';

const TEMP_USER_ID = "guest-user-123";
const API_BASE = import.meta.env.VITE_API_URL || '';

function App() {
  const { resumeData, updateData, setResumeData, resetForm } = useResume();
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/resume/${TEMP_USER_ID}`);
        if (response.data) {
          const { _id, userId, createdAt, updatedAt, __v, ...pureResumeData } = response.data;
          setResumeData(pureResumeData);
        }
      } catch (error) {
        console.log("No existing save found.");
      }
    };
    loadData();
  }, [setResumeData]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.post(`${API_BASE}/api/resume`, {
        userId: TEMP_USER_ID,
        resumeData: resumeData
      });
      alert("Changes synced to cloud.");
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => window.print();

  return (
    <div className="min-h-screen bg-cyan-50/30 flex flex-col font-sans">

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={resetForm}
        title="Clear Canvas?"
        message="This will wipe all current fields. This action is permanent unless you have a cloud save."
      />

      {/* HEADER */}
      <header className="no-print sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b-2 border-teal-900 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 border-2 border-teal-900 rounded-lg flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(13,148,136,1)]">
            <span className="text-white font-black text-xl italic">P</span>
          </div>

          <h1 className="text-xl font-black text-teal-900 tracking-tighter">
            PORTFOLIO <span className="text-teal-600">BUILDER</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-teal-700 hover:text-orange-600 transition-colors font-bold text-sm"
          >
            <RotateCcw size={16} />
            <span>RESET</span>
          </button>

          <div className="h-6 w-px bg-teal-200"></div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 border-2 border-teal-900 bg-white text-teal-900 font-bold text-xs rounded-lg hover:bg-teal-50"
            >
              <Cloud size={14} />
              {isSaving ? 'SYNCING...' : 'SAVE CLOUD'}
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2 border-2 border-teal-900 bg-teal-900 text-white font-bold text-xs rounded-lg hover:bg-teal-800 shadow-[4px_4px_0px_0px_rgba(13,148,136,0.3)]"
            >
              <Download size={14} />
              DOWNLOAD PDF
            </button>
          </div>
        </div>
      </header>

      {/* PASTE START */}
      <main className="flex h-[calc(100vh-76px)] overflow-hidden bg-teal-50/10">
        
        {/* LEFT PANE: Independent Scroll for Form Editor */}
        <section className="w-1/2 h-full overflow-y-auto border-r-2 border-teal-900 bg-white p-8 custom-scrollbar scroll-smooth">
          <div className="max-w-2xl mx-auto space-y-10 pb-32">
            <ResumeUpload /> 
            <PersonalInfo />
            <Education />
            <Skills />
            <Experience />
            <Projects />
            <Achievements />
            <Hobbies />
          </div>
        </section>

        {/* RIGHT PANE: Independent Scroll for Resume Preview */}
        <section className="w-1/2 h-full overflow-y-auto bg-teal-50/40 p-12 flex flex-col items-center custom-scrollbar scroll-smooth">
          
          {/* Floating Template Picker */}
          <div className="no-print flex gap-2 mb-10 bg-white p-1.5 border-2 border-teal-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(13,148,136,1)] z-20">
            <button 
              onClick={() => updateData('settings', { template: 'professional' })}
              className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                resumeData.settings.template === 'professional'
                  ? 'bg-teal-900 text-white'
                  : 'text-teal-900 hover:bg-teal-50'
              }`}
            >
              Professional
            </button>

            <button 
              onClick={() => updateData('settings', { template: 'minimalist' })}
              className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                resumeData.settings.template === 'minimalist'
                  ? 'bg-teal-900 text-white'
                  : 'text-teal-900 hover:bg-teal-50'
              }`}
            >
              Minimalist
            </button>
          </div>
          
          <div className="resume-paper w-full max-w-[21cm] mb-20 origin-top scale-95 xl:scale-100">
            <TemplateRenderer />
          </div>

        </section>
      </main>
      {/* PASTE END */}

    </div>
  );
}

export default App;
