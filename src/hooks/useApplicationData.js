import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const spotRemaining = (id, spotChanged) => {
    const days = [...state.days];
    const spotTaken = state.appointments[id].interview;
    for (const day of days) {
      if (spotChanged > 0 || (spotChanged < 0 && !spotTaken)) {
        if (day.appointments.find(appointment => appointment === id)) {
          day.spots += spotChanged;
          setState(prev => {
            return { ...prev, days }
          })
        }
      }
    }
  };

  // Change the local state when interview is booked
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Update database with the interview data
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
        spotRemaining(id, -1);
      });
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
        spotRemaining(id, 1);
      });
  }

  useEffect(() => {
    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(([days, appointments, interviewers]) => {
        setState(prev => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }));
      })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}