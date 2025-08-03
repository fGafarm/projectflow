// hooks/useTasks.ts
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Task } from '@/lib/types'
import { RealtimeChannel } from '@supabase/supabase-js'

interface UseTasksOptions {
  projectId: string
}

export function useTasks({ projectId }: UseTasksOptions) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel

    const fetchTasks = async () => {
      try {
        console.log('🔍 Fetching tasks for project:', projectId)
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('project_id', projectId)
          .order('position', { ascending: true })

        if (error) throw error
        console.log('📊 Fetched tasks:', data)
        setTasks(data || [])
      } catch (err) {
        console.error('❌ Fetch tasks error:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    // リアルタイム同期の設定
    const setupRealtimeSync = () => {
      console.log('🔄 Setting up realtime sync for project:', projectId)
      channel = supabase
        .channel(`tasks:${projectId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tasks',
            filter: `project_id=eq.${projectId}`,
          },
          (payload) => {
            console.log('📡 Realtime update received:', payload)
            if (payload.eventType === 'INSERT') {
              setTasks((current) => [...current, payload.new as Task])
            } else if (payload.eventType === 'UPDATE') {
              setTasks((current) =>
                current.map((task) =>
                  task.id === payload.new.id ? (payload.new as Task) : task
                )
              )
            } else if (payload.eventType === 'DELETE') {
              setTasks((current) =>
                current.filter((task) => task.id !== payload.old.id)
              )
            }
          }
        )
        .subscribe((status) => {
          console.log('📡 Realtime subscription status:', status)
        })
    }

    if (projectId) {
      fetchTasks()
      setupRealtimeSync()
    }

    return () => {
      if (channel) {
        console.log('🔌 Unsubscribing from realtime channel')
        channel.unsubscribe()
      }
    }
  }, [projectId, supabase])

  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'position'>) => {
    console.log('📝 Creating task:', task)
    
    // 楽観的更新：まずローカルに追加
    const tempTask: Task = {
      ...task,
      id: `temp-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      position: tasks.length
    }
    
    setTasks(current => [...current, tempTask])

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task)
        .select()
        .single()

      if (error) throw error

      // 成功したら一時的なタスクを実際のデータに置き換え
      setTasks(current => 
        current.map(t => t.id === tempTask.id ? data : t)
      )
      
      console.log('✅ Task created successfully:', data)
      return data
    } catch (error) {
      // エラーの場合は一時的なタスクを削除
      setTasks(current => 
        current.filter(t => t.id !== tempTask.id)
      )
      console.error('❌ Create task error:', error)
      throw error
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    console.log('📝 Updating task:', { taskId, updates })
    
    // 楽観的更新：まずローカル状態を更新
    setTasks(current =>
      current.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    )

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single()

      if (error) throw error

      console.log('✅ Task updated successfully:', data)
      return data
    } catch (error) {
      console.error('❌ Update task error:', error)
      // エラーの場合は元のデータを再取得
      const { data: originalTask } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single()
      
      if (originalTask) {
        setTasks(current =>
          current.map(task =>
            task.id === taskId ? originalTask : task
          )
        )
      }
      throw error
    }
  }

  const deleteTask = async (taskId: string) => {
    console.log('🗑️ Deleting task:', taskId)
    
    // 楽観的更新：まずローカルから削除
    const originalTasks = tasks
    setTasks(current => current.filter(task => task.id !== taskId))

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)

      if (error) throw error
      
      console.log('✅ Task deleted successfully')
    } catch (error) {
      // エラーの場合は元に戻す
      setTasks(originalTasks)
      console.error('❌ Delete task error:', error)
      throw error
    }
  }

  const moveTask = async (taskId: string, newStatus: Task['status'], newPosition: number) => {
    console.log('🔄 Moving task:', { taskId, newStatus, newPosition })
    
    // 楽観的更新：まずローカル状態を即座に更新
    const originalTasks = tasks
    setTasks(currentTasks => 
      currentTasks.map(task =>
        task.id === taskId 
          ? { ...task, status: newStatus, position: newPosition }
          : task
      )
    )

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status: newStatus, position: newPosition })
        .eq('id', taskId)
        .select()
        .single()

      if (error) throw error

      console.log('✅ Task moved successfully:', data)
    } catch (error) {
      // エラーの場合は元に戻す
      setTasks(originalTasks)
      console.error('❌ Move task error:', error)
      throw error
    }
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
  }
}