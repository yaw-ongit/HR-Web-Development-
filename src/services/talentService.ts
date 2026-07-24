import { supabase, safeQuery } from './baseService';

// Fallback arrays to simulate DB in memory if Supabase offline/missing
let localCertifications = [
  { id: 'cert1', employee_id: 'emp1', employee: 'Leo Wibowo', certification: 'AWS Certified Solutions Architect', category: 'Teknologi', issuer: 'Amazon Web Services', credentialId: 'AWS-2024-001', issuedDate: '2024-03-15', expiryDate: '2027-03-15', status: 'Aktif', document_url: '' },
  { id: 'cert2', employee_id: 'emp2', employee: 'Zara Nurhidayah', certification: 'Certified Scrum Product Owner', category: 'Produk', issuer: 'Scrum Alliance', credentialId: 'CSPO-2023-042', issuedDate: '2023-11-20', expiryDate: '2026-11-20', status: 'Hampir Habis', document_url: '' },
  { id: 'cert3', employee_id: 'emp3', employee: 'Maya Sari', certification: 'SHRM Certified Professional', category: 'SDM', issuer: 'SHRM', credentialId: 'SHRM-2022-156', issuedDate: '2022-05-10', expiryDate: '2026-05-10', status: 'Kedaluwarsa', document_url: '' },
  { id: 'cert4', employee_id: 'emp4', employee: 'Noor Fadhila', certification: 'Kubernetes Application Developer', category: 'Teknologi', issuer: 'Linux Foundation', credentialId: 'CKAD-2024-089', issuedDate: '2024-08-15', expiryDate: '2027-08-15', status: 'Aktif', document_url: '' },
  { id: 'cert5', employee_id: 'emp5', employee: 'Emily Putri', certification: 'Google Cloud Associate Cloud Engineer', category: 'Teknologi', issuer: 'Google Cloud', credentialId: 'GCP-2024-033', issuedDate: '2024-01-20', expiryDate: '2026-01-20', status: 'Aktif', document_url: '' }
];

let localTrainingPrograms = [
  { id: 't1', title: 'Dasar-dasar Layanan Pelanggan', description: 'Pelatihan pelayanan pelanggan dasar PT Indocater', category: 'Customer Service', trainer: 'Internal Learning Coordinator', location: 'Lantai 3 Ruang Mawar', start_date: '2026-07-01', duration: '15 Jam', certificate_template: 'training-certificate.html' },
  { id: 't2', title: 'Keterampilan Kepemimpinan Lanjut', description: 'Program kepemimpinan untuk supervisor dan manager', category: 'Leadership', trainer: 'Maya Sari', location: 'Lantai 2 Ruang Melati', start_date: '2026-06-10', duration: '30 Jam', certificate_template: 'training-certificate.html' },
  { id: 't3', title: 'Masterclass Desain Sistem', description: 'Pelatihan arsitektur system design IT senior', category: 'Teknologi', trainer: 'Leo Wibowo', location: 'Zoom Meeting Online', start_date: '2026-05-20', duration: '40 Jam', certificate_template: 'training-certificate.html' },
  { id: 't4', title: 'Strategi Produk & Peta Jalan', description: 'Strategi product development modern', category: 'Produk', trainer: 'Zara Nurhidayah', location: 'Lantai 1 Executive Lounge', start_date: '2026-03-01', duration: '24 Jam', certificate_template: 'training-certificate.html' }
];

let localParticipants = [
  { id: 'tp1', training_id: 't1', employee_id: 'emp6', employee_name: 'Jordan Marten', employee_email: 'jordan@indocater.co.id', status: 'Selesai', certificate_generated: true, certificate_number: 'CERT-INDC-2026-001' },
  { id: 'tp2', training_id: 't1', employee_id: 'emp3', employee_name: 'Maya Sari', employee_email: 'maya@indocater.co.id', status: 'Terdaftar', certificate_generated: false, certificate_number: '' },
  { id: 'tp3', training_id: 't2', employee_id: 'emp3', employee_name: 'Maya Sari', employee_email: 'maya@indocater.co.id', status: 'Selesai', certificate_generated: true, certificate_number: 'CERT-INDC-2026-002' },
  { id: 'tp4', training_id: 't3', employee_id: 'emp1', employee_name: 'Leo Wibowo', employee_email: 'leo@indocater.co.id', status: 'Selesai', certificate_generated: false, certificate_number: '' }
];

export const TalentService = {
  // --- CANDIDATES, INTERVIEWS, ONBOARDING ---
  async getCandidates(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(supabase.from('candidates').select('*'), fallback);
  },

  async getInterviews(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(supabase.from('interviews').select('*'), fallback);
  },

  async getOnboardingTasks(fallback: any[]) {
    if (!supabase) {
      return { data: fallback, error: 'Supabase environment variables are not configured', isFallback: true };
    }
    return safeQuery(supabase.from('onboarding_tasks').select('*'), fallback);
  },

  // --- CERTIFICATIONS ---
  async getCertifications(fallback: any[] = []) {
    if (!supabase) {
      return { data: localCertifications, error: null, isFallback: true };
    }
    const res = await safeQuery(
      supabase.from('certifications').select('*'),
      localCertifications
    );
    if (!res.isFallback && res.data) {
      // Map schema variables if any mismatch
      return {
        data: res.data.map((c: any) => ({
          id: c.id,
          employee_id: c.employee_id,
          employee: c.employee || c.employee_name || 'Karyawan',
          certification: c.certification || c.name || c.certification_name,
          category: c.category || 'Umum',
          issuer: c.issuer || c.issuing_organization,
          credentialId: c.credential_id || c.certificate_number || c.credentialId,
          issuedDate: c.issued_date || c.issuedDate,
          expiryDate: c.expiry_date || c.expiryDate,
          status: c.status || 'Aktif',
          document_url: c.document_url || c.attached_document || ''
        })),
        error: null,
        isFallback: false
      };
    }
    return res;
  },

  async createCertification(data: any) {
    if (!supabase) {
      const newCert = {
        id: 'cert_' + Math.random().toString(36).substr(2, 9),
        employee_id: data.employee_id || 'emp1',
        employee: data.employee || 'Karyawan',
        certification: data.certification || data.name,
        category: data.category || 'Umum',
        issuer: data.issuer || data.issuing_organization,
        credentialId: data.credentialId || data.certificate_number,
        issuedDate: data.issuedDate || data.issue_date,
        expiryDate: data.expiryDate || data.expiration_date,
        status: data.status || 'Aktif',
        document_url: data.document_url || ''
      };
      localCertifications.push(newCert);
      return { data: newCert, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('certifications')
      .insert([{
        employee_id: data.employee_id,
        employee_name: data.employee,
        certification_name: data.certification || data.name,
        category: data.category,
        issuer: data.issuer || data.issuing_organization,
        certificate_number: data.credentialId || data.certificate_number,
        issue_date: data.issuedDate || data.issue_date,
        expiration_date: data.expiryDate || data.expiration_date,
        status: data.status,
        document_url: data.document_url
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async updateCertification(id: string, data: any) {
    if (!supabase) {
      localCertifications = localCertifications.map(c => {
        if (c.id === id) {
          return {
            ...c,
            employee: data.employee || c.employee,
            certification: data.certification || data.name || c.certification,
            category: data.category || c.category,
            issuer: data.issuer || data.issuing_organization || c.issuer,
            credentialId: data.credentialId || data.certificate_number || c.credentialId,
            issuedDate: data.issuedDate || data.issue_date || c.issuedDate,
            expiryDate: data.expiryDate || data.expiration_date || c.expiryDate,
            status: data.status || c.status,
            document_url: data.document_url || c.document_url
          };
        }
        return c;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('certifications')
      .update({
        employee_name: data.employee,
        certification_name: data.certification || data.name,
        category: data.category,
        issuer: data.issuer || data.issuing_organization,
        certificate_number: data.credentialId || data.certificate_number,
        issue_date: data.issuedDate || data.issue_date,
        expiration_date: data.expiryDate || data.expiration_date,
        status: data.status,
        document_url: data.document_url
      })
      .eq('id', id);

    return { error };
  },

  async deleteCertification(id: string) {
    if (!supabase) {
      localCertifications = localCertifications.filter(c => c.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING PROGRAMS ---
  async getTrainingPrograms(fallback: any[] = []) {
    if (!supabase) {
      return { data: localTrainingPrograms, error: null, isFallback: true };
    }
    const res = await safeQuery(
      supabase.from('training_programs').select('*'),
      localTrainingPrograms
    );
    if (!res.isFallback && res.data) {
      return {
        data: res.data.map((t: any) => ({
          id: t.id,
          title: t.title || t.training_title,
          description: t.description || t.training_description,
          category: t.category,
          trainer: t.trainer || t.trainer_name,
          location: t.location,
          start_date: t.start_date || t.training_date,
          duration: t.duration || t.training_duration,
          certificate_template: t.certificate_template
        })),
        error: null,
        isFallback: false
      };
    }
    return res;
  },

  async createTrainingProgram(data: any) {
    if (!supabase) {
      const newProg = {
        id: 't_' + Math.random().toString(36).substr(2, 9),
        title: data.title || data.training_title,
        description: data.description || data.training_description,
        category: data.category,
        trainer: data.trainer || data.trainer_name,
        location: data.location,
        start_date: data.start_date || data.training_date,
        duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template || 'training-certificate.html'
      };
      localTrainingPrograms.push(newProg);
      return { data: newProg, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('training_programs')
      .insert([{
        training_title: data.title || data.training_title,
        training_description: data.description || data.training_description,
        category: data.category,
        trainer_name: data.trainer || data.trainer_name,
        location: data.location,
        training_date: data.start_date || data.training_date,
        training_duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template || 'training-certificate.html'
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async updateTrainingProgram(id: string, data: any) {
    if (!supabase) {
      localTrainingPrograms = localTrainingPrograms.map(t => {
        if (t.id === id) {
          return {
            ...t,
            title: data.title || data.training_title || t.title,
            description: data.description || data.training_description || t.description,
            category: data.category || t.category,
            trainer: data.trainer || data.trainer_name || t.trainer,
            location: data.location || t.location,
            start_date: data.start_date || data.training_date || t.start_date,
            duration: data.duration || data.training_duration || t.duration,
            certificate_template: data.certificate_template || t.certificate_template
          };
        }
        return t;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('training_programs')
      .update({
        training_title: data.title || data.training_title,
        training_description: data.description || data.training_description,
        category: data.category,
        trainer_name: data.trainer || data.trainer_name,
        location: data.location,
        training_date: data.start_date || data.training_date,
        training_duration: data.duration || data.training_duration,
        certificate_template: data.certificate_template
      })
      .eq('id', id);

    return { error };
  },

  async deleteTrainingProgram(id: string) {
    if (!supabase) {
      localTrainingPrograms = localTrainingPrograms.filter(t => t.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_programs').delete().eq('id', id);
    return { error };
  },

  // --- TRAINING PARTICIPANTS ---
  async getTrainingParticipants(trainingId: string, fallback: any[] = []) {
    if (!supabase) {
      return { data: localParticipants.filter(p => p.training_id === trainingId), error: null, isFallback: true };
    }
    return safeQuery(
      supabase.from('training_participants').select('*').eq('training_id', trainingId),
      localParticipants.filter(p => p.training_id === trainingId)
    );
  },

  async addTrainingParticipant(data: any) {
    if (!supabase) {
      const newPart = {
        id: 'tp_' + Math.random().toString(36).substr(2, 9),
        training_id: data.training_id,
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_email: data.employee_email || '',
        status: data.status || 'Terdaftar',
        certificate_generated: false,
        certificate_number: ''
      };
      localParticipants.push(newPart);
      return { data: newPart, error: null };
    }

    const { data: dbData, error } = await supabase
      .from('training_participants')
      .insert([{
        training_id: data.training_id,
        employee_id: data.employee_id,
        employee_name: data.employee_name,
        employee_email: data.employee_email,
        status: data.status || 'Terdaftar',
        certificate_generated: false,
        certificate_number: ''
      }])
      .select()
      .single();

    return { data: dbData, error };
  },

  async removeTrainingParticipant(id: string) {
    if (!supabase) {
      localParticipants = localParticipants.filter(p => p.id !== id);
      return { error: null };
    }
    const { error } = await supabase.from('training_participants').delete().eq('id', id);
    return { error };
  },

  async updateParticipantCertificateStatus(id: string, certNumber: string) {
    if (!supabase) {
      localParticipants = localParticipants.map(p => {
        if (p.id === id) {
          return {
            ...p,
            certificate_generated: true,
            certificate_number: certNumber,
            status: 'Selesai'
          };
        }
        return p;
      });
      return { error: null };
    }

    const { error } = await supabase
      .from('training_participants')
      .update({
        certificate_generated: true,
        certificate_number: certNumber,
        status: 'Selesai'
      })
      .eq('id', id);

    return { error };
  }
};
