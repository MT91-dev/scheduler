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

export function getInterviewersForDay(state, day){
  let result = [];
  let days = state.days;
  let interviewersForTheStateDay;

  //Checks if the state.days is empty or not
  if(state.days.length < 1){
    return [];
  }

  //Retrieves interviewers for the day
  for(const stateDay of days){
    if(stateDay.name === day){
      interviewersForTheStateDay = stateDay.interviewers;
    }
  }

  //if there is no day found, return empty array
  if(!interviewersForTheStateDay){
    return [];
  }

  //Push interviewer objects to results;
  for(const id of interviewersForTheStateDay){
    let interviewer = state.interviewers[id];
    result.push(interviewer);
  }

  return result;
}