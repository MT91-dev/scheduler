import React, { useState, Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ?
        (<Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={props.onDelete}
          onEdit={props.onEdit} />)
        :
        (<Empty onAdd={props.onAdd} />)}
    </article>
  );
}