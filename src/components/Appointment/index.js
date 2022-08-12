import React, { useState, Fragment } from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={props.onDelete}
          onEdit={props.onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={[]}
          onSave={props.onSave}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}