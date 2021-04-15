export function getAppointmentsForDay(state, day) {
  let result = [];
  if (!state.days.length) {
    return result;
  }
  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      for (let appointment of dayObj.appointments) {
        for (let key in state.appointments) {
          if (appointment == key) {
            result.push(state.appointments[key]);
          }
        }
      }
    }
  }
  return result;
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