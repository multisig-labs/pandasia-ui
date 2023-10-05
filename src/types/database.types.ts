export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      airdrop_info: {
        Row: {
          company_name: string | null;
          description: string | null;
          id: number;
          logo: string | null;
          summary: string | null;
          url: string | null;
        };
        Insert: {
          company_name?: string | null;
          description?: string | null;
          id?: number;
          logo?: string | null;
          summary?: string | null;
          url?: string | null;
        };
        Update: {
          company_name?: string | null;
          description?: string | null;
          id?: number;
          logo?: string | null;
          summary?: string | null;
          url?: string | null;
        };
        Relationships: [];
      };
      airdrop_to_contract: {
        Row: {
          contract_id: number;
          id: number;
        };
        Insert: {
          contract_id: number;
          id: number;
        };
        Update: {
          contract_id?: number;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
