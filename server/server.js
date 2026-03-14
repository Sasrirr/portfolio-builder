import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import Resume from './models/Resume.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the Gemini AI client
const ai = new GoogleGenAI({});

// Basic health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is healthy and running.' });
});

// Route 1: Parse uploaded resume text into JSON
// server.js
app.post('/api/parse-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: 'No resume text provided' });

    const prompt = `
      Analyze the resume text and return a strictly formatted JSON object.
      
      CRITICAL RULES:
      1. EXPERIENCE: Every unique company name must be its own object in the array.
      2. DESCRIPTION: Provide descriptions as a single string where each bullet point is separated by (\\n).
      3. ACHIEVEMENTS: Extract certifications, scores, and coding stats here.
      4. SKILLS CATEGORIZATION: 
         - "technical": Hard skills (e.g., React, Python, AWS, SQL, Machine Learning).
         - "soft": Interpersonal skills (e.g., Leadership, Communication, Problem Solving, Teamwork).

      Return ONLY this JSON structure:
      {
        "personalInfo": { "firstName": "", "lastName": "", "jobTitle": "", "email": "", "phone": "", "location": "", "summary": "", "linkedin": "", "github": "" },
        "education": [{ "school": "", "degree": "", "startDate": "", "endDate": "" }],
        "experience": [{ "company": "", "role": "", "startDate": "", "endDate": "" , "description": "" }],
        "skills": { "technical": [], "soft": [] },
        "projects": [{ "title": "", "link": "", "description": "" }],
        "achievements": []
      }

      Resume Text:
      ${resumeText}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Ensure you use a valid model name
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    const parsedData = JSON.parse(response.text);
    res.status(200).json(parsedData);
  } catch (error) {
    console.error('AI Parsing Error:', error);
    res.status(500).json({ error: 'Failed to parse resume data' });
  }
});

// Route 2: Ghostwrite bullet points for Experience section
app.post('/api/generate-description', async (req, res) => {
  try {
    const { role, company } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Job title is required to generate a description.' });
    }

    const prompt = `
      Write 3 professional, impactful resume bullet points for a ${role} at ${company || 'a company'}. 
      Use strong action verbs. Focus on achievements and responsibilities.
      Do NOT include any introductory or concluding text. Do NOT use markdown asterisks. 
      Just return the plain text bullet points separated by newlines.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.status(200).json({ description: response.text.trim() });

  } catch (error) {
    console.error('Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
});

// Route 3: Save or Update Resume
app.post('/api/resume', async (req, res) => {
  try {
    const { userId, resumeData } = req.body;
    
    // findOneAndUpdate with upsert: true means "If it exists, update it. If not, create it."
    const savedResume = await Resume.findOneAndUpdate(
      { userId }, 
      { ...resumeData, userId }, 
      { new: true, upsert: true }
    );
    
    res.status(200).json({ message: 'Resume saved successfully!', data: savedResume });
  } catch (error) {
    console.error('Save Error:', error);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// Route 4: Load Resume on Startup
app.get('/api/resume/:userId', async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.params.userId });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found for this user.' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Load Error:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Serve built client for production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../client/dist');

app.use(express.static(clientDistPath));
// Catch-all for SPA routes in Express 5 (path-to-regexp v8)
app.get('/*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
