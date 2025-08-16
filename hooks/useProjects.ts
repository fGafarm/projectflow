// hooks/useProjects.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/lib/types'
import { useAuth } from './useAuth'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setProjects([])
      setLoading(false)
      return
    }

    const fetchProjects = async () => {
      try {
        console.log('🔍 Fetching projects for user:', user.id)
                
        // 自分がオーナーのプロジェクトを取得
        const { data: ownedProjects, error: ownedError } = await supabase
          .from('projects')
          .select('*')
          .eq('owner_id', user.id)

        console.log('📊 Fetch projects result:', { data: ownedProjects, error: ownedError })

        if (ownedError) throw ownedError

        // TODO: 将来的にはメンバーとして参加しているプロジェクトも取得
        // const { data: memberProjects, error: memberError } = await supabase
        //   .from('project_members')
        //   .select('projects(*)')
        //   .eq('user_id', user.id)

        setProjects(ownedProjects || [])
      } catch (err) {
        console.error('❌ Fetch projects error:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [user, supabase])

  const createProject = async (name: string, description?: string) => {
    console.log('🚀 createProject called with:', { name, description, user: user?.id })
        
    if (!user) {
      console.error('❌ User not authenticated')
      throw new Error('User not authenticated')
    }

    try {
      console.log('📝 Inserting project into database...')
            
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name,
          description,
          owner_id: user.id,
        })
        .select()
        .single()

      console.log('📊 Supabase insert result:', { data, error })
            
      if (error) {
        console.error('❌ Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          fullError: error
        })
        throw error
      }

      console.log('✅ Project created successfully:', data)
      setProjects((current) => [...current, data])
      return data
    } catch (err) {
      console.error('❌ createProject catch block:', {
        error: err,
        type: typeof err,
        constructor: err?.constructor?.name,
        message: err instanceof Error ? err.message : 'Unknown error',
        keys: Object.keys(err || {})
      })
      throw err
    }
  }

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) throw error
    setProjects((current) =>
      current.map((p) => (p.id === projectId ? data : p))
    )
    return data
  }

  // 🔥 改良: 関連タスクも一括削除する安全なプロジェクト削除
  const deleteProject = async (projectId: string) => {
    console.log('🗑️ Starting project deletion:', projectId)
    
    try {
      // 1. まず関連タスクを一括削除
      console.log('🗑️ Deleting related tasks...')
      const { error: tasksError } = await supabase
        .from('tasks')
        .delete()
        .eq('project_id', projectId)

      if (tasksError) {
        console.error('❌ Failed to delete related tasks:', tasksError)
        throw tasksError
      }
      console.log('✅ Related tasks deleted successfully')

      // 2. プロジェクトを削除
      console.log('🗑️ Deleting project...')
      const { error: projectError } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (projectError) {
        console.error('❌ Failed to delete project:', projectError)
        throw projectError
      }
      console.log('✅ Project deleted successfully')

      // 3. ローカル状態を更新
      setProjects((current) => current.filter((p) => p.id !== projectId))
      
      return true
    } catch (error) {
      console.error('❌ Delete project error:', error)
      throw error
    }
  }

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject, // 🔥 改良された削除機能
  }
}