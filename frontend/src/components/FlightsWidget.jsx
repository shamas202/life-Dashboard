function fmt(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', hour12:false })
}
function fmtDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' })
}
function hoursUntil(iso) {
  const diff = new Date(iso) - new Date()
  const h = Math.floor(diff / 3600000)
  if (h < 0) return 'departed'
  if (h < 24) return `in ${h}h`
  return `in ${Math.floor(h/24)}d ${h%24}h`
}

export default function FlightsWidget({ flights }) {
  if (!flights?.length) return <div className="empty">No upcoming flights</div>
  return (
    <div>
      {flights.map(f => (
        <div key={f.id} className="flight-row">
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
              <span className="flight-code">{f.origin}</span>
              <div className="flight-line">
                <div className="flight-dash" />
                <span style={{ fontSize:14 }}>✈</span>
                <div className="flight-dash" />
              </div>
              <span className="flight-code">{f.destination}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
              <span className="flight-num">{f.airline} {f.flight_number}</span>
              <span className="flight-time">{fmtDate(f.departure_time)} · {fmt(f.departure_time)} → {fmt(f.arrival_time)}</span>
              <span className={`status-badge status-${f.status?.replace(' ','-')}`}>
                {f.status === 'on-time' ? '● On time' : f.status}
              </span>
              <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--text-muted)', marginLeft:'auto' }}>
                {hoursUntil(f.departure_time)}
              </span>
            </div>
            <div style={{ display:'flex', gap:16, marginTop:8 }}>
              {[
                ['Conf', f.confirmation],
                ['Gate', f.gate],
                ['Seat', f.seat],
                ['Terminal', f.terminal],
              ].map(([k,v]) => v && (
                <div key={k} style={{ display:'flex', flexDirection:'column' }}>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:9, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{k}</span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--accent-gold)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
