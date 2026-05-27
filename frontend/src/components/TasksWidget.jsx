import { useState } from 'react'

const categoryColors = {
  work:    'var(--accent-blue)',
  finance: 'var(--accent-gold)',
  travel:  'var(--accent-purple)',
  health:  'var(--accent-green)',
  personal:'var(--accent-teal)',
}

function fmtDue(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const today = new Date()
  today.setHours(0,0,0,0)
  d.setHours(0,0,0,0)
  const diff = Math.floor((d - today) / 86400000)
  if (diff < 0) return 'Overdue'
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  return `In ${diff} days`
}

export default function TasksWidget({ tasks }) {
  const [done, setDone] = useState(
    () => new Set(tasks?.filter(t => t.done).map(t => t.id) || [])
  )

  if (!tasks?.length) return <div className="empty">No tasks</div>

  const sorted = [...tasks].sort((a,b) => {
    const pd = {high:0,medium:1,low:2}
    const isDoneA = done.has(a.id), isDoneB = done.has(b.id)
    if (isDoneA !== isDoneB) return isDoneA ? 1 : -1
    return (pd[a.priority]||2) - (pd[b.priority]||2)
  })

  return (
    <div>
      {sorted.map(t => {
        const isDone = done.has(t.id)
        const overdue = fmtDue(t.due_date) === 'Overdue'
        return (
          <div key={t.id} className="task-row">
            <div
              className={`task-check ${isDone ? 'done' : ''}`}
              onClick={() => setDone(prev => {
                const next = new Set(prev)
                next.has(t.id) ? next.delete(t.id) : next.add(t.id)
                return next
              })}
            >
              {isDone && <span style={{ color:'#fff', fontSize:11 }}>✓</span>}
            </div>
            <div style={{ flex:1 }}>
              <div className={`task-title ${isDone ? 'done' : ''}`}>{t.title}</div>
              {t.description && (
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{t.description}</div>
              )}
              <div className="task-meta">
                <span className="category-chip" style={{ color: categoryColors[t.category] || 'var(--text-muted)' }}>
                  {t.category}
                </span>
                <span className="task-due" style={{ color: overdue ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                  {fmtDue(t.due_date)}
                </span>
              </div>
            </div>
            <span className={`priority-chip priority-${t.priority}`}>{t.priority}</span>
          </div>
        )
      })}
    </div>
  )
}
