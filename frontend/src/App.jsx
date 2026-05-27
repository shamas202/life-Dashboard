import { useDashboard } from './hooks/useDashboard'
import StatsRow        from './components/StatsRow'
import FlightsWidget   from './components/FlightsWidget'
import HotelsWidget    from './components/HotelsWidget'
import CalendarWidget  from './components/CalendarWidget'
import EmailWidget     from './components/EmailWidget'
import TasksWidget     from './components/TasksWidget'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
function fmtDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday:'long', year:'numeric', month:'long', day:'numeric'
  }).toUpperCase()
}
function fmtSync(d) {
  if (!d) return 'Never'
  return d.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })
}

function Card({ title, icon, children, className = '', style = {}, count }) {
  return (
    <div className={`card fade-up ${className}`} style={style}>
      <div className="card-header">
        <div className="card-title">{icon && <span>{icon}</span>}{title}</div>
        {count !== undefined && <span className="card-count">{count}</span>}
      </div>
      {children}
    </div>
  )
}

export default function App() {
  const { data, loading, error, lastSync, refetch } = useDashboard()

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner" />
      <div className="loading-text">Loading your life dashboard…</div>
    </div>
  )

  const urgentCount = data.tasks.filter(t => !t.done && t.priority === 'high').length

  return (
    <div className="app-shell">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-brand">
          <span>⬡</span> Life <span>Dashboard</span>
        </div>
        <div className="topbar-right">
          {error && <span style={{ color:'var(--accent-rose)' }}>⚠ API offline — showing mock data</span>}
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div className="sync-dot" />
            <span>Last sync {fmtSync(lastSync)}</span>
          </div>
          <button
            onClick={refetch}
            style={{ background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', borderRadius:6,
                     padding:'4px 12px', color:'var(--text-secondary)', cursor:'pointer', fontSize:11,
                     fontFamily:'var(--font-mono)', transition:'background 0.15s' }}
            onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
            onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.05)'}
          >
            ↻ Refresh
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="main-content">
        {/* Day header */}
        <div className="day-header">
          <div className="day-date">{fmtDate()}</div>
          <div className="day-greeting">
            {greeting()}, <em>here's your day.</em>
          </div>
          {urgentCount > 0 && (
            <div className="urgent-banner">
              ⚡ {urgentCount} urgent item{urgentCount > 1 ? 's' : ''} need your attention
            </div>
          )}
        </div>

        {/* Stats */}
        <StatsRow data={data} />

        {/* Dashboard grid */}
        <div className="dashboard-grid">

          {/* Calendar — spans 2 cols */}
          <Card title="Calendar" icon="📅" className="span-2 stagger-2"
                count={data.calendar.length}>
            <CalendarWidget events={data.calendar} />
          </Card>

          {/* Tasks */}
          <Card title="Tasks" icon="⚡" className="stagger-3"
                count={data.tasks.filter(t => !t.done).length + ' open'}>
            <TasksWidget tasks={data.tasks} />
          </Card>

          {/* Flights */}
          <Card title="Flights" icon="✈" className="stagger-2"
                style={{ borderTop:'2px solid var(--accent-gold)' }}
                count={data.flights.length}>
            <FlightsWidget flights={data.flights} />
          </Card>

          {/* Hotels */}
          <Card title="Hotels" icon="🏨" className="stagger-3"
                count={data.hotels.length}>
            <HotelsWidget hotels={data.hotels} />
          </Card>

          {/* Emails — spans 1 col */}
          <Card title="Action Emails" icon="📩" className="stagger-4"
                count={data.emails.filter(e => !e.is_read).length + ' unread'}>
            <EmailWidget emails={data.emails} />
          </Card>

        </div>
      </main>
    </div>
  )
}
