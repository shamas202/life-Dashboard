# 🗂 Life Dashboard

> A unified personal command center — aggregates flights, hotels, calendars, emails, and tasks in one beautiful interface.

---

## Stack

| Layer      | Tech            | Port  | Purpose                              |
|------------|-----------------|-------|--------------------------------------|
| Frontend   | React + Vite    | 5173  | Dashboard UI                        |
| API Server | Go (gorilla/mux)| 8080  | REST API, data aggregation, routing |
| Parser     | Python (Flask)  | 5000  | Email/calendar intelligence service |
| Config     | YAML            | —     | All settings in `config.yaml`        |

---

## Prerequisites

Install these once:

```bash
# Go 1.21+
https://go.dev/dl/

# Node.js 18+
https://nodejs.org/

# Python 3.10+
https://python.org/

# VS Code (optional but recommended)
https://code.visualstudio.com/
```

---

## ▶ Run in VS Code (recommended)

**Option 1 — Terminal:**
```bash
node start.js
```
This single command installs all dependencies and starts all three services.

**Option 2 — VS Code Task (Ctrl+Shift+B):**
- Open Command Palette → `Tasks: Run Build Task`
- Select `🚀 Start Life Dashboard (All Services)`

**Option 3 — F5 (Debug):**
- Open `launch.json` is pre-configured
- Press F5 to launch with the Node.js debugger

---

## 🌐 URLs after launch

| Service    | URL                                    |
|------------|----------------------------------------|
| Dashboard  | http://localhost:5173                  |
| Go API     | http://localhost:8080/api/dashboard    |
| Health     | http://localhost:8080/api/health       |
| Parser     | http://localhost:5000/summary          |

---

## API Endpoints (Go — port 8080)

```
GET  /api/dashboard          Full aggregated payload
GET  /api/flights            Flight bookings
GET  /api/hotels             Hotel bookings
GET  /api/calendar           Calendar events
GET  /api/emails             Actionable emails
GET  /api/tasks              To-do items
POST /api/tasks/{id}/toggle  Toggle task completion
GET  /api/health             Health check
```

## Parser Endpoints (Python — port 5000)

```
POST /parse/email            Classify + extract action items from email text
POST /parse/calendar         Enrich calendar event, suggest tasks
GET  /summary                Today's natural-language summary
GET  /health                 Health check
```

---

## ⚙ Configuration (`config.yaml`)

```yaml
mock_data:
  enabled: true   # ← set false to plug in real integrations

integrations:
  gmail:
    enabled: false
    client_id: "YOUR_GMAIL_CLIENT_ID"

  google_calendar:
    enabled: false
    client_id: "YOUR_GOOGLE_CALENDAR_CLIENT_ID"

  outlook:
    enabled: false
    tenant_id: "YOUR_AZURE_TENANT_ID"
```

All ports, origins, and integration keys live here — never hardcoded.

---

## Project Structure

```
life-dashboard/
├── main.go                    ← Go API server entry point
├── config.yaml                ← All configuration
├── go.mod / go.sum
├── handlers/
│   ├── handlers.go            ← HTTP route handlers
│   └── mock_data.go           ← Realistic mock data
├── models/
│   └── models.go              ← Shared data types
├── python/
│   ├── parser.py              ← Flask microservice
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   ├── vite.config.js         ← Proxy: /api → :8080, /parse → :5000
│   ├── index.html
│   └── src/
│       ├── App.jsx            ← Dashboard layout
│       ├── styles.css         ← Design system
│       ├── hooks/
│       │   └── useDashboard.js
│       └── components/
│           ├── StatsRow.jsx
│           ├── FlightsWidget.jsx
│           ├── HotelsWidget.jsx
│           ├── CalendarWidget.jsx
│           ├── EmailWidget.jsx
│           └── TasksWidget.jsx
├── start.js                   ← 🎯 MAIN ENTRY POINT
└── .vscode/
    ├── tasks.json             ← Ctrl+Shift+B tasks
    ├── launch.json            ← F5 debug configs
    └── settings.json
```

---

## Extending with Real Data

1. Set `mock_data.enabled: false` in `config.yaml`
2. Add OAuth credentials for Gmail / Google Calendar / Outlook
3. In `main.go`, replace `getMock*()` calls with real API client calls
4. The Python parser in `python/parser.py` works on real email body text via `POST /parse/email`

---

## Design System

The UI uses a **dark command-center aesthetic**:
- **Syne** (display/headings) + **DM Mono** (data/codes) + **Inter** (body)
- Deep navy base (`#080c14`) with amber/gold accents
- CSS variables throughout — easy to theme

---

*Built with Go · Python · React · YAML · Node.js*
