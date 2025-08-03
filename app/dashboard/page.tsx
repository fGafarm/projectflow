'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import TaskBoard from '@/components/TaskBoard'
import { useAuth } from '@/hooks/useAuth'
import { useTasks } from '@/hooks/useTasks'
import { useProjects } from '@/hooks/useProjects'
import { Plus, FolderOpen } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const { projects, loading: projectsLoading, createProject } = useProjects()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isCreatingProject, setIsCreatingProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDescription, setNewProjectDescription] = useState('')

  // 選択されたプロジェクトのタスクを取得（型エラー修正）
  const { 
    tasks, 
    loading: tasksLoading, 
    createTask, 
    updateTask, 
    deleteTask, 
    moveTask 
  } = useTasks({ projectId: selectedProjectId || '' }) // オブジェクト形式で渡す

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !user) {
      redirect('/auth/login')
    }
  }, [user, authLoading])

  // デフォルトプロジェクトの選択
  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id)
    }
  }, [projects, selectedProjectId])

  // 新規プロジェクト作成（型エラー修正）
  const handleCreateProject = async () => {
    if (newProjectName.trim() && user) {
      console.log('🚀 プロジェクト作成開始:', { 
        name: newProjectName, 
        description: newProjectDescription,
        user: user.id 
      })
      try {
        // createProject関数に正しい形式で引数を渡す（文字列引数の場合）
        const project = await createProject(newProjectName, newProjectDescription)
        console.log('✅ プロジェクト作成成功:', project)
        setSelectedProjectId(project.id)
        setNewProjectName('')
        setNewProjectDescription('')
        setIsCreatingProject(false)
      } catch (error) {
        console.error('❌ プロジェクト作成エラー詳細:', error)
        console.error('Error type:', typeof error)
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
        if (error instanceof Error && error.stack) {
          console.error('Stack trace:', error.stack)
        }
      }
    }
  }

  if (authLoading || projectsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  // プロジェクトが無い場合
  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">プロジェクトがありません</h2>
            <p className="text-gray-600">最初のプロジェクトを作成しましょう！</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                プロジェクト名
              </label>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="例: 新製品開発"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                説明（任意）
              </label>
              <textarea
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                className="w-full p-3 border rounded-lg h-20 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="プロジェクトの概要を入力..."
              />
            </div>

            <button
              onClick={handleCreateProject}
              disabled={!newProjectName.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              プロジェクトを作成
            </button>
          </div>
        </div>
      </div>
    )
  }

  const selectedProject = projects.find(p => p.id === selectedProjectId)

  return (
    <>
      {/* プロジェクト選択バー */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                プロジェクト:
              </label>
              <select
                value={selectedProjectId || ''}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsCreatingProject(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              新規プロジェクト
            </button>
          </div>
        </div>
      </div>

      {/* タスクボード */}
      {selectedProject && (
        <TaskBoard
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          tasks={tasks}
          onCreateTask={createTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onMoveTask={moveTask}
          onSignOut={signOut}
          userName={user.user_metadata?.name || user.email || 'ユーザー'}
        />
      )}

      {/* 新規プロジェクト作成モーダル */}
      {isCreatingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <h2 className="text-xl font-bold">新規プロジェクト作成</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  プロジェクト名
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="例: 新製品開発"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  説明（任意）
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg h-20 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="プロジェクトの概要を入力..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsCreatingProject(false)
                    setNewProjectName('')
                    setNewProjectDescription('')
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleCreateProject}
                  disabled={!newProjectName.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}