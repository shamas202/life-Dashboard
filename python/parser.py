"""
Life Dashboard — Python Parser Microservice
Parses raw email/calendar content, extracts structured action items.
Runs on port 5000.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import yaml
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Load config
try:
    with open("../config.yaml", "r") as f:
        config = yaml.safe_load(f)
    PYTHON_PORT = config.get("server", {}).get("python_port", 5000)
except Exception:
    PYTHON_PORT = 5000


# ─── Parsers ────────────────────────────────────────────────────────────────

def extract_flight_from_email(text: str) -> dict | None:
    """Attempt to extract flight details from raw email text."""
    patterns = {
        "flight_number": r"\b([A-Z]{2,3}[-\s]?\d{3,4})\b",
        "confirmation":  r"(?:confirmation|booking|pnr)[:\s#]*([A-Z0-9]{5,8})",
        "date":          r"\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4})\b",
    }
    result = {}
    for key, pat in patterns.items():
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            result[key] = m.group(1)
    return result if result else None


def extract_action_items(text: str) -> list[str]:
    """Extract action-required phrases from email text."""
    triggers = [
        r"please\s+(\w+(?:\s+\w+){0,5})",
        r"action required[:\s]+([^\n.]{5,80})",
        r"don't forget to\s+([^\n.]{5,80})",
        r"reminder[:\s]+([^\n.]{5,80})",
        r"due\s+(?:date|by)[:\s]+([^\n.]{5,50})",
    ]
    items = []
    for pat in triggers:
        for m in re.finditer(pat, text, re.IGNORECASE):
            item = m.group(1).strip().capitalize()
            if 5 < len(item) < 120:
                items.append(item)
    return items[:5]  # cap at 5


def classify_email(subject: str, body: str) -> str:
    """Classify email into a category."""
    text = (subject + " " + body).lower()
    if any(w in text for w in ["flight", "boarding", "airline", "departure", "arrival"]):
        return "flight"
    if any(w in text for w in ["hotel", "reservation", "check-in", "checkout", "inn", "resort"]):
        return "hotel"
    if any(w in text for w in ["invoice", "payment", "due", "bill", "receipt"]):
        return "finance"
    if any(w in text for w in ["meeting", "calendar", "invite", "standup", "zoom", "teams"]):
        return "meeting"
    if any(w in text for w in ["action required", "sign", "approve", "review", "deadline"]):
        return "task"
    return "general"


# ─── Routes ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return jsonify({"status": "ok", "service": "life-dashboard-parser", "time": datetime.utcnow().isoformat()})


@app.post("/parse/email")
def parse_email():
    """
    POST { subject, body } → structured extraction
    """
    data = request.get_json(force=True)
    subject = data.get("subject", "")
    body = data.get("body", "")

    category = classify_email(subject, body)
    action_items = extract_action_items(body)
    flight_data = extract_flight_from_email(subject + " " + body) if category == "flight" else None

    return jsonify({
        "category": category,
        "action_items": action_items,
        "flight_data": flight_data,
        "priority": "high" if action_items else "medium",
        "parsed_at": datetime.utcnow().isoformat(),
    })


@app.post("/parse/calendar")
def parse_calendar():
    """
    POST { title, description, location } → enriched event
    """
    data = request.get_json(force=True)
    title = data.get("title", "")
    description = data.get("description", "")

    event_type = "meeting"
    if any(w in title.lower() for w in ["flight", "travel", "airport"]):
        event_type = "travel"
    elif any(w in title.lower() for w in ["gym", "run", "yoga", "workout", "dentist", "doctor"]):
        event_type = "personal"

    tasks = extract_action_items(description)

    return jsonify({
        "event_type": event_type,
        "suggested_tasks": tasks,
        "parsed_at": datetime.utcnow().isoformat(),
    })


@app.get("/summary")
def summary():
    """Returns a natural-language summary of the current day."""
    now = datetime.utcnow()
    items = [
        "Q3 Product Review in 2 hours — slides not yet ready",
        "AWS invoice due in 3 days — $284.50",
        "Flight EK-612 to Dubai in 48 hours",
        "NDA contract signature required before Thursday",
    ]
    return jsonify({
        "date": now.strftime("%A, %B %d %Y"),
        "urgent_count": 4,
        "summary_items": items,
        "generated_at": now.isoformat(),
    })


if __name__ == "__main__":
    print(f"\n🐍 Life Dashboard Parser running on http://localhost:{PYTHON_PORT}\n")
    app.run(port=PYTHON_PORT, debug=True)
