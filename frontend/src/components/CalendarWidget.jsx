function fmtTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false })
}

const typeIcons = { meeting:'👥', personal:'🏃', travel:'✈', default:'📅' }

export default function CalendarWidget({ events }) {
  if (!events?.length) return <div className="empty">No upcoming events</div>

  const sorted = [...events].sort((a,b) => new Date(a.start_time) - new Date(b.start_time))

  return (
    <div>
      {sorted.map(ev => (
        <div key={ev.id} className="cal-event">
          <div className="cal-stripe" style={{ background: ev.color || 'var(--accent-blue)', minHeight:40 }} />
          <div className="cal-time">
            {fmtTime(ev.start_time)}<br/>
            <span style={{ color:'var(--text-muted)', fontSize:10 }}>{fmtTime(ev.end_time)}</span>
          </div>
          <div className="cal-body">
            <div className="cal-title">
              <span style={{ marginRight:6 }}>{typeIcons[ev.type] || typeIcons.default}</span>
              {ev.title}
            </div>
            {ev.location && <div className="cal-location">📍 {ev.location}</div>}
            {ev.attendees?.length > 0 && (
              <div className="cal-attendees">
                {ev.attendees.slice(0,4).map(a => (
                  <div key={a} className="attendee-avatar" title={a}>
                    {a.slice(0,2).toUpperCase()}
                  </div>
                ))}
                {ev.attendees.length > 4 && (
                  <div className="attendee-avatar">+{ev.attendees.length-4}</div>
                )}
              </div>
            )}
          </div>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-muted)',
                        background:'rgba(255,255,255,0.04)', padding:'2px 7px', borderRadius:99,
                        alignSelf:'flex-start', border:'1px solid var(--border)', textTransform:'uppercase', letterSpacing:'0.06em' }}>
            {ev.source}
          </div>
        </div>
      ))}
    </div>
  )
}
