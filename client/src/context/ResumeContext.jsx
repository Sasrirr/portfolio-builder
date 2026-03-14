import React, { createContext, useContext, useState } from 'react';

// 1. Create the Context
const ResumeContext = createContext();

// 2. Create the Provider Component
export const ResumeProvider = ({ children }) => {
  // The global state structure for the entire resume
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      summary: '', 
      linkedin: '',
      github: '',
    },
    experience: [], 
    education: [],  
    // UPDATED: Skills is now a categorized object to match backend AI logic
    skills: { 
      technical: [], 
      soft: [] 
    },     
    projects: [],   
    achievements: [], 
    hobbies: [],      
    settings: {
      template: 'professional', 
      color: '#000000', 
      font: 'sans',
    }
  });

  // Helper: Update object data (Personal Info, Settings)
  const updateData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Helper: Specifically for the categorized Skills object
  // category: 'technical' or 'soft'
  const updateSkillsCategory = (category, newArray) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: newArray
      }
    }));
  };

  // Helper: Add item to array (Experience, Education, Projects)
  const addArrayItem = (section, item) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: crypto.randomUUID(), ...item }]
    }));
  };

  // Helper: Update specific array item by ID
  const updateArrayItem = (section, id, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) => 
        item.id === id ? { ...item, ...data } : item
      )
    }));
  };

  // Helper: Remove item from array by ID
  const removeArrayItem = (section, id) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id)
    }));
  };

  // Helper: Update flat arrays (like Achievements, Hobbies)
  const updateFlatArray = (section, newArray) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: newArray
    }));
  };

  // Helper: Reset the entire form to empty state
  const resetForm = () => {
    setResumeData({
      personalInfo: {
        firstName: '', lastName: '', jobTitle: '', email: '', phone: '', location: '', summary: '', linkedin: '', github: '',
      },
      experience: [],
      education: [],
      // UPDATED: Reset to the categorized object structure
      skills: { technical: [], soft: [] },
      projects: [],
      achievements: [],
      hobbies: [],
      settings: {
        template: 'professional',
        color: '#000000',
        font: 'sans',
      }
    });
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateData,
      updateSkillsCategory, // Exported helper
      addArrayItem,
      updateArrayItem,
      removeArrayItem,
      updateFlatArray,
      setResumeData,
      resetForm 
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

// 3. Create a custom hook for easy access in our components
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};