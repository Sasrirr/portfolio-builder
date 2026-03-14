import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalInfo = () => {
  const { resumeData, updateData } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData('personalInfo', { [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="John" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" name="lastName" value={personalInfo.lastName} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="Doe" />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">Professional Title</label>
          <input type="text" name="jobTitle" value={personalInfo.jobTitle} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="Software Engineer" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={personalInfo.email} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="john@example.com" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="text" name="phone" value={personalInfo.phone} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="+1 (555) 000-0000" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Location</label>
          <input type="text" name="location" value={personalInfo.location} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="New York, NY" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="linkedin.com/in/johndoe" />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">GitHub / Portfolio URL</label>
          <input type="text" name="github" value={personalInfo.github} onChange={handleChange} className="p-2 border border-gray-300 rounded outline-none" placeholder="github.com/johndoe" />
        </div>

        {/* OVERVIEW SECTION */}
        <div className="flex flex-col md:col-span-2 mt-2">
          <label className="text-sm font-medium text-gray-700 mb-1">Overview (Summary)</label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            rows="4"
            className="p-2 border border-gray-300 rounded outline-none resize-none"
            placeholder="A brief summary of your professional background and goals..."
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;