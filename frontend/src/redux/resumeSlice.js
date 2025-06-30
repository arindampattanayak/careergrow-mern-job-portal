import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    extractedSkills: [],
    recommendedJobs: [],
  },
  reducers: {
    setResumeAnalysis: (state, action) => {
      state.extractedSkills = action.payload.extracted_skills || [];
      state.recommendedJobs = action.payload.recommended_jobs || [];
    },
  },
});

export const { setResumeAnalysis } = resumeSlice.actions;
export default resumeSlice.reducer;
