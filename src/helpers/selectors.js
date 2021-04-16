export function getAppointmentsForDay(state, day) {
  const dayFound = state.days.find(dayObj => dayObj.name === day)
  if (!dayFound) {
    return [];
  }
  const appointments = dayFound.appointments.map(appointmentId => state.appointments[appointmentId]);
  return appointments;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  for (let id in state.interviewers) {
    if (interview.interviewer == id) {
      interview.interviewer = state.interviewers[id];
    }
  }
  return interview;
}

export function getInterviewersForDay(state, day) {
  const dayFound = state.days.find(dayObj => dayObj.name === day)
  if (!dayFound) {
    return [];
  }

  const interviewers = dayFound.interviewers.map(interviewerId => state.interviewers[interviewerId]);
  return interviewers;
}