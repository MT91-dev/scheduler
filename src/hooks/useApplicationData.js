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

    const putRequestAPIURL = `http://localhost:8001/api/appointments/${id}`;

    let requestData = {
      putRequestAPIURL,
      data: appointment
    };

    return axios.put(putRequestAPIURL, appointment).then(() => {
      setState({ ...state, appointments })
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

    const deleteRequestAPIURL = `http://localhost:8001/api/appointments/${id}`;

    let requestData = {
      deleteRequestAPIURL,
      data: appointment
    };

    return axios.delete(deleteRequestAPIURL, appointment).then(() => {
      setState({ ...state, appointments})
    })
  }

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  }
}