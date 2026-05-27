const actionIcons = { flight:'✈', hotel:'🏨', task:'⚡', meeting:'📅', reminder:'🔔', finance:'💳', general:'📩' }

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso)
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h/24)}d ago`
}

export default function EmailWidget({ emails }) {
  if (!emails?.length) return <div className="empty">No emails</div>

  return (
    <div>
      {emails.map(em => (
        <div key={em.id} className="email-row">
          <div className={`email-dot ${em.is_read ? 'read' : 'unread'}`} />
          <div className="email-body">
            <div className="email-subject">
              {actionIcons[em.action_type] || actionIcons.general} {em.subject}
            </div>
            <div className="email-from">{em.from}</div>
            <div className="email-preview">{em.preview}</div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
            <span className={`priority-chip priority-${em.priority}`}>{em.priority}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--text-muted)' }}>
              {timeAgo(em.received_at)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
