package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"life-dashboard/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"gopkg.in/yaml.v3"
)

// AppConfig maps config.yaml
type AppConfig struct {
	App struct {
		Name    string `yaml:"name"`
		Version string `yaml:"version"`
	} `yaml:"app"`
	Server struct {
		GoPort int `yaml:"go_port"`
	} `yaml:"server"`
	CORS struct {
		AllowedOrigins []string `yaml:"allowed_origins"`
	} `yaml:"cors"`
}

func loadConfig(path string) (*AppConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("cannot read config: %w", err)
	}
	var cfg AppConfig
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("cannot parse config: %w", err)
	}
	return &cfg, nil
}

func main() {
	// Load configuration from YAML
	cfg, err := loadConfig("config.yaml")
	if err != nil {
		log.Printf("Warning: could not load config.yaml (%v), using defaults", err)
		cfg = &AppConfig{}
		cfg.Server.GoPort = 8080
		cfg.CORS.AllowedOrigins = []string{"http://localhost:5173", "http://localhost:3000"}
	}

	port := cfg.Server.GoPort
	if port == 0 {
		port = 8080
	}

	// Set up router
	r := mux.NewRouter()

	// API routes
	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/dashboard", handlers.GetDashboard).Methods("GET")
	api.HandleFunc("/flights", handlers.GetFlights).Methods("GET")
	api.HandleFunc("/hotels", handlers.GetHotels).Methods("GET")
	api.HandleFunc("/calendar", handlers.GetCalendar).Methods("GET")
	api.HandleFunc("/emails", handlers.GetEmails).Methods("GET")
	api.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
	api.HandleFunc("/tasks/{id}/toggle", handlers.ToggleTask).Methods("POST")
	api.HandleFunc("/health", handlers.HealthCheck).Methods("GET")

	// CORS middleware — allow React frontend
	origins := cfg.CORS.AllowedOrigins
	if len(origins) == 0 {
		origins = []string{"http://localhost:5173", "http://localhost:3000"}
	}
	c := cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	addr := fmt.Sprintf(":%d", port)
	fmt.Printf("\n🚀 Life Dashboard API running on http://localhost%s\n", addr)
	fmt.Printf("📋 Routes: /api/dashboard  /api/flights  /api/calendar  /api/tasks  /api/emails\n\n")

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
