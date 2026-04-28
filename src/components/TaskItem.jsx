import React from 'react';
import { CheckCircle, Circle, Trash2, Edit2, Save, X } from 'lucide-react';

function TaskItem({ 
  task, 
  toggleComplete, 
  deleteTask, 
  editingId, 
  setEditingId, 
  editTitle, 
  setEditTitle, 
  saveEdit, 
  startEdit 
}) {
  const isEditing = editingId === task.id;

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.2rem 1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
      opacity: task.completed ? 0.7 : 1,
      transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexGrow: 1 }}>
        <button 
          onClick={() => toggleComplete(task.id, task.completed)}
          style={{ background: 'none', border: 'none', padding: 0, color: task.completed ? '#ad1457' : '#f8bbd0' }}
        >
          {task.completed ? <CheckCircle size={28} /> : <Circle size={28} />}
        </button>
        
        {isEditing ? (
          <input 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ flexGrow: 1, padding: '0.5rem', border: '2px solid #f8bbd0' }}
            autoFocus
          />
        ) : (
          <div>
            <h3 style={{
              margin: 0,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#880e4f' : '#2c3e50',
              fontSize: '1.1rem'
            }}>{task.title}</h3>
            <small style={{ color: '#aaa' }}>
              {new Date(task.created_at).toLocaleDateString()}
            </small>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {isEditing ? (
          <>
            <button onClick={() => saveEdit(task.id)} style={{ color: '#4caf50', background: 'none', border: 'none' }}><Save size={20} /></button>
            <button onClick={() => setEditingId(null)} style={{ color: '#f44336', background: 'none', border: 'none' }}><X size={20} /></button>
          </>
        ) : (
          <>
            <button onClick={() => startEdit(task)} style={{ color: '#7f8c8d', background: 'none', border: 'none' }}><Edit2 size={20} /></button>
            <button onClick={() => deleteTask(task.id)} style={{ color: '#e74c3c', background: 'none', border: 'none' }}><Trash2 size={20} /></button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
