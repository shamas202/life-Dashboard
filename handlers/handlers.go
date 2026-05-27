package handlers

import (
	"encoding/json"
	"life-dashboard/models"
	"net/http"
	"time"
)

func writeJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// GetDashboard returns the full aggregated dashboard payload
func GetDashboard(w http.ResponseWriter, r *http.Request) {
	data := models.DashboardData{
		Flights:  getMockFlights(),
		Hotels:   getMockHotels(),
		Calendar: getMockCalendar(),
		Emails:   getMockEmails(),
		Tasks:    getMockTasks(),
		LastSync: time.Now().Format(time.RFC3339),
	}
	writeJSON(w, data)
}

// GetFlights returns flight bookings
func GetFlights(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, getMockFlights())
}

// GetHotels returns hotel bookings
func GetHotels(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, getMockHotels())
}

// GetCalendar returns calendar events
func GetCalendar(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, getMockCalendar())
}

// GetEmails returns actionable emails
func GetEmails(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, getMockEmails())
}

// GetTasks returns tasks/to-dos
func GetTasks(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, getMockTasks())
}

// ToggleTask marks a task done/undone
func ToggleTask(w http.ResponseWriter, r *http.Request) {
	tasks := getMockTasks()
	writeJSON(w, map[string]interface{}{
		"success": true,
		"tasks":   tasks,
	})
}

// HealthCheck endpoint for service monitoring
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, map[string]string{
		"status":  "ok",
		"service": "life-dashboard-api",
		"time":    time.Now().Format(time.RFC3339),
	})
}
