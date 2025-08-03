// components/TaskBoard.tsx
import React, { useState, useEffect } from 'react';
import { Search, Plus, Calendar, User, Flag, MessageSquare, X, Trash2, LogOut, Edit3, Save, AlertTriangle, Settings, UserPlus, FolderPlus } from 'lucide-react';

// 型定義
interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low' | null;
  assignee: string | null;
  duration: string | null;
  phase: string | null;
  status: 'todo' | 'in-progress' | 'testing' | 'done' | null;
  notes: string | null;
  tags: string[] | null;
  position: number | null;
  created_at: string;
  updated_at: string;
}

// 新しいタスクの状態型
type NewTaskState = {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  duration: string;
  phase: string;
  status: 'todo' | 'in-progress' | 'testing' | 'done';
};

// 設定の型
interface ProjectSettings {
  assignees: string[];
  phases: string[];
}

interface TaskBoardProps {
  projectId: string;
  projectName: string;
  tasks: Task[];
  onCreateTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'position'>) => Promise<void>;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  onMoveTask: (taskId: string, newStatus: Task['status'], newPosition: number) => Promise<void>;
  onSignOut: () => void;
  userName: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  projectId,
  projectName,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onMoveTask,
  onSignOut,
  userName,
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // 設定状態の管理
  const [settings, setSettings] = useState<ProjectSettings>({
    assignees: ['PM', 'BE', 'FE', 'DB', 'OPS', 'QA', 'DE', 'ML', 'SEC'],
    phases: ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5']
  });
  const [tempSettings, setTempSettings] = useState<ProjectSettings>(settings);
  const [newAssignee, setNewAssignee] = useState('');
  const [newPhase, setNewPhase] = useState('');

  const [newTask, setNewTask] = useState<NewTaskState>({
    title: '',
    description: '',
    priority: 'medium',
    assignee: settings.assignees[0] || 'BE',
    duration: '3日',
    phase: settings.phases[0] || 'Phase 1',
    status: 'todo',
  });

  // 設定をローカルストレージから読み込み
  useEffect(() => {
    const savedSettings = localStorage.getItem(`projectSettings_${projectId}`);
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      setTempSettings(parsed);
    }
  }, [projectId]);

  // 設定変更時にnewTaskのデフォルト値を更新
  useEffect(() => {
    setNewTask(prev => ({
      ...prev,
      assignee: settings.assignees[0] || 'BE',
      phase: settings.phases[0] || 'Phase 1',
    }));
  }, [settings]);

  const columns = [
    { id: 'todo', title: 'TODO', color: 'from-red-500 to-red-600' },
    { id: 'in-progress', title: 'IN PROGRESS', color: 'from-blue-500 to-blue-600' },
    { id: 'testing', title: 'TESTING', color: 'from-yellow-500 to-yellow-600' },
    { id: 'done', title: 'DONE', color: 'from-green-500 to-green-600' },
  ];

  const priorities = [
    { value: 'high', label: 'HIGH', color: 'bg-red-500' },
    { value: 'medium', label: 'MED', color: 'bg-yellow-500' },
    { value: 'low', label: 'LOW', color: 'bg-green-500' },
  ];

  // 設定の保存
  const saveSettings = () => {
    setSettings(tempSettings);
    localStorage.setItem(`projectSettings_${projectId}`, JSON.stringify(tempSettings));
    setShowSettings(false);
  };

  // 設定のキャンセル
  const cancelSettings = () => {
    setTempSettings(settings);
    setNewAssignee('');
    setNewPhase('');
    setShowSettings(false);
  };

  // 担当者を追加
  const addAssignee = () => {
    if (newAssignee.trim() && !tempSettings.assignees.includes(newAssignee.trim())) {
      setTempSettings(prev => ({
        ...prev,
        assignees: [...prev.assignees, newAssignee.trim()]
      }));
      setNewAssignee('');
    }
  };

  // 担当者を削除
  const removeAssignee = (assignee: string) => {
    setTempSettings(prev => ({
      ...prev,
      assignees: prev.assignees.filter(a => a !== assignee)
    }));
  };

  // フェーズを追加
  const addPhase = () => {
    if (newPhase.trim() && !tempSettings.phases.includes(newPhase.trim())) {
      setTempSettings(prev => ({
        ...prev,
        phases: [...prev.phases, newPhase.trim()]
      }));
      setNewPhase('');
    }
  };

  // フェーズを削除
  const removePhase = (phase: string) => {
    setTempSettings(prev => ({
      ...prev,
      phases: prev.phases.filter(p => p !== phase)
    }));
  };

  // タスクフィルタリング
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesPhase = filterPhase === 'all' || task.phase === filterPhase;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPhase && matchesPriority;
  });

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, newStatus: Task['status']) => {
    e.preventDefault();
    if (draggedTask && newStatus) {
      const tasksInColumn = filteredTasks.filter(t => t.status === newStatus);
      const newPosition = tasksInColumn.length;
      await onMoveTask(draggedTask.id, newStatus, newPosition);
      setDraggedTask(null);
    }
  };

  const addNewTask = async () => {
    await onCreateTask({
      ...newTask,
      project_id: projectId,
      notes: null,
      tags: [],
    });
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      assignee: settings.assignees[0] || 'BE',
      duration: '3日',
      phase: settings.phases[0] || 'Phase 1',
      status: 'todo',
    });
    setIsAddingTask(false);
  };

  // タスク編集の開始
  const startEditingTask = (task: Task) => {
    setEditingTask({ ...task });
    setSelectedTask(null);
  };

  // タスク編集の保存
  const saveTaskEdit = async () => {
    if (!editingTask) return;
    
    try {
      await onUpdateTask(editingTask.id, {
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        assignee: editingTask.assignee,
        duration: editingTask.duration,
        phase: editingTask.phase,
        status: editingTask.status,
        notes: editingTask.notes,
      });
      setEditingTask(null);
    } catch (error) {
      console.error('タスク更新エラー:', error);
      alert('タスクの更新に失敗しました');
    }
  };

  // タスク編集のキャンセル
  const cancelTaskEdit = () => {
    setEditingTask(null);
  };

  // タスク削除の確認
  const confirmDeleteTask = (taskId: string) => {
    setShowDeleteConfirm(taskId);
  };

  // タスク削除の実行
  const executeDeleteTask = async (taskId: string) => {
    try {
      await onDeleteTask(taskId);
      setShowDeleteConfirm(null);
      setSelectedTask(null);
      setEditingTask(null);
    } catch (error) {
      console.error('タスク削除エラー:', error);
      alert('タスクの削除に失敗しました');
    }
  };

  const updateTaskNotes = async (taskId: string, notes: string) => {
    await onUpdateTask(taskId, { notes });
  };

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks
      .filter(task => task.status === status)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  };

  const getProgressStats = () => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const testing = tasks.filter(t => t.status === 'testing').length;
    return { total, done, inProgress, testing, progress: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const stats = getProgressStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">🚀</div>
                <h1 className="text-2xl font-bold">{projectName}</h1>
                <div className="ml-auto flex items-center gap-4">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                    title="設定"
                  >
                    <Settings size={16} />
                    <span className="text-sm">設定</span>
                  </button>
                  <span className="text-sm opacity-90">ようこそ</span>
                  <span className="font-semibold">{userName}</span>
                  <button
                    onClick={onSignOut}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-lg opacity-90 mb-4">
                ドラッグ&ドロップで管理する次世代プロジェクト管理
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">プロジェクト進捗</span>
                  <span className="text-lg font-bold">{stats.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stats.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm opacity-90">
                  <span>完了: {stats.done}</span>
                  <span>進行中: {stats.inProgress}</span>
                  <span>テスト: {stats.testing}</span>
                  <span>総計: {stats.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* フィルターとコントロール */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="タスクを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filterPhase}
            onChange={(e) => setFilterPhase(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">全フェーズ</option>
            {settings.phases.map(phase => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">全優先度</option>
            {priorities.map(priority => (
              <option key={priority.value} value={priority.value}>{priority.label}</option>
            ))}
          </select>

          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            新規タスク
          </button>
        </div>
      </div>

      {/* タスクボード */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <div
              key={column.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task['status'])}
            >
              <div className={`bg-gradient-to-r ${column.color} text-white p-4 text-center font-bold`}>
                {column.title}
                <div className="text-sm opacity-90 mt-1">
                  {getTasksByStatus(column.id as Task['status']).length} タスク
                </div>
              </div>
              
              <div className="p-4 min-h-96">
                {getTasksByStatus(column.id as Task['status']).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => setSelectedTask(task)}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                          priorities.find(p => p.value === task.priority)?.color || 'bg-gray-500'
                        }`}>
                          {priorities.find(p => p.value === task.priority)?.label || 'UNKNOWN'}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {task.phase}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{task.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 設定モーダル */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-90vh overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings size={24} />
                  <h2 className="text-xl font-bold">プロジェクト設定</h2>
                </div>
                <button
                  onClick={cancelSettings}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* 担当者設定 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserPlus size={20} />
                  担当者管理
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAssignee}
                      onChange={(e) => setNewAssignee(e.target.value)}
                      placeholder="新しい担当者を追加（例: PM, BE, FE）"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addAssignee()}
                    />
                    <button
                      onClick={addAssignee}
                      className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      追加
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {tempSettings.assignees.map(assignee => (
                      <div key={assignee} className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                        <span className="text-sm font-medium">{assignee}</span>
                        <button
                          onClick={() => removeAssignee(assignee)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* フェーズ設定 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FolderPlus size={20} />
                  フェーズ管理
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newPhase}
                      onChange={(e) => setNewPhase(e.target.value)}
                      placeholder="新しいフェーズを追加（例: Phase 6, 設計フェーズ）"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addPhase()}
                    />
                    <button
                      onClick={addPhase}
                      className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      追加
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {tempSettings.phases.map(phase => (
                      <div key={phase} className="flex items-center justify-between bg-gray-100 rounded-lg p-2">
                        <span className="text-sm font-medium">{phase}</span>
                        <button
                          onClick={() => removePhase(phase)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <button
                  onClick={cancelSettings}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={saveSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save size={20} />
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タスク詳細モーダル */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto shadow-2xl">
            <div className={`bg-gradient-to-r ${
              columns.find(c => c.id === selectedTask.status)?.color || 'from-gray-500 to-gray-600'
            } text-white p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded text-sm font-bold text-white ${
                    priorities.find(p => p.value === selectedTask.priority)?.color || 'bg-gray-500'
                  }`}>
                    {priorities.find(p => p.value === selectedTask.priority)?.label || 'UNKNOWN'}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded text-sm">
                    {selectedTask.phase}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded text-sm">
                    {columns.find(c => c.id === selectedTask.status)?.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startEditingTask(selectedTask)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="編集"
                  >
                    <Edit3 size={20} />
                  </button>
                  <button
                    onClick={() => confirmDeleteTask(selectedTask.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-colors"
                    title="削除"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedTask.title}</h2>
                <p className="text-gray-600">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-500" />
                  <span className="text-sm">担当者: {selectedTask.assignee}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span className="text-sm">期間: {selectedTask.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare size={16} />
                  メモ・進捗記録
                </h3>
                <textarea
                  value={selectedTask.notes || ''}
                  onChange={(e) => updateTaskNotes(selectedTask.id, e.target.value)}
                  placeholder="このタスクに関するメモや進捗を記録..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タスク編集モーダル */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">タスクを編集</h2>
                <button
                  onClick={cancelTaskEdit}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">タスク名</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                <textarea
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">優先度</label>
                  <select
                    value={editingTask.priority || 'medium'}
                    onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as Task['priority'] })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                  <select
                    value={editingTask.status || 'todo'}
                    onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as Task['status'] })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {columns.map(column => (
                      <option key={column.id} value={column.id}>{column.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">担当者</label>
                  <select
                    value={editingTask.assignee || settings.assignees[0]}
                    onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {settings.assignees.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
                  <input
                    type="text"
                    value={editingTask.duration || ''}
                    onChange={(e) => setEditingTask({ ...editingTask, duration: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="例: 3日"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">フェーズ</label>
                  <select
                    value={editingTask.phase || settings.phases[0]}
                    onChange={(e) => setEditingTask({ ...editingTask, phase: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {settings.phases.map(phase => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">メモ</label>
                <textarea
                  value={editingTask.notes || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="タスクに関するメモや進捗..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={cancelTaskEdit}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={saveTaskEdit}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save size={20} />
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle size={24} />
                <h2 className="text-xl font-bold">タスクを削除</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                このタスクを削除してもよろしいですか？この操作は取り消せません。
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={() => executeDeleteTask(showDeleteConfirm)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={20} />
                  削除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 新規タスク作成モーダル */}
      {isAddingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">新規タスク作成</h2>
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">タスク名</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="タスクの名前を入力..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">説明</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="タスクの詳細説明..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">優先度</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>{priority.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as NewTaskState['status'] })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {columns.map(column => (
                      <option key={column.id} value={column.id}>{column.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">担当者</label>
                  <select
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {settings.assignees.map(assignee => (
                      <option key={assignee} value={assignee}>{assignee}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">期間</label>
                  <input
                    type="text"
                    value={newTask.duration}
                    onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="例: 3日"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">フェーズ</label>
                  <select
                    value={newTask.phase}
                    onChange={(e) => setNewTask({ ...newTask, phase: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {settings.phases.map(phase => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={addNewTask}
                  disabled={!newTask.title.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  作成
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;