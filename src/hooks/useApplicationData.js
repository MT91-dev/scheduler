import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  //find the day based on the state.day
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day]
  }

  //function that submits axios put request to update database
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //find the day of the week based on the return value of findDay
    const dayOfWeek = findDay(state.day)

    //if the appointment is booked, subtract 1 from the spots available
    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots - 1
    }

    //update the days array with the new spots available
    let days = state.days
    days[dayOfWeek] = day;

    const putRequestAPIURL = `http://localhost:8001/api/appointments/${id}`;

    let requestData = {
      putRequestAPIURL,
      data: appointment
    };

    return axios.put(putRequestAPIURL, appointment).then(() => {
      setState({ ...state, appointments, days })
    })
  }

  //function that submits axios delete request to update database
  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //find the day of the week based on the return value of findDay
    const dayOfWeek = findDay(state.day)

    //if the appointment is cancelled, add 1 to the spots available
    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    //update the days array with the new spots available
    let days = state.days
    days[dayOfWeek] = day;

    const deleteRequestAPIURL = `http://localhost:8001/api/appointments/${id}`;

    let requestData = {
      deleteRequestAPIURL,
      data: appointment
    };

    return axios.delete(deleteRequestAPIURL, appointment).then(() => {
      setState({ ...state, appointments, days })
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}