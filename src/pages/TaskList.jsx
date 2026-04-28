import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { taskService } from '../services/api'
import TaskItem from '../components/TaskItem'

function TaskList({ tasks, setTasks, token }) {
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  // Toggle if a task is finished or not
  async function toggleComplete(id, completed) {
    const newStatus = !completed
    try {
      await taskService.update(token, id, { completed: newStatus })
      // Update the local state so the UI changes immediately
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: newStatus } : task
      ))
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  // Send a delete request to the server
  async function deleteTask(id) {
    if (!window.confirm('Delete this task?')) return
    try {
      await taskService.delete(token, id)
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  async function saveEdit(id) {
    try {
      await taskService.update(token, id, { title: editTitle })
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, title: editTitle } : task
      ))
      setEditingId(null)
    } catch (err) {
      console.error('Edit error:', err)
    }
  }

  function startEdit(task) {
    setEditingId(task.id)
    setEditTitle(task.title)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#ad1457', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <CheckCircle /> My Tasks
      </h2>
      
      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#880e4f', backgroundColor: 'white', borderRadius: '16px' }}>
          <p>No tasks yet. Time to add some!</p>
        </div>
      )}

      <div style={{ display: 'grid', gap: '1rem' }}>
        {tasks.map(task => (
          <TaskItem 
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editingId={editingId}
            setEditingId={setEditingId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            saveEdit={saveEdit}
            startEdit={startEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList
