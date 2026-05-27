export default function StatsRow({ data }) {
  const urgentTasks  = data.tasks.filter(t => !t.done && t.priority === 'high').length
  const unreadEmails = data.emails.filter(e => !e.is_read).length
  const todayEvents  = data.calendar.length
  const flights      = data.flights.length

  const stats = [
    { label: 'Urgent Tasks',   value: urgentTasks,  color: 'var(--accent-rose)',  sub: 'need attention' },
    { label: 'Unread Emails',  value: unreadEmails, color: 'var(--accent-blue)',  sub: 'action items' },
    { label: "Today's Events", value: todayEvents,  color: 'var(--accent-teal)',  sub: 'on calendar' },
    { label: 'Flights Ahead',  value: flights,      color: 'var(--accent-gold)',  sub: 'upcoming' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}
         className="fade-up stagger-1">
      {stats.map((s, i) => (
        <div className="stat-card" key={s.label}
             style={{ borderTop: `2px solid ${s.color}`, animationDelay: `${i * 0.06}s` }}>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
