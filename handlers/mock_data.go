package handlers

import (
	"life-dashboard/models"
	"time"
)

func getMockFlights() []models.Flight {
	return []models.Flight{
		{
			ID:            "f1",
			Airline:       "Emirates",
			FlightNumber:  "EK-612",
			Origin:        "LHE",
			Destination:   "DXB",
			DepartureTime: time.Now().Add(48 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ArrivalTime:   time.Now().Add(51 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Status:        "on-time",
			Confirmation:  "EMR9X2K",
			Gate:          "B12",
			Seat:          "22A",
			Terminal:      "T1",
		},
		{
			ID:            "f2",
			Airline:       "Qatar Airways",
			FlightNumber:  "QR-502",
			Origin:        "DXB",
			Destination:   "DOH",
			DepartureTime: time.Now().Add(96 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ArrivalTime:   time.Now().Add(97 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Status:        "on-time",
			Confirmation:  "QTR8M3P",
			Gate:          "D7",
			Seat:          "14C",
			Terminal:      "T3",
		},
	}
}

func getMockHotels() []models.Hotel {
	return []models.Hotel{
		{
			ID:           "h1",
			Name:         "Atlantis The Palm",
			City:         "Dubai",
			CheckIn:      time.Now().Add(51 * time.Hour).Format("2006-01-02"),
			CheckOut:     time.Now().Add(96 * time.Hour).Format("2006-01-02"),
			Confirmation: "ATL-77432",
			Address:      "Crescent Rd, The Palm Jumeirah, Dubai",
			RoomType:     "Ocean Premier King",
		},
		{
			ID:           "h2",
			Name:         "W Doha",
			City:         "Doha",
			CheckIn:      time.Now().Add(97 * time.Hour).Format("2006-01-02"),
			CheckOut:     time.Now().Add(144 * time.Hour).Format("2006-01-02"),
			Confirmation: "WDOH-10234",
			Address:      "West Bay, Doha, Qatar",
			RoomType:     "Spectacular Room",
		},
	}
}

func getMockCalendar() []models.CalendarEvent {
	now := time.Now()
	return []models.CalendarEvent{
		{
			ID:          "c1",
			Title:       "Q3 Product Review",
			StartTime:   now.Add(2 * time.Hour).Format("2006-01-02T15:04:05Z"),
			EndTime:     now.Add(3 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Location:    "Zoom — link in description",
			Description: "Quarterly product review with stakeholders",
			Source:      "google",
			Type:        "meeting",
			Attendees:   []string{"sarah@company.com", "ali@company.com", "raza@company.com"},
			Color:       "#4F8EF7",
		},
		{
			ID:          "c2",
			Title:       "Gym — Leg Day",
			StartTime:   now.Add(5 * time.Hour).Format("2006-01-02T15:04:05Z"),
			EndTime:     now.Add(6 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Location:    "Anytime Fitness, Gulberg",
			Description: "",
			Source:      "apple",
			Type:        "personal",
			Attendees:   []string{},
			Color:       "#2ECC71",
		},
		{
			ID:          "c3",
			Title:       "1:1 with Manager",
			StartTime:   now.Add(26 * time.Hour).Format("2006-01-02T15:04:05Z"),
			EndTime:     now.Add(26*time.Hour + 30*time.Minute).Format("2006-01-02T15:04:05Z"),
			Location:    "Office — Room 3B",
			Description: "Weekly sync",
			Source:      "outlook",
			Type:        "meeting",
			Attendees:   []string{"manager@company.com"},
			Color:       "#E67E22",
		},
		{
			ID:          "c4",
			Title:       "Flight to Dubai ✈",
			StartTime:   time.Now().Add(48 * time.Hour).Format("2006-01-02T15:04:05Z"),
			EndTime:     time.Now().Add(51 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Location:    "Allama Iqbal Intl Airport",
			Description: "EK-612 — Confirmation: EMR9X2K",
			Source:      "email",
			Type:        "travel",
			Attendees:   []string{},
			Color:       "#9B59B6",
		},
		{
			ID:          "c5",
			Title:       "Design Sprint Kickoff",
			StartTime:   now.Add(50 * time.Hour).Format("2006-01-02T15:04:05Z"),
			EndTime:     now.Add(53 * time.Hour).Format("2006-01-02T15:04:05Z"),
			Location:    "Conference Room A",
			Description: "Kicking off the new design sprint for v2.0",
			Source:      "google",
			Type:        "meeting",
			Attendees:   []string{"ux@company.com", "pm@company.com"},
			Color:       "#1ABC9C",
		},
	}
}

func getMockEmails() []models.EmailItem {
	return []models.EmailItem{
		{
			ID:         "e1",
			Subject:    "Your Emirates flight EK-612 is confirmed",
			From:       "noreply@emirates.com",
			Preview:    "Your booking is confirmed. Depart LHE 10:45 · Arrive DXB 13:00 · Gate B12",
			ReceivedAt: time.Now().Add(-2 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ActionType: "flight",
			IsRead:     false,
			Priority:   "high",
		},
		{
			ID:         "e2",
			Subject:    "Invoice due: AWS — $284.50",
			From:       "billing@amazon.com",
			Preview:    "Your AWS invoice for May 2026 is ready. Payment due June 1.",
			ReceivedAt: time.Now().Add(-5 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ActionType: "task",
			IsRead:     false,
			Priority:   "high",
		},
		{
			ID:         "e3",
			Subject:    "Action required: Sign Q2 contract",
			From:       "legal@partner.com",
			Preview:    "Please review and sign the attached NDA before the meeting on Thursday.",
			ReceivedAt: time.Now().Add(-8 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ActionType: "task",
			IsRead:     true,
			Priority:   "high",
		},
		{
			ID:         "e4",
			Subject:    "Atlantis The Palm — Booking Confirmed",
			From:       "reservations@atlantis.com",
			Preview:    "We look forward to welcoming you. Check-in: Room 1402, Ocean Premier King.",
			ReceivedAt: time.Now().Add(-12 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ActionType: "hotel",
			IsRead:     true,
			Priority:   "medium",
		},
		{
			ID:         "e5",
			Subject:    "Reminder: Team standup moved to 10 AM",
			From:       "calendar@google.com",
			Preview:    "Your event 'Daily Standup' has been rescheduled to 10:00 AM tomorrow.",
			ReceivedAt: time.Now().Add(-1 * time.Hour).Format("2006-01-02T15:04:05Z"),
			ActionType: "meeting",
			IsRead:     false,
			Priority:   "medium",
		},
		{
			ID:         "e6",
			Subject:    "Grocery delivery arriving today 6–8 PM",
			From:       "orders@grocerapp.com",
			Preview:    "Your order #GR-44123 is on its way. 18 items, estimated arrival 6:30 PM.",
			ReceivedAt: time.Now().Add(-30 * time.Minute).Format("2006-01-02T15:04:05Z"),
			ActionType: "reminder",
			IsRead:     false,
			Priority:   "low",
		},
	}
}

func getMockTasks() []models.Task {
	return []models.Task{
		{
			ID:          "t1",
			Title:       "Pay AWS Invoice",
			Description: "AWS billing — $284.50 due June 1",
			DueDate:     time.Now().Add(72 * time.Hour).Format("2006-01-02"),
			Priority:    "high",
			Done:        false,
			Source:      "email",
			Category:    "finance",
		},
		{
			ID:          "t2",
			Title:       "Sign Q2 NDA Contract",
			Description: "Review and e-sign before Thursday meeting",
			DueDate:     time.Now().Add(36 * time.Hour).Format("2006-01-02"),
			Priority:    "high",
			Done:        false,
			Source:      "email",
			Category:    "work",
		},
		{
			ID:          "t3",
			Title:       "Pack for Dubai trip",
			Description: "Flight in 48h — passport, chargers, sunscreen",
			DueDate:     time.Now().Add(24 * time.Hour).Format("2006-01-02"),
			Priority:    "high",
			Done:        false,
			Source:      "manual",
			Category:    "travel",
		},
		{
			ID:          "t4",
			Title:       "Prepare Q3 Product Review slides",
			Description: "Meeting in 2 hours — finalize deck",
			DueDate:     time.Now().Add(1 * time.Hour).Format("2006-01-02"),
			Priority:    "high",
			Done:        false,
			Source:      "calendar",
			Category:    "work",
		},
		{
			ID:          "t5",
			Title:       "Buy groceries — milk, eggs, coffee",
			Description: "",
			DueDate:     time.Now().Format("2006-01-02"),
			Priority:    "low",
			Done:        true,
			Source:      "manual",
			Category:    "personal",
		},
		{
			ID:          "t6",
			Title:       "Schedule dentist appointment",
			Description: "Overdue by 2 weeks",
			DueDate:     time.Now().Add(48 * time.Hour).Format("2006-01-02"),
			Priority:    "medium",
			Done:        false,
			Source:      "manual",
			Category:    "health",
		},
	}
}
