import { supabase, safeQuery } from './baseService';

export const PeopleService = {
  async getEmployees(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employees').select('*, employee_profiles(*)'),
      fallback
    );
  },

  async getEmployeeById(id: string | number, fallback: any) {
    if (!supabase) {
      return fallback;
    }

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*, employee_profiles(*), employee_families(*), employee_educations(*), employee_experiences(*)')
        .eq('id', id)
        .single();
      if (error || !data) return fallback;
      return data;
    } catch {
      return fallback;
    }
  },

  async getOrgStructure(fallback: any) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('departments').select('*, units(*, positions(*))'),
      fallback
    );
  },

  async getDocuments(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }

    return safeQuery(
      supabase.from('employee_documents').select('*'),
      fallback
    );
  }
};
