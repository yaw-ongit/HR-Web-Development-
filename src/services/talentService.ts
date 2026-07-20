import { supabase, safeQuery } from './baseService';

export const TalentService = {
  async getCandidates(fallback: any[]) {
    return safeQuery(
      supabase.from('candidates').select('*'),
      fallback
    );
  },

  async getInterviews(fallback: any[]) {
    return safeQuery(
      supabase.from('interviews').select('*'),
      fallback
    );
  },

  async getOnboardingTasks(fallback: any[]) {
    return safeQuery(
      supabase.from('onboarding_tasks').select('*'),
      fallback
    );
  },

  async getTrainingPrograms(fallback: any[]) {
    return safeQuery(
      supabase.from('training_programs').select('*'),
      fallback
    );
  },

  async getCertifications(fallback: any[]) {
    return safeQuery(
      supabase.from('certifications').select('*'),
      fallback
    );
  }
};
