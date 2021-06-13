import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS_REMAINING = "SET_SPOTS_REMAINING";

  const reducer = (state, action) => {
    const { type, day, days, appointments, interviewers, id, interview } = action;
    switch (type) {
      case SET_DAY:
        return { ...state, day };
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }
      case SET_INTERVIEW:
        return {
          ...state,
          appointments: {
            ...state.appointments,
            [id]: {
              ...state.appointments[id],
              interview
            }
          }
        }
      case SET_SPOTS_REMAINING:
        const newDays = [...state.days];
        newDays.forEach((currentDay) => {
          const emptyAppointments = currentDay.appointments.filter(
            (appointmentId) =>
              state.appointments[appointmentId].interview === null
          );
          newDays[currentDay.id - 1].spots = emptyAppointments.length;
        });
        return {
          ...state,
          days: newDays,
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => dispatch({ type: SET_DAY, day });

  // Change the local state when interview is booked
  const bookInterview = (id, interview) => {
    // Update database with the interview data
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: { ...interview }
        })
        dispatch({ type: SET_SPOTS_REMAINING });
      });
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({
          type: SET_INTERVIEW,
          id,
          interview: null
        })
        dispatch({ type: SET_SPOTS_REMAINING });
      });
  }

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    ws.onopen = function (event) {
      ws.send("ping");
    }
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (data.type) {
        // dispatch the received event to the reducer
        dispatch(JSON.parse(event.data));
        // the event will either be a new or deleted interview -> update spots remaining for all days
        dispatch({ type: SET_SPOTS_REMAINING });
      }
    }


    const getDays = axios.get('/api/days');
    const getAppointments = axios.get('/api/appointments');
    const getInterviewers = axios.get('/api/interviewers');
    Promise.all([getDays, getAppointments, getInterviewers])
      .then(([days, appointments, interviewers]) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days,
          appointments,
          interviewers
        })
      })
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}