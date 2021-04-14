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
