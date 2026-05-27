function nights(checkIn, checkOut) {
  const diff = new Date(checkOut) - new Date(checkIn)
  return Math.round(diff / 86400000)
}
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month:'short', day:'numeric' })
}

export default function HotelsWidget({ hotels }) {
  if (!hotels?.length) return <div className="empty">No hotel bookings</div>
  return (
    <div>
      {hotels.map(h => (
        <div key={h.id} className="hotel-row">
          <div className="hotel-name">🏨 {h.name}</div>
          <div style={{ fontSize:12, color:'var(--text-secondary)', marginBottom:6 }}>
            {h.city} · {h.room_type}
          </div>
          <div className="hotel-meta">
            <span>Check-in: {fmtDate(h.check_in)}</span>
            <span>Check-out: {fmtDate(h.check_out)}</span>
            <span>{nights(h.check_in, h.check_out)} nights</span>
          </div>
          <div className="hotel-conf">Conf: {h.confirmation}</div>
        </div>
      ))}
    </div>
  )
}
