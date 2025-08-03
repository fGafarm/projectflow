// lib/types.ts

// タスクの型定義
export interface Task {
    id: string
    project_id: string
    title: string
    description: string | null
    priority: 'high' | 'medium' | 'low' | null
    assignee: string | null
    duration: string | null
    phase: string | null
    status: 'todo' | 'in-progress' | 'testing' | 'done' | null
    notes: string | null
    tags: string[] | null
    position: number | null
    created_at: string
    updated_at: string
  }
  
  // プロジェクトの型定義
  export interface Project {
    id: string
    name: string
    description: string | null
    owner_id: string
    created_at: string
    updated_at: string
  }
  
  // ユーザープロファイルの型定義
  export interface Profile {
    id: string
    email: string
    name: string | null
    avatar_url: string | null
    subscription_tier: string
    created_at: string
    updated_at: string
  }