import { useState, useEffect, useCallback } from 'react'

const API = 'http://localhost:8080/api'

export function useDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastSync, setLastSync] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${API}/dashboard`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
      setLastSync(new Date())
      setError(null)
    } catch (e) {
      setError(e.message)
      // Use mock data as fallback so UI is always visible
      setData(getMockFallback())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60_000) // refresh every 60s
    return () => clearInterval(interval)
  }, [fetchData])

  return { data, loading, error, lastSync, refetch: fetchData }
}

// Fallback data when API is not yet running
function getMockFallback() {
  const now = new Date()
  const soon = (h) => new Date(now.getTime() + h * 3600000).toISOString()
  return {
    flights: [
      { id:'f1', airline:'Emirates', flight_number:'EK-612', origin:'LHE', destination:'DXB',
        departure_time: soon(48), arrival_time: soon(51), status:'on-time',
        confirmation:'EMR9X2K', gate:'B12', seat:'22A', terminal:'T1' },
    ],
    hotels: [
      { id:'h1', name:'Atlantis The Palm', city:'Dubai', check_in: soon(51).slice(0,10),
        check_out: soon(96).slice(0,10), confirmation:'ATL-77432', room_type:'Ocean Premier King' },
    ],
    calendar: [
      { id:'c1', title:'Q3 Product Review', start_time: soon(2), end_time: soon(3),
        location:'Zoom', source:'google', type:'meeting', attendees:['sarah@co.com','ali@co.com'], color:'#4F8EF7' },
      { id:'c2', title:'Gym — Leg Day', start_time: soon(5), end_time: soon(6),
        location:'Anytime Fitness, Gulberg', source:'apple', type:'personal', attendees:[], color:'#2ECC71' },
      { id:'c4', title:'✈ Flight to Dubai', start_time: soon(48), end_time: soon(51),
        location:'Allama Iqbal Intl', source:'email', type:'travel', attendees:[], color:'#9B59B6' },
    ],
    emails: [
      { id:'e1', subject:'Your Emirates flight EK-612 is confirmed', from:'noreply@emirates.com',
        preview:'Depart LHE 10:45 · Arrive DXB 13:00 · Gate B12', received_at: soon(-2),
        action_type:'flight', is_read:false, priority:'high' },
      { id:'e2', subject:'Invoice due: AWS — $284.50', from:'billing@amazon.com',
        preview:'Payment due June 1.', received_at: soon(-5), action_type:'task', is_read:false, priority:'high' },
      { id:'e3', subject:'Action required: Sign Q2 contract', from:'legal@partner.com',
        preview:'Please review and sign the NDA before Thursday.', received_at: soon(-8),
        action_type:'task', is_read:true, priority:'high' },
      { id:'e5', subject:'Standup moved to 10 AM', from:'calendar@google.com',
        preview:'Your event has been rescheduled.', received_at: soon(-1),
        action_type:'meeting', is_read:false, priority:'medium' },
    ],
    tasks: [
      { id:'t1', title:'Pay AWS Invoice', description:'$284.50 due June 1', due_date: soon(72).slice(0,10),
        priority:'high', done:false, source:'email', category:'finance' },
      { id:'t2', title:'Sign Q2 NDA Contract', description:'Review before Thursday',
        due_date: soon(36).slice(0,10), priority:'high', done:false, source:'email', category:'work' },
      { id:'t3', title:'Pack for Dubai trip', description:'Flight in 48h',
        due_date: soon(24).slice(0,10), priority:'high', done:false, source:'manual', category:'travel' },
      { id:'t4', title:'Prepare Q3 Review slides', description:'Meeting in 2 hours',
        due_date: now.toISOString().slice(0,10), priority:'high', done:false, source:'calendar', category:'work' },
      { id:'t5', title:'Buy groceries', description:'milk, eggs, coffee',
        due_date: now.toISOString().slice(0,10), priority:'low', done:true, source:'manual', category:'personal' },
      { id:'t6', title:'Schedule dentist appointment', description:'Overdue by 2 weeks',
        due_date: soon(48).slice(0,10), priority:'medium', done:false, source:'manual', category:'health' },
    ],
    last_sync: now.toISOString(),
  }
}
