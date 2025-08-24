// lib/supabase.ts
// 既存のclient.tsからエクスポート
import { createClient } from './supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

// シングルトンインスタンスを作成
export const supabase: SupabaseClient = createClient()

// 型定義
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          position_x: number
          position_y: number
          z_index: number
          project_id: string
          column_id: string | null
          assignee: string | null
          priority: string | null
          due_date: string | null
          phase: string | null
          duration: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          position_x?: number
          position_y?: number
          z_index?: number
          project_id: string
          column_id?: string | null
          assignee?: string | null
          priority?: string | null
          due_date?: string | null
          phase?: string | null
          duration?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          status?: string
          position_x?: number
          position_y?: number
          z_index?: number
          column_id?: string | null
          assignee?: string | null
          priority?: string | null
          due_date?: string | null
          phase?: string | null
          duration?: string | null
          updated_at?: string
        }
      }
      project_columns: {
        Row: {
          id: string
          project_id: string
          name: string
          color: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          name: string
          color?: string
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          color?: string
          order_index?: number
          updated_at?: string
        }
      }
      login_attempts: {
        Row: {
          id: string
          email: string
          ip_address: string | null
          attempted_at: string
          success: boolean
          user_agent: string | null
        }
        Insert: {
          id?: string
          email: string
          ip_address?: string | null
          attempted_at?: string
          success?: boolean
          user_agent?: string | null
        }
        Update: {
          success?: boolean
        }
      }
    }
  }
}