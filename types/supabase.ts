export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          content: string
          created_at: string
          id: string
          pages: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
          pages?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          pages?: string
        }
        Relationships: []
      }
      socio: {
        Row: {
          content: string
          created_at: string
          id: string
        }
        Insert: {
          content?: string
          created_at?: string
          id?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      words: {
        Row: {
          id: number
          word: string | null
        }
        Insert: {
          id: number
          word?: string | null
        }
        Update: {
          id?: number
          word?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
