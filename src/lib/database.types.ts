export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      allowances: {
        Row: {
          amount: number
          created_at: string
          employee_id: string
          id: string
          payroll_component_id: string
          period_month: number
          period_year: number
        }
        Insert: {
          amount: number
          created_at?: string
          employee_id: string
          id?: string
          payroll_component_id: string
          period_month: number
          period_year: number
        }
        Update: {
          amount?: number
          created_at?: string
          employee_id?: string
          id?: string
          payroll_component_id?: string
          period_month?: number
          period_year?: number
        }
        Relationships: [
          {
            foreignKeyName: "allowances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allowances_payroll_component_id_fkey"
            columns: ["payroll_component_id"]
            isOneToOne: false
            referencedRelation: "payroll_components"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          published_at: string | null
          target_id: string | null
          target_scope: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          published_at?: string | null
          target_id?: string | null
          target_scope?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          published_at?: string | null
          target_id?: string | null
          target_scope?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      approvals: {
        Row: {
          approved_at: string | null
          approver_id: string
          created_at: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["approval_entity_type"]
          id: string
          notes: string | null
          requester_id: string
          sequence_order: number
          status: Database["public"]["Enums"]["approval_status_type"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approver_id: string
          created_at?: string
          entity_id: string
          entity_type: Database["public"]["Enums"]["approval_entity_type"]
          id?: string
          notes?: string | null
          requester_id: string
          sequence_order?: number
          status?: Database["public"]["Enums"]["approval_status_type"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approver_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["approval_entity_type"]
          id?: string
          notes?: string | null
          requester_id?: string
          sequence_order?: number
          status?: Database["public"]["Enums"]["approval_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_check_logs: {
        Row: {
          attendance_id: string
          created_at: string
          device_id: string | null
          id: string
          location: string | null
          log_time: string
          log_type: string
          method: string
        }
        Insert: {
          attendance_id: string
          created_at?: string
          device_id?: string | null
          id?: string
          location?: string | null
          log_time: string
          log_type: string
          method?: string
        }
        Update: {
          attendance_id?: string
          created_at?: string
          device_id?: string | null
          id?: string
          location?: string | null
          log_time?: string
          log_type?: string
          method?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_check_logs_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "attendances"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_corrections: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_id: string
          created_at: string
          employee_id: string
          id: string
          reason: string
          requested_check_in: string | null
          requested_check_out: string | null
          status: Database["public"]["Enums"]["correction_status_type"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_id: string
          created_at?: string
          employee_id: string
          id?: string
          reason: string
          requested_check_in?: string | null
          requested_check_out?: string | null
          status?: Database["public"]["Enums"]["correction_status_type"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_id?: string
          created_at?: string
          employee_id?: string
          id?: string
          reason?: string
          requested_check_in?: string | null
          requested_check_out?: string | null
          status?: Database["public"]["Enums"]["correction_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_corrections_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_corrections_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "attendances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_corrections_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      attendances: {
        Row: {
          actual_check_in: string | null
          actual_check_out: string | null
          attendance_date: string
          created_at: string
          early_leave_minutes: number
          employee_id: string
          id: string
          late_minutes: number
          notes: string | null
          scheduled_check_in: string | null
          scheduled_check_out: string | null
          shift_assignment_id: string | null
          status: Database["public"]["Enums"]["attendance_status_type"]
          updated_at: string
          work_duration_minutes: number | null
        }
        Insert: {
          actual_check_in?: string | null
          actual_check_out?: string | null
          attendance_date: string
          created_at?: string
          early_leave_minutes?: number
          employee_id: string
          id?: string
          late_minutes?: number
          notes?: string | null
          scheduled_check_in?: string | null
          scheduled_check_out?: string | null
          shift_assignment_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_type"]
          updated_at?: string
          work_duration_minutes?: number | null
        }
        Update: {
          actual_check_in?: string | null
          actual_check_out?: string | null
          attendance_date?: string
          created_at?: string
          early_leave_minutes?: number
          employee_id?: string
          id?: string
          late_minutes?: number
          notes?: string | null
          scheduled_check_in?: string | null
          scheduled_check_out?: string | null
          shift_assignment_id?: string | null
          status?: Database["public"]["Enums"]["attendance_status_type"]
          updated_at?: string
          work_duration_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendances_shift_assignment_id_fkey"
            columns: ["shift_assignment_id"]
            isOneToOne: false
            referencedRelation: "shift_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          employee_id: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
        }
        Insert: {
          action: string
          created_at?: string
          employee_id?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          employee_id?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      benefit_types: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      benefits: {
        Row: {
          benefit_type_id: string
          created_at: string
          description: string | null
          employee_id: string
          expiry_date: string | null
          granted_date: string
          id: string
        }
        Insert: {
          benefit_type_id: string
          created_at?: string
          description?: string | null
          employee_id: string
          expiry_date?: string | null
          granted_date?: string
          id?: string
        }
        Update: {
          benefit_type_id?: string
          created_at?: string
          description?: string | null
          employee_id?: string
          expiry_date?: string | null
          granted_date?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "benefits_benefit_type_id_fkey"
            columns: ["benefit_type_id"]
            isOneToOne: false
            referencedRelation: "benefit_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "benefits_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      bonuses: {
        Row: {
          amount: number
          bonus_type: string
          created_at: string
          employee_id: string
          id: string
          notes: string | null
          paid_at: string | null
          period_year: number
        }
        Insert: {
          amount: number
          bonus_type: string
          created_at?: string
          employee_id: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          period_year: number
        }
        Update: {
          amount?: number
          bonus_type?: string
          created_at?: string
          employee_id?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          period_year?: number
        }
        Relationships: [
          {
            foreignKeyName: "bonuses_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      bpjs_records: {
        Row: {
          bpjs_kesehatan_active: boolean
          bpjs_kesehatan_number: string | null
          bpjs_ketenagakerjaan_active: boolean
          bpjs_ketenagakerjaan_number: string | null
          created_at: string
          employee_id: string
          id: string
          registered_date: string | null
          updated_at: string
        }
        Insert: {
          bpjs_kesehatan_active?: boolean
          bpjs_kesehatan_number?: string | null
          bpjs_ketenagakerjaan_active?: boolean
          bpjs_ketenagakerjaan_number?: string | null
          created_at?: string
          employee_id: string
          id?: string
          registered_date?: string | null
          updated_at?: string
        }
        Update: {
          bpjs_kesehatan_active?: boolean
          bpjs_kesehatan_number?: string | null
          bpjs_ketenagakerjaan_active?: boolean
          bpjs_ketenagakerjaan_number?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          registered_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bpjs_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          address: string | null
          branch_type: string
          city: string | null
          code: string
          company_id: string
          created_at: string
          deleted_at: string | null
          id: string
          is_remote_site: boolean
          name: string
          phone: string | null
          postal_code: string | null
          province: string | null
          sector: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          branch_type?: string
          city?: string | null
          code: string
          company_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_remote_site?: boolean
          name: string
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          sector?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          branch_type?: string
          city?: string | null
          code?: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_remote_site?: boolean
          name?: string
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          sector?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "branches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      business_units: {
        Row: {
          code: string
          company_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          company_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_units_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          address: string | null
          applied_at: string
          birth_date: string | null
          created_at: string
          cv_url: string | null
          education_level: string | null
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          job_vacancy_id: string
          phone: string
          source: string | null
          status: Database["public"]["Enums"]["candidate_status_type"]
          updated_at: string
        }
        Insert: {
          address?: string | null
          applied_at?: string
          birth_date?: string | null
          created_at?: string
          cv_url?: string | null
          education_level?: string | null
          email: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          job_vacancy_id: string
          phone: string
          source?: string | null
          status?: Database["public"]["Enums"]["candidate_status_type"]
          updated_at?: string
        }
        Update: {
          address?: string | null
          applied_at?: string
          birth_date?: string | null
          created_at?: string
          cv_url?: string | null
          education_level?: string | null
          email?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          job_vacancy_id?: string
          phone?: string
          source?: string | null
          status?: Database["public"]["Enums"]["candidate_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_vacancy_id_fkey"
            columns: ["job_vacancy_id"]
            isOneToOne: false
            referencedRelation: "job_vacancies"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_number: string
          certification_type_id: string
          created_at: string
          employee_id: string
          expired_at: string
          file_url: string | null
          id: string
          issued_at: string
          issued_by: string
          status: Database["public"]["Enums"]["certificate_status_type"]
          training_schedule_id: string | null
          updated_at: string
        }
        Insert: {
          certificate_number: string
          certification_type_id: string
          created_at?: string
          employee_id: string
          expired_at: string
          file_url?: string | null
          id?: string
          issued_at: string
          issued_by: string
          status?: Database["public"]["Enums"]["certificate_status_type"]
          training_schedule_id?: string | null
          updated_at?: string
        }
        Update: {
          certificate_number?: string
          certification_type_id?: string
          created_at?: string
          employee_id?: string
          expired_at?: string
          file_url?: string | null
          id?: string
          issued_at?: string
          issued_by?: string
          status?: Database["public"]["Enums"]["certificate_status_type"]
          training_schedule_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_certification_type_id_fkey"
            columns: ["certification_type_id"]
            isOneToOne: false
            referencedRelation: "certification_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_training_schedule_id_fkey"
            columns: ["training_schedule_id"]
            isOneToOne: false
            referencedRelation: "training_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_types: {
        Row: {
          code: string
          created_at: string
          id: string
          is_mandatory: boolean
          issuing_body: string | null
          name: string
          updated_at: string
          validity_months: number
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          issuing_body?: string | null
          name: string
          updated_at?: string
          validity_months?: number
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          issuing_body?: string | null
          name?: string
          updated_at?: string
          validity_months?: number
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          code: string
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          legal_name: string
          logo_url: string | null
          name: string
          npwp: string | null
          phone: string | null
          postal_code: string | null
          province: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          legal_name: string
          logo_url?: string | null
          name: string
          npwp?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          legal_name?: string
          logo_url?: string | null
          name?: string
          npwp?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      competencies: {
        Row: {
          competency_name: string
          created_at: string
          id: string
          notes: string | null
          performance_review_id: string
          score: number
        }
        Insert: {
          competency_name: string
          created_at?: string
          id?: string
          notes?: string | null
          performance_review_id: string
          score: number
        }
        Update: {
          competency_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          performance_review_id?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "competencies_performance_review_id_fkey"
            columns: ["performance_review_id"]
            isOneToOne: false
            referencedRelation: "performance_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      competency_matrices: {
        Row: {
          certification_type_id: string
          created_at: string
          id: string
          is_mandatory: boolean
          position_id: string
        }
        Insert: {
          certification_type_id: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          position_id: string
        }
        Update: {
          certification_type_id?: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          position_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competency_matrices_certification_type_id_fkey"
            columns: ["certification_type_id"]
            isOneToOne: false
            referencedRelation: "certification_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competency_matrices_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      contract_histories: {
        Row: {
          contract_number: string
          created_at: string
          document_url: string | null
          employee_id: string
          employment_type_id: string
          end_date: string | null
          id: string
          start_date: string
          status: Database["public"]["Enums"]["contract_status_type"]
          updated_at: string
        }
        Insert: {
          contract_number: string
          created_at?: string
          document_url?: string | null
          employee_id: string
          employment_type_id: string
          end_date?: string | null
          id?: string
          start_date: string
          status?: Database["public"]["Enums"]["contract_status_type"]
          updated_at?: string
        }
        Update: {
          contract_number?: string
          created_at?: string
          document_url?: string | null
          employee_id?: string
          employment_type_id?: string
          end_date?: string | null
          id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["contract_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contract_histories_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contract_histories_employment_type_id_fkey"
            columns: ["employment_type_id"]
            isOneToOne: false
            referencedRelation: "employment_types"
            referencedColumns: ["id"]
          },
        ]
      }
      deductions: {
        Row: {
          amount: number
          created_at: string
          employee_id: string
          id: string
          payroll_component_id: string
          period_month: number
          period_year: number
          reason: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          employee_id: string
          id?: string
          payroll_component_id: string
          period_month: number
          period_year: number
          reason?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          employee_id?: string
          id?: string
          payroll_component_id?: string
          period_month?: number
          period_year?: number
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deductions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deductions_payroll_component_id_fkey"
            columns: ["payroll_component_id"]
            isOneToOne: false
            referencedRelation: "payroll_components"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          branch_id: string
          code: string
          created_at: string
          deleted_at: string | null
          division_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          branch_id: string
          code: string
          created_at?: string
          deleted_at?: string | null
          division_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          branch_id?: string
          code?: string
          created_at?: string
          deleted_at?: string | null
          division_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "departments_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
        ]
      }
      divisions: {
        Row: {
          business_unit_id: string
          code: string
          created_at: string
          deleted_at: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          business_unit_id: string
          code: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          business_unit_id?: string
          code?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "divisions_business_unit_id_fkey"
            columns: ["business_unit_id"]
            isOneToOne: false
            referencedRelation: "business_units"
            referencedColumns: ["id"]
          },
        ]
      }
      document_types: {
        Row: {
          code: string
          created_at: string
          id: string
          is_mandatory: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_mandatory?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      employee_assets: {
        Row: {
          asset_code: string | null
          asset_name: string
          assigned_date: string
          condition_note: string | null
          created_at: string
          employee_id: string
          id: string
          returned_date: string | null
          updated_at: string
        }
        Insert: {
          asset_code?: string | null
          asset_name: string
          assigned_date?: string
          condition_note?: string | null
          created_at?: string
          employee_id: string
          id?: string
          returned_date?: string | null
          updated_at?: string
        }
        Update: {
          asset_code?: string | null
          asset_name?: string
          assigned_date?: string
          condition_note?: string | null
          created_at?: string
          employee_id?: string
          id?: string
          returned_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_assets_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_documents: {
        Row: {
          created_at: string
          document_number: string | null
          document_type_id: string
          employee_id: string
          expiry_date: string | null
          file_url: string
          id: string
          issued_date: string | null
          status: Database["public"]["Enums"]["document_status_type"]
          updated_at: string
          uploaded_at: string
        }
        Insert: {
          created_at?: string
          document_number?: string | null
          document_type_id: string
          employee_id: string
          expiry_date?: string | null
          file_url: string
          id?: string
          issued_date?: string | null
          status?: Database["public"]["Enums"]["document_status_type"]
          updated_at?: string
          uploaded_at?: string
        }
        Update: {
          created_at?: string
          document_number?: string | null
          document_type_id?: string
          employee_id?: string
          expiry_date?: string | null
          file_url?: string
          id?: string
          issued_date?: string | null
          status?: Database["public"]["Enums"]["document_status_type"]
          updated_at?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_educations: {
        Row: {
          created_at: string
          education_level: string
          employee_id: string
          gpa: number | null
          graduation_year: number | null
          id: string
          institution_name: string
          major: string | null
        }
        Insert: {
          created_at?: string
          education_level: string
          employee_id: string
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          institution_name: string
          major?: string | null
        }
        Update: {
          created_at?: string
          education_level?: string
          employee_id?: string
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          institution_name?: string
          major?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_educations_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_emergency_contacts: {
        Row: {
          address: string | null
          created_at: string
          employee_id: string
          full_name: string
          id: string
          phone: string
          relationship: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          employee_id: string
          full_name: string
          id?: string
          phone: string
          relationship: string
        }
        Update: {
          address?: string | null
          created_at?: string
          employee_id?: string
          full_name?: string
          id?: string
          phone?: string
          relationship?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_emergency_contacts_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_families: {
        Row: {
          birth_date: string | null
          created_at: string
          employee_id: string
          full_name: string
          id: string
          is_dependent: boolean
          occupation: string | null
          relationship: string
          updated_at: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string
          employee_id: string
          full_name: string
          id?: string
          is_dependent?: boolean
          occupation?: string | null
          relationship: string
          updated_at?: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string
          employee_id?: string
          full_name?: string
          id?: string
          is_dependent?: boolean
          occupation?: string | null
          relationship?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_families_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_insurances: {
        Row: {
          benefit_type_id: string
          coverage_amount: number | null
          created_at: string
          employee_id: string
          end_date: string | null
          id: string
          insurance_provider_id: string
          is_active: boolean
          policy_number: string
          start_date: string
          updated_at: string
        }
        Insert: {
          benefit_type_id: string
          coverage_amount?: number | null
          created_at?: string
          employee_id: string
          end_date?: string | null
          id?: string
          insurance_provider_id: string
          is_active?: boolean
          policy_number: string
          start_date: string
          updated_at?: string
        }
        Update: {
          benefit_type_id?: string
          coverage_amount?: number | null
          created_at?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          insurance_provider_id?: string
          is_active?: boolean
          policy_number?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_insurances_benefit_type_id_fkey"
            columns: ["benefit_type_id"]
            isOneToOne: false
            referencedRelation: "benefit_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_insurances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_insurances_insurance_provider_id_fkey"
            columns: ["insurance_provider_id"]
            isOneToOne: false
            referencedRelation: "insurance_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_profiles: {
        Row: {
          address: string | null
          bank_account_holder: string | null
          bank_account_number: string | null
          bank_name: string | null
          blood_type: string | null
          bpjs_kesehatan_number: string | null
          bpjs_ketenagakerjaan_number: string | null
          city: string | null
          created_at: string
          domicile_address: string | null
          domicile_same_as_ktp: boolean
          employee_id: string
          height_cm: number | null
          id: string
          postal_code: string | null
          province: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          address?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          blood_type?: string | null
          bpjs_kesehatan_number?: string | null
          bpjs_ketenagakerjaan_number?: string | null
          city?: string | null
          created_at?: string
          domicile_address?: string | null
          domicile_same_as_ktp?: boolean
          employee_id: string
          height_cm?: number | null
          id?: string
          postal_code?: string | null
          province?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          address?: string | null
          bank_account_holder?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          blood_type?: string | null
          bpjs_kesehatan_number?: string | null
          bpjs_ketenagakerjaan_number?: string | null
          city?: string | null
          created_at?: string
          domicile_address?: string | null
          domicile_same_as_ktp?: boolean
          employee_id?: string
          height_cm?: number | null
          id?: string
          postal_code?: string | null
          province?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_profiles_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_skills: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          proficiency_level: string
          skill_name: string
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          proficiency_level?: string
          skill_name: string
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          proficiency_level?: string
          skill_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "employee_skills_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          birth_date: string
          birth_place: string | null
          branch_id: string
          business_unit_id: string
          company_id: string
          created_at: string
          deleted_at: string | null
          department_id: string
          division_id: string
          email: string
          employee_number: string
          employee_status: Database["public"]["Enums"]["employee_status_type"]
          employment_type_id: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id: string
          job_grade_id: string
          join_date: string
          manager_id: string | null
          marital_status: Database["public"]["Enums"]["marital_status_type"]
          national_id_number: string
          personal_email: string | null
          phone: string
          photo_url: string | null
          position_id: string
          religion: string | null
          resign_date: string | null
          resign_reason: string | null
          section_id: string
          shift_id: string | null
          shift_pattern_id: string | null
          tax_id_number: string | null
          updated_at: string
        }
        Insert: {
          birth_date: string
          birth_place?: string | null
          branch_id: string
          business_unit_id: string
          company_id: string
          created_at?: string
          deleted_at?: string | null
          department_id: string
          division_id: string
          email: string
          employee_number: string
          employee_status?: Database["public"]["Enums"]["employee_status_type"]
          employment_type_id: string
          full_name: string
          gender: Database["public"]["Enums"]["gender_type"]
          id?: string
          job_grade_id: string
          join_date: string
          manager_id?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status_type"]
          national_id_number: string
          personal_email?: string | null
          phone: string
          photo_url?: string | null
          position_id: string
          religion?: string | null
          resign_date?: string | null
          resign_reason?: string | null
          section_id: string
          shift_id?: string | null
          shift_pattern_id?: string | null
          tax_id_number?: string | null
          updated_at?: string
        }
        Update: {
          birth_date?: string
          birth_place?: string | null
          branch_id?: string
          business_unit_id?: string
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          department_id?: string
          division_id?: string
          email?: string
          employee_number?: string
          employee_status?: Database["public"]["Enums"]["employee_status_type"]
          employment_type_id?: string
          full_name?: string
          gender?: Database["public"]["Enums"]["gender_type"]
          id?: string
          job_grade_id?: string
          join_date?: string
          manager_id?: string | null
          marital_status?: Database["public"]["Enums"]["marital_status_type"]
          national_id_number?: string
          personal_email?: string | null
          phone?: string
          photo_url?: string | null
          position_id?: string
          religion?: string | null
          resign_date?: string | null
          resign_reason?: string | null
          section_id?: string
          shift_id?: string | null
          shift_pattern_id?: string | null
          tax_id_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_business_unit_id_fkey"
            columns: ["business_unit_id"]
            isOneToOne: false
            referencedRelation: "business_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_employment_type_id_fkey"
            columns: ["employment_type_id"]
            isOneToOne: false
            referencedRelation: "employment_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_job_grade_id_fkey"
            columns: ["job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_shift_pattern_id_fkey"
            columns: ["shift_pattern_id"]
            isOneToOne: false
            referencedRelation: "shift_patterns"
            referencedColumns: ["id"]
          },
        ]
      }
      employment_histories: {
        Row: {
          created_at: string
          effective_date: string
          employee_id: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["employee_status_type"]
        }
        Insert: {
          created_at?: string
          effective_date: string
          employee_id: string
          id?: string
          notes?: string | null
          status: Database["public"]["Enums"]["employee_status_type"]
        }
        Update: {
          created_at?: string
          effective_date?: string
          employee_id?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["employee_status_type"]
        }
        Relationships: [
          {
            foreignKeyName: "employment_histories_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employment_types: {
        Row: {
          code: string
          created_at: string
          id: string
          is_permanent: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          is_permanent?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          is_permanent?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          actual_value: number | null
          created_at: string
          employee_id: string
          id: string
          kpi_id: string
          period_quarter: number | null
          period_year: number
          status: Database["public"]["Enums"]["goal_status_type"]
          target_value: number
          updated_at: string
        }
        Insert: {
          actual_value?: number | null
          created_at?: string
          employee_id: string
          id?: string
          kpi_id: string
          period_quarter?: number | null
          period_year: number
          status?: Database["public"]["Enums"]["goal_status_type"]
          target_value: number
          updated_at?: string
        }
        Update: {
          actual_value?: number | null
          created_at?: string
          employee_id?: string
          id?: string
          kpi_id?: string
          period_quarter?: number | null
          period_year?: number
          status?: Database["public"]["Enums"]["goal_status_type"]
          target_value?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_kpi_id_fkey"
            columns: ["kpi_id"]
            isOneToOne: false
            referencedRelation: "kpis"
            referencedColumns: ["id"]
          },
        ]
      }
      hirings: {
        Row: {
          accepted: boolean | null
          candidate_id: string
          created_at: string
          id: string
          job_vacancy_id: string
          offer_date: string
          offered_job_grade_id: string
          offered_position_id: string
          offered_salary: number
          start_date: string | null
          updated_at: string
        }
        Insert: {
          accepted?: boolean | null
          candidate_id: string
          created_at?: string
          id?: string
          job_vacancy_id: string
          offer_date?: string
          offered_job_grade_id: string
          offered_position_id: string
          offered_salary: number
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          accepted?: boolean | null
          candidate_id?: string
          created_at?: string
          id?: string
          job_vacancy_id?: string
          offer_date?: string
          offered_job_grade_id?: string
          offered_position_id?: string
          offered_salary?: number
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hirings_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: true
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hirings_job_vacancy_id_fkey"
            columns: ["job_vacancy_id"]
            isOneToOne: false
            referencedRelation: "job_vacancies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hirings_offered_job_grade_id_fkey"
            columns: ["offered_job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hirings_offered_position_id_fkey"
            columns: ["offered_position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      holidays: {
        Row: {
          created_at: string
          holiday_date: string
          id: string
          is_national: boolean
          name: string
          work_calendar_id: string
        }
        Insert: {
          created_at?: string
          holiday_date: string
          id?: string
          is_national?: boolean
          name: string
          work_calendar_id: string
        }
        Update: {
          created_at?: string
          holiday_date?: string
          id?: string
          is_national?: boolean
          name?: string
          work_calendar_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "holidays_work_calendar_id_fkey"
            columns: ["work_calendar_id"]
            isOneToOne: false
            referencedRelation: "work_calendars"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_providers: {
        Row: {
          code: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          id: string
          name: string
          provider_type: string
          updated_at: string
        }
        Insert: {
          code: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name: string
          provider_type: string
          updated_at?: string
        }
        Update: {
          code?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string
          provider_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      interview_results: {
        Row: {
          created_at: string
          id: string
          interview_schedule_id: string
          notes: string | null
          result: Database["public"]["Enums"]["interview_result_type"]
          score: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          interview_schedule_id: string
          notes?: string | null
          result: Database["public"]["Enums"]["interview_result_type"]
          score?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          interview_schedule_id?: string
          notes?: string | null
          result?: Database["public"]["Enums"]["interview_result_type"]
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_results_interview_schedule_id_fkey"
            columns: ["interview_schedule_id"]
            isOneToOne: true
            referencedRelation: "interview_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_schedules: {
        Row: {
          candidate_id: string
          created_at: string
          id: string
          interview_stage: string
          interviewer_id: string
          location: string | null
          scheduled_at: string
          updated_at: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          id?: string
          interview_stage?: string
          interviewer_id: string
          location?: string | null
          scheduled_at: string
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          id?: string
          interview_stage?: string
          interviewer_id?: string
          location?: string | null
          scheduled_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_schedules_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_schedules_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      job_grades: {
        Row: {
          base_salary_max: number
          base_salary_min: number
          code: string
          created_at: string
          deleted_at: string | null
          id: string
          level_order: number
          name: string
          updated_at: string
        }
        Insert: {
          base_salary_max: number
          base_salary_min: number
          code: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          level_order: number
          name: string
          updated_at?: string
        }
        Update: {
          base_salary_max?: number
          base_salary_min?: number
          code?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          level_order?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_vacancies: {
        Row: {
          closed_date: string | null
          created_at: string
          department_id: string
          id: string
          opened_date: string
          position_id: string
          quota: number
          requirements: string | null
          status: Database["public"]["Enums"]["vacancy_status_type"]
          title: string
          updated_at: string
          vacancy_code: string
        }
        Insert: {
          closed_date?: string | null
          created_at?: string
          department_id: string
          id?: string
          opened_date?: string
          position_id: string
          quota?: number
          requirements?: string | null
          status?: Database["public"]["Enums"]["vacancy_status_type"]
          title: string
          updated_at?: string
          vacancy_code: string
        }
        Update: {
          closed_date?: string | null
          created_at?: string
          department_id?: string
          id?: string
          opened_date?: string
          position_id?: string
          quota?: number
          requirements?: string | null
          status?: Database["public"]["Enums"]["vacancy_status_type"]
          title?: string
          updated_at?: string
          vacancy_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_vacancies_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_vacancies_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      kpis: {
        Row: {
          code: string
          created_at: string
          department_id: string | null
          description: string | null
          id: string
          name: string
          position_id: string | null
          target_value: number | null
          unit: string | null
          updated_at: string
          weight_percentage: number
        }
        Insert: {
          code: string
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          name: string
          position_id?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string
          weight_percentage?: number
        }
        Update: {
          code?: string
          created_at?: string
          department_id?: string | null
          description?: string | null
          id?: string
          name?: string
          position_id?: string | null
          target_value?: number | null
          unit?: string | null
          updated_at?: string
          weight_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "kpis_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kpis_position_id_fkey"
            columns: ["position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_balances: {
        Row: {
          created_at: string
          employee_id: string
          entitled_days: number
          id: string
          leave_type_id: string
          remaining_days: number | null
          updated_at: string
          used_days: number
          year: number
        }
        Insert: {
          created_at?: string
          employee_id: string
          entitled_days?: number
          id?: string
          leave_type_id: string
          remaining_days?: number | null
          updated_at?: string
          used_days?: number
          year: number
        }
        Update: {
          created_at?: string
          employee_id?: string
          entitled_days?: number
          id?: string
          leave_type_id?: string
          remaining_days?: number | null
          updated_at?: string
          used_days?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_balances_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approver_id: string | null
          attachment_url: string | null
          created_at: string
          destination: string | null
          employee_id: string
          end_date: string
          id: string
          leave_type_id: string
          reason: string
          start_date: string
          status: Database["public"]["Enums"]["leave_status_type"]
          total_days: number
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string
          destination?: string | null
          employee_id: string
          end_date: string
          id?: string
          leave_type_id: string
          reason: string
          start_date: string
          status?: Database["public"]["Enums"]["leave_status_type"]
          total_days: number
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string
          destination?: string | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type_id?: string
          reason?: string
          start_date?: string
          status?: Database["public"]["Enums"]["leave_status_type"]
          total_days?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_approver_id_fkey"
            columns: ["approver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_requests_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_types"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_types: {
        Row: {
          code: string
          created_at: string
          default_days_per_year: number
          id: string
          is_paid: boolean
          name: string
          requires_document: boolean
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          default_days_per_year?: number
          id?: string
          is_paid?: boolean
          name: string
          requires_document?: boolean
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          default_days_per_year?: number
          id?: string
          is_paid?: boolean
          name?: string
          requires_document?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      medical_claims: {
        Row: {
          approved_amount: number | null
          claim_date: string
          claim_number: string
          claimed_amount: number
          created_at: string
          description: string
          employee_id: string
          employee_insurance_id: string
          id: string
          processed_at: string | null
          processed_by: string | null
          receipt_url: string | null
          status: Database["public"]["Enums"]["claim_status_type"]
          updated_at: string
        }
        Insert: {
          approved_amount?: number | null
          claim_date?: string
          claim_number: string
          claimed_amount: number
          created_at?: string
          description: string
          employee_id: string
          employee_insurance_id: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["claim_status_type"]
          updated_at?: string
        }
        Update: {
          approved_amount?: number | null
          claim_date?: string
          claim_number?: string
          claimed_amount?: number
          created_at?: string
          description?: string
          employee_id?: string
          employee_insurance_id?: string
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          receipt_url?: string | null
          status?: Database["public"]["Enums"]["claim_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "medical_claims_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_claims_employee_insurance_id_fkey"
            columns: ["employee_insurance_id"]
            isOneToOne: false
            referencedRelation: "employee_insurances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_claims_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          channel: Database["public"]["Enums"]["notification_channel_type"]
          created_at: string
          employee_id: string
          id: string
          is_read: boolean
          message: string
          read_at: string | null
          reference_id: string | null
          reference_table: string | null
          title: string
        }
        Insert: {
          channel?: Database["public"]["Enums"]["notification_channel_type"]
          created_at?: string
          employee_id: string
          id?: string
          is_read?: boolean
          message: string
          read_at?: string | null
          reference_id?: string | null
          reference_table?: string | null
          title: string
        }
        Update: {
          channel?: Database["public"]["Enums"]["notification_channel_type"]
          created_at?: string
          employee_id?: string
          id?: string
          is_read?: boolean
          message?: string
          read_at?: string | null
          reference_id?: string | null
          reference_table?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      onboardings: {
        Row: {
          checklist: Json
          completed_at: string | null
          created_at: string
          employee_id: string | null
          hiring_id: string
          id: string
          start_date: string
          updated_at: string
        }
        Insert: {
          checklist?: Json
          completed_at?: string | null
          created_at?: string
          employee_id?: string | null
          hiring_id: string
          id?: string
          start_date: string
          updated_at?: string
        }
        Update: {
          checklist?: Json
          completed_at?: string | null
          created_at?: string
          employee_id?: string | null
          hiring_id?: string
          id?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "onboardings_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "onboardings_hiring_id_fkey"
            columns: ["hiring_id"]
            isOneToOne: true
            referencedRelation: "hirings"
            referencedColumns: ["id"]
          },
        ]
      }
      overtimes: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          attendance_id: string | null
          created_at: string
          duration_minutes: number
          employee_id: string
          end_time: string
          id: string
          overtime_date: string
          reason: string
          start_time: string
          status: Database["public"]["Enums"]["overtime_status_type"]
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_id?: string | null
          created_at?: string
          duration_minutes: number
          employee_id: string
          end_time: string
          id?: string
          overtime_date: string
          reason: string
          start_time: string
          status?: Database["public"]["Enums"]["overtime_status_type"]
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          attendance_id?: string | null
          created_at?: string
          duration_minutes?: number
          employee_id?: string
          end_time?: string
          id?: string
          overtime_date?: string
          reason?: string
          start_time?: string
          status?: Database["public"]["Enums"]["overtime_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "overtimes_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtimes_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "attendances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtimes_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_components: {
        Row: {
          category: Database["public"]["Enums"]["payroll_component_category"]
          code: string
          created_at: string
          id: string
          is_fixed: boolean
          is_taxable: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category: Database["public"]["Enums"]["payroll_component_category"]
          code: string
          created_at?: string
          id?: string
          is_fixed?: boolean
          is_taxable?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["payroll_component_category"]
          code?: string
          created_at?: string
          id?: string
          is_fixed?: boolean
          is_taxable?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      payroll_details: {
        Row: {
          amount: number
          created_at: string
          id: string
          notes: string | null
          payroll_component_id: string
          payroll_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          notes?: string | null
          payroll_component_id: string
          payroll_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          notes?: string | null
          payroll_component_id?: string
          payroll_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_details_payroll_component_id_fkey"
            columns: ["payroll_component_id"]
            isOneToOne: false
            referencedRelation: "payroll_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_details_payroll_id_fkey"
            columns: ["payroll_id"]
            isOneToOne: false
            referencedRelation: "payrolls"
            referencedColumns: ["id"]
          },
        ]
      }
      payrolls: {
        Row: {
          base_salary: number
          created_at: string
          employee_id: string
          id: string
          job_grade_snapshot: string
          net_salary: number
          paid_at: string | null
          period_month: number
          period_year: number
          status: Database["public"]["Enums"]["payroll_status_type"]
          total_deduction: number
          total_earning: number
          updated_at: string
        }
        Insert: {
          base_salary: number
          created_at?: string
          employee_id: string
          id?: string
          job_grade_snapshot: string
          net_salary?: number
          paid_at?: string | null
          period_month: number
          period_year: number
          status?: Database["public"]["Enums"]["payroll_status_type"]
          total_deduction?: number
          total_earning?: number
          updated_at?: string
        }
        Update: {
          base_salary?: number
          created_at?: string
          employee_id?: string
          id?: string
          job_grade_snapshot?: string
          net_salary?: number
          paid_at?: string | null
          period_month?: number
          period_year?: number
          status?: Database["public"]["Enums"]["payroll_status_type"]
          total_deduction?: number
          total_earning?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payrolls_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_reviews: {
        Row: {
          confirmed_at: string | null
          created_at: string
          employee_comments: string | null
          employee_id: string
          id: string
          overall_rating: string | null
          overall_score: number | null
          period_quarter: number | null
          period_year: number
          reviewed_at: string | null
          reviewer_comments: string | null
          reviewer_id: string
          status: Database["public"]["Enums"]["review_status_type"]
          updated_at: string
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string
          employee_comments?: string | null
          employee_id: string
          id?: string
          overall_rating?: string | null
          overall_score?: number | null
          period_quarter?: number | null
          period_year: number
          reviewed_at?: string | null
          reviewer_comments?: string | null
          reviewer_id: string
          status?: Database["public"]["Enums"]["review_status_type"]
          updated_at?: string
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string
          employee_comments?: string | null
          employee_id?: string
          id?: string
          overall_rating?: string | null
          overall_score?: number | null
          period_quarter?: number | null
          period_year?: number
          reviewed_at?: string | null
          reviewer_comments?: string | null
          reviewer_id?: string
          status?: Database["public"]["Enums"]["review_status_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_reviews_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_scores: {
        Row: {
          actual_value: number | null
          created_at: string
          id: string
          kpi_id: string
          notes: string | null
          performance_review_id: string
          score: number
          target_value: number | null
          weight_percentage: number
        }
        Insert: {
          actual_value?: number | null
          created_at?: string
          id?: string
          kpi_id: string
          notes?: string | null
          performance_review_id: string
          score: number
          target_value?: number | null
          weight_percentage: number
        }
        Update: {
          actual_value?: number | null
          created_at?: string
          id?: string
          kpi_id?: string
          notes?: string | null
          performance_review_id?: string
          score?: number
          target_value?: number | null
          weight_percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_scores_kpi_id_fkey"
            columns: ["kpi_id"]
            isOneToOne: false
            referencedRelation: "kpis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "performance_scores_performance_review_id_fkey"
            columns: ["performance_review_id"]
            isOneToOne: false
            referencedRelation: "performance_reviews"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          code: string
          created_at: string
          id: string
          module: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          module: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          module?: string
          name?: string
        }
        Relationships: []
      }
      positions: {
        Row: {
          code: string
          created_at: string
          deleted_at: string | null
          department_id: string
          id: string
          is_managerial: boolean
          job_grade_id: string
          section_id: string
          title: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          deleted_at?: string | null
          department_id: string
          id?: string
          is_managerial?: boolean
          job_grade_id: string
          section_id: string
          title: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          deleted_at?: string | null
          department_id?: string
          id?: string
          is_managerial?: boolean
          job_grade_id?: string
          section_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_job_grade_id_fkey"
            columns: ["job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "positions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion_histories: {
        Row: {
          approved_by: string | null
          created_at: string
          effective_date: string
          employee_id: string
          from_job_grade_id: string
          from_position_id: string
          id: string
          notes: string | null
          to_job_grade_id: string
          to_position_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          effective_date: string
          employee_id: string
          from_job_grade_id: string
          from_position_id: string
          id?: string
          notes?: string | null
          to_job_grade_id: string
          to_position_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          effective_date?: string
          employee_id?: string
          from_job_grade_id?: string
          from_position_id?: string
          id?: string
          notes?: string | null
          to_job_grade_id?: string
          to_position_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotion_histories_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_histories_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_histories_from_job_grade_id_fkey"
            columns: ["from_job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_histories_from_position_id_fkey"
            columns: ["from_position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_histories_to_job_grade_id_fkey"
            columns: ["to_job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "promotion_histories_to_position_id_fkey"
            columns: ["to_position_id"]
            isOneToOne: false
            referencedRelation: "positions"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      salaries: {
        Row: {
          base_salary: number
          created_at: string
          effective_date: string
          employee_id: string
          end_date: string | null
          id: string
          is_current: boolean
          job_grade_id: string
          updated_at: string
        }
        Insert: {
          base_salary: number
          created_at?: string
          effective_date: string
          employee_id: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          job_grade_id: string
          updated_at?: string
        }
        Update: {
          base_salary?: number
          created_at?: string
          effective_date?: string
          employee_id?: string
          end_date?: string | null
          id?: string
          is_current?: boolean
          job_grade_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "salaries_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salaries_job_grade_id_fkey"
            columns: ["job_grade_id"]
            isOneToOne: false
            referencedRelation: "job_grades"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          code: string
          created_at: string
          deleted_at: string | null
          department_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          deleted_at?: string | null
          department_id: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          deleted_at?: string | null
          department_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_assignments: {
        Row: {
          assignment_date: string
          created_at: string
          employee_id: string
          id: string
          shift_id: string
        }
        Insert: {
          assignment_date: string
          created_at?: string
          employee_id: string
          id?: string
          shift_id: string
        }
        Update: {
          assignment_date?: string
          created_at?: string
          employee_id?: string
          id?: string
          shift_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shift_assignments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shift_assignments_shift_id_fkey"
            columns: ["shift_id"]
            isOneToOne: false
            referencedRelation: "shifts"
            referencedColumns: ["id"]
          },
        ]
      }
      shift_patterns: {
        Row: {
          code: string
          created_at: string
          cycle_days: number
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          cycle_days: number
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          cycle_days?: number
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      shifts: {
        Row: {
          code: string
          created_at: string
          end_time: string
          id: string
          is_overnight: boolean
          name: string
          start_time: string
          tolerance_minutes: number
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          end_time: string
          id?: string
          is_overnight?: boolean
          name: string
          start_time: string
          tolerance_minutes?: number
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          end_time?: string
          id?: string
          is_overnight?: boolean
          name?: string
          start_time?: string
          tolerance_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      thr_payments: {
        Row: {
          amount: number
          created_at: string
          employee_id: string
          id: string
          paid_at: string | null
          year: number
        }
        Insert: {
          amount: number
          created_at?: string
          employee_id: string
          id?: string
          paid_at?: string | null
          year: number
        }
        Update: {
          amount?: number
          created_at?: string
          employee_id?: string
          id?: string
          paid_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "thr_payments_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      training_participants: {
        Row: {
          attendance_status: string
          created_at: string
          employee_id: string
          id: string
          registered_at: string
          training_schedule_id: string
        }
        Insert: {
          attendance_status?: string
          created_at?: string
          employee_id: string
          id?: string
          registered_at?: string
          training_schedule_id: string
        }
        Update: {
          attendance_status?: string
          created_at?: string
          employee_id?: string
          id?: string
          registered_at?: string
          training_schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_participants_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_participants_training_schedule_id_fkey"
            columns: ["training_schedule_id"]
            isOneToOne: false
            referencedRelation: "training_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      training_programs: {
        Row: {
          category: string | null
          code: string
          created_at: string
          deleted_at: string | null
          description: string | null
          duration_hours: number
          id: string
          name: string
          training_vendor_id: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration_hours?: number
          id?: string
          name: string
          training_vendor_id?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          duration_hours?: number
          id?: string
          name?: string
          training_vendor_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_programs_training_vendor_id_fkey"
            columns: ["training_vendor_id"]
            isOneToOne: false
            referencedRelation: "training_vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      training_results: {
        Row: {
          created_at: string
          evaluated_at: string | null
          id: string
          notes: string | null
          result: Database["public"]["Enums"]["participant_result_type"]
          score: number | null
          training_participant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          evaluated_at?: string | null
          id?: string
          notes?: string | null
          result?: Database["public"]["Enums"]["participant_result_type"]
          score?: number | null
          training_participant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          evaluated_at?: string | null
          id?: string
          notes?: string | null
          result?: Database["public"]["Enums"]["participant_result_type"]
          score?: number | null
          training_participant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_results_training_participant_id_fkey"
            columns: ["training_participant_id"]
            isOneToOne: true
            referencedRelation: "training_participants"
            referencedColumns: ["id"]
          },
        ]
      }
      training_schedules: {
        Row: {
          batch_code: string
          created_at: string
          end_date: string
          id: string
          location: string | null
          quota: number
          start_date: string
          status: Database["public"]["Enums"]["training_status_type"]
          training_program_id: string
          updated_at: string
        }
        Insert: {
          batch_code: string
          created_at?: string
          end_date: string
          id?: string
          location?: string | null
          quota?: number
          start_date: string
          status?: Database["public"]["Enums"]["training_status_type"]
          training_program_id: string
          updated_at?: string
        }
        Update: {
          batch_code?: string
          created_at?: string
          end_date?: string
          id?: string
          location?: string | null
          quota?: number
          start_date?: string
          status?: Database["public"]["Enums"]["training_status_type"]
          training_program_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_schedules_training_program_id_fkey"
            columns: ["training_program_id"]
            isOneToOne: false
            referencedRelation: "training_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      training_vendors: {
        Row: {
          city: string | null
          code: string
          created_at: string
          deleted_at: string | null
          email: string | null
          id: string
          name: string
          phone: string | null
          specialization: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          code: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          code?: string
          created_at?: string
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          specialization?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transfer_histories: {
        Row: {
          approved_by: string | null
          created_at: string
          effective_date: string
          employee_id: string
          from_branch_id: string
          from_department_id: string
          id: string
          reason: string | null
          to_branch_id: string
          to_department_id: string
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          effective_date: string
          employee_id: string
          from_branch_id: string
          from_department_id: string
          id?: string
          reason?: string | null
          to_branch_id: string
          to_department_id: string
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          effective_date?: string
          employee_id?: string
          from_branch_id?: string
          from_department_id?: string
          id?: string
          reason?: string | null
          to_branch_id?: string
          to_department_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfer_histories_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_histories_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_histories_from_branch_id_fkey"
            columns: ["from_branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_histories_from_department_id_fkey"
            columns: ["from_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_histories_to_branch_id_fkey"
            columns: ["to_branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_histories_to_department_id_fkey"
            columns: ["to_department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          employee_id: string | null
          id: string
          is_active: boolean
          last_login_at: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          employee_id?: string | null
          id: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          employee_id?: string | null
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: true
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      work_calendars: {
        Row: {
          branch_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
          year: number
        }
        Insert: {
          branch_id: string
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          year: number
        }
        Update: {
          branch_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "work_calendars_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_employee_id: { Args: never; Returns: string }
      has_role: { Args: { role_code: string }; Returns: boolean }
      is_hr_admin: { Args: never; Returns: boolean }
      is_manager_of: { Args: { target_employee_id: string }; Returns: boolean }
      refresh_certificate_status: { Args: never; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
    }
    Enums: {
      approval_entity_type:
        | "LEAVE_REQUEST"
        | "OVERTIME"
        | "ATTENDANCE_CORRECTION"
        | "BUSINESS_TRIP"
        | "MEDICAL_CLAIM"
        | "CONTRACT"
        | "PROMOTION"
        | "TRANSFER"
      approval_status_type: "MENUNGGU" | "DISETUJUI" | "DITOLAK"
      attendance_status_type:
        | "HADIR"
        | "TERLAMBAT"
        | "PULANG_CEPAT"
        | "ALPHA"
        | "CUTI"
        | "SAKIT"
        | "IZIN"
        | "DINAS_LUAR"
        | "LIBUR"
      candidate_status_type:
        | "BARU"
        | "SCREENING"
        | "INTERVIEW"
        | "OFFERING"
        | "DITERIMA"
        | "DITOLAK"
        | "MENGUNDURKAN_DIRI"
      certificate_status_type: "AKTIF" | "KEDALUWARSA" | "DICABUT"
      claim_status_type:
        | "DIAJUKAN"
        | "DIVERIFIKASI"
        | "DISETUJUI"
        | "DITOLAK"
        | "DIBAYAR"
      contract_status_type: "AKTIF" | "BERAKHIR" | "DIPERPANJANG" | "DIPUTUS"
      correction_status_type: "DIAJUKAN" | "DISETUJUI" | "DITOLAK"
      document_status_type: "AKTIF" | "KEDALUWARSA" | "ARSIP"
      employee_status_type:
        | "AKTIF"
        | "CUTI_PANJANG"
        | "SKORSING"
        | "NON_AKTIF"
        | "PENSIUN"
        | "RESIGN"
        | "PHK"
      gender_type: "L" | "P"
      goal_status_type:
        | "BELUM_MULAI"
        | "BERJALAN"
        | "TERCAPAI"
        | "TIDAK_TERCAPAI"
      interview_result_type: "LULUS" | "TIDAK_LULUS" | "PERTIMBANGAN"
      leave_status_type: "DIAJUKAN" | "DISETUJUI" | "DITOLAK" | "DIBATALKAN"
      marital_status_type:
        | "BELUM_KAWIN"
        | "KAWIN"
        | "CERAI_HIDUP"
        | "CERAI_MATI"
      notification_channel_type: "SYSTEM" | "EMAIL" | "PUSH"
      overtime_status_type: "DIAJUKAN" | "DISETUJUI" | "DITOLAK" | "SELESAI"
      participant_result_type: "LULUS" | "TIDAK_LULUS" | "MENGULANG" | "PENDING"
      payroll_component_category: "EARNING" | "DEDUCTION"
      payroll_status_type: "DRAFT" | "DIPROSES" | "DIBAYAR" | "DIBATALKAN"
      review_status_type: "DRAFT" | "BERLANGSUNG" | "SELESAI" | "DIKONFIRMASI"
      training_status_type:
        | "TERJADWAL"
        | "BERLANGSUNG"
        | "SELESAI"
        | "DIBATALKAN"
      vacancy_status_type: "DIBUKA" | "PROSES" | "DITUTUP" | "DIBATALKAN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      approval_entity_type: [
        "LEAVE_REQUEST",
        "OVERTIME",
        "ATTENDANCE_CORRECTION",
        "BUSINESS_TRIP",
        "MEDICAL_CLAIM",
        "CONTRACT",
        "PROMOTION",
        "TRANSFER",
      ],
      approval_status_type: ["MENUNGGU", "DISETUJUI", "DITOLAK"],
      attendance_status_type: [
        "HADIR",
        "TERLAMBAT",
        "PULANG_CEPAT",
        "ALPHA",
        "CUTI",
        "SAKIT",
        "IZIN",
        "DINAS_LUAR",
        "LIBUR",
      ],
      candidate_status_type: [
        "BARU",
        "SCREENING",
        "INTERVIEW",
        "OFFERING",
        "DITERIMA",
        "DITOLAK",
        "MENGUNDURKAN_DIRI",
      ],
      certificate_status_type: ["AKTIF", "KEDALUWARSA", "DICABUT"],
      claim_status_type: [
        "DIAJUKAN",
        "DIVERIFIKASI",
        "DISETUJUI",
        "DITOLAK",
        "DIBAYAR",
      ],
      contract_status_type: ["AKTIF", "BERAKHIR", "DIPERPANJANG", "DIPUTUS"],
      correction_status_type: ["DIAJUKAN", "DISETUJUI", "DITOLAK"],
      document_status_type: ["AKTIF", "KEDALUWARSA", "ARSIP"],
      employee_status_type: [
        "AKTIF",
        "CUTI_PANJANG",
        "SKORSING",
        "NON_AKTIF",
        "PENSIUN",
        "RESIGN",
        "PHK",
      ],
      gender_type: ["L", "P"],
      goal_status_type: [
        "BELUM_MULAI",
        "BERJALAN",
        "TERCAPAI",
        "TIDAK_TERCAPAI",
      ],
      interview_result_type: ["LULUS", "TIDAK_LULUS", "PERTIMBANGAN"],
      leave_status_type: ["DIAJUKAN", "DISETUJUI", "DITOLAK", "DIBATALKAN"],
      marital_status_type: [
        "BELUM_KAWIN",
        "KAWIN",
        "CERAI_HIDUP",
        "CERAI_MATI",
      ],
      notification_channel_type: ["SYSTEM", "EMAIL", "PUSH"],
      overtime_status_type: ["DIAJUKAN", "DISETUJUI", "DITOLAK", "SELESAI"],
      participant_result_type: ["LULUS", "TIDAK_LULUS", "MENGULANG", "PENDING"],
      payroll_component_category: ["EARNING", "DEDUCTION"],
      payroll_status_type: ["DRAFT", "DIPROSES", "DIBAYAR", "DIBATALKAN"],
      review_status_type: ["DRAFT", "BERLANGSUNG", "SELESAI", "DIKONFIRMASI"],
      training_status_type: [
        "TERJADWAL",
        "BERLANGSUNG",
        "SELESAI",
        "DIBATALKAN",
      ],
      vacancy_status_type: ["DIBUKA", "PROSES", "DITUTUP", "DIBATALKAN"],
    },
  },
} as const
