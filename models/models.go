package models

// Config maps config.yaml structure
type Config struct {
	App struct {
		Name    string `yaml:"name"`
		Version string `yaml:"version"`
	} `yaml:"app"`
	Server struct {
		GoPort     int `yaml:"go_port"`
		PythonPort int `yaml:"python_port"`
		FrontendPort int `yaml:"frontend_port"`
	} `yaml:"server"`
	MockData struct {
		Enabled bool `yaml:"enabled"`
	} `yaml:"mock_data"`
}

// Flight represents a travel booking
type Flight struct {
	ID             string `json:"id"`
	Airline        string `json:"airline"`
	FlightNumber   string `json:"flight_number"`
	Origin         string `json:"origin"`
	Destination    string `json:"destination"`
	DepartureTime  string `json:"departure_time"`
	ArrivalTime    string `json:"arrival_time"`
	Status         string `json:"status"` // on-time, delayed, cancelled
	Confirmation   string `json:"confirmation"`
	Gate           string `json:"gate"`
	Seat           string `json:"seat"`
	Terminal       string `json:"terminal"`
}

// Hotel represents a lodging booking
type Hotel struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	City         string `json:"city"`
	CheckIn      string `json:"check_in"`
	CheckOut     string `json:"check_out"`
	Confirmation string `json:"confirmation"`
	Address      string `json:"address"`
	RoomType     string `json:"room_type"`
}

// CalendarEvent represents any calendar entry
type CalendarEvent struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	StartTime   string   `json:"start_time"`
	EndTime     string   `json:"end_time"`
	Location    string   `json:"location"`
	Description string   `json:"description"`
	Source      string   `json:"source"` // google, outlook, apple
	Type        string   `json:"type"`   // meeting, personal, travel
	Attendees   []string `json:"attendees"`
	Color       string   `json:"color"`
}

// EmailItem represents an actionable email
type EmailItem struct {
	ID         string `json:"id"`
	Subject    string `json:"subject"`
	From       string `json:"from"`
	Preview    string `json:"preview"`
	ReceivedAt string `json:"received_at"`
	ActionType string `json:"action_type"` // flight, hotel, meeting, task, reminder
	IsRead     bool   `json:"is_read"`
	Priority   string `json:"priority"` // high, medium, low
}

// Task represents a to-do item
type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	DueDate     string `json:"due_date"`
	Priority    string `json:"priority"` // high, medium, low
	Done        bool   `json:"done"`
	Source      string `json:"source"` // manual, email, calendar
	Category    string `json:"category"`
}

// DashboardData is the full aggregated payload
type DashboardData struct {
	Flights  []Flight        `json:"flights"`
	Hotels   []Hotel         `json:"hotels"`
	Calendar []CalendarEvent `json:"calendar"`
	Emails   []EmailItem     `json:"emails"`
	Tasks    []Task          `json:"tasks"`
	LastSync string          `json:"last_sync"`
}
