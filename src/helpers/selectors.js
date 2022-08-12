export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(currentDay => currentDay.name === day);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  const appointmentsFromDays = filteredDays[0].appointments;

  let filteredAppointments = [];

  for (let appointment of appointmentsFromDays) {
    filteredAppointments.push(state.appointments[appointment]);
  }
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInformation = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInformation
  }
}